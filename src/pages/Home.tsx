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
import FAQ from '../components/FAQ';
import { useSEO, Schema } from '../hooks/useSEO';
import { SITE_URL } from '../config/site';

const Home = () => {
  useSEO({
    title: 'Busy Accounting Software Nepal | Free Demo - Multicare',
    description:
      'Buy Busy Accounting Software in Nepal. Official dealer in Kathmandu. Basic, Standard & Enterprise plans from Rs.12,000. Call +977-9851125905 for free demo.',
    canonical: `${SITE_URL}/`,
    keywords:
      'busy accounting software nepal, busy software nepal price, busy software dealer nepal, busy accounting software kathmandu, busy erp nepal, busy multicare',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Busy Accounting Software Nepal',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows',
        offers: {
          '@type': 'Offer',
          price: '12000',
          priceCurrency: 'NPR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '500',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Busy Multicare Software Pvt. Ltd.',
        image: `${SITE_URL}/og-image.png`,
        url: SITE_URL,
        telephone: '+977-9851125905',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Putalisadak',
          addressLocality: 'Kathmandu',
          addressRegion: 'Bagmati Province',
          postalCode: '44600',
          addressCountry: 'NP',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 27.7172,
          longitude: 85.324,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        sameAs: [
          'https://www.facebook.com/p/Busy-Multi-Care-Pvt-Ltd-100063584352392/',
          'https://www.youtube.com/@busymulticare',
          'https://www.instagram.com/busymulticare',
        ],
      },
      Schema.faq([
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
          question: 'Is Busy Software compliant with Nepal VAT and IRD requirements?',
          answer:
            'Yes. Busy Accounting Software supports Nepal VAT and IRD billing requirements with compliant reports and billing formats.',
        },
        {
          question: 'What is the difference between Busy Basic, Standard, and Enterprise?',
          answer:
            'Busy Basic suits small businesses, Standard adds advanced inventory and payroll features, and Enterprise includes full ERP and advanced controls.',
        },
      ]),
    ],
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
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;
