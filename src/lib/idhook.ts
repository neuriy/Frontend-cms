'use client';

import { redirectToNeuriyLogin } from "@neuriy/auth";
import { idhookBaseUrl } from "./firebase-config";

/**
 * Start Neuriy nID login.
 *
 * - If NEXT_PUBLIC_USE_HOSTED_IDHOOK=true, redirect to the IDHook web app
 *   (https://github.com/neuriy/IDHook) with a return URL.
 * - Otherwise open the in-app /auth/login page (same @neuriy/auth SDK kit).
 */
export function startNeuriyLogin(returnTo?: string) {
  const useHosted = process.env.NEXT_PUBLIC_USE_HOSTED_IDHOOK === "true";
  const returnUrl =
    returnTo ??
    (typeof window !== "undefined" ? window.location.href : "/");

  if (useHosted && idhookBaseUrl) {
    redirectToNeuriyLogin(idhookBaseUrl);
    return;
  }

  const loginPath = `/auth/login?return=${encodeURIComponent(returnUrl)}`;
  if (typeof window !== "undefined") {
    window.location.href = loginPath;
  }
}
