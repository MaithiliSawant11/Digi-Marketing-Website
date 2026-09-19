import React from 'react';
import { BarChart3, Calendar } from 'lucide-react';
import { DashboardData } from '../types';

interface TopKpiCardsProps {
  data: DashboardData;
  onCardClick?: (cardKey: string) => void;
}

export const TopKpiCards: React.FC<TopKpiCardsProps> = ({ data, onCardClick }) => {
  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
      
      {/* 1. Total Sales */}
      <div 
        onClick={() => onCardClick && onCardClick('total')}
        className="bg-[#ebf4fe] border border-[#bcd7fb] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
              Total Revenue
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              (Live Accumulated)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatINR(data.totalSales2Years)}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Real-time synced
          </div>
        </div>
      </div>

      {/* 2. Target Goal */}
      <div 
        onClick={() => onCardClick && onCardClick('target')}
        className="bg-[#edfbf4] border border-[#b8ecd2] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
              Target Goal
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              (Calibrated)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatINR(data.targetGoal)}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Current Target
          </div>
        </div>
      </div>

      {/* 3. Active Products */}
      <div 
        onClick={() => onCardClick && onCardClick('products')}
        className="bg-[#f5efff] border border-[#d9c4fb] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-600 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
              Active Products
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              (Catalog Items)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {data.topProducts ? data.topProducts.length : 0} Items
          </div>
          <div className="text-[11px] text-purple-700 font-medium mt-1">
            Top Performing SKUs
          </div>
        </div>
      </div>

      {/* 4. August 2026 Sales */}
      <div 
        onClick={() => onCardClick && onCardClick('aug-2026')}
        className="bg-[#fef4ed] border border-[#fed6ba] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-600 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
              August 2026 Sales
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              (Prior Month)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatINR(data.salesAugust2026)}
          </div>
          <div className="text-[11px] text-orange-700 font-medium mt-1">
            Completed Period
          </div>
        </div>
      </div>

      {/* 5. September 2026 Sales */}
      <div 
        onClick={() => onCardClick && onCardClick('sep-2026')}
        className="bg-[#ebf8ff] border border-[#b8e4fc] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center text-sky-600 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
              September 2026 Sales
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              (Active Cycle)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatINR(data.salesSeptember2026)}
          </div>
          <div className="text-[11px] text-sky-700 font-medium mt-1">
            Current Month Pacing
          </div>
        </div>
      </div>

    </div>
  );
};
