"use client";

import React from 'react';
import Link from 'next/link';
import { 
  FileText, TrendingUp, CheckCircle, Clock, XCircle, Search, Calendar, ChevronDown, Eye, Printer, MoreVertical
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dummy data for charts
const revenueData = [
  { name: 'May 1', value: 200000 },
  { name: 'May 6', value: 350000 },
  { name: 'May 11', value: 650000 },
  { name: 'May 16', value: 450000 },
  { name: 'May 20', value: 750000 },
];

const paymentMethodsData = [
  { name: 'Cash', value: 45.2, color: '#3b82f6', amount: 'PKR 568,450' },
  { name: 'Card', value: 30.5, color: '#10b981', amount: 'PKR 383,450' },
  { name: 'Bank Transfer', value: 15.8, color: '#f59e0b', amount: 'PKR 198,550' },
  { name: 'Insurance', value: 8.5, color: '#8b5cf6', amount: 'PKR 106,200' },
];

// Dummy data for invoices exactly matching the screenshot
const invoices = [
  { id: 'INV-2024-1248', patient: 'Ali Hassan', patId: 'PAT-000125', date: 'May 20, 2024', time: '10:30 AM', dept: 'Cardiology', total: 'PKR 25,000', paid: 'PKR 25,000', due: 'PKR 0', status: 'Paid', payStatus: 'Paid', avatar: 'https://i.pravatar.cc/150?u=a1' },
  { id: 'INV-2024-1247', patient: 'Ayesha Khan', patId: 'PAT-000126', date: 'May 20, 2024', time: '09:45 AM', dept: 'Neurology', total: 'PKR 18,500', paid: 'PKR 10,000', due: 'PKR 8,500', status: 'Partial', payStatus: 'Partially Paid', avatar: 'https://i.pravatar.cc/150?u=a2' },
  { id: 'INV-2024-1246', patient: 'Muhammad Imran', patId: 'PAT-000127', date: 'May 19, 2024', time: '04:20 PM', dept: 'Orthopedics', total: 'PKR 32,000', paid: 'PKR 0', due: 'PKR 32,000', status: 'Unpaid', payStatus: 'Unpaid', avatar: 'https://i.pravatar.cc/150?u=a3' },
  { id: 'INV-2024-1245', patient: 'Fatima Noor', patId: 'PAT-000128', date: 'May 19, 2024', time: '11:15 AM', dept: 'Pediatrics', total: 'PKR 12,800', paid: 'PKR 12,800', due: 'PKR 0', status: 'Paid', payStatus: 'Paid', avatar: 'https://i.pravatar.cc/150?u=a4' },
  { id: 'INV-2024-1244', patient: 'Usman Tariq', patId: 'PAT-000129', date: 'May 18, 2024', time: '03:30 PM', dept: 'General Medicine', total: 'PKR 8,750', paid: 'PKR 5,000', due: 'PKR 3,750', status: 'Partial', payStatus: 'Partially Paid', avatar: 'https://i.pravatar.cc/150?u=a5' },
  { id: 'INV-2024-1243', patient: 'Sana Javed', patId: 'PAT-000130', date: 'May 18, 2024', time: '10:10 AM', dept: 'Dermatology', total: 'PKR 6,200', paid: 'PKR 6,200', due: 'PKR 0', status: 'Paid', payStatus: 'Paid', avatar: 'https://i.pravatar.cc/150?u=a6' },
  { id: 'INV-2024-1242', patient: 'Bilal Ahmed', patId: 'PAT-000131', date: 'May 17, 2024', time: '02:25 PM', dept: 'ENT', total: 'PKR 9,600', paid: 'PKR 0', due: 'PKR 9,600', status: 'Unpaid', payStatus: 'Unpaid', avatar: 'https://i.pravatar.cc/150?u=a7' },
  { id: 'INV-2024-1241', patient: 'Zainab Fatima', patId: 'PAT-000132', date: 'May 17, 2024', time: '09:00 AM', dept: 'Gynecology', total: 'PKR 15,400', paid: 'PKR 15,400', due: 'PKR 0', status: 'Paid', payStatus: 'Paid', avatar: 'https://i.pravatar.cc/150?u=a8' },
  { id: 'INV-2024-1240', patient: 'Raza Mehmood', patId: 'PAT-000133', date: 'May 16, 2024', time: '12:40 PM', dept: 'Urology', total: 'PKR 22,000', paid: 'PKR 12,000', due: 'PKR 10,000', status: 'Partial', payStatus: 'Partially Paid', avatar: 'https://i.pravatar.cc/150?u=a9' },
  { id: 'INV-2024-1239', patient: 'Hina Batool', patId: 'PAT-000134', date: 'May 16, 2024', time: '09:20 AM', dept: 'Radiology', total: 'PKR 7,300', paid: 'PKR 7,300', due: 'PKR 0', status: 'Paid', payStatus: 'Paid', avatar: 'https://i.pravatar.cc/150?u=a10' },
];

export default function BillingPaymentsPage() {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-50 text-green-600 border border-green-200';
      case 'Partial': return 'bg-orange-50 text-orange-500 border border-orange-200';
      case 'Partially Paid': return 'bg-orange-50 text-orange-500 border border-orange-200';
      case 'Unpaid': return 'bg-red-50 text-red-500 border border-red-200';
      default: return 'bg-gray-50 text-gray-500 border border-gray-200';
    }
  };

  const getAmountColor = (amount: string, status: string) => {
    if (amount === 'PKR 0' && status !== 'Paid') return 'text-red-500 font-medium';
    if (status === 'Paid' || status === 'Partially Paid' || status === 'Partial') {
        if(amount !== 'PKR 0') return 'text-green-500 font-medium';
    }
    if (status === 'Unpaid' || status === 'Partial' || status === 'Partially Paid') {
        if(amount !== 'PKR 0' && !amount.includes('PKR 0')) return 'text-red-500 font-medium';
    }
    return 'text-gray-700 font-medium';
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
      <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing & Payments</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-blue-600 font-medium">Dashboard</span>
                <span className="mx-2">&gt;</span>
                <span>Billing & Payments</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by invoice no., patient name..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm bg-white"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                <Calendar className="w-4 h-4" />
                May 20, 2024 - May 20, 2024
                <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
              </button>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Total Invoices</p>
                <h3 className="text-xl font-bold text-gray-900">1,248</h3>
                <p className="text-[10px] text-gray-400 mt-1">All time</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-xl font-bold text-gray-900">PKR 8,645,250</h3>
                <p className="text-[10px] text-gray-400 mt-1">All time</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Paid Amount</p>
                <h3 className="text-xl font-bold text-gray-900">PKR 7,256,800</h3>
                <p className="text-[10px] text-gray-400 mt-1">83.96% of total</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Pending Amount</p>
                <h3 className="text-xl font-bold text-gray-900">PKR 1,388,450</h3>
                <p className="text-[10px] text-gray-400 mt-1">16.04% of total</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Refunded Amount</p>
                <h3 className="text-xl font-bold text-gray-900">PKR 125,750</h3>
                <p className="text-[10px] text-gray-400 mt-1">All time</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column (Table) */}
            <div className="lg:col-span-3 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
              
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search by invoice no., patient name..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors" />
                </div>
                
                <div className="w-48">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Date Range</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>May 20, 2024 - May 20, 2024</span>
                    </div>
                  </button>
                </div>
                
                <div className="w-40">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Department</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white">
                    <span>All Departments</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
                
                <div className="w-32">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white">
                    <span>All Status</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
                
                <div className="w-32">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Status</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white">
                    <span>All</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Invoice No.</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Patient Name</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Date</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Department</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Total Amount</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Paid Amount</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Due Amount</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Status</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800">Payment Status</th>
                      <th className="pb-3 pt-2 px-2 text-xs font-bold text-gray-800 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4 px-2 text-[13px] font-medium text-blue-600">{inv.id}</td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2.5">
                            <img src={inv.avatar} alt={inv.patient} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <div className="text-[13px] font-bold text-gray-800">{inv.patient}</div>
                              <div className="text-[10px] text-gray-400">{inv.patId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-[12px] font-medium text-gray-800">{inv.date}</div>
                          <div className="text-[10px] text-gray-400">{inv.time}</div>
                        </td>
                        <td className="py-4 px-2 text-[13px] font-medium text-gray-700">{inv.dept}</td>
                        <td className="py-4 px-2 text-[13px] font-bold text-gray-700">{inv.total}</td>
                        <td className={`py-4 px-2 text-[13px] ${getAmountColor(inv.paid, inv.status)}`}>{inv.paid}</td>
                        <td className={`py-4 px-2 text-[13px] ${getAmountColor(inv.due, inv.status)}`}>{inv.due}</td>
                        <td className="py-4 px-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getStatusColor(inv.status)}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getStatusColor(inv.payStatus)}`}>
                            {inv.payStatus}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <Link href="/admin/billing/print" className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                              <Printer className="w-3.5 h-3.5" />
                            </Link>
                            <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <span className="text-xs font-medium text-gray-500">Showing 1 to 10 of 1,248 entries</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">&lt;</button>
                  <button className="w-8 h-8 rounded bg-blue-600 text-white font-medium text-xs flex items-center justify-center shadow-sm">1</button>
                  <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs hover:bg-gray-50">2</button>
                  <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs hover:bg-gray-50">3</button>
                  <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs hover:bg-gray-50">4</button>
                  <span className="text-gray-400 mx-1">...</span>
                  <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs hover:bg-gray-50">125</button>
                  <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">&gt;</button>
                </div>
              </div>

            </div>

            {/* Right Column (Analytics) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Revenue Overview */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800 text-sm">Revenue Overview</h3>
                  <button className="text-xs font-medium text-gray-500 flex items-center gap-1 border border-gray-200 rounded px-2 py-1">
                    This Month <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">Total Revenue</p>
                  <div className="text-lg font-black text-gray-900">PKR 1,256,750</div>
                  <div className="text-[10px] font-medium text-green-500 mt-1 flex items-center gap-1">
                    ↑ 12.5% <span className="text-gray-400 font-normal">from last month</span>
                  </div>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(value) => `${value / 1000}k`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                        formatter={(value: any) => [`PKR ${value.toLocaleString()}`, 'Revenue']}
                      />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-4">Payment Methods Breakdown</h3>
                <div className="flex gap-4 items-center">
                  <div className="w-28 h-28 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethodsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {paymentMethodsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', padding: '4px 8px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-bold text-gray-800 mb-[-2px]">PKR</span>
                      <span className="text-[11px] font-black text-gray-900 leading-none">1,256,750</span>
                      <span className="text-[9px] text-gray-400 mt-0.5">Total</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {paymentMethodsData.map((method, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: method.color }}></div>
                          <span className="font-bold text-gray-700">{method.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{method.value}%</div>
                          <div className="text-[8px] text-gray-400">{method.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800 text-sm">Recent Transactions</h3>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-600">INV-2024-1248</div>
                        <div className="text-[10px] font-medium text-gray-600">Ali Hassan</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-600 mb-1">Paid</span>
                      <div className="text-xs font-black text-gray-900">PKR 25,000</div>
                      <div className="text-[9px] text-gray-400">May 20, 2024</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-600">INV-2024-1247</div>
                        <div className="text-[10px] font-medium text-gray-600">Ayesha Khan</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-50 text-orange-500 mb-1">Partial</span>
                      <div className="text-xs font-black text-gray-900">PKR 10,000</div>
                      <div className="text-[9px] text-gray-400">May 20, 2024</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-600">INV-2024-1246</div>
                        <div className="text-[10px] font-medium text-gray-600">Muhammad Imran</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-500 mb-1">Unpaid</span>
                      <div className="text-xs font-black text-gray-900">PKR 32,000</div>
                      <div className="text-[9px] text-gray-400">May 19, 2024</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-600">INV-2024-1245</div>
                        <div className="text-[10px] font-medium text-gray-600">Fatima Noor</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-600 mb-1">Paid</span>
                      <div className="text-xs font-black text-gray-900">PKR 12,800</div>
                      <div className="text-[9px] text-gray-400">May 19, 2024</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
    </main>
  );
}
