import React, { useState } from 'react';
import { ProductItem } from '../types';
import { Edit2, Plus, Search, Check, X, Trash2, MinusCircle, PlusCircle } from 'lucide-react';

interface TopProductsTableProps {
  products: ProductItem[];
  onUpdateProduct?: (id: number, payload: Partial<ProductItem>) => void;
  onAddProduct?: (payload: { name: string; revenue: number; quantity?: number; category?: string }) => void;
  onDeleteProduct?: (id: number) => void;
  canEdit?: boolean;
}

export const TopProductsTable: React.FC<TopProductsTableProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  canEdit = true,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editRevenue, setEditRevenue] = useState('');
  const [editQuantity, setEditQuantity] = useState('1');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRevenue, setNewRevenue] = useState('');
  const [newQuantity, setNewQuantity] = useState('1');

  const formatINR = (val: number) => '₹ ' + val.toLocaleString('en-IN');

  const totalRevenue = products.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalUnits = products.reduce((acc, curr) => acc + (curr.quantity || 1), 0);

  const startEdit = (p: ProductItem) => {
    if (!canEdit) return;
    setEditingId(p.id);
    setEditName(p.name);
    setEditRevenue(p.revenue.toString());
    setEditQuantity((p.quantity || 1).toString());
  };

  const saveEdit = (id: number) => {
    if (onUpdateProduct && editName.trim() && !isNaN(Number(editRevenue))) {
      onUpdateProduct(id, {
        name: editName.trim(),
        revenue: Number(editRevenue),
        quantity: Math.max(1, Number(editQuantity) || 1),
      });
    }
    setEditingId(null);
  };

  const handleQtyChange = (p: ProductItem, delta: number) => {
    if (!canEdit || !onUpdateProduct) return;
    const currentQty = p.quantity || 1;
    const newQty = Math.max(1, currentQty + delta);
    onUpdateProduct(p.id, { quantity: newQty });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddProduct && newName.trim() && !isNaN(Number(newRevenue))) {
      onAddProduct({
        name: newName.trim(),
        revenue: Number(newRevenue),
        quantity: Math.max(1, Number(newQuantity) || 1),
      });
      setNewName('');
      setNewRevenue('');
      setNewQuantity('1');
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (!onDeleteProduct) return;
    if (window.confirm(`Are you sure you want to delete product "${name}"?`)) {
      onDeleteProduct(id);
    }
  };

  return (
    <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)] flex flex-col h-full text-slate-100">
      <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-3">
        <h2 className="text-base sm:text-lg font-bold text-cyan-300 tracking-tight flex items-center gap-2">
          <span>Top Products & Revenue</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            {totalUnits} Units
          </span>
        </h2>
        {canEdit && (
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_8px_rgba(6,182,212,0.2)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-3 p-3 bg-slate-800/90 border border-cyan-500/40 rounded-xl flex items-center gap-2 flex-wrap text-xs shadow-inner">
          <input
            type="text"
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-900 border border-cyan-500/30 rounded-md font-medium text-slate-100 flex-1 min-w-[130px] focus:ring-1 focus:ring-cyan-400 focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Revenue ₹"
            value={newRevenue}
            onChange={(e) => setNewRevenue(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-900 border border-cyan-500/30 rounded-md font-medium text-slate-100 w-24 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Qty"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            min="1"
            className="px-2 py-1.5 bg-slate-900 border border-cyan-500/30 rounded-md font-medium text-slate-100 w-16 text-center focus:ring-1 focus:ring-cyan-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]"
          >
            Save
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

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto">
        {products.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs font-semibold bg-slate-800/40 rounded-xl border border-dashed border-cyan-500/20">
            No products listed yet. Click "+ Add Product" to record items.
          </div>
        ) : (
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-cyan-500/20 text-cyan-400/90 font-bold select-none text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-2 w-8 text-center">#</th>
                <th className="py-2.5 px-2">Product</th>
                <th className="py-2.5 px-2 text-center">Qty</th>
                <th className="py-2.5 px-2 text-right">Revenue (₹)</th>
                {canEdit && <th className="py-2.5 px-1 w-16 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 font-medium text-slate-200">
              {products.map((prod) => {
                const isEditingThis = editingId === prod.id;
                const qty = prod.quantity || 1;

                return (
                  <tr
                    key={prod.id}
                    className="hover:bg-cyan-950/40 transition-colors group"
                  >
                    <td className="py-2.5 px-2 text-center text-cyan-400/70 font-semibold">
                      {prod.rank}
                    </td>

                    <td className="py-2.5 px-2">
                      {isEditingThis ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 bg-slate-900 border border-cyan-400 rounded text-xs w-full text-slate-100"
                          autoFocus
                        />
                      ) : (
                        <span className="text-slate-100 font-semibold">{prod.name}</span>
                      )}
                    </td>

                    {/* Quantity Column with + / - Increment Controls */}
                    <td className="py-2.5 px-2 text-center select-none">
                      {isEditingThis ? (
                        <input
                          type="number"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          min="1"
                          className="px-1.5 py-0.5 bg-slate-900 border border-cyan-400 rounded text-xs w-14 text-center text-slate-100"
                        />
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          {canEdit && (
                            <button
                              type="button"
                              onClick={() => handleQtyChange(prod, -1)}
                              className="text-slate-400 hover:text-cyan-400 transition-colors p-0.5"
                              title="Decrease Quantity"
                            >
                              <MinusCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <span className="font-bold text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20 text-xs min-w-[24px] text-center">
                            {qty}
                          </span>
                          {canEdit && (
                            <button
                              type="button"
                              onClick={() => handleQtyChange(prod, 1)}
                              className="text-slate-400 hover:text-cyan-400 transition-colors p-0.5"
                              title="Increase Quantity"
                            >
                              <PlusCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-2.5 px-2 text-right">
                      {isEditingThis ? (
                        <input
                          type="number"
                          value={editRevenue}
                          onChange={(e) => setEditRevenue(e.target.value)}
                          className="px-2 py-1 bg-slate-900 border border-cyan-400 rounded text-xs w-28 text-right text-slate-100"
                        />
                      ) : (
                        <span className="font-bold text-emerald-400 tracking-tight">
                          {formatINR(prod.revenue)}
                        </span>
                      )}
                    </td>

                    {canEdit && (
                      <td className="py-2.5 px-1 text-center">
                        {isEditingThis ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => saveEdit(prod.id)}
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
                              onClick={() => startEdit(prod)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-cyan-300 transition-opacity"
                              title="Edit product"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            {onDeleteProduct && (
                              <button
                                onClick={() => handleDelete(prod.id, prod.name)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity"
                                title="Delete product"
                              >
                                <Trash2 className="w-3 h-3" />
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
              <tr className="border-t-2 border-cyan-500/30 bg-cyan-950/40 font-bold text-slate-100">
                <td className="py-3 px-2 text-center text-slate-400"></td>
                <td className="py-3 px-2 text-cyan-300">Total ({products.length} Products)</td>
                <td className="py-3 px-2 text-center text-cyan-300 font-extrabold">{totalUnits} Units</td>
                <td className="py-3 px-2 text-right tracking-tight text-emerald-400 text-sm sm:text-base font-extrabold">
                  {formatINR(totalRevenue)}
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
