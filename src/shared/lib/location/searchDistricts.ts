import type { NormalizedDistrict } from './normalizeDistricts';

export function searchDistricts(districts: NormalizedDistrict[], keyword: string) {
  const trimmed = keyword.trim();
  if (!trimmed) return [];

  return districts.filter(d => d.sido.includes(trimmed) || d.sigungu?.includes(trimmed) || d.dong?.includes(trimmed));
}
