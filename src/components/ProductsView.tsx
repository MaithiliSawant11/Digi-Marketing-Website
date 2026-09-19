import React from 'react';
import { TopProductsTable } from './TopProductsTable';
import { ProductItem } from '../types';
import { Package, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface ProductsViewProps {
  products: ProductItem[];
  onUpdateProduct: (id: number, payload: Partial<ProductItem>) => void;
  onAddProduct: (payload: { name: string; revenue: number; category?: string }) => void;
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
  const avgRev = Math.round(totalRev / (products.length || 1));
  const topProduct = products[0];

  return (
    <div className="space-y-6">
      {/* KPI Cards for Products */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Total Products Tracked</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{products.length} Items</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">Across 6 categories</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Cumulative Product Revenue</div>
          <div className="text-2xl font-black text-slate-900 mt-1">₹{totalRev.toLocaleString('en-IN')}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Top 20 revenue drivers</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">Highest Grossing Product</div>
          <div className="text-2xl font-black text-slate-900 mt-1 truncate">{topProduct?.name || 'N/A'}</div>
          <div className="text-xs text-purple-600 font-semibold mt-1">₹{(topProduct?.revenue || 0).toLocaleString('en-IN')}</div>
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
