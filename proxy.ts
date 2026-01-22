import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-13',
  useCdn: true,
});

export default async function proxy(req: NextRequest) {
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

  try {
    // 2. Query Sanity
    const query = `*[_type == "redirect" && source == $path][0]{destination, permanent, noRedirect}`;
    const found = await client.fetch(query, { path: pathname });

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

  } catch (e) {
    console.error('Edge Redirect Error:', e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};