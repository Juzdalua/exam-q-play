"use client";

import { useEffect } from "react";

const Streaming = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to server");
      socket.send("Hello, server!"); // Send Message
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);
  return <div className="border-2 border-red-500 min-h-80"></div>;
};

export default Streaming;
