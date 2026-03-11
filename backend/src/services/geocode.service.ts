import axios from "axios"

export const geocodeAddress = async (address: string) => {

  const res = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1,
        countrycodes: "in"
      },
      headers: {
        "User-Agent": "delivery-tracker-app"
      }
    }
  )

  if (!res.data || res.data.length === 0) {
    throw new Error("Address not found")
  }

  return {
    lat: parseFloat(res.data[0].lat),
    lon: parseFloat(res.data[0].lon)
  }
}