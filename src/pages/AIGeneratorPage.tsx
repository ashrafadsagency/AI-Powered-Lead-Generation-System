import { useState } from 'react';
import { Business, Niche } from '../types/dashboard';

export default function AIGeneratorPage({ businesses, niches }: { businesses: Business[]; niches: Niche[] }) {
  const [output, setOutput] = useState('');
  return <div className="bg-white border rounded-xl p-5 space-y-3 max-w-3xl">
    <textarea className="w-full border rounded-lg p-3" rows={4} placeholder="Describe what you want to generate..." />
    <div className="grid md:grid-cols-2 gap-3">
      <select className="border rounded-lg p-3">{businesses.map((b)=><option key={b.id}>{b.name}</option>)}</select>
      <select className="border rounded-lg p-3">{niches.map((n)=><option key={n.id}>{n.title}</option>)}</select>
    </div>
    <button className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg px-4 py-2" onClick={()=>setOutput('Generated output preview... (dummy data)')}>Generate</button>
    <div className="border rounded-lg p-3 min-h-24 text-slate-600">{output || 'Your generated copy will appear here.'}</div>
  </div>;
}
