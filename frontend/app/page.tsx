"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddressInput from "./components/AddressInput";
import AddressFields from "./components/AddressFields";
import { Address } from "./types/address";
import InstallPWAButton from "./components/InstallPWAButton";
import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./components/MapClient"), {
  ssr: false,
});

export default function Home() {
  const [location, setLocation] = useState<Address | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const detectLocation = () => {
      if (!navigator.geolocation) {
        setPermissionDenied(true);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        () => {
          setPermissionDenied(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    };

    detectLocation();
  }, []);

  return (
    <div
      style={{ padding: 40, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 20,
        }}
      >
        {permissionDenied && <AddressInput onLocation={setLocation} />}

        <AddressFields address={location ?? undefined} />

        {/* Navigation Button */}
        <Link
          href="/tracking"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            background: "#2563eb",
            color: "white",
            borderRadius: "8px",
            fontWeight: 500,
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          🚚 Go to Live Tracking
        </Link>
      </div>

      <InstallPWAButton />

      <MapClient
        lat={location?.lat}
        lon={location?.lon}
        onPinUpdate={(lat, lon) => setLocation({ lat, lon })}
      />
    </div>
  );
}
