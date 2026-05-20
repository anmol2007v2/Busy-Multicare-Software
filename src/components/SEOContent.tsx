import { Link } from 'react-router-dom';
import { PHONE_DISPLAY } from '../config/site';

export default function SEOContent() {
  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto space-y-16">
        <article>
          <h2 className="text-headline-md text-on-background mb-4">
            Why Choose Busy Accounting Software for Your Nepal Business
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Busy accounting software Nepal is the trusted choice for SMEs and enterprises managing VAT, inventory, and payroll under IRD rules.
            As an authorized dealer, Busy Multicare offers competitive busy software price Nepal packages from NPR 12,000/year — with local installation,
            Nepali-language support, and IRD VAT compatible reporting. Whether you run a shop in Kathmandu or a factory in Biratnagar, Busy helps you
            stay compliant and grow with confidence.
          </p>
        </article>
        <article>
          <h2 className="text-headline-md text-on-background mb-4">
            Busy Software Features for Nepal Businesses
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Busy supports Bikram Sambat fiscal calendars, Nepal VAT invoices and returns, multi-currency transactions, and Nepali language interfaces.
            From busy basic accounting software for single-location retailers to Busy Enterprise ERP with manufacturing and payroll, every edition is
            tuned for how Nepali businesses actually work. Explore our{' '}
            <Link to="/products" className="text-primary font-semibold hover:underline">Busy software products &amp; prices</Link>.
          </p>
        </article>
        <article>
          <h2 className="text-headline-md text-on-background mb-4">
            Trusted by 10,000+ Businesses Across Nepal
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            From Putalisadak wholesalers to Pokhara hotels and Biratnagar manufacturers, over 10,000 installations rely on Busy Multicare for
            support, training, and upgrades. Call {PHONE_DISPLAY} for a free demo — we are Nepal&apos;s authorized Busy software dealer with 15+ years of experience.
          </p>
        </article>
      </div>
    </section>
  );
}
