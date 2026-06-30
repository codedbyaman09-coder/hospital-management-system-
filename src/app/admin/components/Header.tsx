/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Menu, Calendar, ChevronDown, Search, Bell, Globe, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Header({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10 w-full print:hidden">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors mr-3 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-5">
        {/* Date Picker Mock */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <span>May 20, 2024 - May 26, 2024</span>
          <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">
              5
            </span>
          </button>

          <button className="text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">
            <Globe className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors -mr-1.5"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Admin" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="ml-2 flex items-center hidden sm:flex">
              <span className="text-sm font-medium text-gray-700">Admin</span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
            </div>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
