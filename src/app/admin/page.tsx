"use client";

import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import dynamic from 'next/dynamic';

const AppointmentsOverview = dynamic(() => import('./components/Charts').then(mod => mod.AppointmentsOverview), { ssr: false });
const PatientsOverview = dynamic(() => import('./components/Charts').then(mod => mod.PatientsOverview), { ssr: false });
const BedOccupancy = dynamic(() => import('./components/Charts').then(mod => mod.BedOccupancy), { ssr: false });
const RevenueOverview = dynamic(() => import('./components/Charts').then(mod => mod.RevenueOverview), { ssr: false });
import { 
  RecentAppointmentsTable, 
  DepartmentWiseAppointments, 
  SystemSummary, 
  RecentMessages, 
  QuickActions 
} from './components/TablesAndBottom';

import { Calendar, Users, User, Bed, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      {/* Sidebar - fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-[260px]">
        {/* Header - fixed top */}
        <Header />

        {/* Scrollable Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Top Stat Cards - 5 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <StatCard 
                title="Total Appointments" 
                value="1,248" 
                icon={Calendar} 
                iconBgColor="bg-blue-600" 
                iconColor="text-white" 
                percentage="12.5%" 
                isPositive={true} 
              />
              <StatCard 
                title="Total Patients" 
                value="3,652" 
                icon={Users} 
                iconBgColor="bg-green-100" 
                iconColor="text-green-600" 
                percentage="8.3%" 
                isPositive={true} 
              />
              <StatCard 
                title="Total Doctors" 
                value="120" 
                icon={User} 
                iconBgColor="bg-purple-100" 
                iconColor="text-purple-600" 
                percentage="5.6%" 
                isPositive={true} 
              />
              <StatCard 
                title="Total Beds" 
                value="356" 
                icon={Bed} 
                iconBgColor="bg-orange-100" 
                iconColor="text-orange-500" 
                percentage="3.2%" 
                isPositive={false} 
              />
              <StatCard 
                title="Total Revenue" 
                value="PKR 2,45,680" 
                icon={DollarSign} 
                iconBgColor="bg-red-50" 
                iconColor="text-red-500" 
                percentage="15.7%" 
                isPositive={true} 
              />
            </div>

            {/* Middle Row - Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <AppointmentsOverview />
              </div>
              <div className="lg:col-span-3">
                <PatientsOverview />
              </div>
              <div className="lg:col-span-3">
                <BedOccupancy />
              </div>
            </div>

            {/* Bottom Row - Tables and Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <RecentAppointmentsTable />
              </div>
              <div className="lg:col-span-3">
                <RevenueOverview />
              </div>
              <div className="lg:col-span-3">
                <DepartmentWiseAppointments />
              </div>
            </div>

            {/* Footer Row - Summaries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
              <div className="lg:col-span-4">
                <SystemSummary />
              </div>
              <div className="lg:col-span-4">
                <RecentMessages />
              </div>
              <div className="lg:col-span-4">
                <QuickActions />
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Global styles for custom scrollbar to match clean design */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
        }
      `}} />
    </div>
  );
}
