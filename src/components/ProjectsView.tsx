import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Copy, 
  Download, 
  FileText, 
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layout,
  MessageSquare,
  Facebook,
  Instagram,
  Clapperboard,
  Image as ImageIcon
} from 'lucide-react';
import { GeneratedAsset, BusinessProfile } from '../types';

interface ProjectsViewProps {
  assets: GeneratedAsset[];
  businesses: BusinessProfile[];
}

export default function ProjectsView({ assets, businesses }: ProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAssets = assets.filter(asset => {
    const business = businesses.find(b => b.id === asset.businessId);
    return business?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getIcon = (key: string) => {
    switch (key) {
      case 'headline': return <FileText className="w-4 h-4" />;
      case 'landingPage': return <Layout className="w-4 h-4" />;
      case 'googleAds': return <Search className="w-4 h-4" />;
      case 'metaAds': return <Facebook className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'reelScript': return <Clapperboard className="w-4 h-4" />;
      case 'imagePrompt': return <ImageIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project History</h2>
          <p className="text-gray-500">Access all previously generated marketing materials.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search projects by business name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAssets.length > 0 ? (
          filteredAssets.map(asset => {
            const business = businesses.find(b => b.id === asset.businessId);
            const isExpanded = expandedId === asset.id;

            return (
              <div key={asset.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all">
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : asset.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">
                      {business?.name?.[0] || 'B'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{business?.name || 'Deleted Business'}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <Calendar className="w-3 h-3" />
                          {new Date(asset.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase font-bold tracking-tight">
                          Project ID: {asset.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-300" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-gray-50 bg-gray-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {Object.entries(asset.assets).map(([key, val]) => (
                        <div key={key} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                              {getIcon(key)}
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(val as string);
                              }}
                              className="text-gray-300 hover:text-blue-600 transition-colors"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">{val as string}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
            <Layout className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p className="font-semibold">No assets found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
