import { useState } from 'react';
import { motion } from 'framer-motion';
import { PHONE_DISPLAY, YOUTUBE_DEMO } from '../config/site';
import { handleInquiry } from '../utils/whatsapp';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <header className="relative overflow-hidden hero-gradient py-section-padding px-margin-mobile md:px-margin-desktop">
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
            <span className="text-primary">Busy Accounting Software</span> Nepal — Business Automation You Can Trust
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-4 max-w-lg">
            Empowering 10,000+ businesses with IRD-approved accounting, VAT billing, inventory &amp; cloud solutions.
          </p>
          <p className="text-label-md font-semibold text-on-background mb-8">
            Call / WhatsApp:{' '}
            <a href={`tel:${PHONE_DISPLAY.replace(/-/g, '')}`} className="text-primary hover:underline">
              {PHONE_DISPLAY}
            </a>
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              type="button"
              onClick={() => handleInquiry('Busy Accounting Software')}
              className="bg-primary text-on-primary px-8 py-4 rounded-xl text-label-md font-semibold hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              Get Free Demo
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="bg-surface-container-lowest border border-outline-variant text-on-surface px-8 py-4 rounded-xl text-label-md font-semibold hover:bg-surface hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              Watch Demo Video
              <span className="material-symbols-outlined">play_circle</span>
            </button>
          </div>
          <div className="flex items-center gap-8 opacity-70">
            <div className="flex flex-col">
              <span className="text-headline-md text-primary">10k+</span>
              <span className="text-label-sm">Businesses</span>
            </div>
            <div className="w-px h-10 bg-outline-variant" />
            <div className="flex flex-col">
              <span className="text-headline-md text-primary">15+ Yrs</span>
              <span className="text-label-sm">Experience</span>
            </div>
            <div className="w-px h-10 bg-outline-variant" />
            <div className="flex flex-col">
              <span className="text-headline-md text-primary">IRD</span>
              <span className="text-label-sm">Approved</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest">
            <img
              alt="Busy accounting software Nepal dashboard with VAT reports"
              className="w-full h-auto object-cover aspect-[4/3]"
              src="/image/a 1.svg"
              width={800}
              height={600}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-on-background/70" role="dialog" aria-modal="true" onKeyDown={(e) => e.key === 'Escape' && setShowVideo(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <p className="text-body-md text-on-surface-variant mb-4">Watch our demo on YouTube or WhatsApp us for a live walkthrough.</p>
            <div className="flex gap-3">
              <a href={YOUTUBE_DEMO} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-primary text-on-primary py-3 rounded-xl font-semibold">Open YouTube</a>
              <button type="button" onClick={() => setShowVideo(false)} className="px-4 py-3 rounded-xl border cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Hero;
