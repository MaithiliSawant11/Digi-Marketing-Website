import React, { useState } from 'react';
import { X, Target, Check } from 'lucide-react';

interface TargetEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTarget: number;
  onSave: (newTarget: number) => Promise<void>;
}

export const TargetEditModal: React.FC<TargetEditModalProps> = ({
  isOpen,
  onClose,
  currentTarget,
  onSave,
}) => {
  const [val, setVal] = useState(currentTarget.toString());
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number(val);
    if (isNaN(parsed) || parsed <= 0) return;
    setSaving(true);
    try {
      await onSave(parsed);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full p-6 shadow-2xl border border-cyan-500/40 text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-cyan-400">
              Calibrate Target Goal
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-cyan-300 mb-1">
              Target Dashboard Value (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-cyan-500/40 rounded-xl font-bold text-slate-100 text-lg focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Original baseline: ₹28,00,000 (Current Goal)
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-lg"
            >
              {saving ? 'Updating...' : 'Save Target'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
