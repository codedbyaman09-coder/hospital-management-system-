"use client";

import React, { useState, useEffect } from 'react';
import { 
  BedDouble, Plus, Edit2, Trash2, Menu, ChevronRight, Search, ChevronDown, Download
} from 'lucide-react';
import BedFormModal from './BedFormModal';

export default function BedsRoomsPage() {
  const [beds, setBeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBed, setEditingBed] = useState<any | null>(null);
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/beds');
      const data = await res.json();
      if (data.success) {
        setBeds(data.data);
      }
    } catch (error) {
      console.error('Error fetching beds:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, statusFilter]);

  const uniqueTypes = Array.from(new Set(beds.map(b => b.roomType)));

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bed.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (bed.patientName && bed.patientName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'All Types' || bed.roomType === typeFilter;
    const matchesStatus = statusFilter === 'All Status' || bed.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBeds.length / itemsPerPage);
  const paginatedBeds = filteredBeds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredBeds.map(b => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this bed?')) {
      try {
        const res = await fetch(`/api/admin/beds/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setBeds(beds.filter(b => b.id !== id));
        }
      } catch (error) {
        console.error('Error deleting bed:', error);
      }
    }
  };

  const handleSave = async (bedData: any) => {
    try {
      const isEdit = !!bedData.id;
      const url = isEdit ? `/api/admin/beds/${bedData.id}` : '/api/admin/beds';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bedData)
      });
      const data = await res.json();
      
      if (data.success) {
        if (isEdit) {
          setBeds(beds.map(b => b.id === bedData.id ? data.data : b));
        } else {
          setBeds([data.data, ...beds]);
        }
        setIsModalOpen(false);
        setEditingBed(null);
      } else {
        alert('Failed to save bed');
      }
    } catch (error) {
      console.error('Error saving bed:', error);
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === 'Available') return 'bg-green-50 text-[#16a34a]';
    if (status === 'Occupied') return 'bg-red-50 text-red-500';
    if (status === 'Maintenance') return 'bg-orange-50 text-orange-500';
    return 'bg-gray-50 text-gray-500';
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col absolute top-0 right-0 bottom-0 left-0 lg:left-[260px] z-40 animate-in fade-in duration-200 overflow-y-auto">
      
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900 leading-tight">Beds & Rooms</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">Beds & Rooms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-[1400px] mx-auto w-full space-y-6">
        
        <div className="flex justify-end items-center gap-4">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-[#5e35b1] text-white rounded-lg hover:bg-[#512da8] transition-colors text-sm font-medium shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Add Bed
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <BedDouble className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Beds</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{beds.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <BedDouble className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Available</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{beds.filter(b => b.status === 'Available').length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <BedDouble className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Occupied</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{beds.filter(b => b.status === 'Occupied').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] w-full overflow-hidden">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-3 border-b border-gray-100 gap-3 bg-white">
            <div className="flex gap-3 md:gap-5 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              {['All Status', 'Available', 'Occupied', 'Maintenance'].map(tab => (
                <button key={tab} onClick={() => setStatusFilter(tab)} className={`text-[12px] font-semibold transition-colors whitespace-nowrap ${statusFilter === tab ? 'text-[#5e35b1]' : 'text-[#475569] hover:text-[#1e293b]'}`}>{tab}</button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-md text-[12px] font-semibold text-[#475569] outline-none focus:ring-[#5e35b1] focus:border-[#5e35b1] bg-white">
                <option value="All Types">All Types</option>
                {uniqueTypes.map(t => (
                  <option key={t as string} value={t as string}>{t as string}</option>
                ))}
              </select>
              
              <input 
                type="text" 
                placeholder="Search bed, room, patient..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-7 py-1.5 border border-gray-200 rounded-md text-[12px] font-medium outline-none w-32 sm:w-48 bg-white focus:border-[#5e35b1] focus:ring-[#5e35b1]" 
              />
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 font-bold bg-gray-50 rounded-lg border-b-4 border-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Room / Bed</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Patient Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {paginatedBeds.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-[13px] font-medium">
                      No beds found.
                    </td>
                  </tr>
                ) : (
                  paginatedBeds.map((bed, index) => (
                    <tr key={bed.id} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 text-xs font-semibold text-gray-500">{bed.id?.toString().slice(-6) || 'NEW'}</td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800 text-[13px]">{bed.roomNumber} / {bed.bedNumber}</div>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{bed.roomType}</td>
                      <td className="px-4 py-4 font-medium text-gray-600 text-[13px]">{bed.patientName || '-'}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                          bed.status === 'Available' ? 'bg-green-50 text-green-500' :
                          bed.status === 'Occupied' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                        }`}>{bed.status}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => setEditingBed(bed)} className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-50 rounded-md transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(bed.id)} className="p-1.5 text-red-500 hover:bg-red-50 border border-red-50 rounded-md transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredBeds.length)} of {filteredBeds.length} entries</div>
            <div className="flex gap-1 items-center">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center border rounded-md disabled:opacity-50">&lt;</button>
              {[...Array(Math.min(5, totalPages))].map((_, idx) => (
                <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)} className={`w-8 h-8 flex items-center justify-center border rounded-md font-medium text-sm ${currentPage === idx + 1 ? 'bg-[#5e35b1] text-white' : 'hover:bg-gray-50'}`}>{idx + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center border rounded-md disabled:opacity-50">&gt;</button>
            </div>
          </div>

        </div>
      </div>

      {(isModalOpen || editingBed) && (
        <BedFormModal 
          onClose={() => { setIsModalOpen(false); setEditingBed(null); }} 
          onSave={handleSave} 
          initialData={editingBed} 
        />
      )}
    </div>
  );
}
