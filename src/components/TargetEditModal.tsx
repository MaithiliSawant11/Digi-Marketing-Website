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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Calibrate Target Goal
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Dashboard Value (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900 text-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Original baseline: ₹28,00,000 (Current Goal)
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
            >
              {saving ? 'Updating...' : 'Save Target'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
