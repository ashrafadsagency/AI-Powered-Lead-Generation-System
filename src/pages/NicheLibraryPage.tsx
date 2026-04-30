import { Niche } from '../types/dashboard';
export default function NicheLibraryPage({ niches }: { niches: Niche[] }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{niches.map((n)=><div key={n.id} className="bg-white border rounded-xl p-4"><h3 className="font-semibold">{n.title}</h3><p className="text-sm text-slate-500 mt-2">{n.description}</p><span className="inline-block mt-3 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Demand: {n.demand}</span></div>)}</div>;
}
