import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';

const Features = () => {
  const { home } = useSiteContent();
  const f = home.features;

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg text-on-background mb-4">{f.title}</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">{f.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {f.items.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant hover:border-primary hover:shadow-2xl transition-all group cursor-default"
            >
              <div className="w-14 h-14 bg-primary-container/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-headline-sm text-on-background mb-3">{feature.title}</h3>
              <p className="text-on-surface-variant">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
