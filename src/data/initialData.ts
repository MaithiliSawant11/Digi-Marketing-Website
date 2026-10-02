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
  totalSales2Years: 153132,
  salesAugust2026: 65000,
  salesSeptember2026: 88132,
  
  monthlyRevenue: [
    { id: 'm1', month: 'Oct', year: 2025, revenue: 15000, label: '15.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm2', month: 'Nov', year: 2025, revenue: 22000, label: '22.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm3', month: 'Dec', year: 2025, revenue: 35000, label: '35.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm4', month: 'Jan', year: 2026, revenue: 28000, label: '28.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm5', month: 'Feb', year: 2026, revenue: 32000, label: '32.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm6', month: 'Mar', year: 2026, revenue: 41000, label: '41.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm7', month: 'Apr', year: 2026, revenue: 38000, label: '38.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm8', month: 'May', year: 2026, revenue: 48000, label: '48.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm9', month: 'Jun', year: 2026, revenue: 52000, label: '52.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm10', month: 'Jul', year: 2026, revenue: 58000, label: '58.0K', subLabel: 'Prior', color: '#0284c7' },
    { id: 'm11', month: 'Aug', year: 2026, revenue: 65000, label: '65.0K', subLabel: 'Prior Month', color: '#0284c7' },
    { id: 'm12', month: 'Sep', year: 2026, revenue: 88132, label: '88.1K', subLabel: '(Active)', color: '#3b82f6' },
  ],
  
  categoryShares: [
    { id: 'c1', name: 'Fashion & Accessories', percentage: 100, color: '#06b6d4' },
  ],
  
  topProducts: [
    {
      id: 1,
      rank: 1,
      name: 'Smart Watch (Classic Luxury)',
      quantity: 10,
      revenue: 49990,
      category: 'Fashion & Accessories',
    },
    {
      id: 2,
      rank: 2,
      name: 'Kurti (Designer Ethnic Wear)',
      quantity: 15,
      revenue: 27750,
      category: 'Fashion & Accessories',
    },
    {
      id: 3,
      rank: 3,
      name: 'Leather Wallet & Belt Set',
      quantity: 8,
      revenue: 10392,
      category: 'Fashion & Accessories',
    },
  ],
  
  investors: [
    { id: 1, rank: 1, name: 'Rajesh Verma', type: 'Indian', investmentLakh: 10.0 },
    { id: 2, rank: 2, name: 'Anita Sharma', type: 'Indian', investmentLakh: 15.0 },
    { id: 3, rank: 3, name: 'Dr. K. Patel', type: 'NRI (USA)', investmentLakh: 20.0 },
    { id: 4, rank: 4, name: 'Sheikh Al-Maktoum', type: 'NRI (UAE)', investmentLakh: 25.0 },
  ],
  
  nextSteps: [
    { id: 's1', text: 'Scale Kurti & Ethnic Wear Meta Ad campaigns', completed: true },
    { id: 's2', text: 'Optimize Smart Watch retargeting conversion funnels', completed: true },
    { id: 's3', text: 'Expand NRI Angel Partner network pool to ₹1.0 Cr', completed: false },
    { id: 's4', text: 'Automate daily sales webhook ingest with Meta Pixel', completed: true },
  ],
  
  keyInsights: {
    salesGrowthPct: 35.6,
    salesGrowthNote: 'Pacing +35.6% ahead vs August',
    bestCategoryName: 'Fashion & Accessories',
    bestCategoryNote: '100% of current revenue (₹88,132)',
    topProductName: 'Smart Watch (Classic Luxury)',
    topProductNote: '₹49,990 (10 units)',
    monthlyAvgRevenue: '₹76,566',
    totalInvestorsCount: 4,
    totalInvestorsNote: '₹70.00L Total Portfolio (INR + NRI)',
  },
  
  dailyLogs: [
    {
      id: 'log-1',
      amount: 27750,
      channel: 'Meta Ads',
      campaignName: 'Kurti & Ethnic Autumn Festival Campaign',
      note: '15 units sold via Instagram & Facebook video ads',
      date: '2026-09-15',
      recordedBy: 'Admin Manager',
      timestamp: '2026-09-15 10:00:00',
    },
    {
      id: 'log-2',
      amount: 49990,
      channel: 'Google Ads',
      campaignName: 'Smart Watch Luxury High Intent Search',
      note: '10 units sold via Google Shopping PPC',
      date: '2026-09-16',
      recordedBy: 'Admin Manager',
      timestamp: '2026-09-16 11:30:00',
    },
    {
      id: 'log-3',
      amount: 10392,
      channel: 'Organic / SEO',
      campaignName: 'Accessories Bundle SEO Funnel',
      note: '8 units sold organically via website search',
      date: '2026-09-17',
      recordedBy: 'Admin Manager',
      timestamp: '2026-09-17 14:15:00',
    },
  ],
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
