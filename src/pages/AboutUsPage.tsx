import { motion } from 'framer-motion';
import Leadership from '../components/Leadership';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-surface min-h-screen pt-28 md:pt-32 pb-section-padding px-margin-mobile md:px-margin-desktop overflow-x-hidden">
      {/* Vision & Mission */}
      <section className="mb-16 md:mb-32">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold uppercase tracking-widest text-label-sm mb-4 block">About Us</span>
              <h1 className="text-display-hero text-on-background mb-8">Empowering Nepal's Business Landscape</h1>
              <p className="text-body-lg text-on-surface-variant mb-12">
                Busy Multi Care Pvt Ltd was founded with a singular purpose: to bridge the technological gap for businesses in Nepal. As the authorized partner for BUSY Accounting Software, we have helped over 5,000 businesses transition to a more efficient, digital-first operation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Our Mission</h4>
                    <p className="text-body-sm text-on-surface-variant">To provide robust, IRD-compliant software solutions that simplify complex business processes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Our Vision</h4>
                    <p className="text-body-sm text-on-surface-variant">To be the most trusted technology partner for SMEs across the Himalayan region.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mt-4 mb-20 sm:mb-0 sm:mt-0"
            >
              <div className="rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                  alt="Team Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-4 right-4 sm:-bottom-10 sm:-left-10 sm:right-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-surface-container flex items-center gap-4 sm:gap-6 max-w-xs mx-auto sm:mx-0">
                 <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-headline-sm font-bold">25+</div>
                 <div>
                    <p className="font-bold text-headline-sm">Years</p>
                    <p className="text-on-surface-variant">Of Excellence in Tech</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-16 md:py-32 -mx-margin-mobile md:mx-0 px-margin-mobile md:px-margin-desktop mb-16 md:mb-32 rounded-none md:rounded-none">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="text-headline-lg text-on-background mb-16">The Values That Drive Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck />, title: "Integrity", desc: "Honesty in every interaction and 100% compliance." },
              { icon: <Users />, title: "Customer-First", desc: "Your business growth is our primary success metric." },
              { icon: <Zap />, title: "Innovation", desc: "Constantly evolving with the latest technology trends." },
              { icon: <Target />, title: "Precision", desc: "Zero margin for error in accounting and inventory." }
            ].map((value, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-surface-container shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  {value.icon}
                </div>
                <h4 className="font-bold text-headline-sm mb-4">{value.title}</h4>
                <p className="text-on-surface-variant">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <Leadership />
    </div>
  );
};

export default AboutUsPage;
