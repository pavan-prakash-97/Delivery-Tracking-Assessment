import { io } from "socket.io-client"

const host =
  typeof window !== "undefined" ? window.location.hostname : "localhost"

const socketUrl =
  host === "localhost" || host === "127.0.0.1"
    ? "http://localhost:5000"
    : `http://${host}:5000`

export const socket = io(socketUrl)