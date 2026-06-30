"use client";

import React, { useState, useEffect } from 'react';
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

import { Calendar, Users, User, Bed, DollarSign, Loader2 } from 'lucide-react';

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalDepartments: number;
  totalBeds: number;
  totalRevenue: number;
}

interface DashboardAppointment {
  _id: string;
  patientName: string;
  pAvatar?: string;
  doctorName: string;
  dept: string;
  date: string;
  time: string;
  status: string;
}

interface DashboardDepartment {
  _id: string;
  name: string;
  activePatients: number;
  color?: string;
  status: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<DashboardAppointment[]>([]);
  const [departments, setDepartments] = useState<DashboardDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Read actual lengths from localStorage for the implemented CRUD modules
      const patientsStr = localStorage.getItem('admin_patients');
      const patientsCount = patientsStr ? JSON.parse(patientsStr).length : 0;
      
      const doctorsStr = localStorage.getItem('admin_doctors');
      const doctorsCount = doctorsStr ? JSON.parse(doctorsStr).length : 0;

      // Ensure we display something if localstorage is cleared
      setStats({
        totalPatients: patientsCount > 0 ? patientsCount : 4842,
        totalDoctors: doctorsCount > 0 ? doctorsCount : 154,
        totalAppointments: 1240,
        totalDepartments: 24,
        totalBeds: 450,
        totalRevenue: 2450000
      });
      
      // Mock data for tables since they don't have localStorage yet
      setRecentAppointments([
        { _id: '1', patientName: 'Ali Khan', doctorName: 'Dr. Usman', dept: 'Cardiology', date: 'Today', time: '10:00 AM', status: 'Pending' },
        { _id: '2', patientName: 'Sara Ahmed', doctorName: 'Dr. Maria', dept: 'Neurology', date: 'Today', time: '11:30 AM', status: 'Completed' },
        { _id: '3', patientName: 'Hassan Raza', doctorName: 'Dr. Bilal', dept: 'Orthopedics', date: 'Today', time: '01:00 PM', status: 'In Progress' }
      ]);

      setDepartments([
        { _id: '1', name: 'Cardiology', activePatients: 145, status: 'Active' },
        { _id: '2', name: 'Neurology', activePatients: 98, status: 'Active' },
        { _id: '3', name: 'Orthopedics', activePatients: 112, status: 'Active' }
      ]);
      
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-[#f8fafc]">
        <Loader2 className="w-10 h-10 text-[#5e35b1] animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar w-full">
      <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Top Stat Cards - 5 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <StatCard 
                title="Total Appointments" 
                value={stats?.totalAppointments?.toString() || "0"} 
                icon={Calendar} 
                iconBgColor="bg-blue-600" 
                iconColor="text-white" 
                percentage="12.5%" 
                isPositive={true} 
              />
              <StatCard 
                title="Total Patients" 
                value={stats?.totalPatients?.toString() || "0"} 
                icon={Users} 
                iconBgColor="bg-green-100" 
                iconColor="text-green-600" 
                percentage="8.3%" 
                isPositive={true} 
              />
              <StatCard 
                title="Total Doctors" 
                value={stats?.totalDoctors?.toString() || "0"} 
                icon={User} 
                iconBgColor="bg-purple-100" 
                iconColor="text-purple-600" 
                percentage="5.6%" 
                isPositive={true} 
              />
              <StatCard 
                title="Total Beds" 
                value={stats?.totalBeds?.toString() || "0"} 
                icon={Bed} 
                iconBgColor="bg-orange-100" 
                iconColor="text-orange-500" 
                percentage="3.2%" 
                isPositive={false} 
              />
              <StatCard 
                title="Total Revenue" 
                value={`PKR ${stats?.totalRevenue?.toLocaleString() || "0"}`} 
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
                <RecentAppointmentsTable appointments={recentAppointments} />
              </div>
              <div className="lg:col-span-3">
                <RevenueOverview />
              </div>
              <div className="lg:col-span-3">
                <DepartmentWiseAppointments departments={departments} />
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
  );
}
