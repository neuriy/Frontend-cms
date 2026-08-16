'use client';

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useNeuriyAuth,
  signInWithEmail,
  signInWithGoogle,
  signInWithYahoo,
} from "@neuriy/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useNeuriyAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const returnTo = searchParams.get("return") || "/";

  const resolveReturnPath = () => {
    if (!returnTo) return "/";
    try {
      if (returnTo.startsWith("http")) {
        const url = new URL(returnTo);
        if (url.origin === window.location.origin) {
          return `${url.pathname}${url.search}${url.hash}` || "/";
        }
        return returnTo;
      }
      return returnTo.startsWith("/") ? returnTo : "/";
    } catch {
      return "/";
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      const target = resolveReturnPath();
      if (target.startsWith("http")) {
        window.location.href = target;
      } else {
        router.replace(target);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to auth readiness
  }, [authLoading, user, returnTo, router]);

  const finish = () => {
    const target = resolveReturnPath();
    if (target.startsWith("http")) {
      window.location.href = target;
    } else {
      router.replace(target);
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmail(email, password);
      // Let NeuriyAuthProvider observe the session before navigating.
      await new Promise((r) => setTimeout(r, 150));
      finish();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      finish();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign in failed");
      setIsLoading(false);
    }
  };

  const handleYahoo = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithYahoo();
      finish();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Yahoo sign in failed");
      setIsLoading(false);
    }
  };

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen font-sans text-white items-center justify-center p-4 bg-black overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/img/e9mrpbe9mrpbe9mr.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 pointer-events-none z-0" />

      <div className="w-full max-w-sm flex flex-col items-center relative z-10 p-8">
        <Link href="/" className="mb-6 opacity-90 hover:opacity-100 transition">
          <img src="/img/neuriy_white.svg" alt="Neuriy" className="h-8" />
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome back</h1>
        <p className="text-sm text-white/60 mb-8 text-center">
          Sign in with Neuriy nID (@neuriy/auth SDK)
        </p>

        <div className="w-full space-y-3">
          <form onSubmit={handleContinue} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              disabled={isLoading}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={isLoading}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
            />

            {error && (
              <div className="text-red-400 text-sm text-center py-1">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 px-5 mt-2 rounded-[32px] transition-all flex justify-center items-center shadow-[0_0_20px_rgba(255,255,255,0.1)] outline-none cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Continue"
              )}
            </button>
          </form>

          <div className="flex items-center space-x-2 my-6 opacity-60">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/50 text-xs font-semibold tracking-wider">OR</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full bg-transparent hover:bg-white/10 border border-white/20 text-white font-medium py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center space-x-3 backdrop-blur-md cursor-pointer"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={handleYahoo}
              disabled={isLoading}
              className="w-full bg-transparent hover:bg-[#6001D2]/10 border border-white/20 hover:border-[#6001D2]/50 text-white font-medium py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center space-x-3 backdrop-blur-md cursor-pointer"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="#6001D2" aria-hidden>
                <path d="M22.77 2.1H16.8l-4.8 8.64L7.2 2.1H1.23l8.64 14.1v5.7h5.4v-5.7L22.77 2.1z" />
              </svg>
              <span>Continue with Yahoo</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400 space-y-2 max-w-xs leading-relaxed font-medium">
          <p>
            Powered by{" "}
            <a
              href="https://github.com/neuriy/IDHook"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:underline"
            >
              IDHook / @neuriy/auth
            </a>
            . By continuing, you agree to our{" "}
            <Link href="/terms" className="text-white hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-white hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
