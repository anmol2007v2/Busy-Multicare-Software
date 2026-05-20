import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { DEFAULT_ADMIN_PRODUCTS, formatNpr, type AdminProduct } from '../data/defaultProducts';
import { STORAGE_KEYS } from '../config/site';
import { getLocalStorage } from '../hooks/useLocalStorage';
import { handleInquiry } from '../utils/whatsapp';

export default function PricingSection() {
  const [products, setProducts] = useState<AdminProduct[]>(DEFAULT_ADMIN_PRODUCTS);
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    setProducts(getLocalStorage(STORAGE_KEYS.products, DEFAULT_ADMIN_PRODUCTS));
  }, []);

  const displayPrice = (p: AdminProduct) => {
    const value = annual ? p.price : Math.round(p.price / 12);
    return formatNpr(value);
  };

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="pricing">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-headline-lg text-on-background mb-4">
            Busy Software <span className="text-primary">Pricing Nepal</span>
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-6">
            Official dealer pricing. Prices are VAT exclusive.
          </p>
          <div className="inline-flex items-center gap-1 bg-white rounded-full p-1 border border-outline-variant/40" role="group" aria-label="Billing period">
            <button type="button" onClick={() => setAnnual(true)} className={`px-4 py-2 rounded-full text-label-sm font-semibold cursor-pointer ${annual ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Annual</button>
            <button type="button" onClick={() => setAnnual(false)} className={`px-4 py-2 rounded-full text-label-sm font-semibold cursor-pointer ${!annual ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Monthly</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className={`relative bg-white rounded-3xl p-8 border shadow-lg flex flex-col ${product.popular ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/30'}`}>
              {product.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-label-sm font-bold px-4 py-1 rounded-full">Most Popular</span>
              )}
              <h3 className="text-headline-sm text-on-background mb-1">{product.name}</h3>
              <p className="text-label-sm text-on-surface-variant mb-6">{product.description}</p>
              <p className="text-headline-md font-bold text-primary mb-1">{displayPrice(product)}</p>
              <p className="text-label-sm text-on-surface-variant mb-6">per {annual ? 'year' : 'month'} · VAT exclusive</p>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-center gap-2 text-label-sm text-on-surface-variant"><Check size={16} className="text-primary shrink-0" /> IRD VAT compatible</li>
                <li className="flex items-center gap-2 text-label-sm text-on-surface-variant"><Check size={16} className="text-primary shrink-0" /> Free installation support</li>
                <li className="flex items-center gap-2 text-label-sm text-on-surface-variant"><Check size={16} className="text-primary shrink-0" /> Nepali fiscal year</li>
              </ul>
              <button type="button" onClick={() => handleInquiry(product.name)} className="w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold mb-3 hover:opacity-90 cursor-pointer">Buy Now via WhatsApp</button>
              <Link to="/products" className="w-full block text-center border border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/5">Learn More</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
