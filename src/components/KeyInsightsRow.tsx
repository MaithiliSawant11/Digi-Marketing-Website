import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Star, Crown, BarChart2, Users, Edit3, X, Check } from 'lucide-react';
import { DashboardData } from '../types';

interface KeyInsightsRowProps {
  insights: DashboardData['keyInsights'];
  totalInvestors: number;
  onUpdateInsights?: (payload: Partial<DashboardData['keyInsights']>) => void;
  canEdit?: boolean;
}

export const KeyInsightsRow: React.FC<KeyInsightsRowProps> = ({
  insights,
  totalInvestors,
  onUpdateInsights,
  canEdit = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [salesGrowthPct, setSalesGrowthPct] = useState(insights.salesGrowthPct.toString());
  const [salesGrowthNote, setSalesGrowthNote] = useState(insights.salesGrowthNote || '');
  const [bestCategoryName, setBestCategoryName] = useState(insights.bestCategoryName || '');
  const [bestCategoryNote, setBestCategoryNote] = useState(insights.bestCategoryNote || '');
  const [topProductName, setTopProductName] = useState(insights.topProductName || '');
  const [topProductNote, setTopProductNote] = useState(insights.topProductNote || '');
  const [monthlyAvgRevenue, setMonthlyAvgRevenue] = useState(insights.monthlyAvgRevenue || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateInsights) {
      onUpdateInsights({
        salesGrowthPct: Number(salesGrowthPct),
        salesGrowthNote,
        bestCategoryName,
        bestCategoryNote,
        topProductName,
        topProductNote,
        monthlyAvgRevenue,
      });
    }
    setIsEditing(false);
  };

  const isPositiveGrowth = insights.salesGrowthPct >= 0;

  return (
    <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)] text-slate-100">
      <div className="flex items-center justify-between mb-3.5 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center text-cyan-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
              <path d="M9 18h6"></path>
              <path d="M10 22h4"></path>
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-cyan-300 tracking-tight">
            Key Insights
          </h2>
        </div>

        {canEdit && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Insights</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* 1. Total Sales Growth */}
        <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-3.5 flex items-start gap-3 min-w-0 overflow-hidden">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isPositiveGrowth ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950 text-rose-400 border border-rose-500/30'}`}>
            {isPositiveGrowth ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-[11px] font-bold text-slate-400 leading-tight truncate">
              Total Sales Growth
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 tracking-tight mt-1 truncate">
              {isPositiveGrowth ? `+${insights.salesGrowthPct}%` : `${insights.salesGrowthPct}%`}
            </div>
            <div className="text-[10px] text-slate-400 font-medium truncate">
              {insights.salesGrowthNote || 'Pacing'}
            </div>
          </div>
        </div>

        {/* 2. Best Performing Category */}
        <div className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-3.5 flex items-start gap-3 min-w-0 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Star className="w-4 h-4 fill-purple-400/30" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-[11px] font-bold text-slate-400 leading-tight truncate">
              Best Performing Category
            </div>
            <div className="text-xs sm:text-sm font-black text-purple-300 tracking-tight mt-1 truncate" title={insights.bestCategoryName}>
              {insights.bestCategoryName}
            </div>
            <div className="text-[10px] text-slate-400 font-medium truncate" title={insights.bestCategoryNote}>
              {insights.bestCategoryNote}
            </div>
          </div>
        </div>

        {/* 3. Top Product */}
        <div className="bg-slate-950/70 border border-pink-500/30 rounded-xl p-3.5 flex items-start gap-3 min-w-0 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-pink-950 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
            <Crown className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-[11px] font-bold text-slate-400 leading-tight truncate">
              Top Product
            </div>
            <div className="text-xs sm:text-sm font-black text-pink-300 tracking-tight mt-1 truncate" title={insights.topProductName}>
              {insights.topProductName}
            </div>
            <div className="text-[10px] text-slate-400 font-medium truncate" title={insights.topProductNote}>
              {insights.topProductNote}
            </div>
          </div>
        </div>

        {/* 4. Monthly Average Revenue */}
        <div className="bg-slate-950/70 border border-cyan-500/30 rounded-xl p-3.5 flex items-start gap-3 min-w-0 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-[11px] font-bold text-slate-400 leading-tight truncate">
              Monthly Average Revenue
            </div>
            <div className="text-base sm:text-lg font-black text-cyan-300 tracking-tight mt-1 truncate">
              {insights.monthlyAvgRevenue}
            </div>
          </div>
        </div>

        {/* 5. Total Investors */}
        <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3 min-w-0 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-[11px] font-bold text-slate-400 leading-tight truncate">
              Total Investors
            </div>
            <div className="text-base sm:text-lg font-black text-amber-300 tracking-tight mt-1 truncate">
              {totalInvestors} <span className="text-xs font-semibold text-slate-400">(INR + NRI)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Insights Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Key Insights Highlights</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sales Growth %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={salesGrowthPct}
                    onChange={(e) => setSalesGrowthPct(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Growth Note</label>
                  <input
                    type="text"
                    value={salesGrowthNote}
                    onChange={(e) => setSalesGrowthNote(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Best Performing Category Name</label>
                <input
                  type="text"
                  value={bestCategoryName}
                  onChange={(e) => setBestCategoryName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Detail Note</label>
                <input
                  type="text"
                  value={bestCategoryNote}
                  onChange={(e) => setBestCategoryNote(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Top Product Name</label>
                <input
                  type="text"
                  value={topProductName}
                  onChange={(e) => setTopProductName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Top Product Note</label>
                <input
                  type="text"
                  value={topProductNote}
                  onChange={(e) => setTopProductNote(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Average Revenue Text</label>
                <input
                  type="text"
                  value={monthlyAvgRevenue}
                  onChange={(e) => setMonthlyAvgRevenue(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3.5 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Save Insights
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

