"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Pill, Package, AlertCircle, ShoppingCart, DollarSign, 
  Search, ChevronDown, Plus, Eye, Edit, Trash2, 
  ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, ArrowDownRight, RefreshCw, Settings2,
  FileText
} from 'lucide-react';

const DEFAULT_MEDICINES = [
  { id: 'MED-0001', name: 'Paracetamol 500mg', category: 'Tablet', supplier: 'HealthCare Ltd.', stock: 450, unit: 'Tablet', price: '2.50', expiry: '30 Jun, 2025', status: 'In Stock', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop' },
  { id: 'MED-0002', name: 'Amoxicillin 250mg', category: 'Capsule', supplier: 'MediLife Pvt. Ltd.', stock: 120, unit: 'Capsule', price: '8.00', expiry: '15 Aug, 2025', status: 'Low Stock', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop' },
  { id: 'MED-0003', name: 'Cough Syrup 100ml', category: 'Syrup', supplier: 'PharmaCorp', stock: 75, unit: 'Bottle', price: '35.00', expiry: '10 Jul, 2024', status: 'Low Stock', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop' },
  { id: 'MED-0004', name: 'Cetirizine 10mg', category: 'Tablet', supplier: 'HealthCare Ltd.', stock: 0, unit: 'Tablet', price: '3.50', expiry: '20 Oct, 2024', status: 'Out of Stock', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop' },
  { id: 'MED-0005', name: 'Omeprazole 20mg', category: 'Capsule', supplier: 'MediLife Pvt. Ltd.', stock: 60, unit: 'Capsule', price: '6.00', expiry: '05 Jun, 2024', status: 'Expired', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop' },
  { id: 'MED-0006', name: 'Vitamin D3 60K', category: 'Capsule', supplier: 'PharmaCorp', stock: 200, unit: 'Capsule', price: '12.00', expiry: '12 Nov, 2024', status: 'In Stock', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop' },
];

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState('Medicine Inventory');
  const [medicines, setMedicines] = useState<{id:string; name:string; category:string; supplier:string; stock:number; unit:string; price:string; expiry:string; status:string; img:string}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pharmacy_medicines');
    if (saved) {
      setMedicines(JSON.parse(saved));
    } else {
      localStorage.setItem('pharmacy_medicines', JSON.stringify(DEFAULT_MEDICINES));
      setMedicines(DEFAULT_MEDICINES);
    }
  }, []);

  const handleDelete = (id: string) => {
    if(window.confirm('Are you sure you want to delete this medicine?')) {
      const updated = medicines.filter(m => m.id !== id);
      setMedicines(updated);
      localStorage.setItem('pharmacy_medicines', JSON.stringify(updated));
    }
  };

  const tabs = ['Medicine Inventory', 'Purchase', 'Sales', 'Returns', 'Stock Adjustments', 'Suppliers'];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center relative">
               <div className="w-2 h-2 bg-white rounded-full absolute -top-1 -right-1"></div>
               <div className="w-2 h-2 bg-white rounded-full absolute -bottom-1 -left-1"></div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Total Medicines</p>
            <h3 className="text-xl font-black text-gray-900 leading-tight">1,245</h3>
            <p className="text-[10px] font-medium text-gray-500">All Medicines</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#22c55e] flex items-center justify-center shrink-0 shadow-sm">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Low Stock</p>
            <h3 className="text-xl font-black text-gray-900 leading-tight">86</h3>
            <p className="text-[10px] font-medium text-gray-500">Reorder Required</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#f59e0b] flex items-center justify-center shrink-0 shadow-sm">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Expired Soon</p>
            <h3 className="text-xl font-black text-gray-900 leading-tight">24</h3>
            <p className="text-[10px] font-medium text-gray-500">Within 30 Days</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#a855f7] flex items-center justify-center shrink-0 shadow-sm">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Today's Sales</p>
            <h3 className="text-xl font-black text-gray-900 leading-tight">PKR 45,230</h3>
            <p className="text-[10px] font-medium text-gray-500">20 May, 2024</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#14b8a6] flex items-center justify-center shrink-0 shadow-sm">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Total Sales</p>
            <h3 className="text-xl font-black text-gray-900 leading-tight">PKR 1,256,780</h3>
            <p className="text-[10px] font-medium text-gray-500">This Month</p>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-8 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
              activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid xl:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-xs">
                <input 
                  type="text" 
                  placeholder="Search medicine by name, code..." 
                  className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              
              <div className="relative">
                <select className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option>All Categories</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option>All Suppliers</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option>All Status</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <Link href="/admin/pharmacy/add-medicine" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Add Medicine
            </Link>
          </div>

          {/* Medicine Inventory Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-black text-gray-900">Medicine Inventory</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-5 text-[11px] font-black text-gray-800 uppercase tracking-wide">Medicine Name<br/><span className="text-[10px] font-bold text-gray-500 normal-case">Code</span></th>
                    <th className="py-3 px-5 text-[11px] font-black text-gray-800 uppercase tracking-wide">Category<br/><span className="text-[10px] font-bold text-gray-500 normal-case">Supplier</span></th>
                    <th className="py-3 px-5 text-[11px] font-black text-gray-800 uppercase tracking-wide">Stock<br/><span className="text-[10px] font-bold text-gray-500 normal-case">Unit</span></th>
                    <th className="py-3 px-5 text-[11px] font-black text-gray-800 uppercase tracking-wide">Price<br/><span className="text-[10px] font-bold text-gray-500 normal-case">(PKR)</span></th>
                    <th className="py-3 px-5 text-[11px] font-black text-gray-800 uppercase tracking-wide">Expiry Date</th>
                    <th className="py-3 px-5 text-[11px] font-black text-gray-800 uppercase tracking-wide">Status</th>
                    <th className="py-3 px-5 text-[11px] font-black text-gray-800 uppercase tracking-wide text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {medicines.map((med, idx) => (
                    <tr key={med.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded border border-gray-200 bg-white p-0.5 overflow-hidden shrink-0">
                            <img src={med.img} alt={med.name} className="w-full h-full object-cover rounded-sm" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-[11px]">{med.name}</p>
                            <p className="text-[10px] font-bold text-gray-400">{med.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <p className="font-bold text-gray-800 text-[11px]">{med.category}</p>
                        <p className="text-[10px] font-bold text-gray-400">{med.supplier}</p>
                      </td>
                      <td className="py-3 px-5">
                        <p className="font-bold text-gray-800 text-[11px]">{med.stock}</p>
                        <p className="text-[10px] font-bold text-gray-400">{med.unit}</p>
                      </td>
                      <td className="py-3 px-5 font-bold text-gray-800 text-[11px]">{med.price}</td>
                      <td className="py-3 px-5 font-bold text-gray-800 text-[11px]">{med.expiry}</td>
                      <td className="py-3 px-5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          med.status === 'In Stock' ? 'bg-green-50 text-green-600 border border-green-100' :
                          med.status === 'Low Stock' ? 'bg-orange-50 text-orange-500 border border-orange-100' :
                          med.status === 'Out of Stock' ? 'bg-red-50 text-red-500 border border-red-100' :
                          'bg-red-50 text-red-500 border border-red-100'
                        }`}>
                          {med.status}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                          <Link href={`/admin/pharmacy/add-medicine?edit=${med.id}`} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Edit"><Edit className="w-4 h-4" /></Link>
                          <button onClick={() => handleDelete(med.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500">Showing 1 to 6 of 1,245 entries</span>
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-3.5 h-3.5" /></button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white font-bold text-[11px]">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-[11px] transition-colors">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-[11px] transition-colors">3</button>
                <span className="w-7 h-7 flex items-center justify-center text-gray-400 text-[11px] font-bold">...</span>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-[11px] transition-colors">208</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"><ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
          
          {/* Alerts Area */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Low Stock Alert */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-black text-gray-900">Low Stock Alert</h3>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800">Medicine Name</th>
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800 text-center">Current Stock</th>
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800 text-center">Reorder Level</th>
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800">Amoxicillin 250mg</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800 text-center">120</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800 text-center">150</td>
                      <td className="py-2.5 px-4 text-center">
                        <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">Reorder</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800">Cough Syrup 100ml</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800 text-center">75</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800 text-center">100</td>
                      <td className="py-2.5 px-4 text-center">
                        <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">Reorder</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800">Omeprazole 20mg</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800 text-center">60</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800 text-center">80</td>
                      <td className="py-2.5 px-4 text-center">
                        <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">Reorder</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expiry Alert */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-black text-gray-900">Expiry Alert <span className="text-gray-500 font-bold text-[11px]">(Within 30 Days)</span></h3>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center">View All <ChevronRight className="w-3.5 h-3.5" /></Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800">Medicine Name</th>
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800">Expiry Date</th>
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800 text-center">Days Left</th>
                      <th className="py-2.5 px-4 text-[11px] font-black text-gray-800 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800">Omeprazole 20mg</td>
                      <td className="py-2.5 px-4 text-[10px] font-bold text-gray-500">05 Jun, 2024</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-red-500 text-center">16 Days</td>
                      <td className="py-2.5 px-4 text-center">
                        <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">View</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800">Cough Syrup 100ml</td>
                      <td className="py-2.5 px-4 text-[10px] font-bold text-gray-500">10 Jul, 2024</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-red-500 text-center">51 Days</td>
                      <td className="py-2.5 px-4 text-center">
                        <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">View</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-4 text-[11px] font-bold text-gray-800">Paracetamol 500mg</td>
                      <td className="py-2.5 px-4 text-[10px] font-bold text-gray-500">30 Jun, 2024</td>
                      <td className="py-2.5 px-4 text-[11px] font-bold text-red-500 text-center">41 Days</td>
                      <td className="py-2.5 px-4 text-center">
                        <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          
          {/* Stock Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-black text-gray-900 mb-6">Stock Summary</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 shrink-0">
                <div className="w-full h-full rounded-full" style={{ background: 'conic-gradient(#22c55e 0% 63.1%, #f59e0b 63.1% 70%, #ef4444 70% 74.3%, #a855f7 74.3% 76.2%, #f3f4f6 76.2% 100%)' }}></div>
                <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-sm font-black text-gray-900">1,245</span>
                  <span className="text-[9px] font-bold text-gray-500">Total</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#22c55e]"></div><span className="text-gray-800">In Stock</span></div>
                  <div className="text-right"><span className="text-gray-900">786</span> <span className="text-gray-400 font-medium">(63.1%)</span></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div><span className="text-gray-800">Low Stock</span></div>
                  <div className="text-right"><span className="text-gray-900">86</span> <span className="text-gray-400 font-medium">(6.9%)</span></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ef4444]"></div><span className="text-gray-800">Out of Stock</span></div>
                  <div className="text-right"><span className="text-gray-900">53</span> <span className="text-gray-400 font-medium">(4.3%)</span></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#a855f7]"></div><span className="text-gray-800">Expired</span></div>
                  <div className="text-right"><span className="text-gray-900">24</span> <span className="text-gray-400 font-medium">(1.9%)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900">Recent Transactions</h3>
              <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">View All</Link>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">Sale</p>
                    <p className="text-[9px] font-bold text-gray-500">INV-2024-1250</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-gray-900">PKR 2,450</p>
                  <p className="text-[9px] font-bold text-gray-500">20 May, 2024</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">Purchase</p>
                    <p className="text-[9px] font-bold text-gray-500">PO-2024-1056</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-gray-900">PKR 15,600</p>
                  <p className="text-[9px] font-bold text-gray-500">20 May, 2024</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">Sale Return</p>
                    <p className="text-[9px] font-bold text-gray-500">SR-2024-0045</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-gray-900">PKR 320</p>
                  <p className="text-[9px] font-bold text-gray-500">19 May, 2024</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">Purchase Return</p>
                    <p className="text-[9px] font-bold text-gray-500">PR-2024-0012</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-gray-900">PKR 850</p>
                  <p className="text-[9px] font-bold text-gray-500">19 May, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-black text-gray-900">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 p-4 gap-3">
              <Link href="/admin/pharmacy/add-medicine" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group">
                <Plus className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-blue-600">Add Medicine</span>
              </Link>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-colors group">
                <ShoppingCart className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-green-600">New Purchase</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors group">
                <ShoppingCart className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-orange-600">New Sale</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-colors group">
                <RefreshCw className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-purple-600">Sales Return</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-colors group">
                <FileText className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-red-600">Purchase Return</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors group">
                <Settings2 className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-teal-600">Stock Adjustment</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}
