# Naomi Jon HQ

Redirect service for Naomi Jon HQ.

## Development

```bash
pnpm dev
```

## Analytics

The system automatically tracks anonymous clicks:
- **No IP addresses** stored
- **No cookies** used
- **No personal data** collected
- **Only visible in Sanity** (no external tools)

Analytics are automatically displayed in the redirect schema:
- Click count
- Last click timestamp

### Setup

For analytics, you need a Sanity write token:

1. Go to https://sanity.io/manage
2. Select your project → API → Tokens
3. Create a new token with **Editor** permissions
4. Add it to `.env`: `SANITY_API_WRITE_TOKEN=your-token`

**Without a token, redirects still work, but analytics won't be tracked.**

## Build

```bash
pnpm build
pnpm start
```
