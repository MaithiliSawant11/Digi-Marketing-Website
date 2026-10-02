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
    <header className="relative z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-cyan-500/30 px-4 sm:px-6 py-3.5 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-slate-100 transition-colors">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Branding & Subtitles */}
        <div className="flex items-start sm:items-center gap-3.5">
          {/* SLX Brand Logo */}
          <img 
            src="/assets/slx-logo.png" 
            alt="SLX GLOBAL" 
            className="w-12 h-12 rounded-xl object-contain bg-slate-950 p-1 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0" 
          />

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
                Digital Marketing + Affiliate Marketing
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${isSyncing ? 'animate-ping' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Real-Time Sync'}
              </span>
            </div>

            <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mt-0.5">
              B U S I N E S S &nbsp; D A S H B O A R D
            </div>

            {/* Tagline Flow */}
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-300 mt-1 flex-wrap">
              <span className="tracking-wide">MORE TRAFFIC</span>
              <span className="text-slate-500">→</span>
              <span className="tracking-wide">MORE LEADS</span>
              <span className="text-slate-500">→</span>
              <span className="tracking-wide">MORE SALES</span>
              <span className="text-slate-500">→</span>
              <span className="font-bold text-cyan-400 tracking-wide">FINANCIAL FREEDOM</span>
            </div>
          </div>
        </div>

        {/* Right: Target Widget, Action buttons, Profile */}
        <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-4 flex-wrap">
          
          {/* Target Dashboard Box */}
          <div 
            onClick={isInvestor ? undefined : onOpenTargetEdit}
            title={isInvestor ? 'Read-only target goal' : 'Click to calibrate current target goal'}
            className={`group relative flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] ${
              isInvestor ? 'cursor-default' : 'hover:bg-cyan-950/40 hover:border-cyan-400 cursor-pointer'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/40 shrink-0">
              <Target className="w-5 h-5 text-cyan-400" />
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-400 tracking-wide">
                Target Dashboard
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-cyan-300 tracking-tight leading-none mt-0.5">
                {formatINR(targetGoal)}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                (Current Goal)
              </div>
            </div>

            {!isInvestor && (
              <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Update Daily Data</span>
              </button>
            )}

            {/* Role / Profile badge & switcher */}
            <div className="relative z-50">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-cyan-500/40 bg-slate-900/90 hover:bg-slate-800 text-slate-100 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              >
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-400"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-100 leading-tight flex items-center gap-1">
                    {currentUser.name}
                    <ChevronDown className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                    currentUser.role === 'admin' || currentUser.role === 'client'
                      ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
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
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.6)] border border-cyan-400 py-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-slate-100">
                    <div className="px-3.5 py-2 border-b border-cyan-500/20">
                      <div className="text-xs font-bold text-cyan-300">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Session Active
                      </div>
                    </div>

                    <div className="px-3 py-1.5 text-[10px] font-bold text-cyan-400/80 uppercase tracking-wider">
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
                      className={`w-full px-3.5 py-1.5 text-xs text-left flex items-center justify-between hover:bg-slate-800 ${
                        currentUser.role === 'admin' || currentUser.role === 'client' ? 'font-bold text-purple-300 bg-purple-950/40' : 'text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        <span>Admin / Manager (Full Access)</span>
                      </div>
                      {(currentUser.role === 'admin' || currentUser.role === 'client') && <Check className="w-3.5 h-3.5 text-purple-400" />}
                    </button>

                    <button
                      onClick={() => { onRoleSwitch('investor'); setRoleDropdownOpen(false); }}
                      className={`w-full px-3.5 py-1.5 text-xs text-left flex items-center justify-between hover:bg-slate-800 ${
                        currentUser.role === 'investor' ? 'font-bold text-emerald-300 bg-emerald-950/40' : 'text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Investor (Read-Only View)</span>
                      </div>
                      {currentUser.role === 'investor' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>

                    <div className="border-t border-cyan-500/20 my-1"></div>

                    <button
                      onClick={() => { onOpenAuth(); setRoleDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-xs text-left font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 flex items-center gap-2"
                    >
                      <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Sign In / Sign Up</span>
                    </button>

                    <button
                      onClick={() => { onOpenAuth(); setRoleDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Edit Profile Details</span>
                    </button>

                    <div className="border-t border-cyan-500/20 my-1"></div>

                    {onClearAllData && (
                      <button
                        onClick={() => { onClearAllData(); setRoleDropdownOpen(false); }}
                        className="w-full px-3.5 py-1.5 text-xs text-left font-bold text-rose-400 hover:bg-rose-950/40 flex items-center gap-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Clear All Data (Start Fresh)</span>
                      </button>
                    )}

                    <button
                      onClick={() => { onResetDefaults(); setRoleDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-slate-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to Baseline Data</span>
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
