import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PHONE_RAW } from '../config/site';

const FAQ_ITEMS = [
  {
    q: 'What is the price of Busy accounting software in Nepal?',
    a: `Busy accounting software prices in Nepal start from NPR 12,000 per year for Busy Basic. Busy Standard is NPR 25,000/year and Busy Enterprise is NPR 75,000/year. Contact us at ${PHONE_RAW} for the latest pricing.`,
  },
  {
    q: 'Where can I buy Busy software in Kathmandu?',
    a: `Busy Multicare Software Pvt. Ltd. is an authorized Busy software dealer in Kathmandu, Nepal. Contact us at ${PHONE_RAW} (WhatsApp) or visit our office in Putalisadak.`,
  },
  {
    q: 'Does Busy accounting software support Nepal VAT and tax formats?',
    a: "Yes, Busy software is fully compatible with Nepal's VAT system, IRD requirements, and Nepali fiscal year (Bikram Sambat). It generates VAT invoices, VAT returns, and Nepal-specific financial reports.",
  },
  {
    q: 'Is there a free demo of Busy software available?',
    a: `Yes! We offer a free demo of all Busy software products. WhatsApp us at ${PHONE_RAW} to schedule your free demo today.`,
  },
  {
    q: 'What support is provided after buying Busy software?',
    a: 'We provide installation support, staff training, annual maintenance, and ongoing WhatsApp/phone support. Our team is available Sunday–Friday, 10 AM–6 PM.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-headline-lg text-on-background text-center mb-4">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="text-body-lg text-on-surface-variant text-center mb-12">
          Everything you need to know about Busy accounting software in Nepal
        </p>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={item.q} className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-on-background hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                aria-expanded={open === i}
              >
                {item.q}
                <ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-on-surface-variant text-body-md leading-relaxed border-t border-outline-variant/20 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
