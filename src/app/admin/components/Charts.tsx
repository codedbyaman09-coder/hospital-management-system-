"use client";

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const appointmentsData = [
  { name: 'Mon', Appointments: 120, Cancelled: 30 },
  { name: 'Tue', Appointments: 160, Cancelled: 40 },
  { name: 'Wed', Appointments: 140, Cancelled: 35 },
  { name: 'Thu', Appointments: 180, Cancelled: 50 },
  { name: 'Fri', Appointments: 210, Cancelled: 60 },
  { name: 'Sat', Appointments: 180, Cancelled: 45 },
  { name: 'Sun', Appointments: 140, Cancelled: 40 },
];

const patientsData = [
  { name: 'New Patients', value: 1256, color: '#0ea5e9' },
  { name: 'Returning Patients', value: 1852, color: '#10b981' },
  { name: 'Regular Patients', value: 544, color: '#f59e0b' },
];

const revenueData = [
  { name: 'Mon', Revenue: 50 },
  { name: 'Tue', Revenue: 80 },
  { name: 'Wed', Revenue: 110 },
  { name: 'Thu', Revenue: 140 },
  { name: 'Fri', Revenue: 190 },
  { name: 'Sat', Revenue: 230 },
  { name: 'Sun', Revenue: 150 },
];

const bedData = [
  { name: 'Occupied', value: 72, fill: '#1d4ed8' },
  { name: 'Available', value: 28, fill: '#f3f4f6' }
];

export function AppointmentsOverview() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Appointments Overview</h3>
        <div className="flex items-center text-sm text-gray-500 border border-gray-200 rounded-md px-2 py-1 cursor-pointer">
          <span>This Week</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div>
      
      <div className="flex gap-4 mb-4 text-sm font-medium">
        <div className="flex items-center">
          <span className="w-3 h-1 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-gray-600">Appointments</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-1 rounded-full bg-red-400 mr-2"></span>
          <span className="text-gray-600">Cancelled</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={appointmentsData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="Appointments" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
            <Line type="monotone" dataKey="Cancelled" stroke="#f87171" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PatientsOverview() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Patients Overview</h3>
      <div className="flex flex-col items-center">
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={patientsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {patientsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
            <span className="text-2xl font-bold text-gray-800">3,652</span>
            <span className="text-xs text-gray-500 font-medium">Total Patients</span>
          </div>
        </div>
        
        <div className="w-full mt-4 space-y-3">
          {patientsData.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-600 font-medium">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-800">{item.value.toLocaleString()}</span>
                <span className="text-gray-400 text-xs w-10 text-right">
                  ({Math.round((item.value / 3652) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BedOccupancy() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Bed Occupancy</h3>
      
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="h-40 w-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bedData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={75}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#1d4ed8" />
                <Cell fill="#f3f4f6" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-800">72%</span>
            <span className="text-xs text-gray-500">Occupied</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 w-full mt-6">
          <div className="bg-blue-50/50 rounded-lg p-2 text-center border border-blue-100">
            <p className="text-xs text-gray-500 mb-1">Occupied</p>
            <p className="text-lg font-bold text-blue-700">256</p>
          </div>
          <div className="bg-green-50/50 rounded-lg p-2 text-center border border-green-100">
            <p className="text-xs text-gray-500 mb-1">Available</p>
            <p className="text-lg font-bold text-green-600">100</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Total Beds</p>
            <p className="text-lg font-bold text-gray-700">356</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-3 text-sm">
          <ArrowUpRight className="w-3 h-3 text-green-500 mr-1 stroke-[3]" />
          <span className="text-green-500 font-bold mr-1">2.6%</span>
          <span className="text-gray-400">from last week</span>
        </div>
      </div>
    </div>
  );
}

export function RevenueOverview() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Revenue Overview</h3>
          <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">PKR 2,45,680</h2>
          <div className="flex items-center mt-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-green-500 mr-1 stroke-[3]" />
            <span className="text-xs font-semibold text-green-500">15.7%</span>
            <span className="text-xs text-gray-400 ml-1.5">from last week</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 border border-gray-200 rounded-md px-2 py-1 cursor-pointer">
          <span>This Week</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(val) => val === 0 ? '0' : `${val}K`} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Area type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" dot={{r: 4, strokeWidth: 2, stroke: '#10b981', fill: '#fff'}} activeDot={{r: 6}} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
