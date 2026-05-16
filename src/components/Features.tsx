
import { motion } from 'framer-motion';

const features = [
  {
    icon: "account_balance",
    title: "Core Accounting",
    description: "General ledger, multi-currency support, and real-time financial reporting tailored for Nepal's market."
  },
  {
    icon: "inventory_2",
    title: "Smart Inventory",
    description: "Batch-wise inventory, expiry tracking, and multi-location management with barcode integration."
  },
  {
    icon: "description",
    title: "VAT & Compliance",
    description: "IRD-approved VAT reports, automatic tax calculations, and electronic filing support."
  },
  {
    icon: "cloud_done",
    title: "Cloud Accounting",
    description: "Access your data anywhere, anytime. Secure cloud backups and mobile sync functionality."
  },
  {
    icon: "point_of_sale",
    title: "Advanced POS",
    description: "High-speed retail billing, touch-screen support, and integrated loyalty programs."
  },
  {
    icon: "groups",
    title: "HR & Payroll",
    description: "Complete employee management, attendance tracking, and automated salary slip generation."
  }
];

const Features = () => {
  return (
    <section className="py-section-padding px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg text-on-background mb-4">Complete Business Control</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">One software to manage everything from inventory and VAT to payroll and multi-branch operations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant hover:border-primary hover:shadow-2xl transition-all group cursor-default"
            >
              <div className="w-14 h-14 bg-primary-container/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-headline-sm text-on-background mb-3">{feature.title}</h3>
              <p className="text-on-surface-variant">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
