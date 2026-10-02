import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Calendar, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailySalesLog } from '../types';

interface UpdateDailyDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    amount: number;
    channel: string;
    campaignName: string;
    note: string;
    date: string;
  }) => Promise<void>;
  onDeleteDailyLog?: (id: string) => void;
  currentSepSales: number;
  targetGoal: number;
  recentLogs: DailySalesLog[];
  canEdit?: boolean;
}

export const UpdateDailyDataModal: React.FC<UpdateDailyDataModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDeleteDailyLog,
  currentSepSales,
  targetGoal,
  recentLogs,
  canEdit = true,
}) => {
  const [amount, setAmount] = useState('');
  const [channel, setChannel] = useState<'Meta Ads' | 'Google Ads' | 'Affiliate Marketing' | 'Organic / SEO' | 'Email Funnel' | 'Direct'>('Meta Ads');
  const [campaignName, setCampaignName] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(amount);
    if (isNaN(val) || val <= 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        amount: val,
        channel,
        campaignName: campaignName || `${channel} Performance`,
        note,
        date,
      });

      // Trigger confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setSuccessMsg(`₹${val.toLocaleString('en-IN')} added to September Sales!`);
      setAmount('');
      setNote('');
      setCampaignName('');

      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLog = (id: string) => {
    if (onDeleteDailyLog && window.confirm('Remove this daily sales log entry?')) {
      onDeleteDailyLog(id);
    }
  };

  const addPreset = (presetVal: number) => {
    const current = Number(amount) || 0;
    setAmount((current + presetVal).toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-cyan-500/40 text-slate-100 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400 leading-tight">
                Update Daily Marketing Data
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Synchronizes live into metrics & revenue charts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="py-12 text-center text-emerald-400 font-bold text-base flex flex-col items-center gap-2">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            
            {/* Target Progress Bar */}
            <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded-xl">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>September Sales Progress</span>
                <span className="font-extrabold text-cyan-400">
                  ₹{currentSepSales.toLocaleString('en-IN')} / ₹{targetGoal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((currentSepSales / targetGoal) * 100))}%`,
                  }}
                />
              </div>
            </div>

            {/* Sales Amount */}
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1">
                Daily Sales Revenue (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-extrabold text-slate-400">₹</span>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 text-sm font-bold text-slate-100 bg-slate-950 border border-cyan-500/40 rounded-xl focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>

              {/* Quick Preset Badges */}
              <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs">
                <span className="text-[11px] font-semibold text-slate-400">Quick Add:</span>
                {[1000, 2500, 5000, 10000, 25000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => addPreset(preset)}
                    className="px-2 py-0.5 rounded-md bg-cyan-950 hover:bg-cyan-900 text-cyan-300 font-semibold border border-cyan-500/40 text-[11px] transition-colors"
                  >
                    +₹{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Channel & Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-cyan-300 mb-1">
                  Marketing Channel
                </label>
                <select
                  value={channel}
                  onChange={(e: any) => setChannel(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-100 border border-cyan-500/40 rounded-xl focus:outline-none focus:border-cyan-400 bg-slate-950"
                >
                  <option value="Meta Ads">Meta Ads (FB/IG)</option>
                  <option value="Google Ads">Google Ads / PPC</option>
                  <option value="Affiliate Marketing">Affiliate Network</option>
                  <option value="Organic / SEO">Organic Search / SEO</option>
                  <option value="Email Funnel">Email Marketing</option>
                  <option value="Direct">Direct / Offline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 mb-1">
                  Log Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-100 border border-cyan-500/40 rounded-xl focus:outline-none focus:border-cyan-400 bg-slate-950"
                />
              </div>
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1">
                Campaign / Source Tag (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Smart Watches Retargeting Autumn 2026"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-100 bg-slate-950 border border-cyan-500/40 rounded-xl focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1">
                Daily Performance Notes
              </label>
              <textarea
                rows={2}
                placeholder="Key drivers, conversion ROAS, top SKU details..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-100 bg-slate-950 border border-cyan-500/40 rounded-xl focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !amount}
                className="px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? 'Syncing...' : 'Confirm & Update Dashboard'}
              </button>
            </div>
          </form>
        )}

        {/* Recent Daily Entries Log */}
        {recentLogs && recentLogs.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-cyan-300 mb-2">
              Recent Synchronized Logs
            </h4>
            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
              {recentLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{log.date}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">
                      {log.channel}
                    </span>
                    <span className="text-slate-400 truncate max-w-[140px]">{log.campaignName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-emerald-400">
                      +₹{log.amount.toLocaleString('en-IN')}
                    </span>
                    {canEdit && onDeleteDailyLog && (
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="text-slate-400 hover:text-red-400 p-0.5"
                        title="Delete log entry"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
