import { io } from "socket.io-client";

// Define backend URL
const SOCKET_URL = "https://blood-bank-urer.onrender.com"; // Ensure this matches your backend PORT

const socket = io(SOCKET_URL, {
  autoConnect: false, // Connect manually when a user is authenticated
  withCredentials: true,
});

export default socket;
