import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@sanity/client';

type RedirectConfig = {
  destination?: string;
  permanent?: boolean;
  noRedirect?: boolean;
};

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
  if (
    pathname === '/strawberry' ||
    pathname.startsWith('/strawberry/') ||
    pathname === '/strawberry-tour' ||
    pathname.startsWith('/strawberry-tour/') ||
    pathname === '/strawberry-album' ||
    pathname.startsWith('/strawberry-album/') ||
    pathname === '/perfumes' ||
    pathname.startsWith('/perfumes/') ||
    pathname === '/legal-notice' ||
    pathname.startsWith('/legal-notice/') ||
    pathname === '/privacy' ||
    pathname.startsWith('/privacy/')
  ) {
    return true;
  }
  return false;
}

async function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs = 1500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Sanity fetch timeout')), timeoutMs)
    )]);
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Prepare the modified headers cloning the request headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-current-path", pathname);

  // Skip paths that are handled directly by Next.js routes or contain file extensions
  if (isReservedAppPath(pathname) || pathname.includes('.')) {
    // 2. Pass the headers to NextResponse.next()
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  let found: RedirectConfig | null = null;
  try {
    const query = `*[_type == "redirect" && source == $path][0]{destination, permanent, noRedirect}`;
    found = await fetchWithTimeout(
      sanityClient.fetch<RedirectConfig | null>(query, { path: pathname }),
      1500
    );
  } catch (error) {
    console.error('Edge Redirect Sanity Fetch Error:', error);
  }

  if (found?.noRedirect === true) {
    // 3. Pass the headers here as well if Sanity blocks the redirect
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  if (found?.destination) {
    const dest = new URL(found.destination, req.url).toString();
    const redirectUrl = new URL('/redirect', req.url);
    redirectUrl.searchParams.set('to', dest);
    redirectUrl.searchParams.set('source', pathname);
    return NextResponse.redirect(redirectUrl, { status: found.permanent ? 301 : 302 });
  }

  // 4. Pass the headers to the fallback next() call
  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
