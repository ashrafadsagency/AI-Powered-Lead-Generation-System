import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { Niche, NicheStatus } from '../types';

interface NicheLibraryViewProps {
  niches: Niche[];
  onUseNiche: (nicheId: string) => void;
}

export default function NicheLibraryView({ niches, onUseNiche }: NicheLibraryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(niches.map(n => n.category)))];

  const filteredNiches = niches.filter(n => {
    const matchesSearch = n.nicheName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesSearch && matchesCategory && n.status === NicheStatus.ACTIVE;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Industry Niche Library</h2>
          <p className="text-gray-500">Select a pre-configured industry template to boost AI accuracy.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search industry, services, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all
                ${selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNiches.length > 0 ? (
          filteredNiches.map(niche => (
            <div key={niche.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
              <div className="p-6 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {niche.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{niche.nicheName}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider">
                      {niche.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {niche.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Popular Services
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {niche.servicesOffered.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                    {niche.servicesOffered.length > 3 && (
                      <span className="text-[10px] font-bold text-gray-400">+{niche.servicesOffered.length - 3} move</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex items-center gap-2">
                <button 
                  onClick={() => onUseNiche(niche.id)}
                  className="flex-1 bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Use This Niche
                </button>
                <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                  <Info className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Library className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <h4 className="text-lg font-bold">No niches found</h4>
            <p className="text-sm">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Library(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
}
