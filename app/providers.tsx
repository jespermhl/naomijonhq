'use client'

// PostHog is initialized in instrumentation-client.ts (Next.js 15.3+ approach).
// This component is kept as a layout wrapper for future providers.
export function PostHogProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
