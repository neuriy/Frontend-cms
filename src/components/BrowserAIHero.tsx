'use client';

import React, { useState } from 'react';
import { Search, Globe, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function BrowserAIHero() {
  const [prompt, setPrompt] = useState('Create a minimalist portfolio for a creative designer...');

  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full tracking-widest uppercase">
              Web Intelligence
            </span>
            <h2 className="text-6xl md:text-[90px] font-medium tracking-tighter text-black leading-[0.9]">
              Browser <span className="text-gray-300">AI</span>
            </h2>
          </div>
          <p className="text-2xl md:text-3xl text-black/50 font-normal leading-relaxed max-w-md">
            Generate fully functional websites from a single prompt.
          </p>
          <div className="pt-4">
             <button className="px-12 py-5 bg-black text-white rounded-2xl text-xl font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-2xl cursor-pointer active:scale-95">
                Start Building
             </button>
          </div>
        </div>

        {/* Right Side: Browser Mockup */}
        <div className="relative group animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
          <div className="w-full bg-white rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            {/* Browser Toolbar */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center space-x-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <div className="flex items-center space-x-4 text-gray-400">
                <ChevronLeft size={18} />
                <ChevronRight size={18} />
                <RotateCcw size={18} />
              </div>
              <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center space-x-3 text-sm text-gray-500 shadow-sm">
                <Globe size={14} className="text-blue-500" />
                <span className="flex-1 truncate text-xs">neuriy.ai/builder/new-project</span>
              </div>
            </div>

            {/* Generated Website Preview */}
            <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden p-8">
               <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                  <div className="h-4 w-24 bg-gray-100 rounded-full" />
                  <div className="space-y-3 pt-10">
                    <div className="h-10 w-3/4 bg-gray-900 rounded-lg" />
                    <div className="h-10 w-1/2 bg-gray-900 rounded-lg" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="h-3 w-full bg-gray-100 rounded-full" />
                    <div className="h-3 w-5/6 bg-gray-100 rounded-full" />
                    <div className="h-3 w-4/6 bg-gray-100 rounded-full" />
                  </div>
                  <div className="pt-6">
                    <div className="h-12 w-40 bg-blue-600 rounded-xl shadow-lg shadow-blue-200" />
                  </div>
               </div>

               {/* Prompt Input Overlay */}
               <div className="absolute bottom-10 inset-x-10">
                  <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center space-x-4 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
                     <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
                        <Search size={20} />
                     </div>
                     <div className="flex-1 text-white/90 text-sm font-medium">
                        {prompt}
                     </div>
                     <div className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                        Running
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10" />
        </div>

      </div>
    </section>
  );
}
