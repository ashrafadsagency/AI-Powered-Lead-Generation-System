import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Layout, 
  TrendingUp, 
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { View, Niche, BusinessProfile, GeneratedAsset } from '../types';

interface DashboardViewProps {
  niches: Niche[];
  businesses: BusinessProfile[];
  assets: GeneratedAsset[];
  onNavigate: (view: View) => void;
}

export default function DashboardView({ niches, businesses, assets, onNavigate }: DashboardViewProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Build Your Business Growth Assets With BrandUp AI
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Describe your business and instantly generate high-converting marketing materials tailored to your niche.
          </p>
          <button 
            onClick={() => onNavigate('generator')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5" />
            Start AI Builder
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full -mr-32 -mb-32 blur-3xl opacity-50" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Saved Businesses', value: businesses.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Active Niches', value: niches.filter(n => n.status === 'active').length, icon: Layout, color: 'bg-purple-50 text-purple-600' },
          { label: 'Assets Generated', value: assets.length, icon: Sparkles, color: 'bg-amber-50 text-amber-600' },
          { label: 'Completion Rate', value: '94%', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-lg">Recent Projects</h3>
            <button onClick={() => onNavigate('projects')} className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {assets.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                No projects yet. Start generating!
              </div>
            ) : (
              assets.slice(0, 5).map((asset) => {
                const business = businesses.find(b => b.id === asset.businessId);
                return (
                  <div key={asset.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">
                        {business?.name?.[0] || 'A'}
                      </div>
                      <div>
                        <div className="font-semibold">{business?.name || 'Untitled Business'}</div>
                        <div className="text-xs text-gray-500">{new Date(asset.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Need Help?</h3>
              <p className="text-slate-400 text-sm mb-6">Our experts can help you set up professional campaigns for your clients.</p>
              <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                Book a Demo
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full -mr-16 -mt-16 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Agency News</h3>
            <div className="space-y-4">
              {[
                'New "Real Estate" niche template added.',
                'WhatsApp integration now supports CTAs.',
                'Instagram Reel scripts updated for viral growth.'
              ].map((news, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{news}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
