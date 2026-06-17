"use client";

import { useState, cloneElement } from "react";
import { HeartPulse, Brain, Bone, Baby, Users, Smile, Stethoscope, Droplets, Ear, Eye, Beaker, Wind, Activity, Ribbon, Scissors, Siren, Microscope, Syringe, Radio, PersonStanding, ActivitySquare, X, Check } from "lucide-react";
import Link from "next/link";

export default function DepartmentGrid() {
  const [selectedDept, setSelectedDept] = useState<any>(null);

  const departments = [
    {
      name: "Cardiology",
      desc: "Comprehensive care for heart conditions with advanced diagnostics and treatment.",
      icon: <HeartPulse className="w-8 h-8 text-[#009e90]" strokeWidth={1.5} />,
      bgColor: "bg-[#e6f5f4]",
      iconColor: "text-[#009e90]",
      services: ["ECG & Echocardiography", "Heart Bypass Surgery", "Angioplasty & Stenting", "Cardiac Rehabilitation"]
    },
    {
      name: "Neurology",
      desc: "Expert care for brain, spine and nervous system disorders.",
      icon: <Brain className="w-8 h-8 text-[#8b5cf6]" strokeWidth={1.5} />,
      bgColor: "bg-[#f3e8ff]",
      iconColor: "text-[#8b5cf6]",
      services: ["Stroke Management", "Epilepsy Treatment", "Spinal Surgery", "Neuro-Rehabilitation"]
    },
    {
      name: "Orthopedics",
      desc: "Advanced care for bone, joint, spine and sports injuries.",
      icon: <Bone className="w-8 h-8 text-[#10b981]" strokeWidth={1.5} />,
      bgColor: "bg-[#d1fae5]",
      iconColor: "text-[#10b981]",
      services: ["Joint Replacement", "Sports Medicine", "Fracture Management", "Arthroscopy"]
    },
    {
      name: "Pediatrics",
      desc: "Complete healthcare services for infants, children and adolescents.",
      icon: <Baby className="w-8 h-8 text-[#f97316]" strokeWidth={1.5} />,
      bgColor: "bg-[#ffedd5]",
      iconColor: "text-[#f97316]",
      services: ["Vaccinations", "Child Nutrition", "Neonatal Care", "Pediatric Surgery"]
    },
    {
      name: "Gynecology",
      desc: "Women's health and pregnancy care by experienced specialists.",
      icon: <Users className="w-8 h-8 text-[#ec4899]" strokeWidth={1.5} />,
      bgColor: "bg-[#fce7f3]",
      iconColor: "text-[#ec4899]",
      services: ["Maternity Services", "Infertility Treatment", "Women's Wellness", "Minimally Invasive Surgery"]
    },
    {
      name: "Dermatology",
      desc: "Treatment for skin, hair, nail and cosmetic conditions.",
      icon: <Smile className="w-8 h-8 text-[#10b981]" strokeWidth={1.5} />,
      bgColor: "bg-[#d1fae5]",
      iconColor: "text-[#10b981]",
      services: ["Acne Treatment", "Laser Therapy", "Skin Cancer Screening", "Cosmetic Dermatology"]
    },
    {
      name: "Dental Care",
      desc: "Complete dental care services for healthy teeth and smile.",
      icon: <Stethoscope className="w-8 h-8 text-[#3b82f6]" strokeWidth={1.5} />,
      bgColor: "bg-[#dbeafe]",
      iconColor: "text-[#3b82f6]",
      services: ["Root Canal Therapy", "Teeth Whitening", "Dental Implants", "Orthodontics"]
    },
    {
      name: "Urology",
      desc: "Diagnosis and treatment of urinary tract and male reproductive issues.",
      icon: <Droplets className="w-8 h-8 text-[#10b981]" strokeWidth={1.5} />,
      bgColor: "bg-[#d1fae5]",
      iconColor: "text-[#10b981]",
      services: ["Kidney Stones Treatment", "Prostate Care", "Male Infertility", "Urologic Oncology"]
    },
    {
      name: "ENT",
      desc: "Care for ear, nose, throat and related head & neck disorders.",
      icon: <Ear className="w-8 h-8 text-[#eab308]" strokeWidth={1.5} />,
      bgColor: "bg-[#fef9c3]",
      iconColor: "text-[#eab308]",
      services: ["Hearing Tests", "Sinus Surgery", "Voice Disorders", "Pediatric ENT"]
    },
    {
      name: "Ophthalmology",
      desc: "Advanced eye care services and vision correction.",
      icon: <Eye className="w-8 h-8 text-[#3b82f6]" strokeWidth={1.5} />,
      bgColor: "bg-[#dbeafe]",
      iconColor: "text-[#3b82f6]",
      services: ["Cataract Surgery", "LASIK Vision Correction", "Glaucoma Treatment", "Retina Care"]
    },
    {
      name: "Gastroenterology",
      desc: "Treatment for digestive system and liver disorders.",
      icon: <Beaker className="w-8 h-8 text-[#10b981]" strokeWidth={1.5} />,
      bgColor: "bg-[#d1fae5]",
      iconColor: "text-[#10b981]",
      services: ["Endoscopy", "Colonoscopy", "Liver Disease Management", "IBS Treatment"]
    },
    {
      name: "Pulmonology",
      desc: "Expert care for lungs and respiratory system disorders.",
      icon: <Wind className="w-8 h-8 text-[#3b82f6]" strokeWidth={1.5} />,
      bgColor: "bg-[#dbeafe]",
      iconColor: "text-[#3b82f6]",
      services: ["Asthma Management", "COPD Treatment", "Sleep Apnea", "Lung Function Tests"]
    },
    {
      name: "Nephrology",
      desc: "Kidney care and treatment for chronic and acute kidney diseases.",
      icon: <Activity className="w-8 h-8 text-[#ec4899]" strokeWidth={1.5} />,
      bgColor: "bg-[#fce7f3]",
      iconColor: "text-[#ec4899]",
      services: ["Dialysis Services", "Kidney Stone Management", "Chronic Kidney Disease Care", "Hypertension Management"]
    },
    {
      name: "Oncology",
      desc: "Comprehensive cancer care with advanced treatment options.",
      icon: <Ribbon className="w-8 h-8 text-[#f97316]" strokeWidth={1.5} />,
      bgColor: "bg-[#ffedd5]",
      iconColor: "text-[#f97316]",
      services: ["Chemotherapy", "Radiation Therapy", "Surgical Oncology", "Cancer Screening"]
    },
    {
      name: "General Surgery",
      desc: "Advanced general and laparoscopic surgical services.",
      icon: <Scissors className="w-8 h-8 text-[#8b5cf6]" strokeWidth={1.5} />,
      bgColor: "bg-[#f3e8ff]",
      iconColor: "text-[#8b5cf6]",
      services: ["Laparoscopic Surgery", "Hernia Repair", "Appendectomy", "Gallbladder Surgery"]
    },
    {
      name: "Emergency Care",
      desc: "24/7 emergency services with quick and efficient medical care.",
      icon: <Siren className="w-8 h-8 text-[#ef4444]" strokeWidth={1.5} />,
      bgColor: "bg-[#fee2e2]",
      iconColor: "text-[#ef4444]",
      services: ["24/7 Trauma Care", "Intensive Care Unit (ICU)", "Ambulance Services", "Cardiac Emergency"]
    },
    {
      name: "Pathology",
      desc: "Accurate lab tests and reports for precise diagnosis.",
      icon: <Microscope className="w-8 h-8 text-[#3b82f6]" strokeWidth={1.5} />,
      bgColor: "bg-[#dbeafe]",
      iconColor: "text-[#3b82f6]",
      services: ["Blood Tests", "Biopsy", "Microbiology", "Clinical Chemistry"]
    },
    {
      name: "Anesthesiology",
      desc: "Safe anesthesia services and pain management solutions.",
      icon: <Syringe className="w-8 h-8 text-[#10b981]" strokeWidth={1.5} />,
      bgColor: "bg-[#d1fae5]",
      iconColor: "text-[#10b981]",
      services: ["General Anesthesia", "Local Anesthesia", "Pain Management", "Critical Care Support"]
    },
    {
      name: "Radiology",
      desc: "Advanced imaging services for accurate diagnosis.",
      icon: <Radio className="w-8 h-8 text-[#eab308]" strokeWidth={1.5} />,
      bgColor: "bg-[#fef9c3]",
      iconColor: "text-[#eab308]",
      services: ["X-Ray", "MRI Scan", "CT Scan", "Ultrasound"]
    },
    {
      name: "Physiotherapy",
      desc: "Rehabilitation and therapy for better movement and health.",
      icon: <PersonStanding className="w-8 h-8 text-[#8b5cf6]" strokeWidth={1.5} />,
      bgColor: "bg-[#f3e8ff]",
      iconColor: "text-[#8b5cf6]",
      services: ["Post-Surgery Rehab", "Sports Injury Recovery", "Pain Relief Therapy", "Mobility Training"]
    }
  ];

  return (
    <div className="w-full relative">
      <div className="mb-8">
        <h2 className="text-[22px] font-bold text-[#0a2b4e] mb-2">Explore Our Departments</h2>
        <div className="flex items-center gap-3">
          <ActivitySquare className="w-5 h-5 text-[#009e90]" />
          <p className="text-gray-500 text-[14px]">We provide a wide range of specialized medical services for you and your family.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-start transition hover:shadow-md cursor-pointer group" onClick={() => setSelectedDept(dept)}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${dept.bgColor}`}>
              {dept.icon}
            </div>
            <h3 className="text-[#0a2b4e] font-bold text-[15px] mb-2">{dept.name}</h3>
            <p className="text-gray-500 text-[12px] leading-relaxed mb-4 flex-grow">
              {dept.desc}
            </p>
            <button className={`text-[13px] font-semibold flex items-center gap-1 ${dept.iconColor} group-hover:translate-x-1 transition-all`}>
              Learn More <span>→</span>
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center lg:justify-start">
        <button className="bg-[#009e90] hover:bg-[#008f82] text-white px-6 py-2.5 rounded-md text-[14px] font-semibold transition shadow-md shadow-teal-900/20 flex items-center gap-2">
          View All Departments <span>→</span>
        </button>
      </div>

      {/* Unique Popup / Modal Design (Same to Same) */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-0">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0a2b4e]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedDept(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-[#f4f9f8] rounded-3xl w-full max-w-2xl relative z-10 overflow-y-auto max-h-[90vh] shadow-2xl animate-in fade-in zoom-in duration-200 p-6 md:p-8">
            <button 
              onClick={() => setSelectedDept(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 ${selectedDept.bgColor}`}>
                {cloneElement(selectedDept.icon, { className: `w-10 h-10 ${selectedDept.iconColor}` })}
              </div>
              <div className="pt-1">
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#0a2b4e] leading-tight mb-1">
                  {selectedDept.name} Department:<br/>Comprehensive {selectedDept.name === 'Cardiology' ? 'Heart' : selectedDept.name} Care
                </h3>
                <p className="text-gray-600 text-[14px]">Advanced Diagnostics and Treatment Options</p>
              </div>
            </div>

            {/* Body Area - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Overview */}
              <div>
                <h4 className="text-[#0a2b4e] text-[16px] font-bold mb-3">Department Overview</h4>
                <p className="text-gray-700 text-[13.5px] leading-relaxed">
                  Our department is dedicated to providing compassionate, evidence-based care for all stages of {selectedDept.name.toLowerCase()} conditions. From routine preventative screenings to complex interventions, our multi-disciplinary team uses the latest technology for precise diagnosis and effective treatment plans.
                </p>
              </div>

              {/* Key Services */}
              <div>
                <h4 className="text-[#0a2b4e] text-[16px] font-bold mb-3">Key Services Offered</h4>
                <ul className="space-y-2">
                  {selectedDept.services.map((service: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-700 text-[13px]">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#009e90]" strokeWidth={2.5} />
                      <span className="leading-tight">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Featured Specialists */}
            <div className="mb-8">
              <h4 className="text-[#0a2b4e] text-[16px] font-bold mb-4">Featured Specialists</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Dr. Sarah Sharma", exp: "20+ Years Experience", img: "/images/team_cmo.png" },
                  { name: "Dr. Rajesh Kumar", exp: "15+ Years Experience", img: "/images/team_ceo.png" },
                  { name: "Dr. Sarah Kumar", exp: "12+ Years Experience", img: "/images/team_nursing.png" },
                  { name: "Dr. Jariah Sharma", exp: "18+ Years Experience", img: "/images/team_ops.png" },
                ].map((doc, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-100 flex-shrink-0">
                      <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <h5 className="text-[#0a2b4e] text-[13px] font-bold leading-tight">{doc.name}</h5>
                      <p className="text-gray-500 text-[11px] mb-0.5">Chief {selectedDept.name} Specialist</p>
                      <p className="text-gray-400 text-[10px] font-medium">{doc.exp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Area */}
            <div className="border-t border-gray-200/60 pt-5 text-center">
              <button className="text-[#009e90] font-bold text-[16px] hover:text-[#008f82] transition inline-flex items-center gap-1.5">
                Schedule Consultation <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
