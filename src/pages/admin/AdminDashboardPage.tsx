import { useState } from 'react';
import { useAdminAuth } from '../../admin/hooks/useAdminAuth';
import BlogManager from '../../admin/components/BlogManager';
import AwardsManager from '../../admin/components/AwardsManager';
import ProductManager from '../../admin/components/ProductManager';
import { STORAGE_KEYS } from '../../config/site';
import { useSEO } from '../../hooks/useSEO';

export default function AdminDashboardPage() {
  useAdminAuth();
  const [tab, setTab] = useState('blogs');

  useSEO({ title: 'Admin Dashboard', description: 'Content management', noIndex: true });

  const tabs = [
    { id: 'blogs', label: '📝 Blog Posts' },
    { id: 'awards', label: '🏆 Awards & Photos' },
    { id: 'products', label: '💰 Product Prices' },
  ];

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.auth);
    localStorage.removeItem(STORAGE_KEYS.authTime);
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Busy Multicare — Admin Panel</h1>
        <button type="button" onClick={handleLogout} className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
          Logout
        </button>
      </header>
      <nav className="bg-white border-b px-6 flex gap-2 py-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${tab === t.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="p-6 max-w-6xl mx-auto">
        {tab === 'blogs' && <BlogManager />}
        {tab === 'awards' && <AwardsManager />}
        {tab === 'products' && <ProductManager />}
      </main>
    </div>
  );
}
