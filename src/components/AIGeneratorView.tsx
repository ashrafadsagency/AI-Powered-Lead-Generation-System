import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Send, 
  Copy, 
  Download, 
  Check, 
  AlertCircle,
  X,
  FileText,
  Layout,
  MessageSquare,
  Facebook,
  Instagram,
  Clapperboard,
  Image as ImageIcon,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Niche, BusinessProfile, GeneratedAsset } from '../types';
import { generateMarketingAssets } from '../services/geminiService';

interface AIGeneratorViewProps {
  niches: Niche[];
  businesses: BusinessProfile[];
  onSaveAsset: (asset: GeneratedAsset) => void;
}

export default function AIGeneratorView({ niches, businesses, onSaveAsset }: AIGeneratorViewProps) {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('');
  const [selectedNicheId, setSelectedNicheId] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedBusinessId || !selectedNicheId) {
      alert("Please select a business and a niche.");
      return;
    }

    const business = businesses.find(b => b.id === selectedBusinessId);
    const niche = niches.find(n => n.id === selectedNicheId);

    if (!business || !niche) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const gptResult = await generateMarketingAssets(business, niche, prompt);
      setResult(gptResult);
      
      const newAsset: GeneratedAsset = {
        id: Math.random().toString(36).substr(2, 9),
        businessId: selectedBusinessId,
        nicheId: selectedNicheId,
        assets: gptResult,
        createdAt: Date.now()
      };
      
      onSaveAsset(newAsset);
    } catch (error) {
      console.error(error);
      alert("Failed to generate assets. Check your API key or connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadText = (content: any) => {
    const text = Object.entries(content)
      .map(([key, val]) => `${key.toUpperCase()}\n-------------------\n${val}\n\n`)
      .join('');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brandup-marketing-assets.txt`;
    a.click();
  };

  const quickActions = [
    { label: 'Create Landing Page', icon: Layout },
    { label: 'Google Ads Copy', icon: FileText },
    { label: 'Meta Ads Copy', icon: Facebook },
    { label: 'WhatsApp Campaign', icon: MessageSquare },
    { label: 'Proposal Content', icon: FileText },
    { label: 'Image Prompt', icon: ImageIcon },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-gray-700">1. Select Business Profile</label>
            <div className="relative">
              <select 
                value={selectedBusinessId}
                onChange={(e) => setSelectedBusinessId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="">Select a saved client...</option>
                {businesses.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-gray-700">2. Select Niche Library</label>
            <div className="relative">
              <select 
                value={selectedNicheId}
                onChange={(e) => setSelectedNicheId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="">Select template niche...</option>
                {niches.filter(n => n.status === 'active').map(n => (
                  <option key={n.id} value={n.id}>{n.icon} {n.nicheName}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700">3. Describe what you want to create</label>
          <div className="relative group">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Generate a complete Facebook and Google ads campaign for a spring sale on dental whitening..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 min-h-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-lg"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
               <button 
                onClick={handleGenerate}
                disabled={isGenerating || !selectedBusinessId || !selectedNicheId}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                {isGenerating ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Generating Assets...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Assets
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
              <button 
                key={i}
                onClick={() => setPrompt(`Create a ${action.label.toLowerCase()} for...`)}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full text-sm font-medium text-gray-600 transition-colors flex items-center gap-2"
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                <Sparkles className="w-6 h-6 text-blue-600" />
                AI Generated Marketing Assets
              </h3>
              <button 
                onClick={() => downloadText(result)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(result).map(([key, value]: [string, any]) => (
                <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-700 uppercase text-xs tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <button 
                      onClick={() => copyToClipboard(value, key)}
                      className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-blue-600"
                    >
                      {copiedField === key ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-6 text-gray-600 whitespace-pre-wrap text-sm leading-relaxed flex-1">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !isGenerating && (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ready to grow your business?</h3>
          <p className="max-w-xs text-gray-500">Select a business profile and a niche template above to get started.</p>
        </div>
      )}
    </div>
  );
}
