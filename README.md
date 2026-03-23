# 🚚 Delivery Tracking Assessment

A real-time delivery tracking Progressive Web App (PWA) that simulates a delivery agent moving toward a destination using the shortest road route. The application displays live tracking on an interactive map with a moving bike marker, route updates, and delivery completion notification.

## 📂 GitHub Repository

🔗 Source Code:  
https://github.com/pavan-prakash-97/Delivery-Tracking-Assessment

---

# 📌 Features

- Real-time delivery tracking using **Socket.IO**
- Interactive map powered by **Leaflet + OpenStreetMap**
- Agent follows the **shortest road route**
- **Rotating bike icon** based on direction
- **Dynamic route update** (blue line shrinks as agent moves)
- **Random starting location near Pune**
- **Destination marker**
- **Delivery completion modal with animation**
- **Restart delivery simulation**
- **Progressive Web App (PWA) support**
- Installable as a mobile app
- Responsive design

---

# 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- React Leaflet
- TypeScript
- Framer Motion (animations)

### Backend
- Node.js
- Express
- Socket.IO

### Map & Routing
- OpenStreetMap
- OSRM Routing API

---

# 🗺 How It Works

1. Backend generates a **random starting location near Pune**.
2. Backend fetches the **shortest driving route** using the OSRM API.
3. The backend simulates agent movement along the route.
4. Coordinates are streamed to the frontend using **Socket.IO**.
5. The frontend:
   - Moves the bike marker
   - Rotates it based on road direction
   - Updates the route dynamically
6. When the agent reaches the destination:
   - A **delivery success modal** appears.

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/pavan-prakash-97/Delivery-Tracking-Assessment.git
