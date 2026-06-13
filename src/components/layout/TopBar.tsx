import { Phone, Mail, MapPin, Clock, User } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden lg:flex justify-between items-center px-4 lg:px-8 py-2.5 bg-[#fcfdfd] border-b border-gray-100 text-xs text-gray-500 font-medium">
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-gray-400" />
          <span>+92 300 1234567</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-gray-400" />
          <span>info@citycarehospital.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span>123, Health Street, Medical City, Pakistan</span>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-1.5 text-red-500 font-semibold tracking-wide">
          <Clock className="w-4 h-4" />
          <span>Emergency : 24/7</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 hover:text-[#0a335c] transition">
            <User className="w-3.5 h-3.5" /> Patient Login
          </button>
          <button className="flex items-center gap-1.5 hover:text-[#0a335c] transition">
            <User className="w-3.5 h-3.5" /> Staff Login
          </button>
        </div>
      </div>
    </div>
  );
}
