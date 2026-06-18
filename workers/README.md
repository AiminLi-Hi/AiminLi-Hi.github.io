# Realtime Visitor Counter

The production realtime API is deployed as a Cloudflare Pages Function at:

```text
https://aimin-homepage-visitors-api.pages.dev
```

It provides realtime country-level aggregate visitor counts for the homepage.

It exposes:

- `GET /`: returns a friendly service status payload for accidental browser visits.
- `GET /hit.js`: records one pageview and calls the requested callback with the latest snapshot. The homepage uses this first because script tags do not depend on CORS and can refresh the map immediately.
- `GET /hit.gif`: records one pageview through a 1x1 image beacon. This is the browser fallback when the script counter is blocked.
- `GET /hit`: records one pageview and returns the latest snapshot as JSON.
- `GET /stats`: returns the latest snapshot without incrementing.
- `POST /admin/adjust`: manually adds aggregate visitor events. Requires `VISITOR_ADMIN_TOKEN`.
- `GET /health`: health check.

The homepage automatically uses this production API on `aiminli-hi.github.io`. `VITE_VISITOR_STATS_ENDPOINT` is only needed when overriding the endpoint for builds, previews, or a future API migration. Local development falls back to the static snapshot unless the endpoint is explicitly configured.

## Deploy Pages API

The active API lives in `workers/pages-api` and stores counters in Cloudflare KV. From `workers/pages-api`:

```bash
npx wrangler pages deploy . --project-name aimin-homepage-visitors-api --branch main --commit-dirty true
```

Then set the homepage build environment variable:

```bash
VITE_VISITOR_STATS_ENDPOINT=https://aimin-homepage-visitors-api.pages.dev
```

The API stores only country-level aggregate counts and optional first-level region aggregates, such as U.S. states when Cloudflare provides them, plus anonymous per-hit KV event keys used to avoid lost updates. It does not store IP addresses, user agents, city-level data, or individual visitor identities.

## Visitor data preservation during homepage deploys

Homepage deployments intentionally preserve the already-published visitor files:

- `homepage-sync-data.js` keeps its previous `visitorSnapshot`.
- `visitor-map-data.js` is copied from the existing `gh-pages` branch.

This keeps code/layout deployments from resetting or rewriting the visitor map. To intentionally publish a new generated visitor snapshot, run:

```bash
PRESERVE_VISITOR_DATA=0 npm run deploy:pages
```

Prefer updating realtime counts through the API instead of editing generated files. Example:

```bash
curl -X POST "https://aimin-homepage-visitors-api.pages.dev/admin/adjust" \
  -H "Authorization: Bearer $VISITOR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"adjustments":[{"country":"SE","regionCode":"AB","regionName":"Stockholm","count":2},{"country":"CN","regionCode":"ZJ","regionName":"Zhejiang","count":3}]}'
```

## Legacy Durable Object Alternative

The `visitor-stats-worker.js` Worker stores the same aggregate shape in a Durable Object, but it is not the active production API for the homepage. Do not run `npx wrangler deploy` from `workers/` during ordinary maintenance; use `workers/pages-api` instead.

```bash
npx wrangler deploy
```

It is only a fallback implementation. Prefer the Pages API for the live homepage.

```bash
VITE_VISITOR_STATS_ENDPOINT=https://aimin-homepage-visitors.<your-subdomain>.workers.dev
```
