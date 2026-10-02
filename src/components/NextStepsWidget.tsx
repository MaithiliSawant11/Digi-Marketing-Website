import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, Plus, X } from 'lucide-react';
import { FocusAreaItem } from '../types';

interface NextStepsWidgetProps {
  steps: FocusAreaItem[];
  onToggleStep: (id: string) => void;
  canEdit?: boolean;
}

export const NextStepsWidget: React.FC<NextStepsWidgetProps> = ({
  steps,
  onToggleStep,
  canEdit = true,
}) => {
  const [items, setItems] = useState<FocusAreaItem[]>(steps);
  const [newItemText, setNewItemText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Sync if prop changes
  React.useEffect(() => {
    setItems(steps);
  }, [steps]);

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
    onToggleStep(id);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem: FocusAreaItem = {
      id: `s-${Date.now()}`,
      text: newItemText.trim(),
      completed: false,
    };
    setItems((prev) => [...prev, newItem]);
    setNewItemText('');
    setIsAdding(false);
  };

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/30 shadow-lg">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-cyan-400 tracking-tight">
            Next Steps / Focus Areas
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
            {completedCount}/{items.length} Active
          </span>
          {canEdit && (
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          )}
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-3 flex gap-2">
          <input
            type="text"
            placeholder="Add new focus milestone..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="flex-1 text-xs px-3 py-1.5 bg-slate-950 border border-cyan-500/40 text-slate-100 rounded-lg focus:outline-none focus:border-cyan-400 placeholder-slate-500"
            autoFocus
          />
          <button
            type="submit"
            className="text-xs bg-cyan-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-cyan-500 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* List */}
      {items.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-xs font-semibold bg-slate-950/40 rounded-xl border border-dashed border-cyan-500/30">
          No focus areas added yet. Click "+ Add" to set custom milestones.
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((step) => {
            return (
              <div
                key={step.id}
                onClick={() => handleToggle(step.id)}
                className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors cursor-pointer group hover:bg-cyan-950/30 border border-transparent hover:border-cyan-500/20 ${
                  !step.completed ? 'opacity-70' : ''
                }`}
              >
                <div className="mt-0.5 shrink-0 text-cyan-400">
                  {step.completed ? (
                    <CheckCircle2 className="w-4.5 h-4.5 fill-cyan-500 text-slate-950" />
                  ) : (
                    <Circle className="w-4.5 h-4.5 text-slate-500 group-hover:text-cyan-400" />
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold leading-snug transition-colors ${
                    step.completed ? 'text-slate-100' : 'text-slate-400 line-through'
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
