
import { motion } from 'framer-motion';

const awards = [
  {
    image: "/image/achie 1.svg",
    title: "Overseas Runnerup",
    subtitle: "Best Sales Performer 2019-20"
  },
  {
    image: "/image/achievement 1.svg",
    title: "No. 1 Partner Award",
    subtitle: "Industry Leadership"
  },
  {
    image: "/image/owner achievement 1.svg",
    title: "Excellence in Service",
    subtitle: "National Recognition"
  }
];

const Awards = () => {
  return (
    <section className="py-section-padding px-margin-desktop bg-surface-container-low" id="awards">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-headline-lg text-on-background mb-4">Recognized Excellence</h2>
            <p className="text-body-lg text-on-surface-variant">Over two decades of dedication to excellence in business automation, backed by international recognition.</p>
          </div>
          <div className="hidden md:block">
            <span className="material-symbols-outlined text-6xl text-primary opacity-20">military_tech</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all"
            >
              <img alt={award.title} className="w-full h-64 object-cover rounded-xl mb-4" src={award.image} />
              <div className="p-4">
                <h4 className="text-headline-sm text-on-background">{award.title}</h4>
                <p className="text-label-md text-primary font-bold">{award.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
