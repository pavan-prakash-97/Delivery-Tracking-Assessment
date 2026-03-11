import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import geocodeRoute from "./routes/geocode.route"
import { setupSocket } from "./sockets/socket"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/geocode", geocodeRoute)

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

setupSocket(io)

const PORT = 5000

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`)
})

