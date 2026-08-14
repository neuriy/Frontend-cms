'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Hexagon } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white flex flex-col">

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-2xl w-full text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-red-100 animate-pulse">
            Error 404 / Page Not Found
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            LOST IN <br/>
            <span className="text-gray-300">SPACE.</span>
          </h1>
          
          <p className="text-xl text-gray-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
            The coordinates you requested do not exist in our spatial database. Let's get you back to familiar grounds.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => router.back()}
              className="w-full md:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-black font-bold text-[13px] uppercase tracking-widest transition flex items-center justify-center"
            >
              Go Back
            </button>
            <Link 
              href="/"
              className="w-full md:w-auto px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold text-[13px] uppercase tracking-widest transition flex items-center justify-center shadow-2xl"
            >
              Return Home
            </Link>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute bottom-[-10%] left-[-5%] text-[20vw] font-black text-gray-100 select-none pointer-events-none transform -rotate-12">
          404
        </div>
      </main>
    </div>
  );
}
