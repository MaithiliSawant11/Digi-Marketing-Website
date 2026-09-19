import React, { useState } from 'react';
import { ProductItem } from '../types';
import { Edit2, Plus, Search, Check, X, Trash2 } from 'lucide-react';

interface TopProductsTableProps {
  products: ProductItem[];
  onUpdateProduct?: (id: number, payload: Partial<ProductItem>) => void;
  onAddProduct?: (payload: { name: string; revenue: number; category?: string }) => void;
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
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRevenue, setNewRevenue] = useState('');

  const formatINR = (val: number) => '₹ ' + val.toLocaleString('en-IN');

  const totalRevenue = products.reduce((acc, curr) => acc + curr.revenue, 0);

  const startEdit = (p: ProductItem) => {
    if (!canEdit) return;
    setEditingId(p.id);
    setEditName(p.name);
    setEditRevenue(p.revenue.toString());
  };

  const saveEdit = (id: number) => {
    if (onUpdateProduct && editName.trim() && !isNaN(Number(editRevenue))) {
      onUpdateProduct(id, {
        name: editName.trim(),
        revenue: Number(editRevenue),
      });
    }
    setEditingId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddProduct && newName.trim() && !isNaN(Number(newRevenue))) {
      onAddProduct({
        name: newName.trim(),
        revenue: Number(newRevenue),
      });
      setNewName('');
      setNewRevenue('');
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
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Top 20 Products & Revenue
        </h2>
        {canEdit && (
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-3 p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center gap-2 flex-wrap text-xs">
          <input
            type="text"
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-medium text-slate-800 flex-1 min-w-[140px]"
            required
          />
          <input
            type="number"
            placeholder="Revenue in ₹"
            value={newRevenue}
            onChange={(e) => setNewRevenue(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-medium text-slate-800 w-28"
            required
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1.5 text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto">
        {products.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs font-semibold bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            No products listed yet. Click "+ Add Product" to add one.
          </div>
        ) : (
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold select-none">
                <th className="py-2 px-2 w-8 text-center">#</th>
                <th className="py-2 px-2">Product</th>
                <th className="py-2 px-2 text-right">Revenue (₹)</th>
                {canEdit && <th className="py-2 px-1 w-16 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {products.map((prod) => {
                const isEditingThis = editingId === prod.id;

                return (
                  <tr
                    key={prod.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="py-2 px-2 text-center text-slate-400 font-semibold">
                      {prod.rank}
                    </td>

                    <td className="py-2 px-2">
                      {isEditingThis ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 bg-white border border-blue-400 rounded text-xs w-full"
                          autoFocus
                        />
                      ) : (
                        <span className="text-slate-800 font-semibold">{prod.name}</span>
                      )}
                    </td>

                    <td className="py-2 px-2 text-right">
                      {isEditingThis ? (
                        <input
                          type="number"
                          value={editRevenue}
                          onChange={(e) => setEditRevenue(e.target.value)}
                          className="px-2 py-1 bg-white border border-blue-400 rounded text-xs w-28 text-right"
                        />
                      ) : (
                        <span className="font-bold text-slate-900 tracking-tight">
                          {formatINR(prod.revenue)}
                        </span>
                      )}
                    </td>

                    {canEdit && (
                      <td className="py-2 px-1 text-center">
                        {isEditingThis ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => saveEdit(prod.id)}
                              className="p-1 text-emerald-600 hover:text-emerald-700"
                              title="Save"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 text-slate-400 hover:text-slate-600"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => startEdit(prod)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 transition-opacity"
                              title="Edit product data"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            {onDeleteProduct && (
                              <button
                                onClick={() => handleDelete(prod.id, prod.name)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition-opacity"
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
              <tr className="border-t-2 border-slate-200 bg-slate-50/70 font-bold text-slate-900">
                <td className="py-2.5 px-2 text-center text-slate-400"></td>
                <td className="py-2.5 px-2">Total ({products.length} Products)</td>
                <td className="py-2.5 px-2 text-right tracking-tight text-blue-700 text-sm sm:text-base font-extrabold">
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
