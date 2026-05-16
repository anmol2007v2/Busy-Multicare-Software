
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <header className="relative overflow-hidden hero-gradient py-section-padding px-margin-desktop">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-label-sm font-label-sm mb-6 uppercase tracking-wider">
            Official Busy Partner Nepal
          </span>
          <h1 className="text-display-hero text-on-background mb-6 leading-tight">
            Nepal’s Leading <span className="text-primary">Accounting</span> & Business Automation.
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-10 max-w-lg">
            Empowering 100,000+ businesses with intelligent accounting, inventory, VAT, and cloud solutions. Seamlessly transition from manual to digital.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/products" className="bg-primary text-on-primary px-8 py-4 rounded-xl text-label-md font-semibold hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
              Get Started <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button className="bg-surface-container-lowest border border-outline-variant text-on-surface px-8 py-4 rounded-xl text-label-md font-semibold hover:bg-surface hover:-translate-y-1 transition-all flex items-center gap-2">
              Watch Demo <span className="material-symbols-outlined">play_circle</span>
            </button>
          </div>
          <div className="flex items-center gap-8 opacity-70">
            <div className="flex flex-col">
              <span className="text-headline-md text-primary">100k+</span>
              <span className="text-label-sm">Installations</span>
            </div>
            <div className="w-px h-10 bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="text-headline-md text-primary">20+ Yrs</span>
              <span className="text-label-sm">Experience</span>
            </div>
            <div className="w-px h-10 bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="text-headline-md text-primary">IRD</span>
              <span className="text-label-sm">Approved Software</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest">
            <img 
              alt="Busy Multi Care Exhibition Team" 
              className="w-full h-auto object-cover aspect-[4/3]" 
              src="/image/a 1.svg" 
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40 flex items-center gap-4">
            <div className="bg-success-emerald/10 p-3 rounded-full">
              <span className="material-symbols-outlined text-success-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div>
              <p className="text-label-md font-bold text-on-surface">Trusted in Nepal</p>
              <p className="text-label-sm text-on-surface-variant">Nepal's No. 1 Solution</p>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
