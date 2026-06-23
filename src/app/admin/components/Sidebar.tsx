import React from 'react';
import Link from 'next/link';
import { 
  Home, Calendar, User, Users, Building, 
  DollarSign, Pill, Bed, FileText, Mail, 
  Bell, Settings, Clock, Phone, Plus
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: Home, active: true },
    { name: 'Appointments', icon: Calendar },
    { name: 'Patients', icon: User },
    { name: 'Doctors', icon: User }, // Can use Stethoscope if available, fallback User
    { name: 'Departments', icon: Building },
    { name: 'Staff', icon: Users },
    { name: 'Billing & Payments', icon: DollarSign },
    { name: 'Pharmacy', icon: Pill },
    { name: 'Beds & Rooms', icon: Bed },
    { name: 'Reports', icon: FileText },
    { name: 'Messages', icon: Mail, badge: '5' },
    { name: 'Notifications', icon: Bell },
    { name: 'Settings', icon: Settings },
    { name: 'Users & Roles', icon: Users },
    { name: 'Activity Logs', icon: Clock },
  ];

  return (
    <aside className="w-[260px] h-screen bg-[#111828] text-[#9CA3AF] flex flex-col font-sans shrink-0 fixed left-0 top-0 overflow-hidden">
      {/* Logo Section */}
      <div className="flex items-center px-6 py-5">
        <div className="flex items-center">
          <div className="relative w-8 h-8 mr-3">
             <div className="absolute inset-0 bg-[#0ea5e9] rounded-md transform rotate-45 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white transform -rotate-45" />
             </div>
          </div>
          <div className="font-bold leading-tight">
            <span className="text-xl text-white block">CityCare</span>
            <span className="text-xs text-gray-400 font-normal tracking-widest">HOSPITAL</span>
          </div>
        </div>
      </div>

      {/* Admin Profile */}
      <div className="px-6 py-4 flex items-center border-b border-[#1f2937]">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
          alt="Admin" 
          className="w-12 h-12 rounded-full border-2 border-transparent"
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-white">Admin</p>
          <p className="text-[11px] text-gray-400">Super Administrator</p>
          <div className="flex items-center mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
            <span className="text-[10px] text-green-500 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        <ul className="space-y-1 px-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href="#"
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active 
                    ? 'bg-[#1d4ed8] text-white font-medium' 
                    : 'hover:bg-[#1f2937] hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Emergency Support */}
      <div className="p-4 mt-auto">
        <div className="border border-red-900/50 bg-red-950/20 rounded-xl p-3 flex items-center cursor-pointer hover:bg-red-900/30 transition-colors">
          <div className="bg-red-500/10 p-2 rounded-lg mr-3">
            <Phone className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-red-500 font-medium">Emergency Support</p>
            <p className="text-xs text-red-500/70">24/7</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
