import { useSEO } from '../../hooks/useSEO';
import { SITE_URL } from '../../config/site';

export default function TermsPage() {
  useSEO({
    title: 'Terms of Service',
    description: 'Terms of service for Busy Multicare Software products and support.',
    canonical: `${SITE_URL}/terms`,
  });

  return (
    <article className="pt-28 pb-section-padding px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
      <h1 className="text-headline-lg text-on-background mb-6">Terms of Service</h1>
      <p className="text-body-md text-on-surface-variant mb-4">By purchasing or using Busy software through Busy Multicare Software Pvt. Ltd., you agree to the following terms.</p>
      <h2 className="text-headline-sm mt-8 mb-3">Software licensing</h2>
      <p className="text-body-md text-on-surface-variant mb-4">Licenses are issued per the agreement with Busy Infotech. Unauthorized copying or redistribution is prohibited.</p>
      <h2 className="text-headline-sm mt-8 mb-3">Support</h2>
      <p className="text-body-md text-on-surface-variant mb-4">We provide installation assistance, training, and ongoing support during business hours (Sun–Fri, 10 AM–6 PM).</p>
      <h2 className="text-headline-sm mt-8 mb-3">Jurisdiction</h2>
      <p className="text-body-md text-on-surface-variant">Disputes are subject to the laws of Nepal and courts in Kathmandu.</p>
    </article>
  );
}
