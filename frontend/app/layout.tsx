import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Delivery Tracker",
  description: "Live Delivery Tracking PWA",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
