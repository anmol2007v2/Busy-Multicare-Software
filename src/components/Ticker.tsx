
import { motion } from 'framer-motion';

const tickerItems = [
  "VAT COMPLIANT SOFTWARE",
  "100,000+ INSTALLATIONS",
  "NEPAL'S NO. 1 BUSINESS SOLUTION",
  "OFFICIAL BUSY PARTNER",
  "20+ YEARS OF EXCELLENCE",
  "IRD APPROVED BILLING",
  "24/7 TECHNICAL SUPPORT"
];

const Ticker = () => {
  return (
    <div className="bg-primary py-4 overflow-hidden whitespace-nowrap border-y border-primary-fixed-dim/20 relative group">
      <motion.div 
        className="inline-flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="flex gap-12 px-6">
          {tickerItems.concat(tickerItems).map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 text-on-primary font-bold tracking-widest text-label-md hover:text-primary-fixed-dim transition-colors cursor-default"
            >
              <span className="w-2 h-2 bg-primary-fixed-dim rounded-full"></span>
              {item}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Gradient overlays for smooth fading at edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default Ticker;
