import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Download, 
  BookOpen, 
  HelpCircle, 
  Wrench, 
  RefreshCw, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle, 
  Clock 
} from 'lucide-react';
import { useSEO, Schema } from '../hooks/useSEO';
import { SITE_URL, PHONE_DISPLAY, WORKING_HOURS } from '../config/site';
import { handleInquiry } from '../utils/whatsapp';

const SUPPORT_FAQS = [
  {
    question: 'How do I download and install Busy Accounting Software?',
    answer: 'You can download the official Busy setup file from our website or by contacting our support team. Run the installer, select your edition (Basic, Standard, or Enterprise), and follow the onscreen wizard. We provide free remote installation support via AnyDesk or TeamViewer.'
  },
  {
    question: 'What is a Busy Software AMC (Annual Maintenance Contract) and how do I renew it?',
    answer: 'An AMC ensures your Busy software stays up-to-date with the latest IRD/VAT laws, feature releases, and provides you with priority technical support. AMC renewals are required annually. Contact Busy Multicare at +977-9851125905 to renew your subscription.'
  },
  {
    question: 'How do I resolve common database errors in Busy software?',
    answer: 'Most database errors occur due to network disconnection in multi-user setups or SQL Server service interruption. First, check if your host computer is accessible. If using MS SQL, restart the SQL Server service. For database corruption, use the "Compact Database" tool built into Busy, or call our expert support hotline for assistance.'
  },
  {
    question: 'Do you provide onsite training for our accounting staff in Nepal?',
    answer: 'Yes! Busy Multicare provides comprehensive training for your staff. We offer both online training via Zoom/Microsoft Teams and onsite training at your office in Kathmandu. Our training program covers everything from voucher entry and inventory setup to VAT reports and e-billing.'
  }
];

export default function SupportPage() {
  useSEO({
    title: 'Busy Software Support Nepal | Help, Training & Installation',
    description: 'Get expert Busy accounting software support in Nepal. Installation help, training, troubleshooting & AMC renewal. Call +977-9851125905 - Mon to Sat, 9AM-6PM.',
    canonical: `${SITE_URL}/support`,
    structuredData: Schema.faq(SUPPORT_FAQS.map(f => ({ question: f.question, answer: f.answer })))
  });

  return (
    <div className="bg-surface pt-28 pb-section-padding px-margin-mobile md:px-margin-desktop min-h-screen">
      <div className="max-w-container-max mx-auto">
        
        {/* Hero Section */}
        <header className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold uppercase tracking-wider mb-5"
          >
            <Wrench size={16} /> Help &amp; Support Center
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-hero text-on-background mb-6"
          >
            Busy Software Support &amp; Training in Nepal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-body-lg text-on-surface-variant max-w-2xl mx-auto"
          >
            Need help installing Busy? Want to renew your AMC or train your accounting team? Our dedicated technical experts in Kathmandu are here to assist you.
          </motion.p>
        </header>

        {/* 2x2 Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Item 1: Installation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Download size={24} />
            </div>
            <h2 className="text-headline-sm text-on-background mb-4">Installation &amp; Setup Support</h2>
            <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Ensure your Busy accounting software is configured correctly from day one. We handle single-user setups, server configurations, and multi-user client setups over local networks.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Free remote setup via AnyDesk
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> SQL Server installation and tuning
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Custom print template configuration (invoices, receipts)
              </li>
            </ul>
            <button 
              onClick={() => handleInquiry('Busy Installation Setup Support')} 
              className="text-primary font-bold text-label-md hover:underline flex items-center gap-1.5"
            >
              Request Installation Support &rarr;
            </button>
          </motion.div>

          {/* Item 2: Training */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6">
              <BookOpen size={24} />
            </div>
            <h2 className="text-headline-sm text-on-background mb-4">Software Training (Online &amp; Onsite)</h2>
            <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Empower your accounting team with standard software training. Learn best practices for voucher entries, batch inventory management, automatic VAT reporting, and IRD electronic billing rules in Nepal.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Tailored onsite group training at your office
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Flexible online sessions with interactive Q&amp;A
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Step-by-step documentation &amp; reference guides
              </li>
            </ul>
            <button 
              onClick={() => handleInquiry('Busy Software Training Enquiry')} 
              className="text-primary font-bold text-label-md hover:underline flex items-center gap-1.5"
            >
              Book Training Session &rarr;
            </button>
          </motion.div>

          {/* Item 3: Troubleshooting */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-tertiary-container/30 flex items-center justify-center text-primary mb-6">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-headline-sm text-on-background mb-4">Troubleshooting Common Busy Software Issues</h2>
            <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Encountering errors, database disconnection warnings, or backup restoration glitches? Our experienced engineers quickly diagnose and resolve database corruptions, licensing conflicts, and system crashes.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> High-speed error troubleshooting &amp; data backup restoration
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Network sharing and multi-user performance fixes
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> VAT &amp; IRD tax configuration correction
              </li>
            </ul>
            <button 
              onClick={() => handleInquiry('Busy Troubleshooting Support')} 
              className="text-primary font-bold text-label-md hover:underline flex items-center gap-1.5"
            >
              Get Instant Troubleshooting &rarr;
            </button>
          </motion.div>

          {/* Item 4: AMC */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-success-emerald/10 flex items-center justify-center text-success-emerald mb-6">
              <RefreshCw size={24} />
            </div>
            <h2 className="text-headline-sm text-on-background mb-4">AMC (Annual Maintenance Contract) Renewal</h2>
            <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Protect your business database with a continuous Annual Maintenance Contract (AMC). Keep your software compliant with the latest Nepal Inland Revenue Department (IRD) billing mandates and tax regulations.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Unlimited support tickets via phone, WhatsApp &amp; remote tools
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Free software upgrades to the newest BUSY 21 versions
              </li>
              <li className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> Priority response times for downtime emergencies
              </li>
            </ul>
            <button 
              onClick={() => handleInquiry('Busy AMC Renewal Request')} 
              className="text-primary font-bold text-label-md hover:underline flex items-center gap-1.5"
            >
              Renew Your AMC Now &rarr;
            </button>
          </motion.div>

        </section>

        {/* FAQ Section */}
        <section className="bg-surface-container-low rounded-[3rem] p-8 md:p-16 border border-outline-variant/20 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline-lg text-on-background mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {SUPPORT_FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-outline-variant/30 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-headline-sm text-on-background mb-3 flex items-start gap-3">
                    <span className="text-primary font-bold">Q.</span> {faq.question}
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section className="bg-[#050b1a] text-white rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
          <h2 className="text-headline-lg mb-4 text-white">Contact Our Support Team</h2>
          <p className="text-body-lg text-white/80 max-w-xl mx-auto mb-10">
            Our certified system administrators and support agents are available to help your accounting teams.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left mb-10">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                <PhoneCall size={18} />
              </div>
              <div>
                <p className="text-label-sm text-white/60">Phone Support</p>
                <a href={`tel:+9779851125905`} className="font-bold text-white hover:text-primary transition-colors">{PHONE_DISPLAY}</a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-success-emerald flex items-center justify-center text-white shrink-0">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-label-sm text-white/60">WhatsApp Support</p>
                <button onClick={() => handleInquiry('Urgent Support Request')} className="font-bold text-white hover:text-success-emerald transition-colors text-left">Chat Live Support</button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-label-sm text-white/60">Working Hours</p>
                <p className="font-bold text-white">{WORKING_HOURS}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleInquiry('Immediate Technical Support')}
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all hover:bg-primary-container hover:text-on-primary-container"
            >
              Get Immediate Assistance
            </button>
            <Link 
              to="/contact" 
              className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Open Support Ticket
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

