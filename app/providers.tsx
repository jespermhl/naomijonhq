'use client'
import { PostHogProvider } from 'posthog-js/react'

const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'
const options = {
  api_host: apiHost,
  person_profiles: 'identified_only' as const,
  capture_pageview: true,
  capture_pageleave: true,
  capture_performance: true,
  persistence: 'memory' as const,
}

export function PostHogProviders({ children }: { children: React.ReactNode }) {
  if (!apiKey) {
    return <>{children}</>
  }

  return (
    <PostHogProvider apiKey={apiKey} options={options}>
      {children}
    </PostHogProvider>
  )
}
