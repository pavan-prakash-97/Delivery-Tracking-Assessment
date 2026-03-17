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

  useEffect(() => {
    const detectLocation = () => {
      if (!navigator.geolocation) {

        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {

          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });

        },
        (error) => {
          alert("LOCATION SEEMS TO BE DISABLED, PLEASE ENABLE IT IN SETTINGS AND REFRESH AGAIN");
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
        <AddressInput onLocation={setLocation} />

        {/* Navigation Button */}
        <Link
          href="/tracking"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px 18px",
            background: "#2563eb",
            color: "white",
            borderRadius: "8px",
            fontWeight: 500,
            textDecoration: "none",
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          🚚 Go to Live Tracking
        </Link>
      </div>

      <AddressFields address={location ?? undefined} />

      <MapClient
        lat={location?.lat}
        lon={location?.lon}
        onPinUpdate={(address) => setLocation(address)}
      />
      <InstallPWAButton />
    </div>
  );
}
