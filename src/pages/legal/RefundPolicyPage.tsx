import { useSEO } from '../../hooks/useSEO';
import { PHONE_RAW, SITE_URL } from '../../config/site';

export default function RefundPolicyPage() {
  useSEO({
    title: 'Refund Policy',
    description: 'Refund policy for Busy software licenses purchased through Busy Multicare.',
    canonical: `${SITE_URL}/refund-policy`,
  });

  return (
    <article className="pt-28 pb-section-padding px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
      <h1 className="text-headline-lg text-on-background mb-6">Refund Policy</h1>
      <p className="text-body-md text-on-surface-variant mb-4">Unused software licenses may be eligible for a refund within 7 days of purchase, subject to vendor approval.</p>
      <h2 className="text-headline-sm mt-8 mb-3">Non-refundable</h2>
      <p className="text-body-md text-on-surface-variant mb-4">Activated licenses, customization work, and annual maintenance already rendered are non-refundable.</p>
      <h2 className="text-headline-sm mt-8 mb-3">How to request</h2>
      <p className="text-body-md text-on-surface-variant">WhatsApp us at {PHONE_RAW} with your invoice and reason for the request.</p>
    </article>
  );
}
