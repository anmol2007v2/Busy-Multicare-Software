import { useState } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import ImageUploader from './ImageUploader';
import { STORAGE_KEYS } from '../../config/site';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  images?: string[];
  date: string;
  slug: string;
  category?: string;
  content?: string;
  author?: string;
}

type BlogPostForm = {
  title: string;
  excerpt: string;
  image: string;
  images: string[];
  date: string;
  slug: string;
  category: string;
  content: string;
};

const EMPTY_FORM: BlogPostForm = { title: '', excerpt: '', image: '', images: [], date: '', slug: '', category: 'Accounting Tips', content: '' };

export default function BlogManager() {
  const { get, set } = useLocalData<BlogPost[]>(STORAGE_KEYS.blogs, []);
  const [blogs, setBlogs] = useState(get());
  const [form, setForm] = useState<BlogPostForm>(EMPTY_FORM);
  const [editing, setEditing] = useState<number | null>(null);

  const save = (data: BlogPost[]) => {
    setBlogs(data);
    set(data);
  };

  const handleSubmit = () => {
    if (!form.title || !form.excerpt) return alert('Title and excerpt are required.');
    const images = form.images?.length ? form.images : form.image ? [form.image] : [];
    const entry: BlogPost = {
      ...form,
      id: editing ?? Date.now(),
      date: form.date || new Date().toISOString().split('T')[0],
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
      image: images[0] || form.image || '',
      images,
    };
    if (editing !== null) {
      save(blogs.map((b) => (b.id === editing ? entry : b)));
      setEditing(null);
    } else {
      save([entry, ...blogs]);
    }
    setForm(EMPTY_FORM);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this blog post?')) return;
    save(blogs.filter((b) => b.id !== id));
  };

  const handleEdit = (blog: BlogPost) => {
    const existingImages = blog.images?.length ? blog.images : blog.image ? [blog.image] : [];
    setEditing(blog.id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      image: blog.image || existingImages[0] || '',
      images: existingImages,
      date: blog.date,
      slug: blog.slug,
      category: blog.category || 'Accounting Tips',
      content: blog.content || '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">{editing ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
        <div className="grid grid-cols-1 gap-4">
          <input placeholder="Blog Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border rounded-lg px-3 py-2 w-full" />
          <input placeholder="URL Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="border rounded-lg px-3 py-2 w-full" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded-lg px-3 py-2 w-full">
            <option>Accounting Tips</option>
            <option>Software Updates</option>
            <option>Nepal Tax</option>
          </select>
          <textarea placeholder="Excerpt *" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="border rounded-lg px-3 py-2 w-full" />
          <textarea placeholder="Full content (HTML supported)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="border rounded-lg px-3 py-2 w-full font-mono text-sm" />
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="border rounded-lg px-3 py-2 w-full" />
          <ImageUploader
            label="Blog Cover Image(s)"
            onUpload={(img) =>
              setForm({
                ...form,
                images: typeof img === 'string' ? [img] : img,
                image: typeof img === 'string' ? img : img[0],
              })
            }
          />
          {form.images?.length ? (
            <div className="grid grid-cols-2 gap-2">
              {form.images.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index + 1}`} className="h-32 object-cover rounded-lg w-full" />
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex gap-3 mt-4">
          <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            {editing ? 'Update Post' : 'Add Post'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm(EMPTY_FORM); }} className="bg-gray-200 px-6 py-2 rounded-lg">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {(blog.images?.[0] || blog.image) && (
              <img src={blog.images?.[0] || blog.image} alt={blog.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <p className="text-xs text-gray-400">{blog.date}</p>
              <h3 className="font-bold text-gray-800">{blog.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.excerpt}</p>
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={() => handleEdit(blog)} className="text-blue-600 text-sm font-medium hover:underline">Edit</button>
                <button type="button" onClick={() => handleDelete(blog.id)} className="text-red-500 text-sm font-medium hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
