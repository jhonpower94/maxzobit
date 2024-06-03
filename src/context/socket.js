import React from "react";
import { io } from "socket.io-client";

export const socket = io("https://stackcoin.socketservercnbse.com.ng", {
  autoConnect: false,
});

export const SocketContext = React.createContext();
