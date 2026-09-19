import React, { useState } from 'react';
import { MonthlyRevenueChart } from './MonthlyRevenueChart';
import { DashboardData, DailySalesLog } from '../types';
import { TrendingUp, DollarSign, Calendar, Filter, PlusCircle, Trash2 } from 'lucide-react';

interface SalesViewProps {
  data: DashboardData;
  onOpenDailyUpdate: () => void;
  onDeleteDailyLog?: (id: string) => void;
  canEdit?: boolean;
}

export const SalesView: React.FC<SalesViewProps> = ({
  data,
  onOpenDailyUpdate,
  onDeleteDailyLog,
  canEdit = true,
}) => {
  const [channelFilter, setChannelFilter] = useState<string>('All');

  const filteredLogs = data.dailyLogs.filter(
    (log) => channelFilter === 'All' || log.channel === channelFilter
  );

  const handleDelete = (id: string) => {
    if (onDeleteDailyLog && window.confirm('Delete this daily sales log entry?')) {
      onDeleteDailyLog(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Sales Performance & Attribution
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Daily logs, channel attribution, and 12-month revenue trajectory
          </p>
        </div>

        {canEdit && (
          <button
            onClick={onOpenDailyUpdate}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Daily Sales</span>
          </button>
        )}
      </div>

      {/* Monthly chart */}
      <MonthlyRevenueChart data={data.monthlyRevenue} />

      {/* Daily Sales Ledger */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-base font-bold text-slate-900">
            Real-Time Daily Sales Journal
          </h3>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none"
            >
              <option value="All">All Channels</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Affiliate Marketing">Affiliate Marketing</option>
              <option value="Organic / SEO">Organic / SEO</option>
              <option value="Email Funnel">Email Funnel</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredLogs.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs font-semibold bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              No daily sales logs found. Click "Record Daily Sales" to log entries.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Channel</th>
                  <th className="py-2.5 px-3">Campaign / Source</th>
                  <th className="py-2.5 px-3">Notes</th>
                  <th className="py-2.5 px-3">Recorded By</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                  {canEdit && <th className="py-2.5 px-2 text-center w-10"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 group">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{log.date}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        {log.channel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{log.campaignName || '-'}</td>
                    <td className="py-2.5 px-3 text-slate-500">{log.note || '-'}</td>
                    <td className="py-2.5 px-3 text-slate-600">{log.recordedBy}</td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-700 text-sm">
                      ₹{log.amount.toLocaleString('en-IN')}
                    </td>
                    {canEdit && (
                      <td className="py-2.5 px-2 text-center">
                        {onDeleteDailyLog && (
                          <button
                            onClick={() => handleDelete(log.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition-opacity"
                            title="Delete log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
