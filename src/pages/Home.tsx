
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import Awards from '../components/Awards';
import Exhibitions from '../components/Exhibitions';
import Leadership from '../components/Leadership';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Ticker from '../components/Ticker';
import PricingSection from '../components/PricingSection';
import SEOContent from '../components/SEOContent';
import FAQ from '../components/FAQ';
import { useSEO, Schema } from '../hooks/useSEO';
import { SITE_URL } from '../config/site';

const Home = () => {
  useSEO({
    title: 'Busy Accounting Software Nepal | Buy Busy Software – Busy Multicare',
    description:
      "Nepal's authorized Busy software dealer. Buy Busy accounting, ERP, POS & payroll software in Kathmandu. Free demo: 9851125905",
    canonical: `${SITE_URL}/`,
    keywords:
      'busy accounting software nepal, busy software nepal price, busy software dealer nepal, busy accounting software kathmandu, busy erp nepal, busy multicare',
    structuredData: Schema.faq([
      {
        question: 'What is the price of Busy accounting software in Nepal?',
        answer:
          'Busy accounting software prices in Nepal start from NPR 12,000 per year for Busy Basic. Contact us at 9851125905 for the latest pricing.',
      },
      {
        question: 'Where can I buy Busy software in Kathmandu?',
        answer:
          'Busy Multicare Software Pvt. Ltd. is an authorized Busy software dealer in Kathmandu. WhatsApp 9851125905.',
      },
      {
        question: 'Is there a free demo of Busy software available?',
        answer: 'Yes! WhatsApp us at 9851125905 to schedule your free demo today.',
      },
    ]),
  });

  return (
    <>
      <Hero />
      <Ticker />
      <TrustedBy />
      <Features />
      <PricingSection />
      <Showcase />
      <Awards />
      <Exhibitions />
      <Leadership />
      <Testimonials />
      <SEOContent />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;
