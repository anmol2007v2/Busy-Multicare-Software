import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../config/supabase';
import type { Product } from '../../data/products';
import { products as defaultProducts, filterCatalogProducts } from '../../data/products';
import { AdminCard, AdminInput, AdminButton, AdminEmptyState, AdminTable, AdminTh, AdminTd } from '../ui/AdminUi';
import { useToast } from '../ui/Toast';
import { Package } from 'lucide-react';

type PriceSnapshot = Record<string, { single: string; multi: string }>;

export default function ProductManager() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [savedSnapshot, setSavedSnapshot] = useState<PriceSnapshot>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const snapshotFrom = (list: Product[]): PriceSnapshot =>
    Object.fromEntries(list.map((p) => [p.id, { single: p.prices?.single || '', multi: p.prices?.multi || '' }]));

  const load = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: true });
    if (data?.length) {
      const catalog = filterCatalogProducts(data);
      setProducts(catalog);
      setSavedSnapshot(snapshotFrom(catalog));
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const parsePrice = (v: string) => v.replace(/^NRS\s*/i, '').trim();

  const updatePrice = (id: string, field: 'single' | 'multi', raw: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, prices: { ...p.prices, [field]: raw ? `NRS ${raw}` : '' } } : p
      )
    );
  };

  const changedIds = useMemo(() => {
    const ids = new Set<string>();
    products.forEach((p) => {
      const saved = savedSnapshot[p.id];
      if (!saved) return;
      if (p.prices?.single !== saved.single || p.prices?.multi !== saved.multi) ids.add(p.id);
    });
    return ids;
  }, [products, savedSnapshot]);

  const hasUnsaved = changedIds.size > 0;

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await supabase.from('products').delete().in('id', ['busy-pos', 'busy-payroll']);
      const { error } = await supabase.from('products').upsert(defaultProducts, { onConflict: 'id' });
      if (error) throw error;
      await load();
      toast('Default products seeded');
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Seed failed', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const product of products) {
        const { error } = await supabase.from('products').update({ prices: product.prices }).eq('id', product.id);
        if (error) throw error;
      }
      setSavedSnapshot(snapshotFrom(products));
      toast('All prices saved — visible on /products & home pricing');
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-500 text-sm">Loading products…</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Product Prices</h2>
          <p className="text-slate-500 text-sm mt-1">Inline edit NPR prices — synced to the public site.</p>
        </div>
        {hasUnsaved && (
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            {changedIds.size} unsaved change{changedIds.size > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {products.length === 0 ? (
        <AdminCard title="No products in database">
          <AdminEmptyState
            icon={Package}
            title="Seed your catalog"
            description="Adds Busy Basic, Standard, and Enterprise with default NPR prices."
            action={
              <AdminButton onClick={handleSeed} disabled={seeding}>
                {seeding ? 'Seeding…' : 'Seed default products'}
              </AdminButton>
            }
          />
        </AdminCard>
      ) : (
        <AdminCard noPadding>
          <AdminTable>
            <thead>
              <tr>
                <AdminTh>Product name</AdminTh>
                <AdminTh>Description</AdminTh>
                <AdminTh>Single user (NPR)</AdminTh>
                <AdminTh>Multi user (NPR)</AdminTh>
                <AdminTh>Billing</AdminTh>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const dirty = changedIds.has(product.id);
                return (
                  <tr key={product.id} className={dirty ? 'bg-amber-50/80' : 'hover:bg-slate-50/50'}>
                    <AdminTd className="font-semibold text-slate-900">{product.name}</AdminTd>
                    <AdminTd className="text-slate-500 max-w-[200px]">{product.tagline}</AdminTd>
                    <AdminTd>
                      <AdminInput
                        value={parsePrice(product.prices?.single || '')}
                        onChange={(e) => updatePrice(product.id, 'single', e.target.value)}
                        className="w-28"
                      />
                    </AdminTd>
                    <AdminTd>
                      <AdminInput
                        value={parsePrice(product.prices?.multi || '')}
                        onChange={(e) => updatePrice(product.id, 'multi', e.target.value)}
                        className="w-28"
                      />
                    </AdminTd>
                    <AdminTd className="text-slate-400 text-xs">/year</AdminTd>
                  </tr>
                );
              })}
            </tbody>
          </AdminTable>
          <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
            <AdminButton onClick={handleSave} disabled={saving || !hasUnsaved}>
              {saving ? 'Saving…' : 'Save all changes'}
            </AdminButton>
          </div>
        </AdminCard>
      )}
    </div>
  );
}
