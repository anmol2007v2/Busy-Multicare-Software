import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { SITE_URL } from '../config/site';
import { supabase } from '../config/supabase';
import type { Product } from '../data/products';
import { products as defaultProducts, filterCatalogProducts } from '../data/products';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Busy Software Plans & Pricing Nepal | Basic, Standard, Enterprise',
    description: 'Compare Busy Software plans for Nepal businesses. Basic from Rs.12,000, Standard & Enterprise also available. GST-ready, POS, inventory & payroll included.',
    canonical: `${SITE_URL}/products`,
  });

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (!error && data?.length) {
        setProducts(filterCatalogProducts(data));
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-surface pt-20 pb-section-padding px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold uppercase tracking-widest text-label-sm mb-4 block">Our Software Solutions</span>
          <h1 className="text-display-hero text-on-background mb-6">Busy Accounting Software Plans &amp; Pricing in Nepal</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            From small retail shops to large manufacturing units, we have a specialized edition designed to streamline your operations.
          </p>
        </motion.div>

        {loading && products.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-surface-container-lowest rounded-3xl p-8 border border-surface-container-high shadow-lg hover:shadow-2xl transition-all flex flex-col group relative overflow-hidden"
              >
                {/* Premium Glow Effect */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${
                  product.edition === 'Blue' ? 'bg-blue-500' :
                  product.edition === 'Saffron' ? 'bg-orange-500' : 'bg-emerald-500'
                }`}></div>

                <div className="mb-8">
                  <span className={`px-4 py-1.5 rounded-full text-label-sm font-bold uppercase tracking-wider mb-6 inline-block ${
                    product.edition === 'Blue' ? 'bg-blue-50 text-blue-700' :
                    product.edition === 'Saffron' ? 'bg-orange-50 text-orange-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {product.edition} Edition
                  </span>
                  <h3 className="text-headline-md text-on-background mb-2">{product.name}</h3>
                  <p className="text-on-surface-variant font-medium">{product.tagline}</p>
                </div>

                <div className="mb-8 flex-grow">
                  <ul className="space-y-4">
                    {product.features?.slice(0, 5).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-body-md text-on-surface-variant">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-surface-container mt-auto">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-label-sm text-outline mb-1">Starting from</p>
                      <p className="text-headline-sm font-bold text-on-background">{product.prices?.single || 'Contact us'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-label-sm text-outline mb-1">Multi-user</p>
                      <p className="text-headline-sm font-bold text-primary">{product.prices?.multi || 'Contact us'}</p>
                    </div>
                  </div>

                  <Link 
                    to={`/product/${product.id}`}
                    className="w-full bg-on-background text-surface-bright py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-primary transition-all shadow-md active:scale-95"
                  >
                    View Full Features <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Comparison CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#050b1a] p-12 lg:p-20 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
          <h2 className="text-headline-lg mb-6">Need a custom feature?</h2>
          <p className="text-body-lg mb-10 opacity-80 max-w-xl mx-auto">
            We provide specialized add-ons and vertical solutions for specific industries like Auto-parts, Pharmacies, and Restaurants.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-bold hover:bg-primary-fixed-dim transition-all shadow-xl">
              Talk to an Expert
            </Link>
            <button className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
              Download Brochure
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;
