"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, ChevronDown, ArrowLeft, Image as ImageIcon, UploadCloud, 
  Info, Plus, Trash2, Calendar, FileText, Check, Shield, User, Package, Settings2, RotateCcw, X, Save
} from 'lucide-react';

export default function AddMedicinePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    genericName: '',
    category: '',
    manufacturer: '',
    supplier: '',
    supplierCode: '',
    contactPerson: '',
    phoneNumber: '',
    dosage: '',
    formType: '',
    unit: '',
    description: '',
    stock: 0,
    price: '',
    mrp: '',
    profit: '',
    reorderLevel: 0,
    tax: '',
    discount: '',
    batchNo: '',
    expiry: '',
    mfgDate: '',
    status: 'In Stock',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop'
  });

  useEffect(() => {
    // Check if we are editing an existing medicine
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
      setIsEditing(true);
      const saved = localStorage.getItem('pharmacy_medicines');
      if (saved) {
        const medicines = JSON.parse(saved);
        const medToEdit = medicines.find((m: any) => m.id === editId);
        if (medToEdit) {
          setFormData(prev => ({ ...prev, ...medToEdit }));
        }
      }
    } else {
      // Auto-generate code for new
      const code = 'MED-' + Math.floor(1000 + Math.random() * 9000);
      setFormData(prev => ({ ...prev, id: code }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.supplier || !formData.price) {
      alert("Please fill all required fields marked with *");
      return;
    }

    const saved = localStorage.getItem('pharmacy_medicines');
    let medicines = saved ? JSON.parse(saved) : [];

    // Determine status based on stock and expiry (simplified)
    let status = 'In Stock';
    if (Number(formData.stock) === 0) status = 'Out of Stock';
    else if (Number(formData.stock) < 20) status = 'Low Stock';
    
    const finalData = { ...formData, status };

    if (isEditing) {
      medicines = medicines.map((m: any) => m.id === formData.id ? finalData : m);
    } else {
      medicines.unshift(finalData); // Add to top
    }

    localStorage.setItem('pharmacy_medicines', JSON.stringify(medicines));
    router.push('/admin/pharmacy');
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
    // In a real app this would just reset form instead of routing, but since handleSave routes, we'd adjust logic.
    // For simplicity here, we'll just alert and reload or let handleSave route.
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] relative pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-6">
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/admin/pharmacy" className="hover:text-blue-600 transition-colors">Pharmacy</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-800">Medicine</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-gray-500">{isEditing ? 'Edit Medicine' : 'Add Medicine'}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{isEditing ? 'Edit Medicine' : 'Add Medicine'}</h1>
          <p className="text-sm font-bold text-gray-500 mt-1">{isEditing ? 'Modify existing medicine details' : 'Add new medicine to inventory'}</p>
        </div>
        <Link 
          href="/admin/pharmacy" 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Medicine List
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Section (col-span-8) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Row 1: Medicine Info & Image */}
          <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
            {/* Medicine Information */}
            <div className="md:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                Medicine Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Medicine Name <span className="text-red-500">*</span></label>
                  <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Enter medicine name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Generic Name <span className="text-red-500">*</span></label>
                  <input name="genericName" value={formData.genericName} onChange={handleChange} type="text" placeholder="Enter generic name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Medicine Code <span className="text-red-500">*</span></label>
                  <input name="id" value={formData.id} readOnly type="text" placeholder="Auto generated code" disabled className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed placeholder:text-gray-400 font-medium" />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-gray-600">
                    <option value="">Select category</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Manufacturer <span className="text-red-500">*</span></label>
                  <input name="manufacturer" value={formData.manufacturer || ''} onChange={handleChange} type="text" placeholder="Enter manufacturer name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Dosage / Strength <span className="text-red-500">*</span></label>
                  <input name="dosage" value={formData.dosage} onChange={handleChange} type="text" placeholder="Enter dosage (e.g. 500mg)" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-700">Form / Type <span className="text-red-500">*</span></label>
                  <select name="formType" value={formData.formType} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-gray-600">
                    <option value="">Select form type</option>
                    <option value="Solid">Solid</option>
                    <option value="Liquid">Liquid</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-700">Unit <span className="text-red-500">*</span></label>
                  <select name="unit" value={formData.unit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-gray-600">
                    <option value="">Select unit</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Bottle">Bottle</option>
                    <option value="Box">Box</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Description</label>
                  <div className="relative">
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Enter medicine description (optional)" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none placeholder:text-gray-400 font-medium text-gray-900"></textarea>
                    <span className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400">0/200</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medicine Image */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
              <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                Medicine Image
              </h3>
              
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group min-h-[200px]">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <UploadCloud className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs font-bold text-blue-600 text-center mb-1">Click to upload image</p>
                <p className="text-[10px] font-medium text-gray-500 text-center mb-3">or drag and drop</p>
                <p className="text-[9px] font-bold text-gray-400 text-center uppercase tracking-wider">JPG, PNG or WEBP (Max. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Row 2: Supplier Info & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Supplier Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-700">Supplier <span className="text-red-500">*</span></label>
                  <select name="supplier" value={formData.supplier} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-gray-600">
                    <option value="">Select supplier</option>
                    <option value="HealthCare Ltd.">HealthCare Ltd.</option>
                    <option value="MediLife Pvt. Ltd.">MediLife Pvt. Ltd.</option>
                    <option value="PharmaCorp">PharmaCorp</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Supplier Code</label>
                  <input name="supplierCode" value={formData.supplierCode} onChange={handleChange} type="text" placeholder="Auto generated" disabled className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed placeholder:text-gray-400 font-medium" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Contact Person</label>
                  <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} type="text" placeholder="Enter contact person" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Phone Number</label>
                  <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="text" placeholder="Enter phone number" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Additional Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-700">Storage Condition</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-gray-600">
                    <option>Select storage condition</option>
                    <option>Room Temperature</option>
                    <option>Refrigerated</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Shelf Location</label>
                  <input type="text" placeholder="Enter shelf location" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="controlled" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="controlled" className="text-xs font-bold text-gray-700 cursor-pointer">Controlled Medicine</label>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="active" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="active" className="text-xs font-bold text-gray-700 cursor-pointer">This medicine is active</label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Notes</label>
                <div className="relative">
                  <textarea rows={2} placeholder="Enter notes (optional)" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none placeholder:text-gray-400 font-medium text-gray-900"></textarea>
                  <span className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400">0/200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Medicine Composition */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              Medicine Composition (Active Ingredients)
            </h3>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="py-2.5 px-4 text-[11px] font-black text-gray-800 w-12">#</th>
                    <th className="py-2.5 px-4 text-[11px] font-black text-gray-800">Ingredient Name</th>
                    <th className="py-2.5 px-4 text-[11px] font-black text-gray-800">Quantity</th>
                    <th className="py-2.5 px-4 text-[11px] font-black text-gray-800">Unit</th>
                    <th className="py-2.5 px-4 text-[11px] font-black text-gray-800 w-16 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-3 px-4 text-xs font-bold text-gray-900">1</td>
                    <td className="py-3 px-4">
                      <input type="text" placeholder="Enter ingredient name" className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                    </td>
                    <td className="py-3 px-4">
                      <input type="text" placeholder="Enter quantity" className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <select className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-gray-600">
                          <option>Select unit</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 bottom-2 pointer-events-none" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors shadow-sm">
              <Plus className="w-3.5 h-3.5" />
              Add Another Ingredient
            </button>
          </div>

        </div>

        {/* Right Section (col-span-4) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Pricing & Stock Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-blue-600" />
              Pricing & Stock Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Purchase Price (PKR) <span className="text-red-500">*</span></label>
                <input type="number" placeholder="0.00" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Selling Price (PKR) <span className="text-red-500">*</span></label>
                <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="0.00" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">MRP (PKR)</label>
                <input name="mrp" value={formData.mrp} onChange={handleChange} type="number" placeholder="0.00" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Profit (%)</label>
                <input name="profit" value={formData.profit} onChange={handleChange} type="number" placeholder="0.00" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Current Stock <span className="text-red-500">*</span></label>
                <input name="stock" value={formData.stock} onChange={handleChange} type="number" placeholder="0" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Reorder Level <span className="text-red-500">*</span></label>
                <input name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} type="number" placeholder="0" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Tax / GST (%)</label>
                <div className="relative">
                  <select name="tax" value={formData.tax} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-gray-600">
                    <option value="">Select tax rate</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input type="checkbox" id="taxable" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                <label htmlFor="taxable" className="text-xs font-bold text-gray-700 cursor-pointer">This medicine is taxable</label>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Discount (%)</label>
                <input name="discount" value={formData.discount} onChange={handleChange} type="number" placeholder="0.00" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Batch No.</label>
                <input name="batchNo" value={formData.batchNo} onChange={handleChange} type="text" placeholder="Enter batch number" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Mfg. Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input name="mfgDate" value={formData.mfgDate} onChange={handleChange} type="text" placeholder="Select date" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Expiry Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input name="expiry" value={formData.expiry} onChange={handleChange} type="text" placeholder="e.g. 15 Aug, 2025" className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-900" />
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-5">
            <h3 className="text-sm font-black text-blue-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Quick Help
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <p className="text-xs font-medium text-gray-700 leading-relaxed">All fields marked with <span className="text-red-500">*</span> are required.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <p className="text-xs font-medium text-gray-700 leading-relaxed">Medicine code will be generated automatically.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <p className="text-xs font-medium text-gray-700 leading-relaxed">Upload clear image for better identification.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <p className="text-xs font-medium text-gray-700 leading-relaxed">Set reorder level to get low stock alerts.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <p className="text-xs font-medium text-gray-700 leading-relaxed">Check &quot;Controlled Medicine&quot; for restricted drugs.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white border-t border-gray-200 p-4 px-6 flex items-center justify-between z-10 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Save & Add Another
          </button>
          
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Save
          </button>

          <Link href="/admin/pharmacy" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm ml-2">
            <X className="w-4 h-4" />
            Cancel
          </Link>
        </div>

      </div>
    </main>
  );
}
