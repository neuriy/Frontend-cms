'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useNeuriyAuth, redirectToNeuriyLogin, signOut } from '@neuriy/auth';
import { Settings, LogOut, User, ChevronDown } from 'lucide-react';

interface NavbarProps {
  floating?: boolean;
}

export default function MarketingNavbar({ floating: propFloating }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useNeuriyAuth();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const isHome = pathname === '/';
  const floating = propFloating !== undefined ? propFloating : isHome;

  const handleLogin = () => {
    const authUrl = process.env.NODE_ENV === 'production' 
      ? 'https://id.neuriy.com' 
      : 'http://localhost:3000';
    redirectToNeuriyLogin(authUrl);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (isHome) {
    return (
      <nav className="w-full absolute top-0 flex justify-start items-center p-6 md:p-10 z-[100] text-black">
        <Link href="/" className="flex items-center mr-12">
          <img src="/img/neuriy_white.svg" alt="Neuriy Logo" className="h-7 filter invert" />
        </Link>
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
          <div className="flex space-x-8">
            <Link href="/p/product" className="text-black/70 hover:text-black transition">Product</Link>
            <Link href="/p/platform" className="text-black/70 hover:text-black transition">Platform</Link>
            <Link href="/p/customers" className="text-black/70 hover:text-black transition">Customers</Link>
            <Link href="/p/company" className="text-black/70 hover:text-black transition">Company</Link>
          </div>
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-black/5 animate-pulse"></div>
          ) : user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 group cursor-pointer bg-white/50 hover:bg-white p-1 pr-3 rounded-full border border-gray-100 transition shadow-sm"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <User size={16} />
                  </div>
                )}
                <span className="text-black font-bold text-sm hidden lg:block">{user.displayName}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-[110] animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Settings size={16} />
                    <span>Profile Settings</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLogin} className="text-black/70 hover:text-black font-bold transition cursor-pointer">
              Login
            </button>
          )}
        </div>
        {/* Mobile Nav for Home */}
        <div className="md:hidden flex items-center space-x-6 text-sm font-medium">
          <Link href="/p/platform" className="text-black hover:opacity-70 transition">Platform</Link>
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-black/5 animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center space-x-3">
              <Link href="/profile" className="flex items-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-gray-200" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <User size={16} />
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <button onClick={handleLogin} className="text-black font-bold cursor-pointer">Login</button>
          )}
        </div>


      </nav>
    );
  }

  // Original Pill Layout for other pages
  return (
    <nav className="w-full flex justify-between items-center p-6 md:p-10 z-[100] relative bg-white text-gray-900 border-b border-gray-100">
      <Link href="/" className="flex items-center space-x-2">
        <img src="/img/neuriy_white.svg" alt="Neuriy Logo" className="h-7 filter invert" />
      </Link>
      
      <div className="md:hidden flex items-center space-x-4 text-sm font-medium">
        <Link href="/p/platform" className="text-gray-900 hover:text-gray-500 transition">Platform</Link>
        {loading ? (
          <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
        ) : user ? (
          <Link href="/profile" className="flex items-center">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-gray-200" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <User size={16} />
              </div>
            )}
          </Link>
        ) : (
          <button onClick={handleLogin} className="bg-black text-white px-4 py-1.5 rounded-full font-bold hover:opacity-80 transition shadow-sm cursor-pointer">
            Login
          </button>
        )}
      </div>

      <div className="hidden md:flex items-center space-x-5 text-sm font-medium bg-gray-50 border-gray-200 px-2 py-1.5 rounded-full border shadow-sm">
        <div className="flex space-x-6 px-4">
            <Link href="/p/product" className="hover:text-black transition">Product</Link>
            <Link href="/p/platform" className="hover:text-black transition">Platform</Link>
            <Link href="/p/customers" className="hover:text-black transition">Customers</Link>
            <Link href="/p/company" className="hover:text-black transition">Company</Link>
        </div>
        {loading ? (
          <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse ml-2 mr-2"></div>
        ) : user ? (
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 group cursor-pointer bg-black text-white p-1 pr-3 rounded-full hover:bg-gray-800 transition shadow-sm"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                  <User size={12} />
                </div>
              )}
              <span className="text-xs font-bold truncate max-w-[80px]">{user.displayName}</span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-[110] animate-in fade-in slide-in-from-top-2 text-left">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Signed in as</p>
                  <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
                </div>
                <Link 
                  href="/profile" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <Settings size={16} />
                  <span>Profile Settings</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleLogin} className="bg-black text-white px-6 py-2 rounded-full font-bold transition shadow-sm cursor-pointer">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
