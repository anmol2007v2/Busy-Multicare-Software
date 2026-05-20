import { motion } from 'framer-motion';
import Awards from '../components/Awards';
import CountUp from '../components/CountUp';
import { useSEO } from '../hooks/useSEO';
import { SITE_URL } from '../config/site';

const AwardsPage = () => {
  useSEO({
    title: 'Busy Multicare Awards & Recognition | Nepal BUSY Dealer',
    description:
      'Discover the awards, industry recognition, and customer trust earned by Busy Multicare Software as Nepal’s leading BUSY software partner.',
    canonical: `${SITE_URL}/awards`,
    keywords:
      'busy multicare awards, busy nepal recognition, busy software partner awards, nepal accounting software awards',
  });

  return (
    <div className="bg-surface min-h-screen pt-32 pb-section-padding">
      <header className="px-margin-desktop mb-20 text-center">
        <div className="max-w-container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8 shadow-inner"
          >
            <span className="material-symbols-outlined text-display-hero">emoji_events</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-hero text-on-background mb-6"
          >
            Award Winning Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-on-surface-variant max-w-2xl mx-auto"
          >
            Recognition of our commitment to quality, innovation, and outstanding service in the Nepalese IT sector.
          </motion.p>
        </div>
      </header>

      <Awards />

      {/* Additional Awards Content */}
      <section className="px-margin-desktop mt-32">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-headline-lg text-on-background mb-8">A Legacy of Trust</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
              Over the past decade, Busy Multi Care has been consistently recognized as one of the top IT solution providers in Kathmandu. Our focus on user experience and customer support has earned us accolades from industry bodies and thousands of satisfied clients.
            </p>
            <div className="space-y-6">
              {[
                "Best IT Partner - CAN InfoTech 2024",
                "Excellence in Customer Service Award 2023",
                "Fastest Growing Software Distributor 2022"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 text-on-background font-bold">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
            <div className="aspect-square bg-on-background rounded-[4rem] p-12 flex flex-col items-center justify-center text-center text-white shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
               <CountUp end={5000} className="text-display-hero mb-4 block" />
               <p className="text-headline-sm opacity-80 uppercase tracking-widest">Happy Clients</p>
               <div className="mt-8 pt-8 border-t border-white/20 w-full">
                  <p className="text-body-md opacity-60">The greatest award we've ever received is the trust of our users.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;
