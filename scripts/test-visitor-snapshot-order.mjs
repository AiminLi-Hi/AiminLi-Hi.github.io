import assert from 'node:assert/strict';
import {
  getVisitorSnapshotUpdatedAt,
  shouldApplyVisitorSnapshot,
} from '../src/utils/visitorSnapshot.js';

assert.equal(
  getVisitorSnapshotUpdatedAt(
    { generatedAt: '2026-08-01T00:00:00.000Z' },
    { updatedAt: '2026-07-31T23:59:00.000Z' }
  ),
  '2026-07-31T23:59:00.000Z'
);

assert.equal(shouldApplyVisitorSnapshot(
  { pageviews: 443, updatedAt: '2026-07-31T17:40:59.629Z' },
  { pageviews: 436, updatedAt: '2026-08-01T00:00:00.000Z' }
), true);

assert.equal(shouldApplyVisitorSnapshot(
  { pageviews: 435, updatedAt: '2026-08-01T00:01:00.000Z' },
  { pageviews: 436, updatedAt: '2026-07-31T17:40:59.629Z' }
), false);

assert.equal(shouldApplyVisitorSnapshot(
  { pageviews: 443, updatedAt: '2026-07-31T17:41:59.629Z' },
  { pageviews: 443, updatedAt: '2026-07-31T17:40:59.629Z' }
), true);

console.log('Visitor snapshot ordering test passed: counts win and stale snapshots cannot roll totals back.');
