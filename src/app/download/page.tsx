'use client';

import React, { useState } from 'react';
import { Copy, Info, Terminal, ChevronRight, Play, Check } from 'lucide-react';

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState('npm');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-blue-100 selection:text-blue-900 pt-32 pb-20">
      <div className="max-w-[900px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <h1 className="text-[40px] font-bold tracking-tight leading-tight">Neuriy Coder</h1>
          <p className="text-xl text-gray-500 font-medium">Pair with Neuriy in your terminal</p>
          <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer">
            <Copy size={14} />
            <span>Copy Page</span>
          </button>
        </div>

        {/* Description Section */}
        <div className="space-y-6 text-[17px] leading-relaxed text-gray-700 mb-12">
          <p>
            Neuriy Coder is Neuriy's coding agent that you can run locally from your terminal. It can read, change, and run code on your machine in the selected directory. It's <span className="text-blue-600 underline cursor-pointer">open source</span> and built in Rust for speed and efficiency.
          </p>
          <p>
            Neuriy Plus, Pro, Business, Edu, and Enterprise plans include Coder. Learn more about <span className="text-blue-600 underline cursor-pointer">what's included</span>.
          </p>
        </div>

        {/* Video Section */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-16 group cursor-pointer shadow-2xl">
           <img 
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop" 
            alt="Neuriy Coder Preview" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
           />
           <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
              <div className="w-20 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
              <div className="mt-6 text-white font-bold text-4xl tracking-tighter drop-shadow-lg">
                Neuriy <span className="font-normal opacity-80">Coder</span>
              </div>
           </div>
           <div className="absolute bottom-6 left-6 flex items-center space-x-2 text-white/90 font-medium bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-md">
             <Play size={14} />
             <span>Bekijken op YouTube</span>
           </div>
        </div>

        {/* CLI Setup Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">CLI setup</h2>
          
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit mb-10">
            <button 
              onClick={() => setTab('npm')}
              className={`px-8 py-2.5 rounded-lg text-sm font-bold transition ${tab === 'npm' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
            >
              npm
            </button>
            <button 
              onClick={() => setTab('homebrew')}
              className={`px-8 py-2.5 rounded-lg text-sm font-bold transition ${tab === 'homebrew' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Homebrew
            </button>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Step 1: Install */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 font-bold">1</div>
                 <h3 className="text-xl font-bold">Install</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6">Install the Neuriy Coder CLI with npm.</p>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl group border border-gray-100">
                <code className="text-sm font-mono text-gray-800">npm i -g @neuriy/coder</code>
                <button 
                  onClick={() => handleCopy('npm i -g @neuriy/coder')}
                  className="text-gray-400 hover:text-black transition"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Step 2: Run */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 font-bold">2</div>
                 <h3 className="text-xl font-bold">Run</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Run Neuriy Coder in a terminal. It can inspect your repository, edit files, and run commands.
              </p>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                <code className="text-sm font-mono text-gray-800">neuriy</code>
                <button 
                  onClick={() => handleCopy('neuriy')}
                  className="text-gray-400 hover:text-black transition"
                >
                  <Copy size={18} />
                </button>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                The first time you run Neuriy, you'll be prompted to sign in. Authenticate with your Neuriy account or an API key.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                See the <span className="text-blue-600 underline cursor-pointer">pricing page</span> if you're not sure which plans include Neuriy access.
              </p>
            </div>

            {/* Step 3: Upgrade */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 font-bold">3</div>
                 <h3 className="text-xl font-bold">Upgrade</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                New versions of Neuriy Coder are released regularly. See the <span className="font-bold">changelog</span> for release notes. To upgrade with npm, run:
              </p>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <code className="text-sm font-mono text-gray-800">npm i -g @neuriy/coder</code>
                <button 
                  onClick={() => handleCopy('npm i -g @neuriy/coder')}
                  className="text-gray-400 hover:text-black transition"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Info Banner */}
          <div className="mt-8 flex items-start space-x-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-600 leading-relaxed">
            <div className="mt-0.5"><Info size={18} className="text-gray-400" /></div>
            <p>
              The Neuriy Coder is available on macOS, Windows, and Linux. On Windows, run Neuriy natively in PowerShell with the Windows sandbox, or use WSL2 when you need a Linux-native environment. For setup details, see the <span className="text-blue-600 underline cursor-pointer">Windows setup guide</span>.
            </p>
          </div>
          
          <p className="mt-8 text-sm text-gray-600">
            If you're new to Neuriy Coder, read the <span className="text-blue-600 underline cursor-pointer">best practices guide</span>.
          </p>
        </div>

        {/* Footer Section Placeholder */}
        <div className="pt-20 border-t border-gray-100 mb-20">
           <h2 className="text-2xl font-bold mb-10">Work with the Neuriy Coder</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 grayscale mb-20">
              <div className="h-40 bg-gray-50 rounded-2xl border border-gray-100" />
              <div className="h-40 bg-gray-50 rounded-2xl border border-gray-100" />
              <div className="h-40 bg-gray-50 rounded-2xl border border-gray-100" />
           </div>
        </div>

      </div>

      {/* FAQ or Footer CTA */}
      <section className="bg-black text-white py-20 px-6 rounded-t-[40px] md:rounded-t-[80px]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Ready to transform your workflow?</h2>
          <p className="text-white/60 text-lg mb-12">
            Join thousands of developers building with Neuriy AGI.
          </p>
          <button className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition cursor-pointer">
            Create an account
          </button>
        </div>
      </section>
    </div>
  );
}
