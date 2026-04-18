import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
// This host should point at our reverse proxy, not the raw PostHog ingest host.
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://z.naomijonhq.com";

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    capture_pageview: true,
    capture_pageleave: true,
    debug: process.env.NODE_ENV === "development",
  });
}
