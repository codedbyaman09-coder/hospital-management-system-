"use client";

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-[260px] w-full transition-all duration-300">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {children}
      </div>
    </div>
  );
}
