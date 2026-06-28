/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Users, Shield, Lock, Bell, CalendarPlus, UserPlus, FileText, Activity } from 'lucide-react';

interface AppointmentItem {
  _id?: string;
  patientName: string;
  pAvatar?: string;
  doctorName: string;
  dept: string;
  date: string;
  time: string;
  status: string;
}

interface DepartmentItem {
  _id?: string;
  name: string;
  activePatients: number;
  color?: string;
}

export function RecentAppointmentsTable({ appointments = [] }: { appointments?: AppointmentItem[] }) {
  // If no backend appointments, fallback to empty array or some message. We'll use the ones passed from parent.
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Recent Appointments</h3>
        <button className="text-sm font-medium text-blue-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 font-semibold uppercase border-b border-gray-100">
            <tr>
              <th className="pb-3 font-semibold">Patient Name</th>
              <th className="pb-3 font-semibold">Doctor</th>
              <th className="pb-3 font-semibold">Department</th>
              <th className="pb-3 font-semibold">Date & Time</th>
              <th className="pb-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? appointments.map((item: AppointmentItem, index: number) => (
              <tr key={item._id || index} className={index !== appointments.length - 1 ? 'border-b border-gray-50' : ''}>
                <td className="py-3">
                  <div className="flex items-center">
                    <img src={item.pAvatar || 'https://i.pravatar.cc/150'} alt={item.patientName} className="w-8 h-8 rounded-full mr-3 object-cover" />
                    <span className="font-medium text-gray-800">{item.patientName}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-600">{item.doctorName}</td>
                <td className="py-3 text-gray-600">{item.dept}</td>
                <td className="py-3 text-gray-600 whitespace-pre-line text-xs">{item.date}{'\n'}{item.time}</td>
                <td className="py-3 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                    item.status === 'Confirmed' || item.status === 'Completed' ? 'bg-green-50 text-green-600 border border-green-100' :
                    item.status === 'Pending' ? 'bg-orange-50 text-orange-500 border border-orange-100' :
                    'bg-red-50 text-red-500 border border-red-100'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No recent appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DepartmentWiseAppointments({ departments = [] }: { departments?: DepartmentItem[] }) {
  // If no backend data, fallback to empty. We use activePatients as the value.
  const deptData = departments.slice(0, 5).map((d: DepartmentItem) => ({
    name: d.name,
    value: d.activePatients || 0,
    max: 400, // or compute max
    color: d.color ? d.color.replace('text-', 'bg-') : 'bg-blue-500' // rudimentary map
  }));

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Department Wise Appointments</h3>
        <button className="text-sm font-medium text-blue-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {deptData.length > 0 ? deptData.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
              <span className="text-sm font-bold text-gray-800">{item.value}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`${item.color} h-2 rounded-full`} 
                style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )) : (
          <div className="text-sm text-gray-500 text-center py-4">No department data available.</div>
        )}
      </div>
    </div>
  );
}

export function SystemSummary() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <h3 className="text-lg font-bold text-gray-800 mb-6">System Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-xs text-gray-500 mb-1">Users</span>
          <span className="text-xl font-bold text-gray-800">35</span>
          <span className="text-[10px] text-gray-400 mt-1 text-center">Total Users</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-gray-100">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-purple-500" />
          </div>
          <span className="text-xs text-gray-500 mb-1">Roles</span>
          <span className="text-xl font-bold text-gray-800">6</span>
          <span className="text-[10px] text-gray-400 mt-1 text-center">User Roles</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-gray-100">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
            <Lock className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-xs text-gray-500 mb-1">Permissions</span>
          <span className="text-xl font-bold text-gray-800">48</span>
          <span className="text-[10px] text-gray-400 mt-1 text-center">Total Permissions</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-gray-100">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2 relative">
            <Bell className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-xs text-gray-500 mb-1">Notifications</span>
          <span className="text-xl font-bold text-gray-800">23</span>
          <span className="text-[10px] text-gray-400 mt-1 text-center">Unread</span>
        </div>
      </div>
    </div>
  );
}

const messagesData = [
  { id: 1, name: 'Dr. Sarah Khan', avatar: 'https://i.pravatar.cc/150?u=1', time: '10:30 AM', text: 'Please review the patient reports.', isUnread: true },
  { id: 2, name: 'Pharmacy', avatar: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=150&q=80', time: '09:15 AM', text: 'New medicine stock has arrived.', isUnread: true },
  { id: 3, name: 'Lab Department', avatar: 'https://i.pravatar.cc/150?u=8', time: 'Yesterday', text: 'Test reports are ready.', isUnread: false },
];

export function RecentMessages() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Messages</h3>
        <button className="text-sm font-medium text-blue-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {messagesData.map((msg) => (
          <div key={msg.id} className="flex items-start">
            <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover mr-3" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-gray-800">{msg.name}</h4>
                <div className="flex items-center">
                  <span className="text-[10px] text-gray-400 mr-2">{msg.time}</span>
                  {msg.isUnread && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuickActions() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex flex-col items-center justify-center p-4 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-xl transition-colors group">
          <CalendarPlus className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-blue-800 text-center leading-tight">Add<br/>Appointment</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-green-50/50 hover:bg-green-50 border border-green-100 rounded-xl transition-colors group">
          <UserPlus className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-green-800 text-center leading-tight">Add<br/>Patient</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-purple-50/50 hover:bg-purple-50 border border-purple-100 rounded-xl transition-colors group">
          <Activity className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-purple-800 text-center leading-tight">Add<br/>Doctor</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-orange-50/50 hover:bg-orange-50 border border-orange-100 rounded-xl transition-colors group">
          <FileText className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-orange-700 text-center leading-tight">Generate<br/>Report</span>
        </button>
      </div>
    </div>
  );
}
