import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Trophy,
  DollarSign,
  Globe,
  Settings,
  LogOut,
  Menu,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { ToastProvider } from '../ui/Toast';
import { ADMIN_BRAND, ADMIN_SIDEBAR, ADMIN_BG } from '../theme';
import Logo from '../../components/Logo';

const nav = [
  { to: '/admin/dashboard', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/dashboard/blogs', label: 'Blog Posts', icon: FileText },
  { to: '/admin/dashboard/awards', label: 'Awards & Photos', icon: Trophy },
  { to: '/admin/dashboard/products', label: 'Product Prices', icon: DollarSign },
  { to: '/admin/dashboard/site', label: 'CMS', icon: Globe },
  { to: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
];

function formatDate() {
  return new Date().toLocaleDateString('en-NP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function AdminLayout() {
  const { loading, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: ADMIN_BG }}>
        <div className="animate-pulse text-slate-500 text-sm">Loading admin…</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const sidebar = (
    <>
      <div className="px-5 py-5 border-b border-white/10">
        <Logo variant="nav" className="brightness-0 invert opacity-95" />
        <p className="text-slate-400 text-xs mt-3">busymulticare.com</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, end, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5"
        >
          <ExternalLink size={18} />
          View website
        </a>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-300/90 hover:bg-white/5"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <ToastProvider>
      <div className="min-h-screen flex" style={{ backgroundColor: ADMIN_BG }}>
        <aside className="hidden lg:flex w-[260px] flex-col shrink-0 fixed inset-y-0 left-0 z-40" style={{ backgroundColor: ADMIN_SIDEBAR }}>
          {sidebar}
        </aside>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <button type="button" className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} aria-label="Close menu" />
            <aside className="w-[260px] flex flex-col" style={{ backgroundColor: ADMIN_SIDEBAR }}>
              {sidebar}
            </aside>
          </div>
        )}

        <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button type="button" className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu size={22} />
              </button>
              <div>
                <h1 className="text-base font-semibold text-slate-900">Welcome back, Admin</h1>
                <p className="text-xs text-slate-500 hidden sm:block">{formatDate()}</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full hidden sm:block" style={{ backgroundColor: ADMIN_BRAND }} title="Online" />
          </header>
          <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
