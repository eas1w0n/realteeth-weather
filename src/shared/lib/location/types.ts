export interface RawDistrict {
  sido: string;
  sigungu?: string;
  dong?: string;
}

export interface DistrictWithCoords extends RawDistrict {
  lat: number;
  lon: number;
  fullName: string;
}
