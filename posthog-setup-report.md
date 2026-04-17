<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Naomi Jon HQ Next.js 16.1.1 (App Router) project.

## Summary of changes

- **`instrumentation-client.ts`** (new): Initializes PostHog using the Next.js 15.3+ recommended approach. Enables pageview/pageleave tracking, exception capture, and routes all events through a reverse proxy (`/ingest`) to avoid ad blockers.
- **`next.config.ts`**: Added PostHog reverse proxy rewrites (`/ingest/static/*` and `/ingest/*`) and `skipTrailingSlashRedirect: true` for PostHog API compatibility.
- **`app/providers.tsx`**: Removed duplicate PostHog initialization (previously used `PostHogProvider` with an API key, which conflicts with `instrumentation-client.ts`). The component is now a lightweight children passthrough.
- **`app/strawberry/StrawberryRelease.tsx`**: Added `stream_clicked`, `order_clicked`, and `music_video_clicked` events on the respective CTA links.
- **`components/ui/SocialSticker.tsx`**: Added `'use client'` directive and `social_link_clicked` event with platform and href properties.
- **`components/ui/ConcertItem.tsx`**: Added `'use client'` directive and `ticket_link_clicked` event with city, country, venue, and date properties.

## Events tracked

| Event | Description | File |
|---|---|---|
| `stream_clicked` | User clicked the STREAM CTA on the Strawberry album page — top of the conversion funnel | `app/strawberry/StrawberryRelease.tsx` |
| `order_clicked` | User clicked the ORDER CTA on the Strawberry album page — merch/vinyl purchase intent | `app/strawberry/StrawberryRelease.tsx` |
| `music_video_clicked` | User clicked to watch the Strawberry music video | `app/strawberry/StrawberryRelease.tsx` |
| `social_link_clicked` | User clicked a social media link on the newsletter page (includes `platform` and `href` properties) | `components/ui/SocialSticker.tsx` |
| `ticket_link_clicked` | User clicked the TICKETS button for a concert date (includes `city`, `country`, `venue`, and `date` properties) | `components/ui/ConcertItem.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/161392/dashboard/628766
- **Album Streaming Clicks Over Time**: https://eu.posthog.com/project/161392/insights/AuHwoKBR
- **Album Order Clicks Over Time**: https://eu.posthog.com/project/161392/insights/LjO3L1JG
- **Stream → Order Conversion Funnel**: https://eu.posthog.com/project/161392/insights/j7EDwj9h
- **Social Link Clicks by Platform**: https://eu.posthog.com/project/161392/insights/dfzDj3fd
- **Ticket Link Clicks Over Time**: https://eu.posthog.com/project/161392/insights/8S0gzGOY

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
