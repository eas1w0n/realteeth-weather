import { BASE_URL } from '../lib/constants';
import { GEO_API_PATH } from '../lib/constants';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
export interface Address {
  depth1?: string; // state
  depth2?: string; // county / city
  depth3?: string; // local name
  fullName: string;
}

export async function fetchAddressFromCoords(lat: number, lon: number): Promise<Address> {
  const res = await fetch(
    `${BASE_URL}${GEO_API_PATH}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}&lang=kr`,
  );

  if (!res.ok) {
    throw new Error('Reverse geocoding failed');
  }

  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error('No address data');
  }

  const address = data[0];
  return {
    depth1: address.state,
    depth2: address.name,
    depth3: address.local_names?.ko,
    fullName: address.state ? `${address.state} ${address.name}` : address.name,
  };
}
