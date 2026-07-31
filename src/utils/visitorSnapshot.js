export const getVisitorSnapshotUpdatedAt = (payload = {}, visitorSnapshot = {}) => (
  visitorSnapshot.updatedAt || payload.updatedAt || payload.generatedAt || null
);

export const shouldApplyVisitorSnapshot = (nextSnapshot, currentSnapshot) => {
  if (!nextSnapshot) return false;

  const nextViews = Number(nextSnapshot.pageviews) || 0;
  const currentViews = Number(currentSnapshot?.pageviews) || 0;
  if (nextViews !== currentViews) return nextViews > currentViews;

  const nextTime = Date.parse(nextSnapshot.updatedAt || '') || 0;
  const currentTime = Date.parse(currentSnapshot?.updatedAt || '') || 0;
  return !currentTime || !nextTime || nextTime >= currentTime;
};
