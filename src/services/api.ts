import { DashboardData, User, ClientAccount, AuditLog, EmailNotification, ApiKeyItem, ProductItem, InvestorItem } from '../types';
import { initialDashboardData, initialUsers, initialClients, initialAuditLogs, initialEmailNotifications, initialApiKeys } from '../data/initialData';

export const api = {
  async getDashboard(): Promise<{ data: DashboardData; user: User }> {
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Failed to fetch dashboard');
      return await res.json();
    } catch {
      return { data: initialDashboardData, user: initialUsers[0] };
    }
  },

  async postDailyUpdate(payload: {
    amount: number;
    channel?: string;
    campaignName?: string;
    note?: string;
    date?: string;
  }): Promise<{ success: boolean; data: DashboardData; progress?: number }> {
    const res = await fetch('/api/dashboard/daily-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to post daily update');
    return await res.json();
  },

  async updateTargetGoal(targetGoal: number): Promise<{ success: boolean; targetGoal: number }> {
    const res = await fetch('/api/dashboard/target', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetGoal }),
    });
    if (!res.ok) throw new Error('Failed to update target');
    return await res.json();
  },

  async updateProduct(id: number, payload: Partial<ProductItem>): Promise<{ success: boolean; data?: DashboardData; products: ProductItem[] }> {
    const res = await fetch(`/api/dashboard/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  },

  async addProduct(payload: { name: string; revenue: number; category?: string }): Promise<{ success: boolean; data?: DashboardData; products: ProductItem[] }> {
    const res = await fetch('/api/dashboard/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to add product');
    return await res.json();
  },

  async deleteProduct(id: number): Promise<{ success: boolean; data?: DashboardData; products: ProductItem[] }> {
    const res = await fetch(`/api/dashboard/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return await res.json();
  },

  async updateInvestor(id: number, payload: Partial<InvestorItem>): Promise<{ success: boolean; data?: DashboardData; investors: InvestorItem[] }> {
    const res = await fetch(`/api/dashboard/investors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update investor');
    return await res.json();
  },

  async addInvestor(payload: { name: string; type: string; investmentLakh: number }): Promise<{ success: boolean; data?: DashboardData; investors: InvestorItem[] }> {
    const res = await fetch('/api/dashboard/investors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to add investor');
    return await res.json();
  },

  async deleteInvestor(id: number): Promise<{ success: boolean; data?: DashboardData; investors: InvestorItem[] }> {
    const res = await fetch(`/api/dashboard/investors/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete investor');
    return await res.json();
  },

  async deleteDailyLog(id: string): Promise<{ success: boolean; data: DashboardData }> {
    const res = await fetch(`/api/dashboard/daily-logs/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete daily log');
    return await res.json();
  },

  async updateKeyInsights(payload: any): Promise<{ success: boolean; keyInsights: any }> {
    const res = await fetch('/api/dashboard/insights', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update key insights');
    return await res.json();
  },

  async toggleNextStep(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/dashboard/next-steps/${id}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to toggle step');
    return await res.json();
  },

  async resetToImageDefaults(): Promise<{ success: boolean; data: DashboardData }> {
    const res = await fetch('/api/dashboard/reset', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to reset data');
    return await res.json();
  },

  async clearAllData(): Promise<{ success: boolean; data: DashboardData }> {
    const res = await fetch('/api/dashboard/clear-all', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to clear data');
    return await res.json();
  },

  // Auth & Roles
  async login(email: string, password?: string, role?: string): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to sign in');
    }
    return await res.json();
  },

  async switchRole(role: string, password?: string): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/switch-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, password }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to switch role');
    }
    return await res.json();
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to change password');
    }
    return await res.json();
  },

  async updateProfile(payload: { name: string; email: string; avatarUrl?: string }): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return await res.json();
  },

  // Clients
  async getClients(): Promise<{ clients: ClientAccount[]; activeClientId: string }> {
    try {
      const res = await fetch('/api/clients');
      if (!res.ok) throw new Error('Failed to fetch clients');
      return await res.json();
    } catch {
      return { clients: initialClients, activeClientId: 'client-apex' };
    }
  },

  async switchClient(clientId: string): Promise<{ success: boolean; client: ClientAccount; dashboard: DashboardData }> {
    const res = await fetch('/api/clients/switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId }),
    });
    if (!res.ok) throw new Error('Failed to switch workspace');
    return await res.json();
  },

  // Notifications
  async getNotifications(): Promise<{ notifications: EmailNotification[] }> {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) throw new Error('Failed to fetch notifications');
      return await res.json();
    } catch {
      return { notifications: initialEmailNotifications };
    }
  },

  async sendTestNotification(subject?: string, recipient?: string): Promise<{ success: boolean }> {
    const res = await fetch('/api/notifications/test-send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, recipient }),
    });
    if (!res.ok) throw new Error('Failed to send test notification');
    return await res.json();
  },

  // API Keys & Webhook
  async getApiKeys(): Promise<{ keys: ApiKeyItem[] }> {
    try {
      const res = await fetch('/api/v1/keys');
      if (!res.ok) throw new Error('Failed to fetch API keys');
      return await res.json();
    } catch {
      return { keys: initialApiKeys };
    }
  },

  async createApiKey(name: string): Promise<{ success: boolean; key: ApiKeyItem }> {
    const res = await fetch('/api/v1/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error('Failed to create key');
    return await res.json();
  },

  async triggerWebhookSim(amount: number, source: string, campaign?: string): Promise<any> {
    const res = await fetch('/api/v1/webhook/daily-sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ak_live_demo_key',
      },
      body: JSON.stringify({ amount, source, campaign }),
    });
    if (!res.ok) throw new Error('Webhook rejected');
    return await res.json();
  },

  // Security & Audit
  async getAuditLogs(): Promise<{ logs: AuditLog[] }> {
    try {
      const res = await fetch('/api/audit-logs');
      if (!res.ok) throw new Error('Failed to fetch audit logs');
      return await res.json();
    } catch {
      return { logs: initialAuditLogs };
    }
  },

  async getSecurityStatus(): Promise<any> {
    try {
      const res = await fetch('/api/security/status');
      if (!res.ok) throw new Error('Failed to fetch security status');
      return await res.json();
    } catch {
      return {
        encryption: { algorithm: 'AES-256-GCM', status: 'Compliant' },
        compliance: { soc2TypeII: 'Active', gdprCompliant: true },
        accessControl: { rbacEnforced: true },
      };
    }
  },
};
