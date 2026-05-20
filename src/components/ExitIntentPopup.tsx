import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { handleInquiry } from '../utils/whatsapp';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const COOLDOWN_MS = 20 * 60 * 1000; // 20 minutes
    const STORAGE_KEY = 'exit_intent_last_shown';

    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown && Date.now() - Number(lastShown) < COOLDOWN_MS) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        document.removeEventListener('mouseout', onLeave);
      }
    };
    document.addEventListener('mouseout', onLeave);
    return () => document.removeEventListener('mouseout', onLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Free demo offer">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
        <button type="button" onClick={() => setShow(false)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-container-low cursor-pointer" aria-label="Close">
          <X size={20} />
        </button>
        <h3 className="text-headline-sm text-on-background mb-2">Before you go — get a free demo!</h3>
        <p className="text-body-md text-on-surface-variant mb-6">WhatsApp us now for Busy Accounting Software pricing and a personalized demo.</p>
        <button type="button" onClick={() => { handleInquiry('Free Demo'); setShow(false); }} className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold cursor-pointer">
          WhatsApp Us Now
        </button>
      </div>
    </div>
  );
}
