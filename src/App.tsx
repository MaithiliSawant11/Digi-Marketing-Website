/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { TopKpiCards } from './components/TopKpiCards';
import { MonthlyRevenueChart } from './components/MonthlyRevenueChart';
import { RevenueShareDonut } from './components/RevenueShareDonut';
import { TopProductsTable } from './components/TopProductsTable';
import { InvestorsTable } from './components/InvestorsTable';
import { KeyInsightsRow } from './components/KeyInsightsRow';
import { NextStepsWidget } from './components/NextStepsWidget';
import { UpdateDailyDataModal } from './components/UpdateDailyDataModal';
import { TargetEditModal } from './components/TargetEditModal';
import { AuthModal } from './components/AuthModal';
import { AdminConsole } from './components/AdminConsole';
import { ProductsView } from './components/ProductsView';
import { SalesView } from './components/SalesView';
import { InvestorsView } from './components/InvestorsView';
import { GoalsView } from './components/GoalsView';

import { api } from './services/api';
import { DashboardData, User, ClientAccount, UserRole, ProductItem, InvestorItem } from './types';
import { initialDashboardData, initialUsers, initialClients } from './data/initialData';

export default function App() {
  const [data, setData] = useState<DashboardData>(initialDashboardData);
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);
  const [clients, setClients] = useState<ClientAccount[]>(initialClients);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Modals state
  const [isDailyUpdateOpen, setIsDailyUpdateOpen] = useState(false);
  const [isTargetEditOpen, setIsTargetEditOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [dashRes, clientRes] = await Promise.all([
        api.getDashboard(),
        api.getClients(),
      ]);
      setData(dashRes.data);
      if (dashRes.user) setCurrentUser(dashRes.user);
      setClients(clientRes.clients);
    } catch (err) {
      console.error('Error loading initial data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDailyUpdateSubmit = async (payload: {
    amount: number;
    channel: string;
    campaignName: string;
    note: string;
    date: string;
  }) => {
    setIsSyncing(true);
    try {
      const res = await api.postDailyUpdate(payload);
      if (res.data) {
        setData(res.data);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveTarget = async (newTarget: number) => {
    setIsSyncing(true);
    try {
      await api.updateTargetGoal(newTarget);
      setData((prev) => ({ ...prev, targetGoal: newTarget }));
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateProduct = async (id: number, payload: Partial<ProductItem>) => {
    setIsSyncing(true);
    try {
      const res = await api.updateProduct(id, payload);
      if (res.data) {
        setData(res.data);
      } else if (res.products) {
        setData((prev) => ({ ...prev, topProducts: res.products }));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddProduct = async (payload: { name: string; revenue: number; category?: string }) => {
    setIsSyncing(true);
    try {
      const res = await api.addProduct(payload);
      if (res.data) {
        setData(res.data);
      } else if (res.products) {
        setData((prev) => ({ ...prev, topProducts: res.products }));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateInvestor = async (id: number, payload: Partial<InvestorItem>) => {
    setIsSyncing(true);
    try {
      const res = await api.updateInvestor(id, payload);
      if (res.data) {
        setData(res.data);
      } else if (res.investors) {
        setData((prev) => ({
          ...prev,
          investors: res.investors,
          keyInsights: {
            ...prev.keyInsights,
            totalInvestorsCount: res.investors.length,
          },
        }));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddInvestor = async (payload: { name: string; type: string; investmentLakh: number }) => {
    setIsSyncing(true);
    try {
      const res = await api.addInvestor(payload);
      if (res.data) {
        setData(res.data);
      } else if (res.investors) {
        setData((prev) => ({
          ...prev,
          investors: res.investors,
          keyInsights: {
            ...prev.keyInsights,
            totalInvestorsCount: res.investors.length,
          },
        }));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleNextStep = async (id: string) => {
    try {
      await api.toggleNextStep(id);
      setData((prev) => ({
        ...prev,
        nextSteps: prev.nextSteps.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleSwitch = async (role: UserRole) => {
    setIsSyncing(true);
    try {
      const res = await api.switchRole(role);
      if (res.user) setCurrentUser(res.user);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = async (email: string, password?: string, role?: UserRole) => {
    setIsSyncing(true);
    try {
      const res = await api.login(email, password, role);
      if (res.user) setCurrentUser(res.user);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateProfile = async (payload: { name: string; email: string; avatarUrl?: string }) => {
    setIsSyncing(true);
    try {
      const res = await api.updateProfile(payload);
      if (res.user) setCurrentUser(res.user);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSelectClient = async (clientId: string) => {
    setIsSyncing(true);
    try {
      const res = await api.switchClient(clientId);
      if (res.dashboard) {
        setData(res.dashboard);
      }
      setClients((prev) =>
        prev.map((c) => ({ ...c, active: c.id === clientId }))
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setIsSyncing(true);
    try {
      const res = await api.deleteProduct(id);
      if (res.data) {
        setData(res.data);
      } else if (res.products) {
        setData((prev) => ({ ...prev, topProducts: res.products }));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteInvestor = async (id: number) => {
    setIsSyncing(true);
    try {
      const res = await api.deleteInvestor(id);
      if (res.data) {
        setData(res.data);
      } else if (res.investors) {
        setData((prev) => ({
          ...prev,
          investors: res.investors,
          keyInsights: {
            ...prev.keyInsights,
            totalInvestorsCount: res.investors.length,
          },
        }));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteDailyLog = async (id: string) => {
    setIsSyncing(true);
    try {
      const res = await api.deleteDailyLog(id);
      if (res.data) {
        setData(res.data);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateInsights = async (payload: Partial<DashboardData['keyInsights']>) => {
    setIsSyncing(true);
    try {
      const res = await api.updateKeyInsights(payload);
      if (res.keyInsights) {
        setData((prev) => ({ ...prev, keyInsights: res.keyInsights }));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleClearAllData = async () => {
    if (!window.confirm('Wipe all products, investors, and sales logs to start completely fresh?')) return;
    setIsSyncing(true);
    try {
      const res = await api.clearAllData();
      if (res.data) setData(res.data);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all dashboard figures to baseline defaults?')) return;
    setIsSyncing(true);
    try {
      const res = await api.resetToImageDefaults();
      if (res.data) setData(res.data);
    } finally {
      setIsSyncing(false);
    }
  };

  const canEdit = currentUser.role !== 'investor';

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header (Exact as in image + live update & profile actions) */}
      <Header
        targetGoal={data.targetGoal}
        onUpdateDailyClick={() => setIsDailyUpdateOpen(true)}
        onOpenTargetEdit={() => setIsTargetEditOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminConsole={() => setActiveTab('admin')}
        onResetDefaults={handleResetDefaults}
        onClearAllData={handleClearAllData}
        currentUser={currentUser}
        onRoleSwitch={handleRoleSwitch}
        isSyncing={isSyncing}
      />

      {/* 2. Main Body Container with Sidebar and Dashboard Content */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col md:flex-row gap-4 p-3 sm:p-5">
        
        {/* Sidebar (Exact navigation items & playful handwriting note) */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          clients={clients}
          activeClientId={data.clientId}
          onSelectClient={handleSelectClient}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 space-y-4">
          
          {/* TAB 1: OVERVIEW - EXACT FRONTEND DASHBOARD FROM IMAGE */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Top 5 KPI Cards */}
              <TopKpiCards
                data={data}
                onCardClick={(key) => {
                  if (key === 'sep-2026') setIsDailyUpdateOpen(true);
                  if (key === 'products') setActiveTab('products');
                  if (key === 'target') setIsTargetEditOpen(true);
                  if (key === 'total' || key === 'aug-2026') setActiveTab('sales');
                }}
              />

              {/* Middle Section: 3-column layout exactly matching the image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                
                {/* Left Column (Bar Chart & Donut Chart) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Monthly Revenue Bar Chart with Daily -> Monthly -> Yearly Breakdown Flow */}
                  <MonthlyRevenueChart
                    data={data.monthlyRevenue}
                    dailyLogs={data.dailyLogs}
                    onOpenDailyUpdate={() => setIsDailyUpdateOpen(true)}
                  />

                  {/* Revenue Share By Category Donut */}
                  <RevenueShareDonut shares={data.categoryShares} totalRevenue={data.totalSales2Years} />
                </div>

                {/* Middle Column (Top 20 Products & Revenue) */}
                <div className="lg:col-span-3">
                  <TopProductsTable
                    products={data.topProducts}
                    onUpdateProduct={handleUpdateProduct}
                    onAddProduct={handleAddProduct}
                    onDeleteProduct={handleDeleteProduct}
                    canEdit={canEdit}
                  />
                </div>

                {/* Right Column (Investors & Investment Details + Next Steps) */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Investors & Investment Details */}
                  <InvestorsTable
                    investors={data.investors}
                    onUpdateInvestor={handleUpdateInvestor}
                    onAddInvestor={handleAddInvestor}
                    onDeleteInvestor={handleDeleteInvestor}
                    canEdit={canEdit}
                  />

                  {/* Next Steps / Focus Areas */}
                  <NextStepsWidget
                    steps={data.nextSteps}
                    onToggleStep={handleToggleNextStep}
                    canEdit={canEdit}
                  />
                </div>

              </div>

              {/* Bottom Row: Key Insights */}
              <KeyInsightsRow
                insights={data.keyInsights}
                totalInvestors={data.investors.length}
                onUpdateInsights={handleUpdateInsights}
                canEdit={canEdit}
              />

            </div>
          )}

          {/* TAB 2: PRODUCTS TAB */}
          {activeTab === 'products' && (
            <ProductsView
              products={data.topProducts}
              onUpdateProduct={handleUpdateProduct}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              canEdit={canEdit}
            />
          )}

          {/* TAB 3: SALES TAB */}
          {activeTab === 'sales' && (
            <SalesView
              data={data}
              onOpenDailyUpdate={() => setIsDailyUpdateOpen(true)}
              onDeleteDailyLog={handleDeleteDailyLog}
              canEdit={canEdit}
            />
          )}

          {/* TAB 4: INVESTORS TAB */}
          {activeTab === 'investors' && (
            <InvestorsView
              investors={data.investors}
              onUpdateInvestor={handleUpdateInvestor}
              onAddInvestor={handleAddInvestor}
              onDeleteInvestor={handleDeleteInvestor}
              canEdit={canEdit}
            />
          )}

          {/* TAB 5 & 6: INSIGHTS & GOALS TAB */}
          {(activeTab === 'insights' || activeTab === 'goals') && (
            <GoalsView
              data={data}
              onToggleNextStep={handleToggleNextStep}
              onOpenTargetEdit={() => setIsTargetEditOpen(true)}
              canEdit={canEdit}
            />
          )}

          {/* TAB 7: ADMIN MANAGEMENT CONSOLE */}
          {activeTab === 'admin' && (
            <AdminConsole
              onBackToDashboard={() => setActiveTab('overview')}
              clients={clients}
              activeClientId={data.clientId}
              onSelectClient={handleSelectClient}
              onDailyDataChanged={fetchInitialData}
            />
          )}

        </main>
      </div>

      {/* Modals */}
      <UpdateDailyDataModal
        isOpen={isDailyUpdateOpen}
        onClose={() => setIsDailyUpdateOpen(false)}
        onSubmit={handleDailyUpdateSubmit}
        onDeleteDailyLog={handleDeleteDailyLog}
        currentSepSales={data.salesSeptember2026}
        targetGoal={data.targetGoal}
        recentLogs={data.dailyLogs}
        canEdit={canEdit}
      />

      <TargetEditModal
        isOpen={isTargetEditOpen}
        onClose={() => setIsTargetEditOpen(false)}
        currentTarget={data.targetGoal}
        onSave={handleSaveTarget}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onUpdateProfile={handleUpdateProfile}
        onSwitchRole={handleRoleSwitch}
        onLogin={handleLogin}
      />

    </div>
  );
}
