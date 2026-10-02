import React from 'react';
import { NextStepsWidget } from './NextStepsWidget';
import { KeyInsightsRow } from './KeyInsightsRow';
import { DashboardData } from '../types';
import { Target, Flag, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface GoalsViewProps {
  data: DashboardData;
  onToggleNextStep: (id: string) => void;
  onOpenTargetEdit: () => void;
  canEdit: boolean;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  data,
  onToggleNextStep,
  onOpenTargetEdit,
  canEdit,
}) => {
  const currentPacing = Math.min(100, Math.round((data.salesSeptember2026 / data.targetGoal) * 100));

  return (
    <div className="space-y-6">
      {/* Target Progress Banner */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" /> Current Phase Objective
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mt-1 text-cyan-300">
            Target: ₹{data.targetGoal.toLocaleString('en-IN')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Scaling high-margin digital products and affiliate partner networks to achieve financial growth goals.
          </p>
        </div>

        <button
          onClick={onOpenTargetEdit}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors shrink-0"
        >
          Calibrate Goal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NextStepsWidget
          steps={data.nextSteps}
          onToggleStep={onToggleNextStep}
          canEdit={canEdit}
        />

        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/30 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-cyan-400">Milestone Milestones & Velocity</h3>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>September 2026 Run Rate</span>
                <span className="text-emerald-400 font-extrabold">₹{data.salesSeptember2026.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(2, currentPacing)}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-400">Current Month Pacing (Sept):</span>
                <span className="font-bold text-slate-100">₹{data.salesSeptember2026.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-400">Prior Month Sales (Aug):</span>
                <span className="font-bold text-slate-100">₹{data.salesAugust2026.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-400">Total Accumulated Sales:</span>
                <span className="font-bold text-cyan-400">₹{data.totalSales2Years.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <KeyInsightsRow
        insights={data.keyInsights}
        totalInvestors={data.investors.length}
      />
    </div>
  );
};
