import React, { useState } from 'react';
import { X, User, ShieldCheck, LogIn, Mail, Lock, UserCheck, KeyRound, Check, UserPlus } from 'lucide-react';
import { User as UserType, UserRole } from '../types';
import { api } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType;
  onUpdateProfile: (payload: { name: string; email: string; avatarUrl?: string }) => Promise<void>;
  onSwitchRole: (role: UserRole) => Promise<void>;
  onLogin: (email: string, password?: string, role?: UserRole) => Promise<void>;
  onUserChanged?: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  onSwitchRole,
  onLogin,
  onUserChanged,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'password' | 'profile'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('admin');

  // Sign Up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('admin');

  // Profile form state
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);
  
  // Password change state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setError('Email address is required.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onLogin(loginEmail.trim(), loginPassword, loginRole);
      setMsg(`Signed in successfully as ${loginEmail.trim()}`);
      setTimeout(() => {
        setMsg('');
        onClose();
      }, 900);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Authentication failed. Please check your email and password.');
    } finally {
      setSaving(false);
    }
  };

  const handleCustomSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (signupPassword.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const res = await api.signup({
        name: signupName.trim(),
        email: signupEmail.trim(),
        password: signupPassword,
        role: signupRole,
      });
      if (res.user && onUserChanged) {
        onUserChanged(res.user);
      }
      setMsg(`Account created! Signed in as ${signupName.trim()}`);
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setTimeout(() => {
        setMsg('');
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Registration failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onUpdateProfile({ name, email, avatarUrl });
      if (selectedRole !== currentUser.role) {
        await onSwitchRole(selectedRole);
      }
      setMsg('Profile and permissions updated!');
      setTimeout(() => {
        setMsg('');
        onClose();
      }, 900);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass) {
      setError('Current password is required.');
      return;
    }
    if (newPass !== confirmPass) {
      setError('New passwords do not match.');
      return;
    }
    if (newPass.length < 4) {
      setError('New password must be at least 4 characters long.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await api.changePassword(currentPass, newPass);
      setMsg('Account password updated successfully!');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => {
        setMsg('');
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to change password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900/95 rounded-2xl max-w-md w-full p-6 shadow-[0_0_25px_rgba(6,182,212,0.2)] border border-cyan-500/40 text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-cyan-300">Authentication & Access Control</h3>
              <p className="text-[11px] text-slate-400">Secure Sign In, Registration & Account Security</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-cyan-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-cyan-500/20 mt-4">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'login'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'signup'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('password'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'password'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Security</span>
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {msg ? (
          <div className="py-8 text-center text-emerald-400 font-bold text-sm flex flex-col items-center gap-2">
            <Check className="w-8 h-8 p-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-full text-emerald-400" />
            <span>{msg}</span>
          </div>
        ) : activeTab === 'login' ? (
          /* TAB 1: SIGN IN */
          <div className="mt-4 space-y-4">
            <form onSubmit={handleCustomLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Access Level Role
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value as UserRole)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-cyan-500/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none bg-slate-900 text-slate-100"
                >
                  <option value="admin">Admin / Manager (Full Access Controls)</option>
                  <option value="investor">Investor (Read-Only Portfolio View)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="user@dashboard.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs font-semibold pl-9 pr-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="Enter account password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs font-semibold pl-9 pr-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{saving ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
              </button>
            </form>

            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>AES-256 session token issuing enabled.</span>
            </div>
          </div>
        ) : activeTab === 'signup' ? (
          /* TAB 2: SIGN UP / REGISTER NEW USER */
          <div className="mt-4 space-y-4">
            <form onSubmit={handleCustomSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maithili S."
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full text-xs font-semibold pl-9 pr-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Set Account Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="Minimum 4 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full text-xs font-semibold pl-9 pr-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Select Role
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-cyan-500/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none bg-slate-900 text-slate-100"
                >
                  <option value="admin">Admin Manager (Full Control & Edits)</option>
                  <option value="investor">Investor Partner (Read-Only View)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>{saving ? 'Registering Account...' : 'Create Account & Sign In'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* TAB 3: CHANGE PASSWORD */
          <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Current Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full text-xs font-semibold pl-9 pr-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full text-xs font-semibold pl-9 pr-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full text-xs font-semibold pl-9 pr-3 py-2 border border-cyan-500/30 bg-slate-900 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-cyan-500/20">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              >
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

