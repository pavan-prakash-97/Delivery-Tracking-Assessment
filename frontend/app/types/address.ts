export type Address = {
  lat: number;
  lon: number;
  displayName?: string;
  city?: string;
  state?: string;
  country?: string;
  area?: string;
};

export type AddressSuggestion = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};