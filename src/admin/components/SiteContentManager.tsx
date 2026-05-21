import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { DEFAULT_HOME_CONTENT, mergeHomeContent } from '../../data/defaultSiteContent';
import type { HomeSiteContent, NavLinkItem, TestimonialItem, FaqItem } from '../../types/siteContent';
import { AdminCard, AdminInput, AdminTextarea, AdminButton } from '../ui/AdminUi';
import { useToast } from '../ui/Toast';
import ImageUploader from './ImageUploader';
import { uploadImagesToCloudinary } from '../../utils/uploadImages';

const SECTIONS = [
  'Navbar', 'Hero', 'Ticker', 'Trusted By', 'Features', 'Pricing', 'Showcase',
  'Awards', 'Exhibitions', 'Leadership', 'Testimonials', 'SEO', 'FAQ', 'Footer', 'Contact',
] as const;

export default function SiteContentManager() {
  const { toast } = useToast();
  const [section, setSection] = useState<(typeof SECTIONS)[number]>('Hero');
  const [content, setContent] = useState<HomeSiteContent>(DEFAULT_HOME_CONTENT);
  const [saving, setSaving] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('site_content').select('content, updated_at').eq('id', 'home').maybeSingle();
      setContent(mergeHomeContent(data?.content as Partial<HomeSiteContent>));
      setUpdatedAt(data?.updated_at ?? null);
    })();
  }, []);

  const publish = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_content').upsert({
      id: 'home',
      content,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    if (error) toast(error.message, 'error');
    else {
      toast('Home page published');
      setUpdatedAt(new Date().toISOString());
    }
  };

  const uploadHeroImage = async (img: string | string[]) => {
    const src = typeof img === 'string' ? img : img[0];
    if (src.startsWith('data:image/')) {
      const [url] = await uploadImagesToCloudinary([src]);
      setContent((c) => ({ ...c, hero: { ...c.hero, image: url } }));
    } else {
      setContent((c) => ({ ...c, hero: { ...c.hero, image: src } }));
    }
  };

  const updateNav = (index: number, patch: Partial<NavLinkItem>) => {
    const links = [...content.navbar.links];
    links[index] = { ...links[index], ...patch };
    setContent({ ...content, navbar: { links } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Site Content</h2>
          <p className="text-slate-500 text-sm mt-1">Edit the full home page, navbar, and sections.</p>
          {updatedAt && <p className="text-xs text-slate-400 mt-1">Last published: {new Date(updatedAt).toLocaleString()}</p>}
        </div>
        <AdminButton onClick={publish} disabled={saving}>{saving ? 'Publishing…' : 'Publish home page'}</AdminButton>
      </div>

      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSection(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${section === s ? 'bg-[#0041a2] text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <AdminCard title={section}>
        {section === 'Navbar' && (
          <div className="space-y-4">
            {content.navbar.links.map((link, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl">
                <AdminInput label="Label" value={link.name} onChange={(e) => updateNav(i, { name: e.target.value })} />
                <AdminInput label="Path" value={link.path} onChange={(e) => updateNav(i, { path: e.target.value })} />
                <AdminInput label="Order" type="number" value={String(link.order)} onChange={(e) => updateNav(i, { order: Number(e.target.value) })} />
                <label className="flex items-center gap-2 text-sm pt-6">
                  <input type="checkbox" checked={link.visible} onChange={(e) => updateNav(i, { visible: e.target.checked })} />
                  Visible
                </label>
              </div>
            ))}
          </div>
        )}

        {section === 'Hero' && (
          <div className="space-y-4 max-w-2xl">
            <AdminInput label="Badge" value={content.hero.badge} onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })} />
            <AdminInput label="Title highlight" value={content.hero.titleHighlight} onChange={(e) => setContent({ ...content, hero: { ...content.hero, titleHighlight: e.target.value } })} />
            <AdminInput label="Title rest" value={content.hero.titleRest} onChange={(e) => setContent({ ...content, hero: { ...content.hero, titleRest: e.target.value } })} />
            <AdminTextarea label="Subtitle" rows={3} value={content.hero.subtitle} onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })} />
            <AdminInput label="CTA primary" value={content.hero.ctaPrimary} onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaPrimary: e.target.value } })} />
            <AdminInput label="CTA secondary" value={content.hero.ctaSecondary} onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaSecondary: e.target.value } })} />
            <ImageUploader label="Hero image" onUpload={uploadHeroImage} />
            {content.hero.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <AdminInput label={`Stat ${i + 1} value`} value={s.value} onChange={(e) => {
                  const stats = [...content.hero.stats];
                  stats[i] = { ...stats[i], value: e.target.value };
                  setContent({ ...content, hero: { ...content.hero, stats } });
                }} />
                <AdminInput label="Label" value={s.label} onChange={(e) => {
                  const stats = [...content.hero.stats];
                  stats[i] = { ...stats[i], label: e.target.value };
                  setContent({ ...content, hero: { ...content.hero, stats } });
                }} />
              </div>
            ))}
          </div>
        )}

        {section === 'Ticker' && (
          <div className="space-y-3 max-w-xl">
            {content.ticker.items.map((item, i) => (
              <div key={i} className="flex gap-2">
                <AdminInput value={item} onChange={(e) => {
                  const items = [...content.ticker.items];
                  items[i] = e.target.value;
                  setContent({ ...content, ticker: { items } });
                }} />
                <AdminButton variant="danger" onClick={() => setContent({ ...content, ticker: { items: content.ticker.items.filter((_, j) => j !== i) } })}>×</AdminButton>
              </div>
            ))}
            <AdminButton variant="secondary" onClick={() => setContent({ ...content, ticker: { items: [...content.ticker.items, 'NEW ITEM'] } })}>Add item</AdminButton>
          </div>
        )}

        {section === 'Trusted By' && (
          <div className="space-y-4 max-w-xl">
            <AdminInput label="Section label" value={content.trustedBy.label} onChange={(e) => setContent({ ...content, trustedBy: { ...content.trustedBy, label: e.target.value } })} />
            {content.trustedBy.logos.map((logo, i) => (
              <AdminInput key={i} label={`Logo ${i + 1}`} value={logo} onChange={(e) => {
                const logos = [...content.trustedBy.logos];
                logos[i] = e.target.value;
                setContent({ ...content, trustedBy: { ...content.trustedBy, logos } });
              }} />
            ))}
          </div>
        )}

        {section === 'Features' && (
          <div className="space-y-6">
            <AdminInput label="Title" value={content.features.title} onChange={(e) => setContent({ ...content, features: { ...content.features, title: e.target.value } })} />
            <AdminTextarea label="Subtitle" value={content.features.subtitle} onChange={(e) => setContent({ ...content, features: { ...content.features, subtitle: e.target.value } })} />
            {content.features.items.map((f, i) => (
              <div key={i} className="p-4 border rounded-xl space-y-2">
                <AdminInput label="Icon (Material symbol name)" value={f.icon} onChange={(e) => {
                  const items = [...content.features.items];
                  items[i] = { ...items[i], icon: e.target.value };
                  setContent({ ...content, features: { ...content.features, items } });
                }} />
                <AdminInput label="Title" value={f.title} onChange={(e) => {
                  const items = [...content.features.items];
                  items[i] = { ...items[i], title: e.target.value };
                  setContent({ ...content, features: { ...content.features, items } });
                }} />
                <AdminTextarea label="Description" value={f.description} onChange={(e) => {
                  const items = [...content.features.items];
                  items[i] = { ...items[i], description: e.target.value };
                  setContent({ ...content, features: { ...content.features, items } });
                }} />
              </div>
            ))}
          </div>
        )}

        {section === 'Pricing' && (
          <div className="space-y-4 max-w-xl">
            <AdminInput label="Title" value={content.pricing.title} onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, title: e.target.value } })} />
            <AdminInput label="Title highlight" value={content.pricing.titleHighlight} onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, titleHighlight: e.target.value } })} />
            <AdminTextarea label="Subtitle" value={content.pricing.subtitle} onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, subtitle: e.target.value } })} />
            <p className="text-xs text-slate-500">Product prices are edited under Product Prices tab.</p>
          </div>
        )}

        {section === 'Showcase' && (
          <div className="space-y-4 max-w-xl">
            <AdminInput label="Title" value={content.showcase.title} onChange={(e) => setContent({ ...content, showcase: { ...content.showcase, title: e.target.value } })} />
            <AdminTextarea label="Description" rows={4} value={content.showcase.description} onChange={(e) => setContent({ ...content, showcase: { ...content.showcase, description: e.target.value } })} />
            <AdminInput label="Image 1 URL" value={content.showcase.image1} onChange={(e) => setContent({ ...content, showcase: { ...content.showcase, image1: e.target.value } })} />
            <AdminInput label="Image 2 URL" value={content.showcase.image2} onChange={(e) => setContent({ ...content, showcase: { ...content.showcase, image2: e.target.value } })} />
          </div>
        )}

        {section === 'Awards' && (
          <div className="space-y-4 max-w-xl">
            <AdminInput label="Title" value={content.awardsSection.title} onChange={(e) => setContent({ ...content, awardsSection: { ...content.awardsSection, title: e.target.value } })} />
            <AdminTextarea label="Subtitle" value={content.awardsSection.subtitle} onChange={(e) => setContent({ ...content, awardsSection: { ...content.awardsSection, subtitle: e.target.value } })} />
            <p className="text-xs text-slate-500">Award images are managed under Awards &amp; Photos tab.</p>
          </div>
        )}

        {section === 'Exhibitions' && (
          <div className="space-y-4">
            <AdminInput label="Title" value={content.exhibitions.title} onChange={(e) => setContent({ ...content, exhibitions: { ...content.exhibitions, title: e.target.value } })} />
            {content.exhibitions.images.map((img, i) => (
              <div key={i} className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <AdminInput label="Image URL" value={img.src} onChange={(e) => {
                  const images = [...content.exhibitions.images];
                  images[i] = { ...images[i], src: e.target.value };
                  setContent({ ...content, exhibitions: { ...content.exhibitions, images } });
                }} />
                <AdminInput label="Alt" value={img.alt} onChange={(e) => {
                  const images = [...content.exhibitions.images];
                  images[i] = { ...images[i], alt: e.target.value };
                  setContent({ ...content, exhibitions: { ...content.exhibitions, images } });
                }} />
              </div>
            ))}
          </div>
        )}

        {section === 'Leadership' && (
          <div className="space-y-4 max-w-xl">
            <AdminInput label="Title" value={content.leadership.title} onChange={(e) => setContent({ ...content, leadership: { ...content.leadership, title: e.target.value } })} />
            <AdminTextarea label="Description" rows={4} value={content.leadership.description} onChange={(e) => setContent({ ...content, leadership: { ...content.leadership, description: e.target.value } })} />
            <AdminInput label="Team image URL" value={content.leadership.image} onChange={(e) => setContent({ ...content, leadership: { ...content.leadership, image: e.target.value } })} />
          </div>
        )}

        {section === 'Testimonials' && (
          <div className="space-y-6">
            <AdminInput label="Title" value={content.testimonials.title} onChange={(e) => setContent({ ...content, testimonials: { ...content.testimonials, title: e.target.value } })} />
            {content.testimonials.items.map((t, i) => (
              <div key={i} className="p-4 border rounded-xl space-y-2">
                <AdminInput label="Name" value={t.name} onChange={(e) => {
                  const items = [...content.testimonials.items] as TestimonialItem[];
                  items[i] = { ...items[i], name: e.target.value };
                  setContent({ ...content, testimonials: { ...content.testimonials, items } });
                }} />
                <AdminTextarea label="Quote" value={t.quote} onChange={(e) => {
                  const items = [...content.testimonials.items];
                  items[i] = { ...items[i], quote: e.target.value };
                  setContent({ ...content, testimonials: { ...content.testimonials, items } });
                }} />
              </div>
            ))}
          </div>
        )}

        {section === 'SEO' && (
          <div className="space-y-4">
            {content.seoContent.articles.map((a, i) => (
              <div key={i} className="p-4 border rounded-xl space-y-2">
                <AdminInput label="Title" value={a.title} onChange={(e) => {
                  const articles = [...content.seoContent.articles];
                  articles[i] = { ...articles[i], title: e.target.value };
                  setContent({ ...content, seoContent: { articles } });
                }} />
                <AdminTextarea label="Body" rows={4} value={a.body} onChange={(e) => {
                  const articles = [...content.seoContent.articles];
                  articles[i] = { ...articles[i], body: e.target.value };
                  setContent({ ...content, seoContent: { articles } });
                }} />
              </div>
            ))}
          </div>
        )}

        {section === 'FAQ' && (
          <div className="space-y-4">
            <AdminInput label="Title" value={content.faq.title} onChange={(e) => setContent({ ...content, faq: { ...content.faq, title: e.target.value } })} />
            {content.faq.items.map((item, i) => (
              <div key={i} className="p-4 border rounded-xl space-y-2">
                <AdminInput label="Question" value={item.q} onChange={(e) => {
                  const items = [...content.faq.items] as FaqItem[];
                  items[i] = { ...items[i], q: e.target.value };
                  setContent({ ...content, faq: { ...content.faq, items } });
                }} />
                <AdminTextarea label="Answer" value={item.a} onChange={(e) => {
                  const items = [...content.faq.items];
                  items[i] = { ...items[i], a: e.target.value };
                  setContent({ ...content, faq: { ...content.faq, items } });
                }} />
              </div>
            ))}
          </div>
        )}

        {section === 'Footer' && (
          <div className="space-y-4 max-w-xl">
            <AdminTextarea label="Tagline" value={content.footer.tagline} onChange={(e) => setContent({ ...content, footer: { ...content.footer, tagline: e.target.value } })} />
            <AdminInput label="Copyright suffix" value={content.footer.copyright} onChange={(e) => setContent({ ...content, footer: { ...content.footer, copyright: e.target.value } })} />
          </div>
        )}

        {section === 'Contact' && (
          <div className="space-y-4 max-w-xl">
            <AdminInput label="Eyebrow" value={content.contact.eyebrow} onChange={(e) => setContent({ ...content, contact: { ...content.contact, eyebrow: e.target.value } })} />
            <AdminInput label="Title" value={content.contact.title} onChange={(e) => setContent({ ...content, contact: { ...content.contact, title: e.target.value } })} />
            <AdminTextarea label="Subtitle" value={content.contact.subtitle} onChange={(e) => setContent({ ...content, contact: { ...content.contact, subtitle: e.target.value } })} />
          </div>
        )}
      </AdminCard>
    </div>
  );
}
