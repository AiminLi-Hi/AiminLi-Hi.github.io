# Realtime Visitor Counter

This Worker provides realtime country-level aggregate visitor counts for the homepage.

It exposes:

- `GET /hit`: records one pageview and returns the latest snapshot.
- `GET /stats`: returns the latest snapshot without incrementing.
- `GET /health`: health check.

The homepage uses this Worker only when `VITE_VISITOR_STATS_ENDPOINT` is set. Without that env var, the site keeps using the GitHub Action generated static snapshot.

## Deploy

From this directory:

```bash
npx wrangler deploy
```

Then set the Pages build environment variable:

```bash
VITE_VISITOR_STATS_ENDPOINT=https://aimin-homepage-visitors.<your-subdomain>.workers.dev
```

The Worker stores only aggregate country counts and total pageviews in a Durable Object. It does not store IP addresses, user agents, or individual visitor identities.
