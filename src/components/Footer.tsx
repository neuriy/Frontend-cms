'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Hexagon } from 'lucide-react';
import { getCMSFooter, CMSFooterGroup } from '@/lib/cms';

const DEFAULT_FOOTER_GROUPS: CMSFooterGroup[] = [
  {
    label: 'Products',
    links: [
      { label: 'Neuriy Canvas', url: '/p/product' },
      { label: 'Neural Engine', url: '/p/platform' },
      { label: 'Browser AI', url: '/chat-neuriy' },
      { label: 'Workspace', url: '/download' },
    ]
  },
  {
    label: 'Platform',
    links: [
      { label: 'Spatial AI', url: '/p/platform' },
      { label: 'Model Zoo', url: '/p/product' },
      { label: 'API & SDK', url: '/p/platform' },
      { label: 'Enterprise', url: '/p/customers' },
    ]
  },
  {
    label: 'Resources',
    links: [
      { label: 'Documentation', url: '/p/company' },
      { label: 'Guides', url: '/p/company' },
      { label: 'Community', url: '/p/customers' },
      { label: 'Changelog', url: '/p/product' },
    ]
  },
  {
    label: 'Company',
    links: [
      { label: 'About Us', url: '/p/company' },
      { label: 'Careers', url: '/p/company' },
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
    ]
  }
];

export default function MarketingFooter() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [footerGroups, setFooterGroups] = React.useState<CMSFooterGroup[]>(DEFAULT_FOOTER_GROUPS);

  React.useEffect(() => {
    async function loadFooter() {
      try {
        const footer = await getCMSFooter();
        if (footer?.groups && footer.groups.length > 0) {
          setFooterGroups(footer.groups);
        }
      } catch (err) {
        console.warn('CMS footer unavailable, using fallback links');
      }
    }
    loadFooter();
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative w-full bg-[#fafafa] text-[#1a1a1a] font-sans overflow-hidden border-t border-gray-100">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Column (Newsletter) */}
        <div className="col-span-1 border-b lg:border-b-0 lg:col-span-4 p-8 lg:p-14 lg:border-r border-gray-200 relative flex flex-col justify-between lg:min-h-[600px] bg-white">
          <div>
            <div className="absolute -top-2 -right-[5px] text-gray-300 text-lg hidden lg:block font-light">+</div>
            <div className="absolute -bottom-2 -right-[5px] text-gray-300 text-lg hidden lg:block font-light">+</div>
            <h2 className="text-[2.8rem] font-black tracking-tighter mb-6 leading-[1.05]">Let's Work<br/>Together</h2>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-10 max-w-[280px] font-medium">
              Join our community of designers and developers building the future of spatial intelligence.
            </p>
            
            <form onSubmit={handleNewsletter} className="relative max-w-[320px] mb-16 shadow-sm rounded-full bg-white border border-gray-100">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                disabled={loading} 
                placeholder="Enter email address*" 
                className="w-full py-4 px-6 border-0 rounded-full outline-none focus:ring-2 focus:ring-gray-200 bg-transparent text-sm font-bold placeholder-gray-800 disabled:opacity-50" 
              />
              <button 
                type="submit" 
                disabled={loading} 
                className="absolute right-[5px] top-[5px] w-[42px] h-[42px] bg-[#1a1a1a] text-white rounded-full flex items-center justify-center hover:bg-black transition disabled:opacity-50"
              >
                {subscribed ? <span className="text-white text-lg font-bold">✓</span> : <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>

        {/* Right Area Grid (Link Columns) */}
        <div className="col-span-1 lg:col-span-8 relative flex flex-col bg-[#fafafa]">
           <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200 relative z-10">
              {footerGroups.length > 0 ? (
                footerGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className={`relative p-6 md:p-10 border-b md:border-b-0 ${groupIdx < footerGroups.length - 1 ? 'border-r' : ''} border-gray-200 flex flex-col`}>
                    <div className="absolute -top-[12px] -right-[6px] text-gray-300 text-xl hidden md:block font-light">+</div>
                    <div className="absolute -bottom-[12px] -right-[6px] text-gray-300 text-xl hidden md:block font-light">+</div>
                    
                    <h4 className="text-[12px] text-gray-400 mb-[30px] font-black uppercase tracking-widest">{group.label}</h4>
                    <ul className="space-y-[14px] text-[13px] font-bold text-gray-400">
                      {group.links?.map((link, linkIdx) => (
                        <li key={linkIdx} className="hover:text-[#1a1a1a] transition">
                          <Link href={link.url}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="col-span-4 p-10 text-center text-gray-300 text-xs font-bold uppercase tracking-widest animate-pulse">
                  Syncing with Spatial CMS...
                </div>
              )}
           </div>

           {/* Watermark Zone */}
           <div className="relative flex-grow min-h-[250px] lg:min-h-[350px] flex items-center justify-center overflow-hidden">
              <div className="text-[16vw] lg:text-[11vw] font-black text-gray-200/50 select-none tracking-tighter whitespace-nowrap pointer-events-none transform translate-y-4">
                 neuriy.ai
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-[1500px] mx-auto flex flex-col xl:flex-row justify-between items-center py-8 px-8 text-[11px] font-black text-gray-400 relative z-20 xl:border-t xl:border-gray-100 uppercase tracking-widest">
        <div className="mb-4 xl:mb-0 text-center xl:text-left">© 2026 Neuriy Inc. / All Rights Reserved</div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          <Link href="/p/privacy-policy" className="hover:text-black transition">Privacy Policy</Link>
          <Link href="/p/terms-of-service" className="hover:text-black transition">Terms of Service</Link>
          <Link href="/p/acceptable-use-policy" className="hover:text-black transition">Acceptable Use Policy</Link>
          <Link href="/p/cookie-policy" className="hover:text-black transition">Cookie Policy</Link>
          <Link href="/p/intellectual-property-rights" className="hover:text-black transition">IP Rights</Link>
        </div>
        <button 
          className="hidden xl:flex items-center hover:text-black border-l border-gray-200 pl-8 ml-8 transition" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          Top <ArrowUpRight className="ml-1" size={12} strokeWidth={2.5} />
        </button>
      </div>
    </footer>
  );
}
