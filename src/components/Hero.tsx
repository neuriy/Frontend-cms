'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search } from 'lucide-react';
import Face from './Face';
import SearchPopup from './SearchPopup';

export default function Hero() {
  const [time, setTime] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }) + ' ' + now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[850px] overflow-hidden bg-white">
      {/* Search Popup Overlay */}
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-100"
        style={{ backgroundImage: 'url("/img/hero-bg.png")' }}
      />
      
      {/* 50% White Overlay on the left with a subtle gradient blend */}
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-white z-10 shadow-[20px_0_50px_rgba(255,255,255,0.8)]" />

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col md:flex-row">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start px-8 md:px-20 lg:px-32 text-center md:text-left mt-10 md:mt-0">
          <div className="max-w-xl space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full tracking-widest uppercase">
                AGI Evolution
              </span>
              <h1 className="text-6xl md:text-[100px] font-medium tracking-tighter text-black leading-[0.9]">
                AI App <br /><span className="text-gray-400">for AGI</span>
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-black/50 font-normal leading-relaxed max-w-md">
              The next generation of <br />intelligent creation.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 bg-black text-white rounded-2xl text-xl font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-2xl cursor-pointer active:scale-95">
                Explore AGI
              </button>
              <button className="text-black font-bold hover:opacity-70 transition cursor-pointer underline decoration-2 underline-offset-8">
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Right Side (Transparent area showing the background) */}
        <div className="w-full md:w-1/2 h-full relative">
          {/* MacOS Status Bar (Top Right) */}
          <div className="absolute top-6 right-10 z-30 flex items-center space-x-5 text-black/80 drop-shadow-sm font-medium text-xs md:text-sm">
             <div className="flex items-center space-x-4">
                <img src="/img/N.svg" alt="N" className="h-4 w-4 opacity-80" />
                <span className="flex items-center"><Wifi size={18} /></span>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center hover:opacity-50 transition cursor-pointer p-1"
                >
                  <Search size={18} />
                </button>
                <span className="flex items-center rotate-90"><Battery size={20} /></span>
             </div>
             <span className="tracking-tight font-bold">{time || 'Mon Jun 9 9:41 AM'}</span>
          </div>

          {/* Floating Widget Card (Enhanced Glassmorphism) */}
          <div className="absolute top-16 right-10 md:top-24 md:right-24 z-30 w-56 h-32 md:w-72 md:h-44 bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[50px] flex items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-1000 delay-500 hover:scale-105 transition-transform cursor-pointer group animate-float">
            <div className="group-hover:scale-110 transition-transform">
              <Face />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
