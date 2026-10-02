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
        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-lg">
          <div className="text-xs font-semibold text-cyan-400">Total Investment Pool</div>
          <div className="text-2xl font-black text-cyan-300 mt-1">₹{totalLakh.toFixed(2)} Lakh</div>
          <div className="text-xs text-cyan-400 font-semibold mt-1">{investors.length} Active Stakeholders</div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-lg">
          <div className="text-xs font-semibold text-purple-300">NRI Capital Inflow</div>
          <div className="text-2xl font-black text-purple-400 mt-1">₹{nriAmount.toFixed(2)} Lakh</div>
          <div className="text-xs text-purple-300 font-semibold mt-1">{nriCount} Partners (UAE, USA, UK, etc.)</div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-lg">
          <div className="text-xs font-semibold text-emerald-300">Domestic Indian Capital</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">₹{indianAmount.toFixed(2)} Lakh</div>
          <div className="text-xs text-emerald-300 font-semibold mt-1">{indianCount} Domestic Angels</div>
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
