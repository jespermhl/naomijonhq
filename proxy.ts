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

  // 2. Query Sanity
  let found: any = null;
  try {
    const query = `*[_type == "redirect" && source == $path][0]{destination, permanent, noRedirect}`;
    found = await client.fetch(query, { path: pathname });
  } catch (e) {
    console.error('Edge Redirect Sanity Fetch Error:', e);
  }

  // Explicitly allow /newsletter or if noRedirect is set in Sanity
  if (found?.noRedirect === true) {
    return NextResponse.next();
  }

  // Extract analytics data
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '';
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
      trackPostHogEvent('$pageview', {
        $current_url: `https://naomijonhq.com${pathname}`, // Fake a full URL for the dashboard
        $pathname: pathname,
        $ip: ip, // Forward user IP so PostHog handles location automatically
        $referrer: referer || null,
        destination: found.destination,
        source: source,
      })
    );

    return NextResponse.redirect(
      new URL(found.destination, req.url),
      found.permanent ? 301 : 302
    );
  }

  // 3. Global fallback to Linktree
  event.waitUntil(
    trackPostHogEvent('$pageview', {
      $current_url: `https://naomijonhq.com${pathname}`,
      $pathname: pathname,
      $ip: ip,
      $referrer: referer || null,
      destination: 'Linktree Fallback',
      source: source,
    })
  );
  return NextResponse.redirect(new URL('https://linktr.ee/naomijonhq', req.url), 301);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};