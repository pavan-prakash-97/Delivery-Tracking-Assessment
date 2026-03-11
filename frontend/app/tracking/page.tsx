"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import dynamic from "next/dynamic";
import DeliveryModal from "../components/DeliveryModal";
import Link from "next/link";

const TrackingMap = dynamic(() => import("../components/TrackingMap"), {
  ssr: false,
});

type Location = {
  lat: number;
  lon: number;
  route: [number, number][];
};

export default function TrackingPage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    const socket: Socket = io("openobserve.techstark.in");

    socket.on("agentLocation", (data: Location) => {
      setLocation(data);

      if (data.route.length <= 1) {
        setDelivered(true);
      }
    });

    return () => {
      socket.disconnect(); // cleanup
    };
  }, []);

  const restartDelivery = () => {
    setDelivered(false);
    window.location.reload();
  };

  if (!location) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100lvh",
      width: "100%",
      gap: 20,
      fontFamily: "sans-serif",
    }}>
      {/* Spinning truck animation */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        {/* Outer ring */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "3px solid #e2e8f0",
          borderTopColor: "#2563eb",
          animation: "spin 1s linear infinite",
        }} />
        {/* Inner emoji */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          animation: "pulse 1.5s ease-in-out infinite",
        }}>
          🚚
        </div>
      </div>

      {/* Animated dots text */}
      <div style={{ color: "#F4F4F4", fontSize: 16, fontWeight: 500 }}>
        Connecting to delivery agent
        <span style={{ animation: "dots 1.5s steps(3, end) infinite" }} />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes dots {
          0%   { content: ''; }
          33%  { content: '.'; }
          66%  { content: '..'; }
          100% { content: '...'; }
        }
      `}</style>
    </div>
  );
}

  return (
    <div
      style={{ padding: 40, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div
        style={{
          display: "flex",
          flexWrap:'wrap',
          flexDirection: "row",
          alignItems: "center",
          justifyContent:'space-between',
          width: "100%",
          gap: 20,
        }}
      >
        <h2>🚚 Live Delivery Agent Tracking</h2>

      </div>

      <TrackingMap
        lat={location.lat}
        lon={location.lon}
        route={location.route}
      />


        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            background: "#374151",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: 500,
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          ❮ &nbsp; Back to Address Page
        </Link>

      {delivered && <DeliveryModal onRestart={restartDelivery} />}
    </div>
  );
}