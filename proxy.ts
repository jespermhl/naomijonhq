import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@sanity/client';

type RedirectConfig = {
  destination?: string;
  permanent?: boolean;
  noRedirect?: boolean;
};

// Fresh reads: short links must work as soon as they are published in Sanity (no CDN lag).
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-13',
  useCdn: false,
});

function isReservedAppPath(pathname: string): boolean {
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/redirect')
  ) {
    return true;
  }
  if (pathname === '/newsletter' || pathname.startsWith('/newsletter/')) {
    return true;
  }
  // Only real app routes — not every path that begins with "/strawberry" (e.g. /strawberry-mv short links).
  if (
    pathname === '/strawberry' ||
    pathname.startsWith('/strawberry/') ||
    pathname === '/strawberry-tour' ||
    pathname.startsWith('/strawberry-tour/') ||
    pathname === '/strawberry-album' ||
    pathname.startsWith('/strawberry-album/')
  ) {
    return true;
  }
  return false;
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip paths that are handled directly by Next.js routes or contain file extensions
  if (isReservedAppPath(pathname) || pathname.includes('.')) {
    return NextResponse.next();
  }

  let found: RedirectConfig | null = null;
  try {
    const query = `*[_type == "redirect" && source == $path][0]{destination, permanent, noRedirect}`;
    found = await sanityClient.fetch(query, { path: pathname });
  } catch (error) {
    console.error('Edge Redirect Sanity Fetch Error:', error);
  }

  if (found?.noRedirect === true) {
    return NextResponse.next();
  }

  if (found?.destination) {
    const dest = new URL(found.destination, req.url).toString();
    const redirectUrl = new URL('/redirect', req.url);
    redirectUrl.searchParams.set('to', dest);
    // Pass the source path so the redirect page can re-verify the destination against Sanity
    redirectUrl.searchParams.set('source', pathname);
    return NextResponse.redirect(redirectUrl, { status: found.permanent ? 301 : 302 });
  }

  // Rewrite the root to the Linktree hub
  if (pathname === '/') {
    const hubUrl = new URL('/redirect', req.url);
    hubUrl.searchParams.set('to', 'https://linktr.ee/naomijonhq');
    return NextResponse.rewrite(hubUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
