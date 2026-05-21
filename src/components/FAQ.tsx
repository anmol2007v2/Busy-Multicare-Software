import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';

export default function FAQ() {
  const { home } = useSiteContent();
  const f = home.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-headline-lg text-on-background text-center mb-4">
          {f.title} <span className="text-primary">{f.titleHighlight}</span>
        </h2>
        <p className="text-body-lg text-on-surface-variant text-center mb-12">{f.subtitle}</p>
        <div className="space-y-3">
          {f.items.map((item, i) => (
            <div key={item.q} className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden">
              <button type="button" className="w-full flex items-center justify-between p-5 text-left font-semibold text-on-background cursor-pointer" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {item.q}
                <ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-on-surface-variant text-body-md">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
