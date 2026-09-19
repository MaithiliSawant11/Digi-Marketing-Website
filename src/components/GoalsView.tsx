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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" /> Current Phase Objective
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mt-1">
            Target: ₹{data.targetGoal.toLocaleString('en-IN')}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-lg">
            Scaling high-margin digital products and affiliate partner networks to achieve next level financial freedom.
          </p>
        </div>

        <button
          onClick={onOpenTargetEdit}
          className="px-4 py-2 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-50 transition-colors shrink-0"
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

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">Milestone Milestones & Velocity</h3>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>September 2026 Run Rate</span>
                <span className="text-emerald-600 font-extrabold">₹{data.salesSeptember2026.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(2, currentPacing)}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-semibold">Current Month Pacing (Sept):</span>
                <span className="font-bold text-slate-900">₹{data.salesSeptember2026.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-semibold">Prior Month Sales (Aug):</span>
                <span className="font-bold text-slate-900">₹{data.salesAugust2026.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-semibold">Total Accumulated Sales:</span>
                <span className="font-bold text-blue-700">₹{data.totalSales2Years.toLocaleString('en-IN')}</span>
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
