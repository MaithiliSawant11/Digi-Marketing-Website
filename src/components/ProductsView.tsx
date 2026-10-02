import React from 'react';
import { TopProductsTable } from './TopProductsTable';
import { ProductItem } from '../types';
import { Package, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface ProductsViewProps {
  products: ProductItem[];
  onUpdateProduct: (id: number, payload: Partial<ProductItem>) => void;
  onAddProduct: (payload: { name: string; revenue: number; quantity?: number; category?: string }) => void;
  onDeleteProduct?: (id: number) => void;
  canEdit: boolean;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  canEdit,
}) => {
  const totalRev = products.reduce((acc, p) => acc + p.revenue, 0);
  const totalUnits = products.reduce((acc, p) => acc + (p.quantity || 1), 0);
  const topProduct = products[0];

  return (
    <div className="space-y-6">
      {/* KPI Cards for Products */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
          <div className="text-xs font-semibold text-slate-400">Total Products Tracked</div>
          <div className="text-2xl font-black text-slate-100 mt-1">{products.length} Items ({totalUnits} Units)</div>
          <div className="text-xs text-cyan-400 font-semibold mt-1">Real-time catalog cataloging</div>
        </div>

        <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
          <div className="text-xs font-semibold text-slate-400">Cumulative Product Revenue</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">₹{totalRev.toLocaleString('en-IN')}</div>
          <div className="text-xs text-emerald-300/80 font-semibold mt-1">Live accumulated volume</div>
        </div>

        <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
          <div className="text-xs font-semibold text-slate-400">Highest Grossing Product</div>
          <div className="text-2xl font-black text-cyan-300 mt-1 truncate">{topProduct?.name || 'N/A'}</div>
          <div className="text-xs text-purple-400 font-semibold mt-1">₹{(topProduct?.revenue || 0).toLocaleString('en-IN')} ({topProduct?.quantity || 1} units)</div>
        </div>
      </div>

      <TopProductsTable
        products={products}
        onUpdateProduct={onUpdateProduct}
        onAddProduct={onAddProduct}
        onDeleteProduct={onDeleteProduct}
        canEdit={canEdit}
      />
    </div>
  );
};
