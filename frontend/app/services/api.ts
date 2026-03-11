import { Address } from "../types/address";

export async function geocodeAddress(query: string): Promise<Address> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=in&limit=1`
  );

  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("Address not found");
  }

  const place = data[0];

  return {
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon),
    displayName: place.display_name,
  };
}

export async function autocompleteAddress(query: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=in&limit=5`
  );

  return res.json();
}
