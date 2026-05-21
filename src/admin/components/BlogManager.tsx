import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { uploadImagesToCloudinary } from '../../utils/uploadImages';
import ImageGallery from './ImageGallery';
import {
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminButton,
  AdminEmptyState,
  AdminTable,
  AdminTh,
  AdminTd,
  AdminBadge,
  AdminSelect,
} from '../ui/AdminUi';
import { Sheet } from '../ui/Sheet';
import RichTextEditor from '../ui/RichTextEditor';
import { useToast } from '../ui/Toast';
import { BLOG_CATEGORIES, DEFAULT_BLOG_CATEGORY } from '../../data/blogCategories';

export interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  image?: string;
  images?: string[];
  date: string;
  slug: string;
  category?: string;
  content?: string;
  author?: string;
  status?: 'draft' | 'published';
}

const EMPTY: BlogPost = {
  title: '',
  excerpt: '',
  image: '',
  images: [],
  date: new Date().toISOString().split('T')[0],
  slug: '',
  category: DEFAULT_BLOG_CATEGORY,
  content: '',
  status: 'draft',
};

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function postStatus(post: BlogPost): 'draft' | 'published' {
  return post.status === 'published' || (post.content && post.date && post.title) ? 'published' : 'draft';
}

export default function BlogManager() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPost>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const load = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY, date: new Date().toISOString().split('T')[0] });
    setErrors({});
    setSheetOpen(true);
  };

  const openEdit = (blog: BlogPost) => {
    const imgs = blog.images?.length ? blog.images : blog.image ? [blog.image] : [];
    setEditing(blog.id!);
    setForm({
      ...blog,
      images: imgs,
      image: imgs[0] || '',
      status: postStatus(blog),
    });
    setErrors({});
    setSheetOpen(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setEditing(null);
    setForm(EMPTY);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.excerpt.trim()) e.excerpt = 'Excerpt is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (publish = true) => {
    if (!validate()) return;
    setSaving(true);
    try {
      let images = form.images?.length ? [...form.images] : form.image ? [form.image] : [];
      if (images.some((u) => u.startsWith('data:image/'))) {
        images = await uploadImagesToCloudinary(images);
      }
      const entry = {
        title: form.title,
        excerpt: form.excerpt,
        date: form.date || new Date().toISOString().split('T')[0],
        slug: form.slug || slugify(form.title),
        category: form.category,
        content: form.content,
        image: images[0] || '',
        images,
        status: publish ? 'published' : 'draft',
      };

      if (editing) {
        const { data, error } = await supabase.from('blog_posts').update(entry).eq('id', editing).select().single();
        if (error) throw error;
        setBlogs(blogs.map((b) => (b.id === editing ? data : b)));
        toast(publish ? 'Post published' : 'Draft saved');
      } else {
        const { data, error } = await supabase.from('blog_posts').insert([entry]).select().single();
        if (error) throw error;
        setBlogs([data, ...blogs]);
        toast(publish ? 'Post published' : 'Draft created');
      }
      closeSheet();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) toast(error.message, 'error');
    else {
      setBlogs(blogs.filter((b) => b.id !== id));
      toast('Post deleted');
    }
  };

  const onTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: editing ? f.slug : slugify(title),
    }));
  };

  const sheetFooter = (
    <div className="flex flex-wrap gap-3 justify-end">
      <AdminButton variant="outline" onClick={closeSheet} disabled={saving}>
        Cancel
      </AdminButton>
      <AdminButton variant="secondary" onClick={() => handleSubmit(false)} disabled={saving}>
        Save draft
      </AdminButton>
      <AdminButton onClick={() => handleSubmit(true)} disabled={saving}>
        {saving ? 'Saving…' : editing ? 'Update & publish' : 'Publish'}
      </AdminButton>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Blog Posts</h2>
          <p className="text-slate-500 text-sm mt-1">Manage stories, categories, and rich content.</p>
        </div>
        <AdminButton onClick={openNew} className="shrink-0">
          <Plus size={18} />
          New Post
        </AdminButton>
      </div>

      <AdminCard noPadding>
        {loading ? (
          <p className="p-6 text-slate-500 text-sm">Loading posts…</p>
        ) : blogs.length === 0 ? (
          <AdminEmptyState
            icon={Plus}
            title="No posts yet"
            description="Create your first blog post to show on the public blog page."
            action={<AdminButton onClick={openNew}>New Post</AdminButton>}
          />
        ) : (
          <AdminTable>
            <thead>
              <tr>
                <AdminTh>Title</AdminTh>
                <AdminTh>Category</AdminTh>
                <AdminTh>Date</AdminTh>
                <AdminTh>Status</AdminTh>
                <AdminTh className="text-right">Actions</AdminTh>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => {
                const status = postStatus(blog);
                return (
                  <tr key={blog.id} className="hover:bg-slate-50/50">
                    <AdminTd className="font-medium text-slate-900 max-w-[240px] truncate">{blog.title}</AdminTd>
                    <AdminTd>{blog.category || '—'}</AdminTd>
                    <AdminTd className="text-slate-500">{blog.date || '—'}</AdminTd>
                    <AdminTd>
                      <AdminBadge variant={status === 'published' ? 'success' : 'warning'}>
                        {status === 'published' ? 'Published' : 'Draft'}
                      </AdminBadge>
                    </AdminTd>
                    <AdminTd className="text-right">
                      <button type="button" onClick={() => openEdit(blog)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 inline-flex" aria-label="Edit">
                        <Pencil size={16} />
                      </button>
                      <button type="button" onClick={() => handleDelete(blog.id!)} className="p-2 rounded-lg hover:bg-red-50 text-red-600 inline-flex ml-1" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </AdminTd>
                  </tr>
                );
              })}
            </tbody>
          </AdminTable>
        )}
      </AdminCard>

      <Sheet
        open={sheetOpen}
        onClose={closeSheet}
        title={editing ? 'Edit post' : 'New post'}
        description="Fill in details below. First gallery image is the cover."
        footer={sheetFooter}
      >
        <div className="space-y-5">
          <AdminInput label="Blog title *" value={form.title} onChange={(e) => onTitleChange(e.target.value)} error={errors.title} />
          <AdminInput label="URL slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated from title" />
          <AdminSelect label="Category" value={form.category || DEFAULT_BLOG_CATEGORY} onChange={(v) => setForm({ ...form, category: v })}>
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </AdminSelect>
          <AdminTextarea label="Excerpt *" rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} error={errors.excerpt} />
          <div>
            <span className="block text-sm font-medium text-slate-700 mb-1.5">Full content</span>
            <RichTextEditor value={form.content || ''} onChange={(html) => setForm({ ...form, content: html })} />
          </div>
          <AdminInput label="Publish date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <ImageGallery
            label="Featured images (first = cover)"
            images={form.images || []}
            onChange={(images) => setForm({ ...form, images, image: images[0] || '' })}
            uploading={saving}
          />
        </div>
      </Sheet>
    </div>
  );
}
