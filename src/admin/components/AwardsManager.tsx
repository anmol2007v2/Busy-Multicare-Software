import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { uploadImagesToCloudinary } from '../../utils/uploadImages';
import { AdminCard, AdminInput, AdminButton, AdminEmptyState } from '../ui/AdminUi';
import { useToast } from '../ui/Toast';
import { STORAGE_KEYS } from '../../config/site';
import { ADMIN_BRAND } from '../theme';

export interface Award {
  id: number;
  title: string;
  year: string;
  image?: string;
  images?: string[];
  sort_order?: number;
}

const MAX_BYTES = 2 * 1024 * 1024;
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];

export default function AwardsManager() {
  const { toast } = useToast();
  const [awards, setAwards] = useState<Award[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', year: '', images: [] as string[] });
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data, error } = await supabase.from('awards').select('*').order('sort_order', { ascending: true });
    if (!error && data?.length) {
      setAwards(data);
    } else {
      await importFromLocalStorage();
    }
    setLoading(false);
  };

  const importFromLocalStorage = async () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.awards);
      if (!raw) return;
      const local = JSON.parse(raw) as Award[];
      if (!local.length) return;
      for (const a of local) {
        const images = a.images?.length ? a.images : a.image ? [a.image] : [];
        await supabase.from('awards').insert({
          title: a.title,
          year: a.year || '',
          images,
          image: images[0] || '',
          sort_order: 0,
        });
      }
      localStorage.removeItem(STORAGE_KEYS.awards);
      toast(`Imported ${local.length} awards from browser storage`);
      const { data } = await supabase.from('awards').select('*').order('sort_order', { ascending: true });
      if (data) setAwards(data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', year: '', images: [] });
    setModalOpen(true);
  };

  const openEdit = (a: Award) => {
    const imgs = a.images?.length ? a.images : a.image ? [a.image] : [];
    setEditing(a.id);
    setForm({ title: a.title, year: a.year || '', images: imgs });
    setModalOpen(true);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach((file) => {
      if (!ACCEPT.includes(file.type)) {
        toast('Use JPG, PNG, or WebP only', 'error');
        return;
      }
      if (file.size > MAX_BYTES) {
        toast('Max file size is 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setForm((f) => ({ ...f, images: [...f.images, reader.result as string] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {
    if (!form.title || form.images.length === 0) {
      toast('Title and at least one photo required', 'error');
      return;
    }
    setSaving(true);
    setUploadProgress(10);
    try {
      let images = [...form.images];
      if (images.some((u) => u.startsWith('data:image/'))) {
        setUploadProgress(40);
        images = await uploadImagesToCloudinary(images);
        setUploadProgress(90);
      }
      const row = { title: form.title, year: form.year, images, image: images[0] };

      if (editing) {
        const { error } = await supabase.from('awards').update(row).eq('id', editing);
        if (error) throw error;
        setAwards(awards.map((a) => (a.id === editing ? { ...a, ...row, id: editing } : a)));
        toast('Award updated');
      } else {
        const { data, error } = await supabase.from('awards').insert({ ...row, sort_order: awards.length }).select().single();
        if (error) throw error;
        setAwards([...awards, data]);
        toast('Award added');
      }
      setModalOpen(false);
      setForm({ title: '', year: '', images: [] });
      setEditing(null);
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this award?')) return;
    const { error } = await supabase.from('awards').delete().eq('id', id);
    if (error) toast(error.message, 'error');
    else {
      setAwards(awards.filter((a) => a.id !== id));
      toast('Removed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Awards &amp; Photos</h2>
          <p className="text-slate-500 text-sm mt-1">Cloud-hosted — visible on home and /awards.</p>
        </div>
        <AdminButton onClick={openAdd}>
          <Plus size={18} />
          Add Award
        </AdminButton>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : awards.length === 0 ? (
        <AdminCard>
          <AdminEmptyState icon={Upload} title="No awards yet" description="Add photos from events and recognition ceremonies." action={<AdminButton onClick={openAdd}>Add Award</AdminButton>} />
        </AdminCard>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {awards.map((award) => {
            const src = award.images?.[0] || award.image;
            return (
              <div key={award.id} className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm aspect-[4/5]">
                {src && <img src={src} alt={award.title} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/50 transition flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                  <p className="text-white font-semibold text-sm">{award.title}</p>
                  {award.year && <p className="text-white/80 text-xs">{award.year}</p>}
                  <div className="flex gap-2 mt-3">
                    <button type="button" onClick={() => openEdit(award)} className="flex-1 bg-white text-slate-900 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1">
                      <Pencil size={14} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(award.id)} className="px-3 bg-red-600 text-white text-xs font-semibold py-2 rounded-lg">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition">
                  <p className="text-white font-semibold text-sm truncate">{award.title}</p>
                  {award.year && <p className="text-white/70 text-xs">{award.year}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-slate-900/40" onClick={() => !saving && setModalOpen(false)} aria-label="Close" />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900">{editing ? 'Edit award' : 'Add award'}</h3>
            <AdminInput label="Award title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <AdminInput label="Year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" />
            <div>
              <span className="block text-sm font-medium text-slate-700 mb-1.5">Photo * (max 2MB, JPG/PNG/WebP)</span>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#1a56db]/50 hover:bg-slate-50/50 transition"
              >
                <Upload className="mx-auto text-slate-400 mb-2" size={28} />
                <p className="text-sm text-slate-600">Drag &amp; drop or click to upload</p>
              </div>
              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" multiple onChange={(e) => handleFiles(e.target.files)} />
              {form.images.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {form.images.map((src, i) => (
                    <img key={i} src={src} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                  ))}
                </div>
              )}
            </div>
            {saving && uploadProgress > 0 && (
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%`, backgroundColor: ADMIN_BRAND }} />
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <AdminButton variant="outline" className="flex-1" onClick={() => setModalOpen(false)} disabled={saving}>
                Cancel
              </AdminButton>
              <AdminButton className="flex-1" onClick={handleSave} disabled={saving}>
                {saving ? 'Uploading…' : 'Save'}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
