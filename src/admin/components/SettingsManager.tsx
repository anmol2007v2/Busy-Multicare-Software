import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { DEFAULT_GLOBAL_CONTENT, mergeGlobalContent } from '../../data/defaultSiteContent';
import type { GlobalSiteContent } from '../../types/siteContent';
import { AdminCard, AdminInput, AdminButton } from '../ui/AdminUi';
import { useToast } from '../ui/Toast';

export default function SettingsManager() {
  const { toast } = useToast();
  const [form, setForm] = useState<GlobalSiteContent>(DEFAULT_GLOBAL_CONTENT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('site_content').select('content').eq('id', 'global').maybeSingle();
      setForm(mergeGlobalContent(data?.content as Partial<GlobalSiteContent>));
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_content').upsert({ id: 'global', content: form, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) toast(error.message, 'error');
    else toast('Settings saved');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Global Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Contact info and social links used across the site.</p>
      </div>
      <AdminCard title="Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <AdminInput label="Phone display" value={form.phoneDisplay} onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })} />
          <AdminInput label="Phone raw" value={form.phoneRaw} onChange={(e) => setForm({ ...form, phoneRaw: e.target.value })} />
          <AdminInput label="WhatsApp number" value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} />
          <AdminInput label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <AdminInput label="Alt email" value={form.emailAlt} onChange={(e) => setForm({ ...form, emailAlt: e.target.value })} />
          <AdminInput label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <AdminInput label="Working hours" value={form.workingHours} onChange={(e) => setForm({ ...form, workingHours: e.target.value })} />
        </div>
      </AdminCard>
      <AdminCard title="Social links">
        <div className="grid grid-cols-1 gap-4 max-w-2xl">
          <AdminInput label="Facebook URL" value={form.social.facebook} onChange={(e) => setForm({ ...form, social: { ...form.social, facebook: e.target.value } })} />
          <AdminInput label="YouTube URL" value={form.social.youtube} onChange={(e) => setForm({ ...form, social: { ...form.social, youtube: e.target.value } })} />
          <AdminInput label="LinkedIn URL" value={form.social.linkedin} onChange={(e) => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} />
        </div>
      </AdminCard>
      <AdminButton onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</AdminButton>
    </div>
  );
}
