import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  MapPin, 
  Globe, 
  Target, 
  Star,
  Phone
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface ClientManagerViewProps {
  businesses: BusinessProfile[];
  onUpdateBusinesses: (businesses: BusinessProfile[]) => void;
}

export default function ClientManagerView({ businesses, onUpdateBusinesses }: ClientManagerViewProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialFormState: BusinessProfile = {
    id: '',
    name: '',
    description: '',
    targetAudience: '',
    usp: '',
    website: '',
    contactNumber: '',
    location: ''
  };

  const [formData, setFormData] = useState<BusinessProfile>(initialFormState);

  const handleSave = () => {
    if (!formData.name) return;

    let updated;
    if (editingId) {
      updated = businesses.map(b => b.id === editingId ? { ...formData } : b);
    } else {
      updated = [...businesses, { ...formData, id: Math.random().toString(36).substr(2, 9) }];
    }
    
    onUpdateBusinesses(updated);
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this business profile?")) {
      onUpdateBusinesses(businesses.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saved Business Profiles</h2>
          <p className="text-gray-500">Manage client information for personalized AI generation.</p>
        </div>
        <button 
          onClick={() => { setFormData(initialFormState); setEditingId(null); setIsAdding(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Business
        </button>
      </div>

      {isAdding || editingId ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{editingId ? 'Edit Profile' : 'New Profile'}</h3>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Business Name *</label>
              <input 
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Elite Real Estate"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Website URL</label>
              <input 
                type="text"
                value={formData.website}
                onChange={e => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Short Description / Service</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 min-h-[100px] resize-none outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="We provide luxury residential properties with 0% commission fees..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Target Audience</label>
              <input 
                type="text"
                value={formData.targetAudience}
                onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="First-time homebuyers, high-net-worth individuals"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">USP (Unique Selling Point)</label>
              <input 
                type="text"
                value={formData.usp}
                onChange={e => setFormData({ ...formData, usp: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Direct listed properties only, transparent process"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Contact Number</label>
              <input 
                type="text"
                value={formData.contactNumber}
                onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Location</label>
              <input 
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Dubai, UAE"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Save className="w-5 h-5" />
              Save Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businesses.length > 0 ? (
            businesses.map(business => (
              <div key={business.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6 hover:shadow-md transition-shadow relative group">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl uppercase">
                    {business.name[0]}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setFormData(business); setEditingId(business.id); }}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(business.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{business.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mt-1">{business.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{business.website || 'No website'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{business.location || 'Local Business'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Target className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{business.targetAudience || 'General'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Star className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{business.usp || 'Quality Service'}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded-lg">
                    <Phone className="w-3.5 h-3.5" />
                    {business.contactNumber || 'Contact not set'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
              <Plus className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p className="font-semibold">No businesses saved yet.</p>
              <p className="text-sm">Create a profile to start generating assets properly.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
