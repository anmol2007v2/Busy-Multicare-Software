import { useState, type FormEvent } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  Building2,
  MessageSquare,
  Send,
  MapPin,
  Mail,
  Clock,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const BUSINESS_TYPES = [
  'Retail / Wholesale',
  'Manufacturing',
  'Services',
  'Others',
] as const;

type ContactProps = {
  variant?: 'home' | 'page';
};

const inputBase =
  'w-full bg-white border border-outline-variant/60 rounded-2xl py-3.5 pl-12 pr-4 text-body-md text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all';

const Contact = ({ variant = 'home' }: ContactProps) => {
  const { home, global } = useSiteContent();
  const c = home.contact;
  const [businessType, setBusinessType] = useState<string>(BUSINESS_TYPES[0]);

  const mapsLink =
    'https://www.google.com/maps/place/Busy+Multi+Care+Pvt+Ltd+(SOLE+DISTRIBUTOR+For+NEPAL)/@27.699286,85.312936,17z/data=!4m6!3m5!1s0x39eb1855a4438069:0x47f304a1d7cdd5ae!8m2!3d27.6992866!4d85.3129322!16s%2Fg%2F11b6lk7l5b?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D';

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Head Office',
      desc: (
        <span className="inline-flex flex-wrap items-center gap-1">
          {global.address}{' '}
          <span className="inline-flex items-center gap-1 text-primary font-semibold">
            <MapPin size={14} />
            Adwait Marg (near Kathmandu Model Hospital)
          </span>
        </span>
      ),
      href: mapsLink,
    },
    { icon: Phone, title: 'Phone Support', desc: global.phoneRaw, href: `tel:+${global.whatsappNumber}` },
    { icon: Mail, title: 'Email Us', desc: global.emailAlt, href: `mailto:${global.emailAlt}` },
    { icon: Clock, title: 'Working Hours', desc: global.workingHours },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = (formData.get('message') as string) || '—';

    const text = encodeURIComponent(
      `Hello, I'd like to send an inquiry:\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Business Type: ${businessType}\n` +
        `Message: ${message}`
    );

    window.open(`https://wa.me/${global.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const sectionPadding = variant === 'page' ? 'pb-section-padding' : 'py-section-padding';

  return (
    <section
      id="contact"
      className={`${sectionPadding} px-margin-mobile md:px-margin-desktop bg-surface`}
    >
      <motion.div
        className="max-w-container-max mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold uppercase tracking-wider mb-5">
            <Headphones size={16} />
            {variant === 'page' ? 'Support Center' : c.eyebrow}
          </span>
          <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">
            {c.title} <span className="text-primary">{c.titleHighlight}</span>
          </h2>
          <p className="text-body-lg text-on-surface-variant">{c.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {c.trustPoints.map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-1.5 text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full"
              >
                <CheckCircle2 size={14} className="text-success-emerald shrink-0" />
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Form card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-primary/5 border border-outline-variant/30 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-container to-tertiary-container"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-headline-sm text-on-background">{c.formTitle}</h3>
                  <p className="text-label-sm text-on-surface-variant mt-1">{c.formSubtitle}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Send size={22} />
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label htmlFor="contact-name" className="sr-only">
                      Full Name
                    </label>
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none"
                    />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className={inputBase}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="contact-phone" className="sr-only">
                      Phone Number
                    </label>
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none"
                    />
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      className={inputBase}
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </motion.div>

                <div>
                  <p className="text-label-md font-semibold text-on-background mb-3 flex items-center gap-2">
                    <Building2 size={16} className="text-primary" />
                    Business type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUSINESS_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBusinessType(type)}
                        className={`px-4 py-2 rounded-xl text-label-sm font-medium transition-all ${
                          businessType === type
                            ? 'bg-primary text-on-primary shadow-md shadow-primary/25'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-transparent hover:border-outline-variant/40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <MessageSquare
                    size={18}
                    className="absolute left-4 top-4 text-on-surface-variant/60 pointer-events-none"
                  />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className={`${inputBase} resize-none pt-3.5`}
                    placeholder="How can we help your business?"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-label-md flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Send Inquiry via WhatsApp
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </div>

          {/* Map + contact info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative h-[280px] md:h-[320px] w-full rounded-[2rem] overflow-hidden shadow-xl border border-outline-variant/20 group">
              <iframe
                title="Busy Multi Care office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.483758368943!2d85.3216839!3d27.70233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a6ad8c7113%3A0x6e9f168010419266!2sBusy%20Multi%20Care%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1715865600000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/80">
                <p className="font-bold text-on-background text-label-md">Visit our office</p>
                <p className="text-label-sm text-on-surface-variant mt-0.5">Putalisadak, Kathmandu</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-outline-variant/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full group/card">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover/card:bg-primary group-hover/card:text-on-primary transition-colors">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-on-background text-label-md">{item.title}</h5>
                      <p className="text-on-surface-variant text-label-sm mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="block"
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {content}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
