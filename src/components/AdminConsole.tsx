import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Key, 
  FileText, 
  Layers, 
  Send, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  ExternalLink,
  Terminal,
  Lock,
  RefreshCw,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { ClientAccount, AuditLog, EmailNotification, ApiKeyItem } from '../types';

interface AdminConsoleProps {
  onBackToDashboard: () => void;
  clients: ClientAccount[];
  activeClientId: string;
  onSelectClient: (id: string) => void;
  onDailyDataChanged: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  onBackToDashboard,
  clients,
  activeClientId,
  onSelectClient,
  onDailyDataChanged,
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'api' | 'security' | 'clients'>('notifications');
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [securityStatus, setSecurityStatus] = useState<any>(null);

  // Email test form
  const [testEmailRecipient, setTestEmailRecipient] = useState('admin@dashboard.com');
  const [testEmailSubject, setTestEmailSubject] = useState('🎯 Daily Target Milestone Reached (₹25,000+ Alert)');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState('');

  // API Key form
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  // Webhook simulator form
  const [simAmount, setSimAmount] = useState('4500');
  const [simSource, setSimSource] = useState('Meta Ads');
  const [simCampaign, setSimCampaign] = useState('High Intent Retargeting Campaign');
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [notifs, logs, keys, sec] = await Promise.all([
        api.getNotifications(),
        api.getAuditLogs(),
        api.getApiKeys(),
        api.getSecurityStatus(),
      ]);
      setNotifications(notifs.notifications);
      setAuditLogs(logs.logs);
      setApiKeys(keys.keys);
      setSecurityStatus(sec);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingEmail(true);
    try {
      await api.sendTestNotification(testEmailSubject, testEmailRecipient);
      setEmailStatusMsg('Automated email notification triggered and delivered successfully!');
      const notifs = await api.getNotifications();
      setNotifications(notifs.notifications);
      setTimeout(() => setEmailStatusMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    try {
      const res = await api.createApiKey(newKeyName.trim());
      setCreatedKey(res.key.keyToken || 'ak_live_new_key');
      setNewKeyName('');
      const keys = await api.getApiKeys();
      setApiKeys(keys.keys);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTriggerWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimulating(true);
    try {
      const res = await api.triggerWebhookSim(Number(simAmount), simSource, simCampaign);
      setSimResult(`Successfully ingested ₹${Number(simAmount).toLocaleString('en-IN')} from ${simSource}! Dashboard September sales updated.`);
      onDailyDataChanged();
      const logs = await api.getAuditLogs();
      setAuditLogs(logs.logs);
      setTimeout(() => setSimResult(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSimulating(false);
    }
  };

  const handleCopyCurl = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const webhookCurlExample = `curl -X POST "${window.location.origin}/api/v1/webhook/daily-sales" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ak_live_demo_key" \\
  -d '{
    "amount": 5000,
    "source": "Meta Ads",
    "campaign": "September Scale Q3"
  }'`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Admin & Operations Console
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Enterprise management: Multi-client isolation, automated notifications, 3rd-party API webhooks & audit trails
            </p>
          </div>
        </div>

        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          ← Return to Main Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'notifications', label: 'Automated Email Alerts', icon: Mail },
          { id: 'api', label: 'Third-Party APIs & Webhooks', icon: Key },
          { id: 'security', label: 'Security & Compliance Auditing', icon: Lock },
          { id: 'clients', label: 'Multi-Client Workspaces', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Automated Email Notifications */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dispatch Test Alert */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Trigger Automated Alert</h3>
            </div>
            <p className="text-xs text-slate-500">
              The automated notification daemon sends real-time email alerts whenever milestone thresholds are reached.
            </p>

            {emailStatusMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{emailStatusMsg}</span>
              </div>
            )}

            <form onSubmit={handleSendTestEmail} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  required
                  value={testEmailRecipient}
                  onChange={(e) => setTestEmailRecipient(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alert Trigger Subject
                </label>
                <input
                  type="text"
                  required
                  value={testEmailSubject}
                  onChange={(e) => setTestEmailSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={sendingEmail}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sendingEmail ? 'Dispatching...' : 'Dispatch Automated Email'}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-700 mb-1">Active Automated Triggers:</div>
              <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
                <li>Daily Sales Velocity Milestone (&gt;₹20,000 / day)</li>
                <li>Bi-Weekly Investor Digest (₹35.50L Portfolio)</li>
                <li>Target Progress Pace (Current vs. ₹28,00,000)</li>
              </ul>
            </div>
          </div>

          {/* Email Notifications Log */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">
                Dispatched Email Notifications Log
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {notifications.length} Delivered
              </span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-colors bg-slate-50/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                      {notif.subject}
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                      {notif.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 mt-1">
                    {notif.previewText}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>To: {notif.recipient}</span>
                    <span>{notif.sentAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Third-Party API & Webhooks */}
      {activeTab === 'api' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* API Keys */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">API Access Keys</h3>
              </div>
            </div>

            <form onSubmit={handleCreateApiKey} className="flex gap-2">
              <input
                type="text"
                placeholder="Key Name (e.g. Meta Ads Production)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Generate Key
              </button>
            </form>

            {createdKey && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <div className="font-bold text-emerald-800">New Secret Key Generated:</div>
                <code className="block p-1.5 bg-white border border-emerald-300 rounded font-mono text-slate-900 break-all">
                  {createdKey}
                </code>
                <p className="text-[10px] text-emerald-700 font-medium">Save this key now; it is protected with AES-256-GCM encryption.</p>
              </div>
            )}

            <div className="space-y-2">
              {apiKeys.map((k) => (
                <div key={k.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{k.name}</div>
                    <div className="text-[11px] font-mono text-slate-500">{k.keyPrefix}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                      {k.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">Last: {k.lastUsed}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhook Receiver Simulation */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Third-Party Webhook Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Simulate external marketing conversions (Meta Pixel, Google Ads, or Shopify webhooks) pushing daily revenue into this live dashboard.
            </p>

            {simResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{simResult}</span>
              </div>
            )}

            <form onSubmit={handleTriggerWebhook} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Revenue (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={simAmount}
                    onChange={(e) => setSimAmount(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ad Network / Source
                  </label>
                  <select
                    value={simSource}
                    onChange={(e) => setSimSource(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-semibold"
                  >
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Shopify Webhook">Shopify Webhook</option>
                    <option value="Affiliate Network">Affiliate Network</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Campaign Identifier
                </label>
                <input
                  type="text"
                  value={simCampaign}
                  onChange={(e) => setSimCampaign(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={simulating}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>{simulating ? 'Processing Webhook...' : 'Simulate Incoming Webhook Request'}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>cURL Integration Endpoint</span>
                <button
                  onClick={() => handleCopyCurl(webhookCurlExample)}
                  className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy cURL'}
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto">
                {webhookCurlExample}
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: Security & Compliance Auditing */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Security status cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold">Data at Rest Encryption</div>
              <div className="text-base font-black text-slate-900 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>AES-256-GCM</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Hardware KMS Key Rotation</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold">In-Transit Protection</div>
              <div className="text-base font-black text-slate-900 mt-1 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>TLS 1.3 Strict HTTPS</span>
              </div>
              <div className="text-[11px] text-blue-700 font-semibold mt-0.5">HSTS Enforced</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold">Access Control (RBAC)</div>
              <div className="text-base font-black text-slate-900 mt-1 flex items-center gap-1.5">
                <span>Multi-Role Isolation</span>
              </div>
              <div className="text-[11px] text-purple-700 font-semibold mt-0.5">Admin / Client / Investor</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold">Compliance Status</div>
              <div className="text-base font-black text-slate-900 mt-1 flex items-center gap-1.5">
                <span>SOC 2 Type II & GDPR</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Audited & Certified</div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">
                Immutable Security & Compliance Audit Trail
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                365-Day Compliance Retention
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Action Event</th>
                    <th className="py-2.5 px-3">Initiated By</th>
                    <th className="py-2.5 px-3">Details</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                        {log.timestamp}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {log.action}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold">{log.user}</span>{' '}
                        <span className="text-[10px] text-slate-400">({log.role})</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">
                        {log.details}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                          {log.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[11px] text-slate-500">
                        {log.ipAddress}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Multi-Client Workspaces */}
      {activeTab === 'clients' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Managed Client Portfolios
              </h3>
              <p className="text-xs text-slate-500">
                Isolated dynamic database partitions for each brand/agency client account.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clients.map((c) => {
              const isCurrent = c.id === activeClientId;
              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                      <p className="text-xs text-slate-500">{c.companyName}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {c.plan}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-600">
                    <span className="font-semibold">Industry:</span> {c.industry}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Sync
                    </span>
                    <button
                      onClick={() => onSelectClient(c.id)}
                      disabled={isCurrent}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        isCurrent
                          ? 'bg-slate-200 text-slate-500 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      }`}
                    >
                      {isCurrent ? 'Current Workspace' : 'Switch to Client'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
