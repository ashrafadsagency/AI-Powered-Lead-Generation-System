import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Copy, 
  Check, 
  X, 
  Save, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { Niche, NicheStatus } from '../types';

interface AdminNicheManagerViewProps {
  niches: Niche[];
  onUpdateNiches: (niches: Niche[]) => void;
}

export default function AdminNicheManagerView({ niches, onUpdateNiches }: AdminNicheManagerViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState<Niche | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const initialNicheState: Niche = {
    id: '',
    nicheName: '',
    category: '',
    icon: '🚀',
    description: '',
    targetCustomers: '',
    servicesOffered: [],
    commonProblems: [],
    offerIdeas: [],
    googleAdsHeadlines: [],
    googleAdsDescriptions: [],
    metaAdsTexts: [],
    whatsappTemplates: [],
    landingPageSections: [],
    instagramPostIdeas: [],
    reelScriptIdeas: [],
    imagePromptTemplates: [],
    proposalPoints: [],
    followUpMessages: [],
    leadFormQuestions: [],
    status: NicheStatus.ACTIVE,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const [formData, setFormData] = useState<Niche>(initialNicheState);

  const handleSave = () => {
    if (!formData.nicheName || !formData.category) {
      alert("Niche name and category are required.");
      return;
    }

    let updatedNiches;
    if (isEditing) {
      updatedNiches = niches.map(n => n.id === formData.id ? { ...formData, updatedAt: Date.now() } : n);
    } else {
      const newNiche = { 
        ...formData, 
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        updatedAt: Date.now() 
      };
      updatedNiches = [...niches, newNiche];
    }

    onUpdateNiches(updatedNiches);
    setIsEditing(null);
    setIsAdding(false);
    setFormData(initialNicheState);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this niche?")) {
      onUpdateNiches(niches.filter(n => n.id !== id));
    }
  };

  const handleDuplicate = (niche: Niche) => {
    const duplicated = { 
      ...niche, 
      id: Math.random().toString(36).substr(2, 9),
      nicheName: `${niche.nicheName} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now() 
    };
    onUpdateNiches([...niches, duplicated]);
  };

  const filteredNiches = niches.filter(n => 
    n.nicheName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderForm = () => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-xl">{isEditing ? 'Edit Niche' : 'Add New Niche'}</h3>
        <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="p-2 hover:bg-gray-200 rounded-full">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Niche Name</label>
            <input 
              type="text" 
              value={formData.nicheName} 
              onChange={e => setFormData({ ...formData, nicheName: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              placeholder="Real Estate"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Category</label>
            <input 
              type="text" 
              value={formData.category} 
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              placeholder="Property"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Icon / Emoji</label>
            <input 
              type="text" 
              value={formData.icon} 
              onChange={e => setFormData({ ...formData, icon: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              placeholder="🏠"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Description</label>
          <textarea 
            value={formData.description} 
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none h-24 resize-none"
            placeholder="Help sellers and buyers in the residential market..."
          />
        </div>

        {/* Dynamic Fields (Lists) */}
        {[
          { label: 'Services Offered', key: 'servicesOffered', placeholder: 'Home Valuation' },
          { label: 'Common Problems', key: 'commonProblems', placeholder: 'Expensive loans' },
          { label: 'Offer Ideas', key: 'offerIdeas', placeholder: 'Free inspection' },
          { label: 'Google Ads Headlines', key: 'googleAdsHeadlines', placeholder: 'Best Homes here' },
          { label: 'WhatsApp Templates', key: 'whatsappTemplates', placeholder: 'Hi [Name], check out...' },
        ].map(field => (
          <div key={field.key} className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700">{field.label}</label>
              <button 
                onClick={() => {
                  const current = (formData as any)[field.key] as string[];
                  setFormData({ ...formData, [field.key]: [...current, ''] });
                }}
                className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {((formData as any)[field.key] as string[]).map((val, idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    type="text" 
                    value={val}
                    onChange={e => {
                      const current = [...(formData as any)[field.key]];
                      current[idx] = e.target.value;
                      setFormData({ ...formData, [field.key]: current });
                    }}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
                    placeholder={`${field.placeholder} ${idx + 1}`}
                  />
                  <button 
                    onClick={() => {
                      const current = [...(formData as any)[field.key]];
                      current.splice(idx, 1);
                      setFormData({ ...formData, [field.key]: current });
                    }}
                    className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 py-4">
           <label className="flex items-center gap-2 cursor-pointer">
             <input 
               type="checkbox" 
               checked={formData.status === NicheStatus.ACTIVE}
               onChange={e => setFormData({ ...formData, status: e.target.checked ? NicheStatus.ACTIVE : NicheStatus.INACTIVE })}
               className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
             />
             <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Active Visibility</span>
           </label>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button 
          onClick={() => { setIsEditing(null); setIsAdding(false); }}
          className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Save className="w-5 h-5" />
          Save Niche
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {!isEditing && !isAdding ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Niche Library Manager</h2>
              <p className="text-gray-500">Add and manage the database of niche industry templates.</p>
            </div>
            <button 
              onClick={() => { setFormData(initialNicheState); setIsAdding(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-5 h-5" />
              Create New Niche
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search niches by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNiches.map(niche => (
              <div key={niche.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
                        {niche.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{niche.nicheName}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{niche.category}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${niche.status === NicheStatus.ACTIVE ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold ${niche.status === NicheStatus.ACTIVE ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                      {niche.status.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 italic">"{niche.description}"</p>
                  <div className="text-xs text-gray-400 font-medium">
                    Updated {new Date(niche.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => { setFormData(niche); setIsEditing(niche); }}
                    className="flex items-center justify-center gap-1.5 py-2 hover:bg-white text-gray-600 hover:text-blue-600 rounded-lg transition-all font-bold text-xs border border-transparent hover:border-blue-100"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDuplicate(niche)}
                    className="flex items-center justify-center gap-1.5 py-2 hover:bg-white text-gray-600 hover:text-amber-600 rounded-lg transition-all font-bold text-xs border border-transparent hover:border-amber-100"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                  <button 
                    onClick={() => handleDelete(niche.id)}
                    className="flex items-center justify-center gap-1.5 py-2 hover:bg-white text-gray-600 hover:text-red-600 rounded-lg transition-all font-bold text-xs border border-transparent hover:border-red-100"
                  >
                    <Trash2 className="w-3 h-3" /> Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : renderForm()}
    </div>
  );
}
