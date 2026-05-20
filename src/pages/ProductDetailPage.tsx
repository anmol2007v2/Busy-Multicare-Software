import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useSEO, Schema } from '../hooks/useSEO';
import { SITE_URL } from '../config/site';
import { 
  ArrowLeft, 
  Download, 
  PhoneCall, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Globe, 
  Database,
  BarChart4
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  useSEO({
    title: product ? `${product.name} | BUSY Software Nepal` : 'Product Not Found',
    description: product
      ? product.description
      : 'BUSY product details from Busy Multicare Software in Nepal.',
    canonical: `${SITE_URL}/product/${id ?? ''}`,
    ogType: 'product',
    ogImage: product ? `${SITE_URL}${product.image}` : undefined,
    keywords: product
      ? `${product.name.toLowerCase()} nepal, busy ${product.name.toLowerCase()}, busy software price nepal, ${product.edition.toLowerCase()} edition busy`
      : 'busy software nepal, busy accounting software nepal',
    structuredData: product
      ? Schema.product({
          name: product.name,
          description: product.description,
          image: `${SITE_URL}${product.image}`,
          price: product.prices.single.replace('NRS ', '').replace(',', ''),
          currency: 'NPR',
          rating: 4.8,
          reviewCount: 120,
        })
      : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-surface pb-section-padding">
      {/* Hero Section */}
      <section className={`pt-32 pb-20 px-margin-desktop relative overflow-hidden ${
        product.edition === 'Blue' ? 'bg-blue-600' : 
        product.edition === 'Saffron' ? 'bg-orange-600' : 'bg-emerald-600'
      }`}>
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/products" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to all products
            </Link>
            <h1 className="text-display-hero text-white mb-6">{product.name}</h1>
            <p className="text-headline-sm text-white/90 mb-10 max-w-xl">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-on-background px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-2xl transition-all active:scale-95">
                Download Free Trial <Download className="w-5 h-5" />
              </button>
              <Link to="/contact" className="bg-black/20 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-black/30 transition-all">
                Request a Quote <PhoneCall className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/20 shadow-2xl">
               <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-2xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4"></div>
      </section>

      {/* Feature Grid */}
      <section className="py-section-padding px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg text-on-background mb-4">Core Capabilities</h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">Every feature is built with the Nepalese market in mind, ensuring 100% compliance with IRD regulations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {i % 4 === 0 ? <ShieldCheck /> : i % 4 === 1 ? <Zap /> : i % 4 === 2 ? <Database /> : <BarChart4 />}
                </div>
                <h4 className="text-headline-sm text-on-background">{feature}</h4>
                <p className="text-body-md text-on-surface-variant opacity-80">
                  Comprehensive tools to manage your {feature.toLowerCase()} with zero friction and maximum accuracy.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-on-background py-20 px-margin-desktop text-white">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 text-center">
          <div>
            <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-headline-sm mb-2">Real-time</h3>
            <p className="opacity-70">Instant data synchronization across branches.</p>
          </div>
          <div>
            <Globe className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-headline-sm mb-2">Cloud Ready</h3>
            <p className="opacity-70">Access your business data from anywhere, anytime.</p>
          </div>
          <div>
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-headline-sm mb-2">IRD Compliant</h3>
            <p className="opacity-70">100% compliant with Nepal's VAT regulations.</p>
          </div>
          <div>
            <PhoneCall className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-headline-sm mb-2">Live Support</h3>
            <p className="opacity-70">Expert technical team available in Nepal.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
