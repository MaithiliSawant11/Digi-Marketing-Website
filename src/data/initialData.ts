import { DashboardData, ClientAccount, User, AuditLog, EmailNotification, ApiKeyItem } from '../types';

export const initialClients: ClientAccount[] = [
  {
    id: 'client-apex',
    name: 'Apex Growth Digital',
    companyName: 'Apex Marketing & Media LLC',
    industry: 'E-Commerce & Affiliate Media',
    plan: 'Enterprise',
    active: true,
  },
  {
    id: 'client-zenith',
    name: 'Zenith Direct Media',
    companyName: 'Zenith Ventures Inc.',
    industry: 'Performance Ads & DTC',
    plan: 'Growth Pro',
    active: false,
  },
  {
    id: 'client-alpha',
    name: 'Alpha Scale Labs',
    companyName: 'Alpha Scale Digital',
    industry: 'Infoproducts & Affiliates',
    plan: 'Starter',
    active: false,
  },
];

export const initialUsers: User[] = [
  {
    id: 'user-admin',
    name: 'Admin Manager',
    email: 'admin@dashboard.com',
    role: 'admin',
    clientId: 'client-apex',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-client',
    name: 'Rajesh Verma (Client Lead)',
    email: 'client@apexmarketing.com',
    role: 'admin',
    clientId: 'client-apex',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-investor',
    name: 'Investor Partner',
    email: 'investor@dashboard.com',
    role: 'investor',
    clientId: 'client-apex',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
];

export const initialDashboardData: DashboardData = {
  clientId: 'client-apex',
  clientName: 'Apex Growth Digital',
  lastUpdated: 'Just now (Real-time Synced)',
  
  targetGoal: 2800000, // ₹28,00,000
  totalSales2Years: 0,
  salesAugust2026: 0,
  salesSeptember2026: 0,
  
  monthlyRevenue: [
    { id: 'm12', month: 'Sep', year: 2026, revenue: 0, label: '0L', subLabel: '(Active)', color: '#3b82f6' },
  ],
  
  categoryShares: [],
  topProducts: [],
  investors: [],
  nextSteps: [],
  
  keyInsights: {
    salesGrowthPct: 0,
    salesGrowthNote: 'Target Goal Pacing',
    bestCategoryName: 'N/A',
    bestCategoryNote: '0% of total revenue',
    topProductName: 'N/A',
    topProductNote: '₹0',
    monthlyAvgRevenue: '₹0',
    totalInvestorsCount: 0,
    totalInvestorsNote: 'INR + NRI',
  },
  
  dailyLogs: [],
};

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-11 09:30:14',
    action: 'DATA_SYNC_DAILY',
    user: 'Maithili S.',
    role: 'admin',
    details: 'September daily sales synchronized with Meta & Google Ad API',
    status: 'success',
    ipAddress: '103.21.244.18',
  },
  {
    id: 'aud-2',
    timestamp: '2026-09-11 08:45:00',
    action: 'AES_ENCRYPTION_VERIFIED',
    user: 'SYSTEM_DAEMON',
    role: 'system',
    details: 'Daily automated database encryption key rotation (AES-256-GCM compliant)',
    status: 'success',
    ipAddress: '127.0.0.1',
  },
  {
    id: 'aud-3',
    timestamp: '2026-09-10 21:12:33',
    action: 'AUTH_CLIENT_LOGIN',
    user: 'Rajesh Verma',
    role: 'client',
    details: 'Client signed in from trusted IP via session token',
    status: 'success',
    ipAddress: '49.36.120.91',
  },
  {
    id: 'aud-4',
    timestamp: '2026-09-10 17:00:00',
    action: 'EMAIL_DISPATCH',
    user: 'SYSTEM_TRIGGER',
    role: 'system',
    details: 'Automated investor milestone digest delivered to 12 recipient addresses',
    status: 'success',
    ipAddress: '127.0.0.1',
  },
];

export const initialEmailNotifications: EmailNotification[] = [
  {
    id: 'notif-1',
    recipient: 'admin@dashboard.com',
    subject: '🎯 Daily Target Velocity Alert: ₹21,000 September Milestone',
    trigger: 'Daily Sales Milestone Reached',
    sentAt: '2026-09-10 22:00:00',
    status: 'delivered',
    previewText: 'September sales have reached ₹21,000 across 7 active tracking days with 94.2% pacing.',
  },
  {
    id: 'notif-2',
    recipient: 'investors-list@apexmarketing.com',
    subject: '📊 Apex Growth Bi-Weekly Investment Report (₹35.50 Lakh Portfolio)',
    trigger: 'Scheduled Bi-Weekly Digest',
    sentAt: '2026-09-08 09:00:00',
    status: 'delivered',
    previewText: 'Total portfolio investment remains ₹35.50 Lakh across 12 Indian and NRI partners.',
  },
  {
    id: 'notif-3',
    recipient: 'admin@apexmarketing.com',
    subject: '⚠️ Anomaly Alert: Sales variance checked (-15.7% YOY base shift)',
    trigger: 'Metric Variance Monitor',
    sentAt: '2026-09-05 14:20:10',
    status: 'delivered',
    previewText: 'Real-time sales variance monitoring active. All daily channel inputs verified.',
  },
];

export const initialApiKeys: ApiKeyItem[] = [
  {
    id: 'key-1',
    name: 'Meta Ads Webhook Production',
    keyPrefix: 'ak_live_948f...',
    created: '2026-08-15',
    lastUsed: '10 minutes ago',
    status: 'active',
  },
  {
    id: 'key-2',
    name: 'Google Analytics & Ads Sync',
    keyPrefix: 'ak_live_722b...',
    created: '2026-08-20',
    lastUsed: '2 hours ago',
    status: 'active',
  },
  {
    id: 'key-3',
    name: 'Shopify / WooCommerce Webhook',
    keyPrefix: 'ak_live_331a...',
    created: '2026-09-01',
    lastUsed: 'Yesterday',
    status: 'active',
  },
];
