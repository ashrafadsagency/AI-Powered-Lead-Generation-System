import { Menu, Sparkles, UserCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const nav = [
  ['Dashboard', '/dashboard'],
  ['My Businesses', '/businesses'],
  ['Niche Library', '/niches'],
  ['AI Generator', '/generator'],
  ['Leads', '/leads'],
  ['Saved Outputs', '/saved-outputs'],
  ['Tasks & Payments', '/tasks-payments'],
  ['Settings', '/settings'],
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex">
        <aside className={`fixed z-40 md:static top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 p-5 transform transition ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <Link to="/dashboard" className="flex items-center gap-2 text-lg font-bold text-blue-700">
            <Sparkles size={20} /> BrandUp AI Builder
          </Link>
          <nav className="mt-8 space-y-2">
            {nav.map(([label, path]) => (
              <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' : 'text-slate-600 hover:bg-blue-50'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        {open && <button className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setOpen(false)} />}
        <div className="flex-1 min-w-0">
          <header className="h-16 bg-white border-b border-slate-200 px-5 flex items-center justify-between">
            <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
            <h1 className="font-semibold text-slate-700">BrandUp AI Builder</h1>
            <div className="flex items-center gap-2 text-sm"><UserCircle2 /> Admin User</div>
          </header>
          <main className="p-6"><Outlet /></main>
        </div>
      </div>
    </div>
  );
}
