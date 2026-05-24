import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import Contact from '../components/Contact';
import { useSEO } from '../hooks/useSEO';
import { SITE_URL, COMPANY_NAME, PHONE_DISPLAY, EMAIL, ADDRESS } from '../config/site';

const QUICK_LINKS = [
  { icon: Phone, label: 'Call us', value: '9851125905', href: 'tel:+9779851125905' },
  { icon: Mail, label: 'Email', value: 'busyedu@gmail.com', href: 'mailto:busyedu@gmail.com' },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat now',
    href: 'https://wa.me/9779851125905',
  },
];

const ContactPage = () => {
  useSEO({
    title: 'Contact Busy Multicare Software Nepal | Kathmandu Office',
    description: 'Reach Busy Multicare in Kathmandu. Call +977-9851125905 for official Busy accounting software demos, pricing, installation & training support.',
    canonical: `${SITE_URL}/contact`,
  });

  return (
    <div className="bg-surface">
      {/* Support hero */}
      <header className="relative overflow-hidden pt-28 pb-16 md:pb-20 px-margin-mobile md:px-margin-desktop">
        <motion.div
          className="absolute inset-0 hero-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-tertiary-container/20 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative max-w-container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container/15 text-primary text-label-sm font-semibold uppercase tracking-wider mb-6">
              Support
            </span>
            <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-background mb-5">
              Contact Busy Multicare Software in Kathmandu
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl">
              Get expert guidance on Busy accounting, VAT compliance, and cloud solutions. Reach out by form, phone, or visit our Kathmandu office.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl"
          >
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-outline-variant/30 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-label-sm text-on-surface-variant">{link.label}</p>
                    <p className="font-bold text-on-background text-label-md">{link.value}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </header>

      <Contact variant="page" />

      {/* Crawlable Semantic NAP Address Block for SEO */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto text-center md:text-left">
          <h2 className="text-label-sm font-semibold text-outline uppercase tracking-wider mb-4">Official Business Registration &amp; Details</h2>
          <address className="not-italic text-body-md text-on-surface-variant/80 space-y-2 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="font-bold text-on-background text-label-md">Company Name</p>
              <p>{COMPANY_NAME}</p>
            </div>
            <div>
              <p className="font-bold text-on-background text-label-md">Physical Address</p>
              <p>{ADDRESS}</p>
            </div>
            <div>
              <p className="font-bold text-on-background text-label-md">Phone Support</p>
              <p><a href="tel:+9779851125905" className="hover:text-primary transition-colors">{PHONE_DISPLAY}</a></p>
            </div>
            <div>
              <p className="font-bold text-on-background text-label-md">Email Address</p>
              <p><a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors">{EMAIL}</a></p>
            </div>
          </address>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
