import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSEO, Schema } from '../hooks/useSEO';
import { STORAGE_KEYS, SITE_URL } from '../config/site';
import { getLocalStorage } from '../hooks/useLocalStorage';
import type { BlogPost } from '../admin/components/BlogManager';
import { handleInquiry } from '../utils/whatsapp';

const FALLBACK_POSTS: BlogPost[] = [
  { id: 1, title: "The Visionary Behind Busy Multi Care", excerpt: "Founder's journey.", author: "Editorial", date: "2026-05-15", image: "/image/owner 1.svg", slug: "founder-story", category: "Founder's Story", content: "" },
];

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const blogs = getLocalStorage<BlogPost[]>(STORAGE_KEYS.blogs, FALLBACK_POSTS);
    const found = blogs.find((b) => b.slug === slug) ?? FALLBACK_POSTS.find((b) => b.slug === slug);
    setPost(found ?? null);
  }, [slug]);

  useSEO({
    title: post?.title ?? 'Blog Post',
    description: post?.excerpt ?? 'Busy Multicare blog',
    canonical: `${SITE_URL}/blog/${slug}`,
    ogType: 'article',
    structuredData: post
      ? Schema.article({
          title: post.title,
          description: post.excerpt,
          image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
          author: 'Busy Multicare',
          publishedTime: post.date,
          url: `/blog/${post.slug}`,
        })
      : undefined,
  });

  if (!post) {
    return (
      <div className="pt-32 pb-section-padding text-center px-6">
        <p className="text-body-lg text-on-surface-variant">Post not found.</p>
        <Link to="/blog" className="text-primary font-semibold mt-4 inline-block">Back to blog</Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-section-padding px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
      <Link to="/blog" className="text-primary text-label-md font-semibold mb-6 inline-block">← Back to blog</Link>
      {post.image && <img src={post.image} alt={post.title} width={800} height={450} className="w-full rounded-2xl mb-8 object-cover" loading="eager" />}
      <p className="text-label-sm text-on-surface-variant mb-2">{post.date} · {post.category}</p>
      <h1 className="text-headline-lg text-on-background mb-6">{post.title}</h1>
      {post.content ? (
        <div className="prose prose-slate max-w-none text-on-surface-variant" dangerouslySetInnerHTML={{ __html: post.content }} />
      ) : (
        <p className="text-body-lg text-on-surface-variant leading-relaxed">{post.excerpt}</p>
      )}
      <div className="mt-12 flex flex-wrap gap-4">
        <Link to="/products" className="text-primary font-semibold hover:underline">View Busy products</Link>
        <Link to="/contact" className="text-primary font-semibold hover:underline">Contact us</Link>
        <button type="button" onClick={() => handleInquiry()} className="text-[#25D366] font-semibold cursor-pointer">WhatsApp for demo</button>
      </div>
    </article>
  );
}
