import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

// Redis-Client initialisieren
const redis = Redis.fromEnv();

type RedirectConfig = {
  destination?: string;
  permanent?: boolean;
  noRedirect?: boolean;
};

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
    pathname === '/privacy-policy' ||
    pathname.startsWith('/privacy-policy/')
  ) {
    return true;
  }
  return false;
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-current-path", pathname);

  if (isReservedAppPath(pathname) || pathname.includes('.')) {
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  // JETZT: Abfrage gegen Redis statt Sanity
  let found: RedirectConfig | null = null;
  try {
    found = await redis.get<RedirectConfig>(`redirect:${pathname}`);
  } catch (error) {
    console.error('Redis Redirect Fetch Error:', error);
  }

  if (found?.noRedirect === true) {
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

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$).*)'
  ],
};