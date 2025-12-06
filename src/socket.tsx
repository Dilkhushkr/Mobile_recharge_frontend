import {io} from "socket.io-client";

const SOCKET_URL = "https://mobile-recharge-backend-11.onrender.com"; 

export const socket = io(SOCKET_URL, {
    transports: ["websocket"],
})

