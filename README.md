# WealthPipeline: High-Performance Financial Aggregator

## Executive Summary

WealthPipeline is a Backend-for-Frontend (BFF) bridge engineered for Fintech scale. It consolidates heterogeneous financial provider payloads into a single, normalized API surface so frontend clients can move fast without carrying integration complexity. The system prioritizes reliability under partial failures, deterministic data contracts, and low-latency aggregation across sources.

## Key Architectural Features

- **Parallel Data Orchestration**: Provider adapters execute concurrently via `Promise.all`, minimizing end-to-end latency for aggregate responses.
- **Runtime Validation with Zod**: All normalized assets are parsed against strict Zod schemas to enforce contract integrity at runtime.
- **Clean Architecture**: Domain schema definitions, provider integrations, service-level orchestration, and API routing are separated by responsibility for maintainability and testability.

## Tech Stack

- **Node.js** for runtime performance and ecosystem maturity
- **TypeScript** for static typing and safer refactoring
- **Zod** for runtime schema validation and type inference
- **Express** for lightweight, composable HTTP APIs
- **Helmet** for baseline security headers

## Folder Structure

```text
/src
  /api
    asset.controller.ts
    index.ts
  /core
    /entities
      index.ts
    /schemas
      asset.schema.ts
  /providers
    index.ts
    mockProviders.ts
  /services
    aggregation.service.ts
  app.ts
```

## Endpoints

### `GET /api/assets`

Returns normalized financial assets aggregated from bank, crypto, and stock providers.

**Response**

```json
{
  "assets": [
    {
      "id": "3f7fd59a-66d7-4f80-a130-2d040553b93a",
      "name": "Emergency Savings",
      "symbol": "USD",
      "balance": 5400.75,
      "valueInBaseCurrency": 5400.75,
      "type": "fiat",
      "lastUpdated": "2026-04-14T08:15:00.000Z"
    }
  ]
}
```

### `GET /api/summary`

Returns portfolio-level totals derived from normalized assets.

**Response**

```json
{
  "totalWealth": 50827.99,
  "assetCount": 8
}
```

## How to Run

```bash
npm install
npm run dev
```

Production build and run:

```bash
npm run build
npm start
```

## Engineering Notes

- Aggregation is resilient to single-provider failures via guarded fetch wrappers.
- Invalid payloads are isolated and skipped during normalization instead of crashing request flow.
- Middleware stack includes `helmet` and `cors` for secure, frontend-compatible integration boundaries.
