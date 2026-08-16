'use client';

import { initNeuriyAuth, NeuriyAuthProvider } from "@neuriy/auth";
import { firebaseConfig } from "./firebase-config";

let initialized = false;

function ensureInit() {
  if (typeof window === "undefined" || initialized) return;
  initNeuriyAuth({
    ...firebaseConfig,
    // After hosted IDHook login, return to this CMS origin.
    redirectUrl: window.location.origin,
  });
  initialized = true;
}

ensureInit();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  ensureInit();
  return <NeuriyAuthProvider>{children}</NeuriyAuthProvider>;
}
