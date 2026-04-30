import { FormEvent, useState } from 'react';
import { Business } from '../types/dashboard';

type Props = { businesses: Business[]; setBusinesses: (businesses: Business[]) => void };

export default function MyBusinessesPage({ businesses, setBusinesses }: Props) {
  const [form, setForm] = useState({ name: '', industry: '', website: '' });
  const [editId, setEditId] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (editId) {
      setBusinesses(businesses.map((b) => (b.id === editId ? { ...b, ...form } : b)));
      setEditId(null);
    } else {
      setBusinesses([{ id: crypto.randomUUID(), ...form }, ...businesses]);
    }
    setForm({ name: '', industry: '', website: '' });
  };

  return <div className="grid gap-6 lg:grid-cols-2">
    <form onSubmit={submit} className="bg-white border p-5 rounded-xl space-y-3">
      <h2 className="font-semibold">Add Business</h2>
      {['name','industry','website'].map((k)=><input key={k} className="w-full rounded-lg border p-2" placeholder={k} value={(form as any)[k]} onChange={(e)=>setForm({...form,[k]:e.target.value})} required />)}
      <button className="rounded-lg bg-blue-600 text-white px-4 py-2">{editId ? 'Update' : 'Add'}</button>
    </form>
    <div className="bg-white border p-5 rounded-xl">
      <h2 className="font-semibold mb-4">Business List</h2>
      <div className="space-y-3">{businesses.map((b)=><div key={b.id} className="border rounded-lg p-3 flex justify-between"><div><p className="font-medium">{b.name}</p><p className="text-sm text-slate-500">{b.industry} • {b.website}</p></div><div className="space-x-2"><button className="text-blue-600" onClick={()=>{setEditId(b.id); setForm({name:b.name,industry:b.industry,website:b.website});}}>Edit</button><button className="text-red-600" onClick={()=>setBusinesses(businesses.filter((x)=>x.id!==b.id))}>Delete</button></div></div>)}</div>
    </div>
  </div>;
}
