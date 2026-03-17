"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

import { Address } from "../types/address";
import { reverseGeocode } from "../services/api";

const PUNE = { lat: 18.5204, lon: 73.8567 };

const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 13);
  }, [lat, lon, map]);

  return null;
}

/**
 * ✅ Updated ClickHandler (reverse geocode added)
 */
function ClickHandler({
  onMapClick,
}: {
  onMapClick: (address: Address) => void;
}) {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      try {
        const fullAddress = await reverseGeocode(lat, lon);

        onMapClick(fullAddress); // ✅ send full structured address
      } catch (err) {
        console.error("Reverse geocode failed", err);

        // fallback (at least lat/lon works)
        onMapClick({ lat, lon });
      }
    },
  });

  return null;
}

type MapClientProps = {
  lat?: number;
  lon?: number;
  onPinUpdate?: (address: Address) => void; // ✅ updated type
};

export default function MapClient({ lat, lon, onPinUpdate }: MapClientProps) {
  const centerLat = lat ?? PUNE.lat;
  const centerLon = lon ?? PUNE.lon;

  return (
    <MapContainer
      center={[centerLat, centerLon]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RecenterMap lat={centerLat} lon={centerLon} />

      {/* ✅ updated handler */}
      {onPinUpdate && <ClickHandler onMapClick={onPinUpdate} />}

      <Marker position={[centerLat, centerLon]} icon={pinIcon}>
        <Popup>{lat && lon ? "Selected Location" : "Pune, Maharashtra"}</Popup>
      </Marker>
    </MapContainer>
  );
}
