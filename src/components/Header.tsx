import React, { useState } from 'react';
import { Target, TrendingUp, Sparkles, User as UserIcon, RefreshCw, PlusCircle, ShieldCheck, ChevronDown, Check, LogIn } from 'lucide-react';
import { User, UserRole } from '../types';

interface HeaderProps {
  targetGoal: number;
  onUpdateDailyClick: () => void;
  onOpenTargetEdit: () => void;
  onOpenAuth: () => void;
  onOpenAdminConsole: () => void;
  onResetDefaults: () => void;
  onClearAllData?: () => void;
  currentUser: User;
  onRoleSwitch: (role: UserRole) => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  targetGoal,
  onUpdateDailyClick,
  onOpenTargetEdit,
  onOpenAuth,
  onOpenAdminConsole,
  onResetDefaults,
  onClearAllData,
  currentUser,
  onRoleSwitch,
  isSyncing = false,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Format currency in Indian format
  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const isInvestor = currentUser.role === 'investor';

  return (
    <header className="w-full bg-white border-b border-slate-200/90 px-4 sm:px-6 py-3.5 shadow-xs transition-colors">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Branding & Subtitles */}
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Logo icon container */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
              <polyline points="4 6 12 2 20 6"></polyline>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1e293b]">
                Digital Marketing + Affiliate Marketing
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isSyncing ? 'animate-ping' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Real-Time Sync'}
              </span>
            </div>

            <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5">
              B U S I N E S S &nbsp; D A S H B O A R D
            </div>

            {/* Tagline Flow */}
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 flex-wrap">
              <span className="tracking-wide">MORE TRAFFIC</span>
              <span className="text-slate-400">→</span>
              <span className="tracking-wide">MORE LEADS</span>
              <span className="text-slate-400">→</span>
              <span className="tracking-wide">MORE SALES</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-blue-700 tracking-wide">FINANCIAL FREEDOM</span>
            </div>
          </div>
        </div>

        {/* Right: Target Widget, Action buttons, Profile */}
        <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-4 flex-wrap">
          
          {/* Target Dashboard Box */}
          <div 
            onClick={isInvestor ? undefined : onOpenTargetEdit}
            title={isInvestor ? 'Read-only target goal' : 'Click to calibrate current target goal'}
            className={`group relative flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-50/80 border border-emerald-300/80 transition-all shadow-xs ${
              isInvestor ? 'cursor-default' : 'hover:bg-emerald-50 hover:border-emerald-400 cursor-pointer'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-300 shrink-0">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-600 tracking-wide">
                Target Dashboard
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none mt-0.5">
                {formatINR(targetGoal)}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                (Current Goal)
              </div>
            </div>

            {!isInvestor && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Edit
              </span>
            )}
          </div>

          {/* User actions */}
          <div className="flex items-center gap-2">
            
            {/* Update Daily Data Button */}
            {!isInvestor && (
              <button
                onClick={onUpdateDailyClick}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Update Daily Data</span>
              </button>
            )}

            {/* Role / Profile badge & switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              >
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                    {currentUser.name}
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                    currentUser.role === 'admin' || currentUser.role === 'client'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {currentUser.role === 'investor' ? 'Investor (Read Only)' : 'Admin / Manager'}
                  </span>
                </div>
              </button>

              {/* Role & Profile Dropdown */}
              {roleDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setRoleDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Session Active
                      </div>
                    </div>

                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Switch Role Mode
                    </div>

                    <button
                      onClick={() => {
                        if (currentUser.role === 'investor') {
                          onOpenAuth();
                        } else {
                          onRoleSwitch('admin');
                        }
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-1.5 text-xs text-left flex items-center justify-between hover:bg-slate-50 ${
                        currentUser.role === 'admin' || currentUser.role === 'client' ? 'font-bold text-purple-700 bg-purple-50/60' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-600" />
                        <span>Admin / Manager (Full Access)</span>
                      </div>
                      {(currentUser.role === 'admin' || currentUser.role === 'client') && <Check className="w-3.5 h-3.5 text-purple-700" />}
                    </button>

                    <button
                      onClick={() => { onRoleSwitch('investor'); setRoleDropdownOpen(false); }}
                      className={`w-full px-3.5 py-1.5 text-xs text-left flex items-center justify-between hover:bg-slate-50 ${
                        currentUser.role === 'investor' ? 'font-bold text-emerald-700 bg-emerald-50/60' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <span>Investor (Read-Only View)</span>
                      </div>
                      {currentUser.role === 'investor' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => { onOpenAuth(); setRoleDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-xs text-left font-bold text-blue-700 bg-blue-50/60 hover:bg-blue-100 flex items-center gap-2"
                    >
                      <LogIn className="w-3.5 h-3.5 text-blue-600" />
                      <span>Sign In / Switch Account</span>
                    </button>

                    <button
                      onClick={() => { onOpenAuth(); setRoleDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Edit Profile Details</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    {onClearAllData && (
                      <button
                        onClick={() => { onClearAllData(); setRoleDropdownOpen(false); }}
                        className="w-full px-3.5 py-1.5 text-xs text-left font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Clear All Data (Start Fresh)</span>
                      </button>
                    )}

                    <button
                      onClick={() => { onResetDefaults(); setRoleDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-slate-500 hover:bg-slate-100 flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to Original Baseline Data</span>
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </header>
  );
};
