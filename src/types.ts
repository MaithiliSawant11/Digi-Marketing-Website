export type UserRole = 'admin' | 'investor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientId: string;
  avatarUrl?: string;
  passwordHash?: string;
  password?: string;
}

export interface ClientAccount {
  id: string;
  name: string;
  companyName: string;
  industry: string;
  plan: 'Enterprise' | 'Growth Pro' | 'Starter';
  active: boolean;
}

export interface MonthlyRevenueItem {
  id: string;
  month: string;
  year: number;
  revenue: number; // in rupees, e.g. 120000
  label: string; // e.g. "1.2L"
  color: string;
  subLabel?: string;
}

export interface CategoryShare {
  id: string;
  name: string;
  percentage: number; // e.g. 28.7
  color: string;
}

export interface ProductItem {
  id: number;
  rank: number;
  name: string;
  revenue: number; // in rupees, e.g. 650000
  quantity: number; // Units sold (default 1)
  category?: string;
}

export interface InvestorItem {
  id: number;
  rank: number;
  name: string;
  type: string; // e.g. "Indian", "NRI (UAE)", "NRI (USA)", "NRI (UK)", "NRI (Qatar)", "NRI (Canada)"
  investmentLakh: number; // e.g. 5.00
}

export interface FocusAreaItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface DailySalesLog {
  id: string;
  date: string;
  amount: number;
  channel: 'Meta Ads' | 'Google Ads' | 'Affiliate Marketing' | 'Organic / SEO' | 'Email Funnel' | 'Direct';
  campaignName?: string;
  note?: string;
  recordedBy: string;
  timestamp: string;
}

export interface DashboardData {
  clientId: string;
  clientName: string;
  lastUpdated: string;
  
  // Top KPI values
  targetGoal: number; // 2800000 (₹28,00,000)
  totalSales2Years: number; // Total Sales Volume
  salesAugust2026: number; // 148000 (₹1,48,000)
  salesSeptember2026: number; // 21000 (₹21,000)
  
  // Monthly chart data
  monthlyRevenue: MonthlyRevenueItem[];
  
  // Category share
  categoryShares: CategoryShare[];
  
  // Top 20 products
  topProducts: ProductItem[];
  
  // Investors
  investors: InvestorItem[];
  
  // Next steps checklist
  nextSteps: FocusAreaItem[];
  
  // Key Insights
  keyInsights: {
    salesGrowthPct: number; // -15.7
    salesGrowthNote: string; // "(slight dip, but stable)"
    bestCategoryName: string; // "Fashion & Electronics"
    bestCategoryNote: string; // "(49% of total revenue)"
    topProductName: string; // "Smart Watches"
    topProductNote: string; // "(₹6.5L revenue)"
    monthlyAvgRevenue: string; // "₹3.92 Lakh"
    totalInvestorsCount: number; // 12
    totalInvestorsNote: string; // "(INR + NRI)"
  };
  
  // Daily entries log
  dailyLogs: DailySalesLog[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  role: string;
  details: string;
  status: 'success' | 'warning' | 'alert';
  ipAddress: string;
}

export interface EmailNotification {
  id: string;
  recipient: string;
  subject: string;
  trigger: string;
  sentAt: string;
  status: 'sent' | 'pending' | 'delivered';
  previewText: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  keyToken?: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}
