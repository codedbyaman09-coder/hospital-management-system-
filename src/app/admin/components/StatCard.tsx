import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  percentage: string;
  isPositive: boolean;
  timeframe?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconBgColor, 
  iconColor, 
  percentage, 
  isPositive,
  timeframe = "from last week"
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-0.5">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          <div className="flex items-center mt-1">
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-green-500 mr-1 stroke-[3]" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-red-500 mr-1 stroke-[3]" />
            )}
            <span className={`text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : '-'}{percentage}
            </span>
            <span className="text-xs text-gray-400 ml-1.5">{timeframe}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
