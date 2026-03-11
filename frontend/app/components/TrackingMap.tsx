"use client";
import {
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";

type Props = {
  lat: number;
  lon: number;
  route: [number, number][];
};

type RotatedMarkerOptions = L.MarkerOptions & {
  rotationAngle?: number;
  rotationOrigin?: string;
};

const bikeIcon = new L.Icon({
  iconUrl: "/bike.png",
  iconSize: [20, 40],
  iconAnchor: [15, 35],
});

const destinationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [20, 35],
});

function getClosestPointOnRoute(
  lat: number,
  lon: number,
  route: [number, number][]
): { point: [number, number]; index: number } {
  let closestIndex = 0;
  let minDist = Infinity;

  for (let i = 0; i < route.length; i++) {
    const d = Math.hypot(route[i][0] - lat, route[i][1] - lon);
    if (d < minDist) {
      minDist = d;
      closestIndex = i;
    }
  }

  return { point: route[closestIndex], index: closestIndex };
}

function getAngle(index: number, route: [number, number][]) {
  if (route.length < 2) return 0;
  const from = route[index];
  const to = route[Math.min(index + 1, route.length - 1)];
  const latDiff = to[0] - from[0];
  const lonDiff = to[1] - from[1];
  return (Math.atan2(lonDiff, latDiff) * 180) / Math.PI;
}

function BikeMarker({
  lat,
  lon,
  route,
}: {
  lat: number;
  lon: number;
  route: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    const { point, index } = getClosestPointOnRoute(lat, lon, route);

    const options: RotatedMarkerOptions = {
      icon: bikeIcon,
      rotationAngle: getAngle(index, route),
      rotationOrigin: "center",
    };

    const marker = L.marker(point, options).addTo(map);

    return () => {
      map.removeLayer(marker);
    };
  }, [lat, lon, route, map]);

  return null;
}

function Recenter({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);

  return null;
}

export default function TrackingMap({ lat, lon, route }: Props) {
  const destination = route.length > 0 ? route[route.length - 1] : null;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={14}
      style={{ height: "600px", width: "100%" }}
    >
      <Recenter lat={lat} lon={lon} />
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={route} pathOptions={{ color: "blue", weight: 5 }} />
      {destination && (
        <Marker position={destination} icon={destinationIcon}>
          <Popup>📍 Delivery Destination</Popup>
        </Marker>
      )}
      <BikeMarker lat={lat} lon={lon} route={route} />
    </MapContainer>
  );
}