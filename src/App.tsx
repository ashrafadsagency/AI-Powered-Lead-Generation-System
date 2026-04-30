/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  Library, 
  Settings, 
  Menu, 
  X, 
  ChevronRight, 
  Plus, 
  LogOut,
  CreditCard,
  CheckSquare,
  History,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { View, Niche, BusinessProfile, GeneratedAsset } from './types';
import { storage } from './lib/storage';

// View Components
import DashboardView from './components/DashboardView';
import AIGeneratorView from './components/AIGeneratorView';
import NicheLibraryView from './components/NicheLibraryView';
import AdminNicheManagerView from './components/AdminNicheManagerView';
import ClientManagerView from './components/ClientManagerView';
import ProjectsView from './components/ProjectsView';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [niches, setNiches] = useState<Niche[]>([]);
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  
  // Initialize data
  useEffect(() => {
    setNiches(storage.getNiches());
    setBusinesses(storage.getBusinesses());
    setAssets(storage.getAssets());
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'AI Builder', icon: Sparkles },
    { id: 'projects', label: 'Recent Projects', icon: History },
    { id: 'niches', label: 'Niche Library', icon: Library },
    { id: 'clients', label: 'Saved Businesses', icon: Users },
    { id: 'tasks', label: 'Tasks & Payments', icon: CreditCard },
  ];

  const adminItems = [
    { id: 'admin-niches', label: 'Niche Manager', icon: ShieldCheck },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView niches={niches} businesses={businesses} assets={assets} onNavigate={setActiveView} />;
      case 'generator':
        return <AIGeneratorView niches={niches} businesses={businesses} onSaveAsset={(asset) => {
          const newAssets = [asset, ...assets];
          setAssets(newAssets);
          storage.saveAssets(newAssets);
        }} />;
      case 'niches':
        return <NicheLibraryView niches={niches} onUseNiche={(nicheId) => {
          // Find a way to pass this to the generator
          setActiveView('generator');
        }} />;
      case 'admin-niches':
        return <AdminNicheManagerView niches={niches} onUpdateNiches={(updated) => {
          setNiches(updated);
          storage.saveNiches(updated);
        }} />;
      case 'clients':
        return <ClientManagerView businesses={businesses} onUpdateBusinesses={(updated) => {
          setBusinesses(updated);
          storage.saveBusinesses(updated);
        }} />;
      case 'projects':
        return <ProjectsView assets={assets} businesses={businesses} />;
      default:
        return <div className="p-8 text-center text-gray-500">Coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-gray-900 font-sans overflow-hidden">
      {/* Mobile Drawer Overlay */}
      {!isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
        `}
      >
        <div className="p-6 flex items-center gap-3 group cursor-pointer" onClick={() => setActiveView('dashboard')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform duration-300">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className={`font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 ${!isSidebarOpen && 'lg:hidden'}`}>BrandUp AI</span>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="ml-auto lg:hidden"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <div className={`px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider ${!isSidebarOpen && 'lg:hidden'}`}>
            Workspace
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${activeView === item.id 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className={!isSidebarOpen ? 'lg:hidden' : ''}>{item.label}</span>
              {activeView === item.id && isSidebarOpen && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}

          <div className={`mt-8 px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider ${!isSidebarOpen && 'lg:hidden'}`}>
            Administration
          </div>
          {adminItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${activeView === item.id 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className={!isSidebarOpen ? 'lg:hidden' : ''}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className={`flex items-center gap-3 w-full px-3 py-2 text-gray-500 hover:text-red-600 transition-colors ${!isSidebarOpen && 'lg:justify-center'}`}>
            <LogOut className="w-5 h-5" />
            <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:flex hidden"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 capitalize">
              {activeView.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-medium">Ashraf Ads Agency</span>
              <span className="text-xs text-gray-500">Premium Plan</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm ring-1 ring-gray-100">
              AA
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
