/**
 * Sends an anonymous event to PostHog.
 * Designed to be run server-side (e.g. in Next.js Edge Middleware) to prevent exposing user IP addresses.
 */
export async function trackPostHogEvent(
  eventName: string,
  properties: Record<string, string | number | boolean | null>
) {
  const apiKey = process.env.POSTHOG_PROJECT_API_KEY;
  // Use EU cloud by default for better privacy compliance
  const host = process.env.POSTHOG_HOST || 'https://eu.i.posthog.com';

  if (!apiKey) {
    // Only log warning in development, fail silently in production to avoid crashing
    if (process.env.NODE_ENV !== 'production') {
      console.warn('POSTHOG_PROJECT_API_KEY is not set. Analytics event dropped.');
    }
    return;
  }

  try {
    // We do NOT include the user's IP address.
    // PostHog will use the Vercel server's IP, meaning the user remains 100% anonymous.
    await fetch(`${host}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        event: eventName,
        // Generate a random distinct_id for each event so we don't track sessions/users, only raw counts.
        distinct_id: crypto.randomUUID(),
        properties: {
          ...properties,
          $lib: 'server-side-fetch',
        },
      }),
    });
  } catch (error) {
    console.error('Failed to send event to PostHog:', error);
  }
}
