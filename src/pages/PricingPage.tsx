import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO, Schema } from '../hooks/useSEO';
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL } from '../config/site';

const PRICING_DETAILS = [
  {
    edition: 'Busy Basic',
    price: 'Rs. 12,000',
    features: [
      'Single-user license',
      'Basic accounting & GST/VAT',
      'Inventory management',
      'Reports & MIS',
      'Email support',
      '1 year AMC included'
    ]
  },
  {
    edition: 'Busy Standard',
    price: 'Rs. 25,000',
    features: [
      'Multi-user (3-5 users)',
      'Complete accounting & GST/VAT',
      'Advanced inventory management',
      'Payroll & HR module',
      'Point of Sale (POS)',
      'Priority phone support',
      '1 year AMC included'
    ]
  },
  {
    edition: 'Busy Enterprise',
    price: 'Custom Pricing',
    features: [
      'Unlimited users',
      'Full ERP functionality',
      'Manufacturing module',
      'Multi-location support',
      'Advanced analytics & BI',
      'Dedicated account manager',
      'Onsite training & support',
      'Custom configurations',
      '1 year AMC included'
    ]
  }
];

const PricingPage = () => {
  useSEO({
    title: 'Busy Software Price in Nepal 2025 – Basic, Standard & Enterprise',
    description: 'Busy Accounting Software pricing in Nepal: Basic from Rs.12,000, Standard from Rs.25,000, Enterprise custom pricing. Compare features. Free demo available. Call +977-9851125905.',
    canonical: `${SITE_URL}/busy-software-price-nepal`,
    keywords: 'busy software price nepal 2025, busy basic price nepal, busy standard price, busy enterprise price, busy software cost',
    ogImage: `${SITE_URL}/og-image.png`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the price of Busy Accounting Software in Nepal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Busy Accounting Software in Nepal is priced from Rs.12,000 for the Basic edition for small businesses. The Standard edition is priced from Rs.25,000 for growing businesses. The Enterprise edition has custom pricing based on your requirements.'
            }
          },
          {
            '@type': 'Question',
            name: 'What does the price include?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All Busy editions include 1 year of AMC (Annual Maintenance Contract) which covers software updates, bug fixes, compliance updates, and technical support. Additional support and training options are available.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is there a discount for bulk purchases?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Busy Multicare offers volume discounts for organizations purchasing multiple licenses. Contact us at +977-9851125905 for a custom quote.'
            }
          }
        ]
      }
    ]
  });

  return (
    <div className="bg-surface pt-20 pb-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold uppercase tracking-widest text-label-sm mb-4 block">
            Pricing & Plans
          </span>
          <h1 className="text-display-hero text-on-background mb-6">
            Busy Software Price in Nepal 2025
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Transparent pricing for all business sizes. Choose the right edition for your needs. 
            All prices include 1 year of free support & updates.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PRICING_DETAILS.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg p-8 border-2 transition-all ${
                index === 1
                  ? 'border-primary bg-primary/5 shadow-lg scale-105'
                  : 'border-outline bg-surface-dim hover:border-primary/50'
              }`}
            >
              {index === 1 && (
                <span className="inline-block bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold mb-4">
                  MOST POPULAR
                </span>
              )}
              
              <h3 className="text-heading-md font-bold text-on-background mb-2">{plan.edition}</h3>
              <div className="text-display-md text-primary font-bold mb-6">{plan.price}</div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-body-sm text-on-surface-variant">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`tel:${PHONE_TEL}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                Get Free Demo
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-dim rounded-lg p-8 md:p-12 mb-12"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-6">What's Included?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-on-background mb-2">Software License</h3>
                <p className="text-body-sm text-on-surface-variant">Full license for the chosen Busy edition with all features</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-on-background mb-2">1 Year AMC</h3>
                <p className="text-body-sm text-on-surface-variant">Free software updates, compliance updates & technical support</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-on-background mb-2">Installation Support</h3>
                <p className="text-body-sm text-on-surface-variant">Free remote or onsite installation assistance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-on-background mb-2">Initial Training</h3>
                <p className="text-body-sm text-on-surface-variant">Basic training for your team to get started</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-primary/10 rounded-lg p-12"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-4">
            Not sure which plan you need?
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Our team can help you select the right Busy edition based on your business needs.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5" />
              Call for Consultation: {PHONE_DISPLAY}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Send an Inquiry
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Other Plans Link */}
        <div className="text-center mt-12">
          <p className="text-body-sm text-on-surface-variant mb-4">
            Looking for more details about different Busy editions?
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View all Busy plans & features
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
