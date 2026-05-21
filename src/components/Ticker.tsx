import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';

const Ticker = () => {
  const { home } = useSiteContent();
  const tickerItems = home.ticker.items;

  return (
    <div className="bg-primary py-4 overflow-hidden whitespace-nowrap border-y border-primary-fixed-dim/20 relative group">
      <motion.div className="inline-flex" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
        <div className="flex gap-12 px-6">
          {tickerItems.concat(tickerItems).map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-on-primary font-bold tracking-widest text-label-md">
              <span className="w-2 h-2 bg-primary-fixed-dim rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default Ticker;
