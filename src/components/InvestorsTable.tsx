import React, { useState } from 'react';
import { InvestorItem } from '../types';
import { Edit2, Plus, Check, X, Trash2 } from 'lucide-react';

interface InvestorsTableProps {
  investors: InvestorItem[];
  onUpdateInvestor?: (id: number, payload: Partial<InvestorItem>) => void;
  onAddInvestor?: (payload: { name: string; type: string; investmentLakh: number }) => void;
  onDeleteInvestor?: (id: number) => void;
  canEdit?: boolean;
}

export const InvestorsTable: React.FC<InvestorsTableProps> = ({
  investors,
  onUpdateInvestor,
  onAddInvestor,
  onDeleteInvestor,
  canEdit = true,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Indian');
  const [newAmount, setNewAmount] = useState('');

  const totalInvestmentLakh = investors.reduce((acc, curr) => acc + curr.investmentLakh, 0);

  const startEdit = (inv: InvestorItem) => {
    if (!canEdit) return;
    setEditingId(inv.id);
    setEditName(inv.name);
    setEditType(inv.type);
    setEditAmount(inv.investmentLakh.toString());
  };

  const saveEdit = (id: number) => {
    if (onUpdateInvestor && editName.trim() && !isNaN(Number(editAmount))) {
      onUpdateInvestor(id, {
        name: editName.trim(),
        type: editType.trim(),
        investmentLakh: Number(editAmount),
      });
    }
    setEditingId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddInvestor && newName.trim() && !isNaN(Number(newAmount))) {
      onAddInvestor({
        name: newName.trim(),
        type: newType,
        investmentLakh: Number(newAmount),
      });
      setNewName('');
      setNewAmount('');
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (!onDeleteInvestor) return;
    if (window.confirm(`Are you sure you want to remove investor "${name}"?`)) {
      onDeleteInvestor(id);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/30 shadow-lg flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-cyan-400 tracking-tight flex items-center gap-2">
          <span>Investors & Investment Details</span>
        </h2>
        {canEdit && (
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Investor</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-3 p-3 bg-slate-800/90 border border-cyan-500/40 rounded-xl flex items-center gap-2 flex-wrap text-xs">
          <input
            type="text"
            placeholder="Investor Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-cyan-500/40 rounded-md font-medium text-slate-100 placeholder-slate-500 flex-1 min-w-[130px] focus:outline-none focus:border-cyan-400"
            required
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="px-2 py-1.5 bg-slate-950 border border-cyan-500/40 rounded-md font-medium text-slate-100 focus:outline-none focus:border-cyan-400"
          >
            <option value="Indian">Indian</option>
            <option value="NRI (UAE)">NRI (UAE)</option>
            <option value="NRI (USA)">NRI (USA)</option>
            <option value="NRI (UK)">NRI (UK)</option>
            <option value="NRI (Qatar)">NRI (Qatar)</option>
            <option value="NRI (Canada)">NRI (Canada)</option>
            <option value="NRI (Singapore)">NRI (Singapore)</option>
            <option value="VC Fund">VC Fund</option>
            <option value="Angel Network">Angel Network</option>
          </select>
          <input
            type="number"
            step="0.1"
            placeholder="₹ Lakh (e.g. 5.0)"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-cyan-500/40 rounded-md font-medium text-slate-100 placeholder-slate-500 w-28 focus:outline-none focus:border-cyan-400"
            required
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-semibold transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1.5 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        {investors.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs font-semibold bg-slate-950/40 rounded-xl border border-dashed border-cyan-500/30">
            No investors listed yet. Click "+ Add Investor" to add one.
          </div>
        ) : (
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-cyan-500/30 text-cyan-300 font-semibold select-none">
                <th className="py-2.5 px-2 w-8 text-center">#</th>
                <th className="py-2.5 px-2">Investor Name</th>
                <th className="py-2.5 px-2 text-center">Type</th>
                <th className="py-2.5 px-2 text-right">Investment (₹ Lakh)</th>
                {canEdit && <th className="py-2.5 px-1 w-16 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
              {investors.map((inv) => {
                const isEditingThis = editingId === inv.id;
                const isNRI = inv.type.includes('NRI') || inv.type.includes('VC');

                return (
                  <tr
                    key={inv.id}
                    className="hover:bg-cyan-950/30 transition-colors group"
                  >
                    <td className="py-2.5 px-2 text-center text-slate-400 font-semibold">
                      {inv.rank}
                    </td>

                    <td className="py-2.5 px-2">
                      {isEditingThis ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 bg-slate-950 border border-cyan-400 rounded text-xs w-full text-slate-100"
                          autoFocus
                        />
                      ) : (
                        <span className="text-slate-100 font-semibold">{inv.name}</span>
                      )}
                    </td>

                    <td className="py-2.5 px-2 text-center">
                      {isEditingThis ? (
                        <input
                          type="text"
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                          className="px-2 py-1 bg-slate-950 border border-cyan-400 rounded text-xs w-28 text-center text-slate-100"
                        />
                      ) : (
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isNRI
                              ? 'bg-purple-900/60 text-purple-300 border border-purple-500/40'
                              : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {inv.type}
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-2 text-right">
                      {isEditingThis ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="px-2 py-1 bg-slate-950 border border-cyan-400 rounded text-xs w-20 text-right text-slate-100"
                        />
                      ) : (
                        <span className="font-bold text-cyan-300 tracking-tight">
                          {inv.investmentLakh.toFixed(2)}
                        </span>
                      )}
                    </td>

                    {canEdit && (
                      <td className="py-2.5 px-1 text-center">
                        {isEditingThis ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => saveEdit(inv.id)}
                              className="p-1 text-emerald-400 hover:text-emerald-300"
                              title="Save"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 text-slate-400 hover:text-slate-200"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => startEdit(inv)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-cyan-300 transition-opacity"
                              title="Edit investor"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            {onDeleteInvestor && (
                              <button
                                onClick={() => handleDelete(inv.id, inv.name)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-400 transition-opacity"
                                title="Remove investor"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-cyan-500/30 bg-slate-950/60 font-bold text-slate-100">
                <td className="py-2.5 px-2 text-center text-slate-400"></td>
                <td colSpan={2} className="py-2.5 px-2 text-slate-300">Total Investment</td>
                <td className="py-2.5 px-2 text-right tracking-tight text-cyan-400 text-sm sm:text-base font-extrabold">
                  ₹{totalInvestmentLakh.toFixed(2)} Lakh
                </td>
                {canEdit && <td></td>}
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};
