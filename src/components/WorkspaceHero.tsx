'use client';

import React from 'react';
import { Globe, ChevronLeft, ChevronRight, RotateCcw, Search } from 'lucide-react';

export default function WorkspaceHero() {
  return (
    <section className="relative w-full h-[700px] md:h-[900px] overflow-hidden bg-white">
      {/* Full Background Image (Subtle) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-40 grayscale"
        style={{ backgroundImage: 'url("/img/hero-bg.png")' }}
      />
      
      {/* 50% White Overlay on the RIGHT side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-white z-10 shadow-[-20px_0_50px_rgba(255,255,255,0.8)]" />

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col md:flex-row-reverse">
        {/* Right Side Content */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start px-8 md:px-20 lg:px-32 text-center md:text-left">
          <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full tracking-widest uppercase">
                Web Intelligence
              </span>
              <h2 className="text-5xl md:text-[80px] font-medium tracking-tighter text-black leading-[0.95]">
                Browser <br /><span className="text-gray-400">AI</span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-black/50 font-normal leading-relaxed">
              Generate fully functional websites <br />from a single prompt.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-black text-white rounded-2xl text-lg font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-2xl cursor-pointer active:scale-95">
                Open Workspace
              </button>
            </div>
          </div>
        </div>

        {/* Left Side: Browser Mockup */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 md:p-12 lg:p-20">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-left-12 duration-1000">
            {/* Browser Toolbar */}
            <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex items-center space-x-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-[#ff5f57] rounded-full" />
                <div className="w-3 h-3 bg-[#febc2e] rounded-full" />
                <div className="w-3 h-3 bg-[#28c840] rounded-full" />
              </div>
              <div className="flex items-center space-x-4 text-gray-400">
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
                <RotateCcw size={16} />
              </div>
              <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-1.5 flex items-center space-x-3 text-sm text-gray-500 shadow-sm">
                <Globe size={14} className="text-blue-500" />
                <span className="flex-1 truncate text-xs font-medium">neuriy.ai/builder</span>
              </div>
            </div>

            {/* App Icon Generator Workspace Content */}
            <div className="aspect-[4/3] bg-[#f8fafc] p-6 relative overflow-hidden">
               <div className="grid grid-cols-2 gap-6 h-full">
                  {/* Sidebar/Tools */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
                    <div className="h-4 w-20 bg-gray-100 rounded-full mb-6" />
                    <div className="space-y-3">
                      <div className="h-8 w-full bg-black rounded-lg" />
                      <div className="h-8 w-full bg-gray-50 rounded-lg border border-gray-100" />
                      <div className="h-8 w-full bg-gray-50 rounded-lg border border-gray-100" />
                    </div>
                  </div>
                  {/* Canvas Area */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                     {/* The Icon Preview */}
                     <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-[24%] shadow-2xl flex items-center justify-center transform rotate-3 transition-transform group-hover:rotate-0 duration-700">
                        <div className="w-12 h-12 bg-white/20 rounded-full blur-xl" />
                        <div className="absolute inset-0 bg-white/10" />
                     </div>
                  </div>
               </div>
               
               {/* AI Prompt Input Bar (Bottom) */}
               <div className="absolute bottom-6 inset-x-6">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-gray-100 flex items-center space-x-3">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Search size={16} />
                     </div>
                     <span className="text-xs text-gray-400 font-medium italic">"A minimal 3D rocket icon with blue gradient..."</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
