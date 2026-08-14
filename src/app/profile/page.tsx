'use client';

import React from 'react';
import { useNeuriyAuth, NeuriyAuthGuard, signOut } from '@neuriy/auth';
import { User, Mail, Shield, Settings, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <NeuriyAuthGuard
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      }
      unauthenticated={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <Shield size={48} className="text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-6">Please sign in to view your profile settings.</p>
          <Link href="/" className="bg-black text-white px-6 py-2 rounded-full font-bold">
            Go Home
          </Link>
        </div>
      }
    >
      {(user) => (
        <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-gray-50 flex items-center space-x-6">
                <div className="relative">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-50 shadow-sm" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                      <User size={32} />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.displayName || 'Developer'}</h1>
                  <p className="text-gray-500 flex items-center mt-1">
                    <Mail size={14} className="mr-2" />
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Settings Sections */}
              <div className="p-4">
                <div className="space-y-1">
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Personal Information</p>
                        <p className="text-xs text-gray-500">Update your profile and email</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Shield size={20} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Security</p>
                        <p className="text-xs text-gray-500">Manage password and 2FA</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
                        <Settings size={20} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Preferences</p>
                        <p className="text-xs text-gray-500">Theme and notification settings</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition" />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => {
                      signOut().then(() => window.location.href = '/');
                    }}
                    className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-2xl transition group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                        <LogOut size={20} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-red-600">Sign Out</p>
                        <p className="text-xs text-red-400">Logout from all devices</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">
                &larr; Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </NeuriyAuthGuard>
  );
}
