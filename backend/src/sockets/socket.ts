import { Server } from "socket.io";
import axios from "axios";

const DESTINATION = {
  lat: 18.5286,
  lon: 73.8742,
};

function randomStartNearPune() {
  const lat = 18.52 + (Math.random() - 0.5) * 0.05;
  const lon = 73.85 + (Math.random() - 0.5) * 0.05;

  return { lat, lon };
}

export const setupSocket = (io: Server) => {
  io.on("connection", async (socket) => {
    console.log("Client connected:", socket.id);

    const start = randomStartNearPune();

    console.log("Start:", start);

    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${DESTINATION.lon},${DESTINATION.lat}?overview=full&geometries=geojson`;

    const response = await axios.get(routeUrl);

    const coordinates =
      response.data.routes[0].geometry.coordinates.map((c: number[]) => [
        c[1],
        c[0],
      ]);

    let index = 0;

    const interval = setInterval(() => {
      if (index >= coordinates.length) {
        clearInterval(interval);
        console.log("Reached destination");
        return;
      }

      const [lat, lon] = coordinates[index];

      const remainingRoute = coordinates.slice(index);

      socket.emit("agentLocation", {
        lat,
        lon,
        route: remainingRoute,
      });

      index++;
    }, 1000);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      clearInterval(interval);
    });
  });
};
