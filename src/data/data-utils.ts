import * as d3 from "d3";
import type { Dataset } from "./mock-data";

export function getYearSlice(dataset: Dataset, year: number) {
  const byCode = new Map<string, number>();
  for (const d of dataset.data) {
    if (d.year === year) byCode.set(d.countryCode, d.value);
  }
  const values = Array.from(byCode.values());
  const min = d3.min(values) ?? 0;
  const max = d3.max(values) ?? 1;
  return { byCode, min, max };
}

export function quantizeBucket(value: number, min: number, max: number) {
  if (!isFinite(value)) return 0;
  if (max <= min) return 1;
  const scale = d3.scaleQuantize<number>().domain([min, max]).range([1, 2, 3, 4]);
  return scale(value);
}

export function bucketClass(bucket: number) {
  return `country-data-${bucket}`;
}
