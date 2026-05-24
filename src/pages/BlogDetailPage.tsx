import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSEO, Schema } from '../hooks/useSEO';
import { SITE_URL } from '../config/site';
import { supabase } from '../config/supabase';
import type { BlogPost } from '../admin/components/BlogManager';
import { handleInquiry } from '../utils/whatsapp';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error && data) {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  useSEO({
    title: post ? `${post.title} | Multicare` : 'Blog Post',
    description: post?.excerpt ?? 'Busy Multicare blog',
    canonical: `${SITE_URL}/blog/${slug}`,
    ogType: 'article',
    structuredData: post
      ? Schema.article({
          title: post.title,
          description: post.excerpt,
          image: (post.images?.[0] || post.image || '').startsWith('http')
            ? post.images?.[0] || post.image || ''
            : `${SITE_URL}${post.images?.[0] || post.image}`,
          author: 'Busy Multicare',
          publishedTime: post.date,
          url: `/blog/${post.slug}`,
        })
      : undefined,
  });

  if (loading) {
    return <div className="pt-32 pb-section-padding text-center px-6 text-on-surface-variant">Loading post...</div>;
  }

  if (!post) {
    return (
      <div className="pt-32 pb-section-padding text-center px-6">
        <p className="text-body-lg text-on-surface-variant">Post not found.</p>
        <Link to="/blog" className="text-primary font-semibold mt-4 inline-block">Back to blog</Link>
      </div>
    );
  }

  const gallery =
    post.images && post.images.length > 0
      ? post.images
      : post.image
        ? [post.image]
        : [];

  return (
    <article className="pt-28 pb-section-padding px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
      <Link to="/blog" className="text-primary text-label-md font-semibold mb-6 inline-block">← Back to blog</Link>
      {gallery.length > 0 && (
        <div className="mb-8 space-y-4">
          <img
            src={gallery[0]}
            alt={post.title}
            width={800}
            height={450}
            className="w-full rounded-2xl object-cover"
            loading="eager"
          />
          {gallery.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.slice(1).map((src, idx) => (
                <img
                  key={`${src}-${idx}`}
                  src={src}
                  alt={`${post.title} — image ${idx + 2}`}
                  className="w-full aspect-video rounded-xl object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      )}
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
