import { useSEO } from '../../hooks/useSEO';
import { EMAIL, SITE_URL } from '../../config/site';

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy',
    description: 'Privacy policy for Busy Multicare Software — how we collect and use your data.',
    canonical: `${SITE_URL}/privacy-policy`,
  });

  return (
    <article className="pt-28 pb-section-padding px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto prose prose-slate">
      <h1 className="text-headline-lg text-on-background mb-6">Privacy Policy</h1>
      <p className="text-body-md text-on-surface-variant mb-4">Last updated: May 2026</p>
      <h2 className="text-headline-sm mt-8 mb-3">Information we collect</h2>
      <p className="text-body-md text-on-surface-variant mb-4">We may collect your name, phone number, email, and business details when you contact us via WhatsApp, phone, or our website forms. We also use analytics tools to understand site usage.</p>
      <h2 className="text-headline-sm mt-8 mb-3">How we use it</h2>
      <p className="text-body-md text-on-surface-variant mb-4">Your information is used to respond to inquiries, provide software demos, deliver support, and improve our services. We do not sell your personal data to third parties.</p>
      <h2 className="text-headline-sm mt-8 mb-3">Data requests</h2>
      <p className="text-body-md text-on-surface-variant">Contact us at <a href={`mailto:${EMAIL}`} className="text-primary">{EMAIL}</a> to request access, correction, or deletion of your data.</p>
    </article>
  );
}
