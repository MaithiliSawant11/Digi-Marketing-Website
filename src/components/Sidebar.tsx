import React from 'react';
import { 
  Home, 
  Package, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  Target, 
  ShieldCheck, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { ClientAccount } from '../types';

export type ActiveTab = 'overview' | 'products' | 'sales' | 'investors' | 'insights' | 'goals' | 'admin';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  clients: ClientAccount[];
  activeClientId: string;
  onSelectClient: (clientId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  clients,
  activeClientId,
  onSelectClient,
}) => {
  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Overview', icon: Home },
    { id: 'products' as ActiveTab, label: 'Products', icon: Package },
    { id: 'sales' as ActiveTab, label: 'Sales', icon: TrendingUp },
    { id: 'investors' as ActiveTab, label: 'Investors', icon: Users },
    { id: 'insights' as ActiveTab, label: 'Insights', icon: Lightbulb },
    { id: 'goals' as ActiveTab, label: 'Goals', icon: Target },
  ];

  return (
    <aside className="w-full md:w-56 lg:w-60 bg-slate-900/85 backdrop-blur-md shrink-0 flex flex-col justify-between p-3 sm:p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.12)] text-slate-100">
      <div className="space-y-4">
        
        {/* Client Workspace Selector */}
        <div className="bg-slate-900/90 rounded-xl p-2.5 border border-cyan-500/30 shadow-inner">
          <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1 px-1 flex items-center justify-between">
            <span>Client Workspace</span>
            <Layers className="w-3 h-3 text-cyan-400" />
          </div>
          <select
            value={activeClientId}
            onChange={(e) => onSelectClient(e.target.value)}
            aria-label="Select Client Workspace"
            className="w-full text-xs font-semibold text-slate-100 bg-slate-950 border border-cyan-500/30 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.plan})
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-200'
                }`}
              >
                <div className={`p-1 rounded-md ${isActive ? 'bg-cyan-900/90 text-cyan-300' : 'text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => onTabChange('admin')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                activeTab === 'admin'
                  ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-purple-300'
              }`}
            >
              <div className={`p-1 rounded-md ${activeTab === 'admin' ? 'bg-purple-900/90 text-purple-300' : 'text-slate-400'}`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>Admin Console</span>
                <span className="text-[10px] font-normal text-slate-400">APIs, Audit, Security</span>
              </div>
            </button>
          </div>
        </nav>
      </div>

    </aside>
  );
};
