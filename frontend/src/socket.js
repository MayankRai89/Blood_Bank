import { io } from "socket.io-client";

// Define backend URL (empty string uses relative origin, proxied by Vite)
const SOCKET_URL = "";

const socket = io(SOCKET_URL, {
  autoConnect: false, // Connect manually when a user is authenticated
  withCredentials: true,
});

export default socket;
