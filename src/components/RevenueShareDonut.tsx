import React, { useState } from 'react';
import { CategoryShare } from '../types';

interface RevenueShareDonutProps {
  shares: CategoryShare[];
  totalRevenue?: number;
  totalLakh?: number;
}

export const RevenueShareDonut: React.FC<RevenueShareDonutProps> = ({ shares, totalRevenue, totalLakh = 0 }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customTotal, setCustomTotal] = useState<string>('');

  const formatINR = (val: number) => '₹' + val.toLocaleString('en-IN');
  const liveTotal = totalRevenue !== undefined ? totalRevenue : totalLakh * 100000;
  const displayVal = customTotal !== '' ? Number(customTotal) : liveTotal;

  const activeShares = shares.filter((s) => s.percentage > 0);

  // Calculate SVG donut paths
  const size = 220;
  const center = size / 2;
  const radius = 95;
  const strokeWidth = 36;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke-dasharray and stroke-dashoffset for each slice
  let accumulatedPercent = 0;
  const slices = activeShares.map((item, idx) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    const midAngle = (accumulatedPercent + item.percentage / 2) * 3.6 - 90; // in degrees
    accumulatedPercent += item.percentage;

    // Position for label on donut
    const rad = (midAngle * Math.PI) / 180;
    const labelRadius = radius;
    const labelX = center + labelRadius * Math.cos(rad);
    const labelY = center + labelRadius * Math.sin(rad);

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      labelX,
      labelY,
    };
  });

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-4">
        Revenue Share <span className="text-slate-500 font-normal text-sm sm:text-base">(By Category)</span>
      </h2>

      {activeShares.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs font-semibold bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          No category revenue data recorded yet. Add products to view dynamic category share breakdown.
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 min-w-0">
          {/* Donut Chart */}
          <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
              {slices.map((slice, idx) => (
                <circle
                  key={slice.id}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={hoveredIdx === idx ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              ))}
            </svg>

            {/* Labels on slices */}
            <div className="absolute inset-0 pointer-events-none">
              {slices.map((slice) => {
                if (slice.percentage < 8) return null;
                return (
                  <div
                    key={slice.id}
                    style={{
                      position: 'absolute',
                      left: `${(slice.labelX / size) * 100}%`,
                      top: `${(slice.labelY / size) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="text-[10px] sm:text-[11px] font-bold text-slate-800 drop-shadow-xs"
                  >
                    {slice.percentage}%
                  </div>
                );
              })}
            </div>

            {/* Center Hole Content (Total Revenue) */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-slate-500 leading-tight select-none">
                Total Revenue
              </span>
              {isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                  }}
                  className="mt-0.5"
                >
                  <input
                    type="number"
                    value={customTotal}
                    onChange={(e) => setCustomTotal(e.target.value)}
                    placeholder={liveTotal.toString()}
                    className="w-28 text-center text-xs font-bold px-1.5 py-0.5 border border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    autoFocus
                    onBlur={() => setIsEditing(false)}
                  />
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  title="Click to manually edit total revenue or let auto-sync"
                  className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-tight mt-0.5 hover:text-blue-600 transition-colors focus:outline-none px-1 py-0.5 rounded hover:bg-slate-100/60"
                >
                  {formatINR(displayVal)}
                </button>
              )}
            </div>
          </div>

          {/* Legend List */}
          <div className="flex-1 space-y-2 w-full min-w-0">
            {activeShares.map((share, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={share.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`flex items-center justify-between text-xs font-medium transition-colors cursor-pointer px-2 py-1 rounded-lg ${
                    isHovered ? 'bg-slate-50 font-bold text-slate-900' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: share.color }}
                    />
                    <span className="truncate text-slate-700" title={share.name}>{share.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0 whitespace-nowrap">
                    {share.percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
