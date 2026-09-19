import React from 'react';
import { InvestorsTable } from './InvestorsTable';
import { InvestorItem } from '../types';
import { Users, Globe2, ShieldCheck, PieChart } from 'lucide-react';

interface InvestorsViewProps {
  investors: InvestorItem[];
  onUpdateInvestor: (id: number, payload: Partial<InvestorItem>) => void;
  onAddInvestor: (payload: { name: string; type: string; investmentLakh: number }) => void;
  onDeleteInvestor?: (id: number) => void;
  canEdit: boolean;
}

export const InvestorsView: React.FC<InvestorsViewProps> = ({
  investors,
  onUpdateInvestor,
  onAddInvestor,
  onDeleteInvestor,
  canEdit,
}) => {
  const totalLakh = investors.reduce((acc, i) => acc + i.investmentLakh, 0);
  const indianCount = investors.filter((i) => i.type === 'Indian').length;
  const nriCount = investors.filter((i) => i.type.includes('NRI')).length;

  const nriAmount = investors
    .filter((i) => i.type.includes('NRI'))
    .reduce((acc, i) => acc + i.investmentLakh, 0);

  const indianAmount = investors
    .filter((i) => i.type === 'Indian')
    .reduce((acc, i) => acc + i.investmentLakh, 0);

  return (
    <div className="space-y-6">
      {/* Portfolio Breakdown KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Total Investment Pool</div>
          <div className="text-2xl font-black text-slate-900 mt-1">₹{totalLakh.toFixed(2)} Lakh</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">{investors.length} Active Stakeholders</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">NRI Capital Inflow</div>
          <div className="text-2xl font-black text-purple-700 mt-1">₹{nriAmount.toFixed(2)} Lakh</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">{nriCount} Partners (UAE, USA, UK, etc.)</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Domestic Indian Capital</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">₹{indianAmount.toFixed(2)} Lakh</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">{indianCount} Domestic Angels</div>
        </div>
      </div>

      <InvestorsTable
        investors={investors}
        onUpdateInvestor={onUpdateInvestor}
        onAddInvestor={onAddInvestor}
        onDeleteInvestor={onDeleteInvestor}
        canEdit={canEdit}
      />
    </div>
  );
};
