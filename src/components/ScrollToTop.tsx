import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-50 bg-primary text-on-primary w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp size={22} />
    </button>
  );
}
