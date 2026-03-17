import { Address } from "../types/address";

export const geocodeAddress = async (query: string): Promise<Address> => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=1`,
  );

  const data = await res.json();

  const item = data[0];

  return {
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),

    displayName: item.display_name,

    // ✅ extract properly
    city: item.address.city || item.address.town || item.address.village,

    state: item.address.state,
    country: item.address.country,

    area:
      item.address.suburb || item.address.neighbourhood || item.address.county,
  };
};

export const reverseGeocode = async (
  lat: number,
  lon: number,
): Promise<Address> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
    );

    const data = await res.json();

    const addr = data.address || {};

    return {
      lat,
      lon,
      displayName: data.display_name,

      // ✅ handle different cases safely
      city: addr.city || addr.town || addr.village || addr.hamlet || "",

      state: addr.state || "",
      country: addr.country || "",

      area:
        addr.suburb ||
        addr.neighbourhood ||
        addr.county ||
        addr.city_district ||
        "",
    };
  } catch (error) {
    console.error("Reverse geocode error:", error);

    // fallback (important)
    return {
      lat,
      lon,
      displayName: "",
      city: "",
      state: "",
      country: "",
      area: "",
    };
  }
};

export async function autocompleteAddress(query: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=in&limit=5`
  );

  return res.json();
}
