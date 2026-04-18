import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { createClient } from '@sanity/client';

type RedirectConfig = {
  destination?: string;
  permanent?: boolean;
  noRedirect?: boolean;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-13',
  useCdn: true,
});

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

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
  let found: RedirectConfig | null = null;
  try {
    const query = `*[_type == "redirect" && source == $path][0]{destination, permanent, noRedirect}`;
    found = await client.fetch(query, { path: pathname });
  } catch (error) {
    console.error('Edge Redirect Sanity Fetch Error:', error);
  }

  // Explicitly allow /newsletter or if noRedirect is set in Sanity
  if (found?.noRedirect === true) {
    return NextResponse.next();
  }

  if (found?.destination) {
    return NextResponse.redirect(
      new URL(found.destination, req.url),
      found.permanent ? 301 : 302
    );
  }

  // 3. Global fallback to Linktree
  return NextResponse.redirect(new URL('https://linktr.ee/naomijonhq', req.url), 301);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
