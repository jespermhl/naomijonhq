import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-13',
  useCdn: true,
});

const writeClient = process.env.SANITY_API_WRITE_TOKEN
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2024-01-13',
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    })
  : null;

// Track analytics (non-blocking, fire-and-forget)
// Uses atomic increment to avoid race conditions with concurrent requests
async function trackClick(redirectId: string) {
  if (!writeClient) return; // Skip if no write token
  
  try {
    // Use atomic increment to prevent race conditions
    // If clickCount doesn't exist, set it to 1, otherwise increment by 1
    await writeClient
      .patch(redirectId)
      .setIfMissing({ clickCount: 0 })
      .inc({ clickCount: 1 })
      .set({ lastClicked: new Date().toISOString() })
      .commit();
  } catch (error) {
    // Silently fail - analytics shouldn't break redirects
    console.error('Analytics tracking error:', error);
  }
}

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
    const query = `*[_type == "redirect" && source == $path][0]{_id, destination, permanent}`;
    const found = await client.fetch(query, { path: pathname });

    if (found?.destination) {
      // Track analytics (non-blocking)
      if (found._id) {
        trackClick(found._id).catch(() => {}); // Fire and forget
      }
      
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