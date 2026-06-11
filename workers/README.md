# Realtime Visitor Counter

The production realtime API is deployed as a Cloudflare Pages Function at:

```text
https://aimin-homepage-visitors-api.pages.dev
```

It provides realtime country-level aggregate visitor counts for the homepage.

It exposes:

- `GET /hit`: records one pageview and returns the latest snapshot.
- `GET /stats`: returns the latest snapshot without incrementing.
- `GET /health`: health check.

The homepage uses the realtime API only when `VITE_VISITOR_STATS_ENDPOINT` is set. Without that env var, the site keeps using the GitHub Action generated static snapshot.

## Deploy Pages API

The active API lives in `workers/pages-api` and stores counters in Cloudflare KV. From `workers/pages-api`:

```bash
npx wrangler pages deploy . --project-name aimin-homepage-visitors-api --branch main --commit-dirty true
```

Then set the homepage build environment variable:

```bash
VITE_VISITOR_STATS_ENDPOINT=https://aimin-homepage-visitors-api.pages.dev
```

The API stores only aggregate country counts and total pageviews. It does not store IP addresses, user agents, or individual visitor identities.

## Durable Object Alternative

The `visitor-stats-worker.js` Worker stores the same aggregate shape in a Durable Object:

```bash
npx wrangler deploy
```

It is a fallback implementation. Prefer the Pages API when local networks resolve `workers.dev` incorrectly.

```bash
VITE_VISITOR_STATS_ENDPOINT=https://aimin-homepage-visitors.<your-subdomain>.workers.dev
```
