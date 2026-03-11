export type Address = {
  lat: number;
  lon: number;
  displayName?: string;
  road?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

export type AddressSuggestion = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};