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
        className="bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-[0_0_15px_rgba(6,182,212,0.12)] hover:border-cyan-400 transition-all cursor-pointer text-slate-100 group"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/30 shrink-0 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 leading-tight">
              Total Revenue
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              (Live Accumulated)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            {formatINR(data.totalSales2Years)}
          </div>
          <div className="text-[11px] text-cyan-400 font-medium mt-1">
            Real-time synced
          </div>
        </div>
      </div>

      {/* 2. Target Goal */}
      <div 
        onClick={() => onCardClick && onCardClick('target')}
        className="bg-slate-900/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-[0_0_15px_rgba(16,185,129,0.12)] hover:border-emerald-400 transition-all cursor-pointer text-slate-100 group"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-emerald-300 leading-tight">
              Target Goal
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              (Calibrated)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
            {formatINR(data.targetGoal)}
          </div>
          <div className="text-[11px] text-emerald-300/90 font-medium mt-1">
            Current Target
          </div>
        </div>
      </div>

      {/* 3. Active Products */}
      <div 
        onClick={() => onCardClick && onCardClick('products')}
        className="bg-slate-900/85 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-[0_0_15px_rgba(168,85,247,0.12)] hover:border-purple-400 transition-all cursor-pointer text-slate-100 group"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-500/30 shrink-0 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-purple-300 leading-tight">
              Active Products
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              (Catalog Items)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-purple-300 tracking-tight">
            {data.topProducts ? data.topProducts.length : 0} Items
          </div>
          <div className="text-[11px] text-purple-400 font-medium mt-1">
            Top Performing SKUs
          </div>
        </div>
      </div>

      {/* 4. August 2026 Sales */}
      <div 
        onClick={() => onCardClick && onCardClick('aug-2026')}
        className="bg-slate-900/85 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:border-amber-400 transition-all cursor-pointer text-slate-100 group"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 flex items-center justify-center text-amber-400 border border-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 leading-tight">
              August 2026 Sales
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              (Prior Month)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            {formatINR(data.salesAugust2026)}
          </div>
          <div className="text-[11px] text-amber-400 font-medium mt-1">
            Completed Period
          </div>
        </div>
      </div>

      {/* 5. September 2026 Sales */}
      <div 
        onClick={() => onCardClick && onCardClick('sep-2026')}
        className="bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-[0_0_15px_rgba(6,182,212,0.12)] hover:border-cyan-400 transition-all cursor-pointer text-slate-100 group"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/30 shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 leading-tight">
              September 2026 Sales
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              (Active Cycle)
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-cyan-300 tracking-tight">
            {formatINR(data.salesSeptember2026)}
          </div>
          <div className="text-[11px] text-cyan-400 font-medium mt-1">
            Current Month Pacing
          </div>
        </div>
      </div>

    </div>
  );
};
