'use client';

import React, { useEffect, useRef } from 'react';
import { Search, Command } from 'lucide-react';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center px-6 py-5 border-b border-black/5">
          <Search className="text-black/40 mr-4" size={24} />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search for icons, styles, or tools..."
            className="flex-1 bg-transparent border-none outline-none text-xl text-black placeholder:text-black/30"
          />
          <div className="flex items-center space-x-1 px-2 py-1 bg-black/5 rounded-lg text-black/40 text-xs font-bold uppercase tracking-tighter">
            <Command size={12} />
            <span>K</span>
          </div>
        </div>
        
        {/* Results Placeholder */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <div className="px-4 py-2 text-xs font-bold text-black/40 uppercase tracking-widest">
            Recent Searches
          </div>
          <div className="mt-2 space-y-1">
             {['Minimalist App Icons', 'Neumorphic Buttons', 'Glassmorphism Backgrounds'].map((item) => (
               <div key={item} className="flex items-center px-4 py-3 rounded-xl hover:bg-black/5 cursor-pointer transition text-black/70">
                 <Search size={16} className="mr-3 opacity-40" />
                 {item}
               </div>
             ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-3 bg-black/5 flex justify-end space-x-6 text-[10px] font-bold text-black/40 uppercase tracking-widest">
           <div className="flex items-center"><span className="mr-2">↑↓</span> Navigate</div>
           <div className="flex items-center"><span className="mr-2">Enter</span> Select</div>
           <div className="flex items-center"><span className="mr-2">Esc</span> Close</div>
        </div>
      </div>
    </div>
  );
}
