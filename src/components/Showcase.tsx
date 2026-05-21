import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';

const Showcase = () => {
  const { home } = useSiteContent();
  const s = home.showcase;

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop dark-navy-section text-on-primary-container">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} alt="BUSY 21" className="rounded-xl shadow-2xl border border-primary-fixed-dim/20" src={s.image1} />
              <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} alt="Cloud" className="mt-8 rounded-xl shadow-2xl border border-primary-fixed-dim/20" src={s.image2} />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-headline-lg text-surface-bright mb-6">{s.title}</h2>
            <p className="text-body-lg mb-8 opacity-90 text-white">{s.description}</p>
            <ul className="space-y-4 mb-10">
              {s.bullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-primary-fixed-dim">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold hover:bg-primary-fixed-dim transition-colors">
              {s.ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
