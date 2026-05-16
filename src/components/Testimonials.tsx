import { motion } from 'framer-motion';

const testimonials = [
  {
    initials: "RK",
    name: "Rajesh Khatri",
    company: "Retail Solutions Pvt. Ltd.",
    quote: "Busy has completely revolutionized how we handle our multi-branch inventory. The VAT compliance is a lifesaver."
  },
  {
    initials: "SB",
    name: "Suman Baral",
    company: "Baral Enterprises",
    quote: "The best decision we made for our business. Support from Busy Multi Care is exceptional and always there when needed.",
    featured: true
  },
  {
    initials: "NT",
    name: "Nirmala Thapa",
    company: "Grace Boutique",
    quote: "Transitioning to the cloud was seamless. I can now manage my shop in Pokhara while sitting in Kathmandu."
  }
];

const Testimonials = () => {
  return (
    <section className="py-section-padding px-margin-desktop bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto text-center mb-16">
        <h2 className="text-headline-lg mb-4 text-white">What Our Clients Say</h2>
        <p className="text-on-primary-container max-w-xl mx-auto opacity-80">Real experiences from business owners who transformed their operations with Busy.</p>
      </div>
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {testimonials.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: t.featured ? 1.05 : 1 }}
            viewport={{ once: true }}
            className={`backdrop-blur-lg border p-8 rounded-2xl ${t.featured ? 'bg-white/20 border-white/30 shadow-2xl z-10' : 'bg-white/10 border-white/20'}`}
          >
            <span className="material-symbols-outlined text-4xl mb-6 text-white/50" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <p className="text-body-md mb-8 italic text-white">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary font-bold">{t.initials}</div>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-label-sm opacity-70 text-white">{t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
