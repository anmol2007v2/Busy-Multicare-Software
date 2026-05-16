import { motion } from 'framer-motion';

const Showcase = () => {
  return (
    <section className="py-section-padding px-margin-desktop dark-navy-section text-on-primary-container">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                alt="BUSY 21 Features" 
                className="rounded-xl shadow-2xl border border-primary-fixed-dim/20" 
                src="/image/busy 21 1.svg" 
              />
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                alt="Cloud Services" 
                className="mt-8 rounded-xl shadow-2xl border border-primary-fixed-dim/20" 
                src="/image/cloud services 1.svg" 
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-headline-lg text-surface-bright mb-6">Experience the Future with BUSY 21</h2>
            <p className="text-body-lg mb-8 opacity-90 text-white">Our latest release brings unprecedented power to your hands. With advanced features like HO BO Management, Auto Sync in Mobile, and Barcode Reading, managing your business has never been easier.</p>
            <ul className="space-y-4 mb-10">
              {["Real-time Audit Logs for maximum security", "Integrated Mobile App for data viewing on-the-go", "Seamless multi-branch data synchronization"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-primary-fixed-dim">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors">
              Learn More About BUSY 21
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
