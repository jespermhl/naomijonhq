import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
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

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Ignore static paths & admin
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/redirect') ||
    pathname.startsWith('/strawberry') ||
    pathname.startsWith('/newsletter') ||
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
    const dest = new URL(found.destination, req.url).toString();
    const redirectUrl = new URL('/redirect', req.url);
    redirectUrl.searchParams.set('to', dest);
    return NextResponse.rewrite(redirectUrl);
  }

  // 3. Fallback logic: Rewrite root only
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
