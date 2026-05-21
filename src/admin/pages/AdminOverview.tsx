import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Trophy, Package, Globe, ArrowRight, Inbox } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { ADMIN_BRAND } from '../theme';

type StatCard = {
  label: string;
  value: number | string;
  icon: typeof FileText;
  to: string;
  empty: boolean;
};

export default function AdminOverview() {
  const [counts, setCounts] = useState({ blogs: 0, awards: 0, products: 0 });

  useEffect(() => {
    (async () => {
      const [b, a, p] = await Promise.all([
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('awards').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
      ]);
      setCounts({
        blogs: b.count ?? 0,
        awards: a.count ?? 0,
        products: p.count ?? 0,
      });
    })();
  }, []);

  const cards: StatCard[] = [
    { label: 'Blog Posts', value: counts.blogs, icon: FileText, to: '/admin/dashboard/blogs', empty: counts.blogs === 0 },
    { label: 'Awards & Photos', value: counts.awards, icon: Trophy, to: '/admin/dashboard/awards', empty: counts.awards === 0 },
    { label: 'Products', value: counts.products, icon: Package, to: '/admin/dashboard/products', empty: counts.products === 0 },
    { label: 'CMS', value: 'Live', icon: Globe, to: '/admin/dashboard/site', empty: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h2>
        <p className="text-slate-500 text-sm mt-1">Overview of your website content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all"
          >
            <div className="flex items-start justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${ADMIN_BRAND}14`, color: ADMIN_BRAND }}
              >
                <c.icon size={22} />
              </div>
              {c.empty && (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  Empty
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-4 tabular-nums">{c.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{c.label}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold mt-4 group-hover:gap-2 transition-all" style={{ color: ADMIN_BRAND }}>
              Manage <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      {(counts.blogs === 0 || counts.awards === 0 || counts.products === 0) && (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
            <Inbox size={32} />
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="font-semibold text-slate-800">Some sections are empty</p>
            <p className="text-sm text-slate-500 mt-1">Add blog posts, awards, or seed products to populate the public site.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {counts.blogs === 0 && (
              <Link to="/admin/dashboard/blogs" className="text-sm font-semibold px-4 py-2 rounded-lg text-white" style={{ backgroundColor: ADMIN_BRAND }}>
                New blog post
              </Link>
            )}
            {counts.products === 0 && (
              <Link to="/admin/dashboard/products" className="text-sm font-semibold px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                Seed products
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
