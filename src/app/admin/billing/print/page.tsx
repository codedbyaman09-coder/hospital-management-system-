"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { 
  ChevronLeft, PlusSquare, QrCode, User, UserCheck, 
  Printer, Download, Mail, Share2, Receipt, 
  ChevronDown, FileText, CheckCircle2, ChevronRight, Check, Eye
} from 'lucide-react';

export default function PrintInvoicePage() {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>(['INV-2024-1248', 'INV-2024-1247']);
  const [invoiceUrl, setInvoiceUrl] = useState('https://citycare.com.pk');

  useEffect(() => {
    // Agar hum localhost par test kar rahe hain, toh ek real internet URL dalenge
    // taaki mobile scanner error na de aur real website open karne ki koshish kare.
    // Jab ye live jayega toh apne aap real bill ka link ban jayega.
    if (window.location.hostname === 'localhost') {
      setInvoiceUrl('https://citycare.com.pk/admin/billing/invoice/INV-2024-1248');
    } else {
      setInvoiceUrl(window.location.href);
    }
  }, []);

  const toggleInvoiceSelection = (id: string) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter(i => i !== id));
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-50 text-green-600 border border-green-200';
      case 'Partial Paid': return 'bg-orange-50 text-orange-500 border border-orange-200';
      case 'Unpaid': return 'bg-red-50 text-red-500 border border-red-200';
      case 'Refunded': return 'bg-blue-50 text-blue-500 border border-blue-200';
      default: return 'bg-gray-50 text-gray-500 border border-gray-200';
    }
  };

  return (
    <>
      <style type="text/css" media="print">
        {`
          @page { size: auto; margin: 0mm; }
        `}
      </style>
      <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] print:p-6 print:bg-white">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/admin/billing" className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-md text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronLeft className="w-4 h-4" />
            Back to Invoice List
          </Link>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800 ml-4">
            Invoice Status : 
            <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-600 rounded-md border border-green-200 text-xs">
              <Check className="w-3.5 h-3.5" />
              Paid
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Area - Main Invoice & Bottom Table */}
        <div className="flex-1 flex flex-col gap-6 print:block">
          
          {/* Main Invoice Document */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 print:border-none print:shadow-none print:p-0">
            
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <PlusSquare className="w-5 h-5" />
                  </div>
                  <h1 className="text-xl font-black text-blue-600 tracking-tight">CityCare Hospital</h1>
                </div>
                <div className="text-xs text-gray-600 font-medium leading-relaxed">
                  123, Health Avenue, Medical District,<br />
                  Lahore, Punjab 54000, Pakistan
                </div>
                <div className="text-xs text-gray-600 font-medium mt-3 flex flex-col gap-1">
                  <p>📞 : +92 42 1234567</p>
                  <p>Email : info@citycare.com.pk</p>
                  <p>Website : www.citycare.com.pk</p>
                </div>
                <div className="text-xs font-bold text-gray-800 mt-4 flex gap-4">
                  <p>GST No : 1234567-8</p>
                  <p>NTN No : 1234567-8</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <h2 className="text-2xl font-black text-[#1e293b] tracking-wider mb-4">INVOICE</h2>
                <div className="grid grid-cols-[100px_auto] gap-x-2 gap-y-1 text-[11px] font-bold text-gray-800 text-left w-64 mb-3">
                  <span>Invoice No</span><span>: INV-2024-1248</span>
                  <div className="col-span-2 my-1">
                     <div className="h-6 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e9/UPC-A-036000291452.svg')] bg-cover bg-center bg-no-repeat opacity-80" style={{backgroundSize: '100% 100%'}}></div>
                  </div>
                  <span>Invoice Date</span><span>: May 20, 2024</span>
                  <span>Invoice Time</span><span>: 10:30 AM</span>
                  <span>UHID</span><span>: UHID-00001248</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 border border-gray-100 rounded-lg ml-4">
                <QRCode value={invoiceUrl} size={64} />
                <span className="text-[9px] font-bold mt-1 text-gray-500">Scan to View Bill</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <PlusSquare className="w-48 h-48" />
              </div>
              
              <div className="border border-blue-100 rounded-lg p-4 relative bg-blue-50/20">
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase">
                  <User className="w-4 h-4" />
                  PATIENT INFORMATION
                </div>
                <div className="grid grid-cols-[100px_auto] gap-y-2 text-[11px] font-bold text-gray-700">
                  <span>Patient ID</span><span>: PAT-000125</span>
                  <span>Patient Name</span><span>: Ali Hassan</span>
                  <span>Gender</span><span>: Male</span>
                  <span>Age</span><span>: 32 Years</span>
                  <span>Phone Number</span><span>: +92 300 1234567</span>
                  <span className="self-start mt-0.5">Address</span><span className="leading-tight">: 45-A, Lake View Society,<br/>  Lahore, Punjab, Pakistan</span>
                </div>
              </div>

              <div className="border border-blue-100 rounded-lg p-4 relative bg-blue-50/20">
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase">
                  <UserCheck className="w-4 h-4" />
                  DOCTOR INFORMATION
                </div>
                <div className="grid grid-cols-[100px_auto] gap-y-2 text-[11px] font-bold text-gray-700">
                  <span>Doctor Name</span><span>: Dr. Sarah Khan</span>
                  <span>Department</span><span>: Cardiology</span>
                  <span>Consultation Date</span><span>: May 20, 2024</span>
                  <span>Appointment ID</span><span>: APT-2024-2487</span>
                </div>
              </div>
            </div>

            {/* Billing Details Table */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase">
                <FileText className="w-4 h-4" />
                BILLING DETAILS
              </div>
              <table className="w-full text-left border border-gray-200">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-2 px-3 text-[11px] font-black text-gray-800 text-center w-12 border-r border-gray-200">#</th>
                    <th className="py-2 px-3 text-[11px] font-black text-gray-800 border-r border-gray-200">Service / Item</th>
                    <th className="py-2 px-3 text-[11px] font-black text-gray-800 text-center w-24 border-r border-gray-200">Qty</th>
                    <th className="py-2 px-3 text-[11px] font-black text-gray-800 text-right w-32 border-r border-gray-200">Price (PKR)</th>
                    <th className="py-2 px-3 text-[11px] font-black text-gray-800 text-right w-32">Total (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, name: 'Consultation Fee', qty: 1, price: '2,000.00', total: '2,000.00' },
                    { id: 2, name: 'Room Charges (General Ward)', qty: 1, price: '3,000.00', total: '3,000.00' },
                    { id: 3, name: 'Lab Test Charges', qty: 1, price: '1,200.00', total: '1,200.00' },
                    { id: 4, name: 'Pharmacy Charges', qty: 1, price: '1,450.00', total: '1,450.00' },
                    { id: 5, name: 'Surgery Charges', qty: 1, price: '15,000.00', total: '15,000.00' },
                    { id: 6, name: 'Other Charges', qty: 1, price: '300.00', total: '300.00' },
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 px-3 text-[11px] font-bold text-gray-700 text-center border-r border-gray-100">{item.id}</td>
                      <td className="py-2 px-3 text-[11px] font-bold text-gray-700 border-r border-gray-100">{item.name}</td>
                      <td className="py-2 px-3 text-[11px] font-bold text-gray-700 text-center border-r border-gray-100">{item.qty}</td>
                      <td className="py-2 px-3 text-[11px] font-bold text-gray-700 text-right border-r border-gray-100">{item.price}</td>
                      <td className="py-2 px-3 text-[11px] font-bold text-gray-700 text-right">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Info & Summary */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              
              {/* Payment Information */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase">
                  <FileText className="w-4 h-4" />
                  PAYMENT INFORMATION
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-[120px_auto] gap-y-2 text-[11px] font-bold text-gray-700 mb-4">
                    <span>Total Amount</span><span className="text-right">: PKR 22,950.00</span>
                    <span>Discount</span><span className="text-right">: PKR 1,150.00</span>
                    <span>Tax (GST 17%)</span><span className="text-right">: PKR 3,706.00</span>
                  </div>
                  
                  <div className="h-px bg-gray-200 w-full mb-4"></div>
                  
                  <div className="grid grid-cols-[120px_auto] gap-y-2 text-[11px] font-black text-gray-800 mb-4">
                    <span className="text-green-600">Paid Amount</span><span className="text-right text-green-600">: PKR 25,506.00</span>
                    <span className="text-green-600">Due Amount</span><span className="text-right text-green-600">: PKR 0.00</span>
                  </div>

                  <div className="h-px bg-gray-200 w-full mb-4"></div>

                  <div className="grid grid-cols-[120px_auto] gap-y-2 text-[11px] font-bold text-gray-700">
                    <span>Payment Method</span><span className="text-right">: Card</span>
                    <span>Transaction ID</span><span className="text-right">: TRX-53874521</span>
                    <span>Payment Date</span><span className="text-right">: May 20, 2024 10:30 AM</span>
                    <span>Remarks</span><span className="text-right">: Thank you!</span>
                  </div>
                </div>
              </div>

              {/* Amount Summary */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase">
                  <FileText className="w-4 h-4" />
                  AMOUNT SUMMARY
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-[#f8fafc]">
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-700 mb-3">
                    <span>Sub Total</span><span>PKR 22,950.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-700 mb-3">
                    <span>Discount</span><span className="text-red-500">- PKR 1,150.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-700 mb-4">
                    <span>GST (17%)</span><span>+ PKR 3,706.00</span>
                  </div>
                  
                  <div className="border-t-2 border-dashed border-gray-300 w-full my-4"></div>
                  
                  <div className="flex justify-between items-center text-sm font-black text-gray-900 mb-4">
                    <span>GRAND TOTAL</span><span className="text-blue-600">PKR 25,506.00</span>
                  </div>

                  <div className="border-t border-gray-200 w-full my-4"></div>

                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-700 mb-3">
                    <span className="text-green-600">Paid Amount</span><span className="text-green-600">PKR 25,506.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-700">
                    <span>DUE AMOUNT</span><span className="text-green-600">PKR 0.00</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Payment Method Selector */}
            <div className="mb-8 print:hidden">
              <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase">
                <UserCheck className="w-4 h-4" />
                PAYMENT METHOD
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                  <span className="text-green-600 font-black text-lg">$</span>
                  <span className="text-xs font-bold text-gray-700">Cash</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                  <span className="text-gray-800 font-black italic">UPI</span>
                  <span className="text-xs font-bold text-gray-700">UPI</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-blue-500 bg-blue-50 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-bl flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">Card</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-xs font-bold text-gray-700">Net Banking</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold text-gray-700">Insurance</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8 border-b border-gray-200 pb-8 print:hidden">
              <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors">
                <Printer className="w-4 h-4" />
                Print Invoice
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-red-700 transition-colors">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors">
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-purple-700 transition-colors">
                <Share2 className="w-4 h-4" />
                Share Invoice
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-md text-xs font-bold shadow-sm hover:bg-orange-600 transition-colors">
                <Receipt className="w-4 h-4" />
                Payment Receipt
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase">TERMS & CONDITIONS</h4>
                <ul className="text-[10px] text-gray-600 space-y-1 list-disc pl-4 font-medium">
                  <li>Please check all details carefully.</li>
                  <li>No refund once payment is made.</li>
                  <li>Report any discrepancy within 7 days.</li>
                  <li>This is a computer generated invoice.</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-[13px] font-black text-gray-900 mb-1">THANK YOU!</h3>
                <p className="text-[10px] text-gray-600 font-medium">
                  Thank you for choosing CityCare Hospital.<br/>
                  We wish you good health!
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="text-[10px] font-bold text-gray-900 mb-1 uppercase">AUTHORIZED SIGNATURE</h4>
                <div className="h-10 w-32 mb-1 flex items-center justify-center opacity-70 border-b border-gray-400">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Signature" className="h-8 object-contain" />
                </div>
                <span className="text-[9px] font-bold text-gray-600">Authorized Signatory</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-bold text-gray-500 mt-6 pt-4 border-t border-gray-200">
              <div className="flex gap-6">
                <span>Generated By : Admin</span>
                <span>Generated On : May 20, 2024 10:30 AM</span>
              </div>
              <span>Page 1 of 1</span>
            </div>

          </div>

          {/* Multiple Invoice Print Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-4 print:hidden">
            <h3 className="text-[11px] font-bold text-gray-900 uppercase mb-4">MULTIPLE INVOICE PRINT</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 px-2 w-8"><input type="checkbox" className="rounded text-blue-600 border-gray-300 focus:ring-blue-500" /></th>
                    <th className="pb-3 px-2 text-[10px] font-bold text-gray-800">Invoice No.</th>
                    <th className="pb-3 px-2 text-[10px] font-bold text-gray-800">Patient Name</th>
                    <th className="pb-3 px-2 text-[10px] font-bold text-gray-800">Invoice Date</th>
                    <th className="pb-3 px-2 text-[10px] font-bold text-gray-800">Total Amount</th>
                    <th className="pb-3 px-2 text-[10px] font-bold text-gray-800">Paid Amount</th>
                    <th className="pb-3 px-2 text-[10px] font-bold text-gray-800">Due Amount</th>
                    <th className="pb-3 px-2 text-[10px] font-bold text-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'INV-2024-1248', patient: 'Ali Hassan', date: 'May 20, 2024', total: 'PKR 25,506.00', paid: 'PKR 25,506.00', due: 'PKR 0.00', status: 'Paid' },
                    { id: 'INV-2024-1247', patient: 'Ayesha Khan', date: 'May 20, 2024', total: 'PKR 10,850.00', paid: 'PKR 2,350.00', due: 'PKR 8,500.00', status: 'Partial Paid' },
                    { id: 'INV-2024-1246', patient: 'Muhammad Imran', date: 'May 19, 2024', total: 'PKR 32,000.00', paid: 'PKR 0.00', due: 'PKR 32,000.00', status: 'Unpaid' },
                    { id: 'INV-2024-1245', patient: 'Fatima Noor', date: 'May 19, 2024', total: 'PKR 12,800.00', paid: 'PKR 12,800.00', due: 'PKR 0.00', status: 'Paid' },
                  ].map((inv, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2">
                        <input 
                          type="checkbox" 
                          checked={selectedInvoices.includes(inv.id)}
                          onChange={() => toggleInvoiceSelection(inv.id)}
                          className="rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer" 
                        />
                      </td>
                      <td className="py-3 px-2 text-[11px] font-bold text-blue-600">{inv.id}</td>
                      <td className="py-3 px-2 text-[11px] font-bold text-gray-800">{inv.patient}</td>
                      <td className="py-3 px-2 text-[11px] font-medium text-gray-600">{inv.date}</td>
                      <td className="py-3 px-2 text-[11px] font-bold text-gray-700">{inv.total}</td>
                      <td className="py-3 px-2 text-[11px] font-bold text-gray-700">{inv.paid}</td>
                      <td className="py-3 px-2 text-[11px] font-bold text-gray-700">{inv.due}</td>
                      <td className="py-3 px-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${getStatusColor(inv.status)}`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4">
              <span className="text-[10px] font-medium text-gray-500">{selectedInvoices.length} invoice(s) selected</span>
              <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded text-[11px] font-bold shadow-sm hover:bg-blue-700 transition-colors">
                <Printer className="w-3.5 h-3.5" />
                Print Selected ({selectedInvoices.length})
              </button>
            </div>
          </div>

        </div>

        {/* Right Area - Print Settings & Options */}
        <div className="w-80 flex flex-col gap-6 shrink-0 print:hidden">
          
          {/* Print Settings Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-black text-[#1e293b] tracking-wide mb-4">PRINT SETTINGS</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1.5">Template</label>
                <div className="relative">
                  <select className="w-full text-xs font-bold text-gray-800 border border-gray-200 rounded-md py-2 px-3 appearance-none focus:outline-none focus:border-blue-500">
                    <option>Standard Invoice</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1.5">Paper Size</label>
                <div className="relative">
                  <select className="w-full text-xs font-bold text-gray-800 border border-gray-200 rounded-md py-2 px-3 appearance-none focus:outline-none focus:border-blue-500">
                    <option>A4 (210 x 297 mm)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-2">Orientation</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-3 h-3 rounded-full border-4 border-blue-600 bg-white shadow-sm flex items-center justify-center">
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">Portrait</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-3 h-3 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                    </div>
                    <span className="text-[11px] font-bold text-gray-600">Landscape</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-2">Include</label>
                <div className="space-y-2.5">
                  {[
                    'Hospital Logo', 'Patient Information', 'Doctor Information', 
                    'Itemized Bill', 'Payment Information', 'Terms & Conditions', 'Signature'
                  ].map((label, idx) => (
                    <label key={idx} className="flex items-center gap-2.5 cursor-pointer">
                      <div className="w-3.5 h-3.5 rounded bg-blue-600 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-[11px] font-bold text-gray-800">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors mt-2">
                <Eye className="w-4 h-4" />
                Print Preview
              </button>
            </div>
          </div>

          {/* More Print Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-black text-[#1e293b] tracking-wide mb-4">MORE PRINT OPTIONS</h3>
            <div className="space-y-1">
              {[
                { icon: Printer, label: 'Multiple Invoice Print' },
                { icon: Printer, label: 'Bulk Print' },
                { icon: Receipt, label: 'Receipt Print' },
                { icon: FileText, label: 'Insurance Claim Print' },
                { icon: FileText, label: 'Lab Bill Print' },
                { icon: FileText, label: 'Pharmacy Bill Print' },
                { icon: User, label: 'Surgery Bill Print' },
                { icon: FileText, label: 'Admission Bill Print' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded hover:bg-gray-50 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-gray-800">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Invoice Status Guide */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-black text-[#1e293b] tracking-wide mb-4">INVOICE STATUS GUIDE</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-green-700">Paid</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-xs font-bold text-orange-600">Partial Paid</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-xs font-bold text-red-600">Unpaid</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-col gap-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-xs font-bold text-blue-600">Refunded</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                   <span className="text-[10px] font-black leading-none mt-px">₹</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    </>
  );
}
