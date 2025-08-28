// utils/findRegion.js
export function findRegionData (regions, name) {
  for (const region of regions) {
    if (region.name === name) {
      return region;
    }
    if (region.children) {
      const found = findRegionData(region.children, name);
      if (found) return found;
    }
  }
  return null;
}
