import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { createClient } from '@sanity/client';
import { trackPostHogEvent } from './lib/posthog';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-13',
  useCdn: true,
});

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname, searchParams } = req.nextUrl;

  // 1. Ignore static paths & admin
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  try {
    // 2. Query Sanity
    const query = `*[_type == "redirect" && source == $path][0]{destination, permanent, noRedirect}`;
    const found = await client.fetch(query, { path: pathname });

    // Explicitly allow /newsletter or if noRedirect is set in Sanity
    if (found?.noRedirect === true) {
      return NextResponse.next();
    }

    // Extract anonymous analytics data
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    const referer = req.headers.get('referer');
    let source = searchParams.get('utm_source');
    
    if (!source && referer) {
      try {
        source = new URL(referer).hostname;
      } catch (e) {
        source = 'Invalid Referer';
      }
    }
    if (!source) source = 'Direct';

    if (found?.destination) {
      // Fire analytics event in the background without blocking the redirect
      event.waitUntil(
        trackPostHogEvent('Redirect Clicked', {
          url: pathname,
          destination: found.destination,
          country,
          source,
        })
      );

      return NextResponse.redirect(
        new URL(found.destination, req.url),
        found.permanent ? 301 : 302
      );
    }

    // 3. Global fallback to Linktree
    event.waitUntil(
      trackPostHogEvent('Redirect Clicked', {
        url: pathname,
        destination: 'Linktree Fallback',
        country,
        source,
      })
    );
    return NextResponse.redirect(new URL('https://linktr.ee/naomijonhq', req.url), 301);

  } catch (e) {
    console.error('Edge Redirect Error:', e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};