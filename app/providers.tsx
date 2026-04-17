'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { Suspense } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true, // Automatisches Tracking aktivieren
    capture_pageleave: true, 
    capture_performance: true, 
    persistence: 'memory', 
  })
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export function Analytics() {
  // Komponente bleibt vorerst leer/als Dummy, um layout.tsx nicht anzufassen
  return null
}
