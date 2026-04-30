import { Lead } from '../types/dashboard';
export default function LeadsPage({ leads }: { leads: Lead[] }) {
  return <div className="bg-white border rounded-xl overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="p-3 text-left">ID</th><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Status</th></tr></thead><tbody>{leads.map((lead)=><tr key={lead.id} className="border-t"><td className="p-3">{lead.id}</td><td className="p-3">{lead.name}</td><td className="p-3">{lead.email}</td><td className="p-3">{lead.status}</td></tr>)}</tbody></table></div>;
}
