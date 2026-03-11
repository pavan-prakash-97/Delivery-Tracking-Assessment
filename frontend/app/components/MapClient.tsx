"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

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

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

type MapClientProps = {
  lat?: number;
  lon?: number;
  onPinUpdate?: (lat: number, lon: number) => void;
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

      {onPinUpdate && <ClickHandler onMapClick={onPinUpdate} />}

      <Marker position={[centerLat, centerLon]} icon={pinIcon}>
        <Popup>{lat && lon ? "Selected Location" : "Pune, Maharashtra"}</Popup>
      </Marker>
    </MapContainer>
  );
}
