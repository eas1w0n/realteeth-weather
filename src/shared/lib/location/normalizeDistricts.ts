import raw from '@/shared/data/korea_districts.json';
import type { RawDistrict } from './types';

export interface NormalizedDistrict extends RawDistrict {
  fullName: string;
}

export function normalizeDistricts(): NormalizedDistrict[] {
  return (raw as string[]).map(value => {
    const [sido, sigungu, dong] = value.split('-');

    return {
      sido,
      sigungu,
      dong,
      fullName: [sido, sigungu, dong].filter(Boolean).join(' '),
    };
  });
}
