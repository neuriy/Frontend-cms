'use client';

import { initNeuriyAuth, NeuriyAuthProvider } from "@neuriy/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB-wfqzVbPcT5Bf1JvJNGKA3j8K6BPyMhw",
  authDomain: "neuriyart-com.firebaseapp.com",
  projectId: "neuriyart-com",
  storageBucket: "neuriyart-com.firebasestorage.app",
  messagingSenderId: "762094443577",
  appId: "1:762094443577:web:b1c16194dfe8280a3c41e8",
  measurementId: "G-XY6K6HC5PG"
};

// Initialize the Neuriy Auth SDK
// We do this outside the component so it runs once when the module is imported on the client.
let initialized = false;
if (typeof window !== "undefined" && !initialized) {
  initNeuriyAuth(firebaseConfig);
  initialized = true;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // We can just render the original provider now that it's initialized
  // on the client side.
  return <NeuriyAuthProvider>{children}</NeuriyAuthProvider>;
}
