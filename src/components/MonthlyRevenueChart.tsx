import React, { useState } from 'react';
import { MonthlyRevenueItem, DailySalesLog } from '../types';
import { Calendar, BarChart2, TrendingUp, Filter } from 'lucide-react';

interface MonthlyRevenueChartProps {
  data: MonthlyRevenueItem[];
  dailyLogs?: DailySalesLog[];
  onOpenDailyUpdate?: () => void;
}

export const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({
  data,
  dailyLogs = [],
  onOpenDailyUpdate,
}) => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-09');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const formatINR = (val: number) => '₹' + val.toLocaleString('en-IN');

  // 1. DAILY DATA PREPARATION
  const filteredDailyLogs = dailyLogs.filter((log) => {
    if (!log.date) return false;
    return log.date.startsWith(selectedMonth);
  });

  const dailyBarsMap: Record<string, number> = {};
  filteredDailyLogs.forEach((log) => {
    const dayStr = log.date.substring(8, 10);
    dailyBarsMap[dayStr] = (dailyBarsMap[dayStr] || 0) + log.amount;
  });

  const dailyBarItems = Object.keys(dailyBarsMap)
    .sort()
    .map((day) => ({
      id: `day-${day}`,
      label: `Day ${day}`,
      subLabel: selectedMonth,
      revenue: dailyBarsMap[day],
      color: '#3b82f6',
    }));

  // 2. MONTHLY DATA PREPARATION
  const filteredMonthlyData = data.filter((item) => {
    if (selectedYear === 'all') return true;
    return item.year.toString() === selectedYear;
  });

  // 3. YEARLY DATA PREPARATION
  const yearlyMap: Record<number, number> = {};
  data.forEach((item) => {
    yearlyMap[item.year] = (yearlyMap[item.year] || 0) + item.revenue;
  });

  const yearlyBarItems = Object.keys(yearlyMap)
    .sort()
    .map((yearStr) => {
      const yr = Number(yearStr);
      return {
        id: `yr-${yr}`,
        label: `FY ${yr}`,
        subLabel: `Year ${yr}`,
        revenue: yearlyMap[yr],
        color: '#8b5cf6',
      };
    });

  // Active items based on current viewMode
  let activeItems: { id: string; label: string; subLabel?: string; revenue: number; color: string }[] = [];
  if (viewMode === 'daily') {
    activeItems = dailyBarItems;
  } else if (viewMode === 'yearly') {
    activeItems = yearlyBarItems;
  } else {
    activeItems = filteredMonthlyData.map((m) => ({
      id: m.id,
      label: `${m.month}`,
      subLabel: `${m.year}`,
      revenue: m.revenue,
      color: m.color || '#3b82f6',
    }));
  }

  const maxRev = Math.max(100, ...activeItems.map((d) => d.revenue));
  let maxY = 10000;
  if (maxRev <= 10000) {
    maxY = Math.max(1000, Math.ceil((maxRev * 1.25) / 500) * 500);
  } else if (maxRev <= 100000) {
    maxY = Math.ceil((maxRev * 1.2) / 5000) * 5000;
  } else {
    maxY = Math.ceil((maxRev * 1.15) / 50000) * 50000;
  }
  const yTicks = [maxY, Math.round(maxY * 0.75), Math.round(maxY * 0.5), Math.round(maxY * 0.25), 0];

  const availableYears = Array.from(new Set(data.map((item) => Number(item.year)))).sort((a: number, b: number) => a - b);
  const futureYears = [2026, 2027, 2028, 2029, 2030, 2031];
  const displayYears = Array.from(new Set([...availableYears, ...futureYears])).sort((a: number, b: number) => a - b);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
      
      {/* Top Header & View Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Revenue Generation Analytics</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Breakdown Flow: <strong className="text-blue-700">Daily → Monthly → Yearly</strong>
          </p>
        </div>

        {/* View Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('daily')}
            className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
              viewMode === 'daily'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
              viewMode === 'monthly'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('yearly')}
            className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
              viewMode === 'yearly'
                ? 'bg-white text-purple-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Yearly View
          </button>
        </div>
      </div>

      {/* Date & Filter Calendar Controls */}
      <div className="flex items-center justify-between gap-3 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex-wrap">
        {viewMode === 'daily' && (
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Select Month Calendar:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {viewMode === 'monthly' && (
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Filter Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Recorded Years</option>
              {displayYears.map((yr) => (
                <option key={yr} value={yr.toString()}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        )}

        {viewMode === 'yearly' && (
          <div className="text-xs font-semibold text-purple-700 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span>Annual Revenue Comparison across FY periods</span>
          </div>
        )}

        {onOpenDailyUpdate && (
          <button
            type="button"
            onClick={onOpenDailyUpdate}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 ml-auto transition-colors"
          >
            + Select Date & Add Sales
          </button>
        )}
      </div>

      {/* Chart Graphic Area */}
      <div className="relative pt-6 pb-2">
        {activeItems.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center text-center p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <p className="text-xs font-bold text-slate-600">
              {viewMode === 'daily'
                ? `No daily sales logged for ${selectedMonth} yet.`
                : 'No sales records found for this view filter.'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Use the "+ Select Date & Add Sales" calendar tool to record entries for any custom month.
            </p>
          </div>
        ) : (
          <div className="flex">
            {/* Y Axis Labels */}
            <div className="w-16 sm:w-20 shrink-0 flex flex-col justify-between text-[11px] sm:text-xs font-semibold text-slate-500 h-56 pr-2 text-right select-none">
              {yTicks.map((val) => (
                <span key={val} className="leading-none">
                  {formatINR(val)}
                </span>
              ))}
            </div>

            {/* Chart Area */}
            <div className="relative flex-1 h-56">
              {/* Grid Lines */}
              {yTicks.map((val, idx) => {
                const topPct = (idx / (yTicks.length - 1)) * 100;
                return (
                  <div
                    key={val}
                    style={{ top: `${topPct}%` }}
                    className="absolute left-0 right-0 border-b border-slate-100 -z-0"
                  />
                );
              })}

              {/* Bars */}
              <div className="absolute inset-0 flex items-end justify-between gap-1 sm:gap-2 px-1 z-10">
                {activeItems.map((item, idx) => {
                  const heightPct = Math.max(4, Math.min(100, (item.revenue / maxY) * 100));
                  const isHovered = hoveredIndex === idx;

                  return (
                    <div
                      key={item.id}
                      className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Top label */}
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold text-slate-700 mb-1 transition-transform group-hover:scale-105 whitespace-nowrap ${
                          isHovered ? 'text-blue-600 font-extrabold' : ''
                        }`}
                      >
                        {item.revenue >= 100000 
                          ? `${(item.revenue / 100000).toFixed(1)}L` 
                          : item.revenue > 0 
                            ? `₹${item.revenue.toLocaleString('en-IN')}` 
                            : '₹0'}
                      </span>

                      {/* Bar */}
                      <div
                        style={{
                          height: `${heightPct}%`,
                          backgroundColor: item.color,
                        }}
                        className="w-full max-w-[34px] rounded-t-sm transition-all duration-300 group-hover:brightness-95 group-hover:shadow-sm"
                      />

                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 z-30 bg-slate-900 text-white text-xs rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap pointer-events-none transform -translate-x-1/2 left-1/2">
                          <div className="font-bold">{item.label} {item.subLabel || ''}</div>
                          <div className="text-emerald-400 font-semibold">{formatINR(item.revenue)}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* X Axis Labels */}
        {activeItems.length > 0 && (
          <div className="flex ml-16 sm:ml-20 pt-2 border-t border-slate-200">
            <div className="flex-1 flex justify-between gap-1 sm:gap-2 px-1">
              {activeItems.map((item) => (
                <div key={item.id} className="flex-1 text-center flex flex-col items-center">
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 leading-tight">
                    {item.label}
                  </span>
                  {item.subLabel && (
                    <span className="text-[9px] sm:text-[10px] text-slate-400 leading-tight">
                      {item.subLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
