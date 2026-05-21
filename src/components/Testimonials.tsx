import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';

const Testimonials = () => {
  const { home } = useSiteContent();
  const t = home.testimonials;

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto text-center mb-16">
        <h2 className="text-headline-lg mb-4 text-white">{t.title}</h2>
        <p className="text-on-primary-container max-w-xl mx-auto opacity-80">{t.subtitle}</p>
      </div>
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {t.items.map((item) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: item.featured ? 1.05 : 1 }}
            viewport={{ once: true }}
            className={`backdrop-blur-lg border p-8 rounded-2xl ${item.featured ? 'bg-white/20 border-white/30 shadow-2xl z-10' : 'bg-white/10 border-white/20'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold">{item.initials}</div>
              <div className="text-left">
                <p className="font-bold">{item.name}</p>
                <p className="text-label-sm opacity-70">{item.company}</p>
              </div>
            </div>
            <p className="italic opacity-90">&ldquo;{item.quote}&rdquo;</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
