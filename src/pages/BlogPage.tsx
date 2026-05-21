import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { SITE_URL } from '../config/site';
import { supabase } from '../config/supabase';
import type { BlogPost } from '../admin/components/BlogManager';
import { BLOG_FILTER_CATEGORIES } from '../data/blogCategories';

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Founder & Team Stories | Busy Multicare Blog',
    description: 'Founder stories, team updates, and software news from Nepal\'s authorized Busy dealer.',
    canonical: `${SITE_URL}/blog`,
  });

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const filtered = useMemo(
    () => (filter === 'All' ? posts : posts.filter((p) => p.category === filter)),
    [posts, filter]
  );

  return (
    <div className="bg-surface min-h-screen pt-32 pb-section-padding px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-hero text-on-background mb-6"
          >
            Insights & Innovation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-on-surface-variant max-w-2xl mx-auto"
          >
            Discover stories of growth, leadership, and technical excellence from the heart of Busy Multi Care.
          </motion.p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {BLOG_FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-label-sm font-semibold cursor-pointer ${filter === cat ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post: The Founder */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-20 rounded-[3rem] overflow-hidden bg-on-background text-white grid grid-cols-1 lg:grid-cols-2 shadow-2xl"
        >
          <div className="h-[400px] lg:h-full overflow-hidden">
            <img 
              src="/image/owner 1.svg"
              alt="Founder Ram Bahadur Tandukar"
              className="w-full h-full object-cover object-[center_35%] scale-105"
            />
          </div>
          <div className="p-12 lg:p-20 flex flex-col justify-center">
            <span className="text-primary font-bold uppercase tracking-widest text-label-sm mb-6 block">Featured Story</span>
            <h2 className="text-display-hero text-white mb-8 leading-tight">
              Leading the Digital Revolution in Nepal
            </h2>
            <p className="text-body-lg text-white/80 mb-10">
              "Our mission has always been to empower local businesses with international standard tools. Busy Multi Care is more than a software provider; we are a partner in Nepal's economic growth." 
              <br/><br/>
              — <span className="text-white font-bold italic">Ram Bahadur Tandukar, Founder & Managing Director</span>
            </p>
            <button className="bg-primary text-on-primary self-start px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all">
              Read the Full Story <ArrowRight size={20} />
            </button>
          </div>
        </motion.section>

        {loading ? (
          <div className="text-center py-20 text-on-surface-variant">Loading stories...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">No stories found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${post.slug || post.id}`} className="block cursor-pointer">
                <div className="rounded-3xl overflow-hidden mb-6 aspect-video shadow-lg relative">
                  <img 
                    src={post.images?.[0] || post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-label-sm font-bold border border-white/20">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-label-sm text-on-surface-variant mb-4">
                  <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                </div>
                <h3 className="text-headline-sm text-on-background mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-body-md text-on-surface-variant opacity-80 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-primary font-semibold text-label-sm mt-4">Read More <ArrowRight size={14} /></span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
