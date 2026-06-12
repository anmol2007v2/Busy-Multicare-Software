import { motion } from 'framer-motion';
import { Cloud, Lock, Zap, Globe, BarChart3, Users, Shield, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL } from '../config/site';

const CLOUD_FEATURES = [
  {
    icon: Globe,
    title: 'Access from Anywhere',
    description: 'Work from your office, home, or on the go. Access Busy accounting software from any device with internet connection.'
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Multiple team members can work simultaneously. See live updates across all locations in real-time.'
  },
  {
    icon: Zap,
    title: 'Instant Synchronization',
    description: 'Multi-location sync ensures your data is always up-to-date across all branches and stores.'
  },
  {
    icon: Shield,
    title: 'Enterprise-grade Security',
    description: 'Bank-level encryption, regular backups, and compliance with Nepal IRD requirements.'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Get instant insights into your business performance with live dashboards and MIS reports.'
  },
  {
    icon: Lock,
    title: 'Automatic Backups',
    description: 'Your data is automatically backed up multiple times daily. No more manual backup headaches.'
  },
];

const BusyOnCloudPage = () => {
  useSEO({
    title: 'Busy on Cloud Nepal – Remote Accounting Software Access | Busy Multicare',
    description: 'Busy Accounting Software on Cloud: Access from anywhere, multi-location sync, real-time collaboration. Enterprise security, automatic backups. Free demo: +977-9851125905.',
    canonical: `${SITE_URL}/busy-on-cloud`,
    keywords: 'busy on cloud nepal, busy accounting software cloud, busy software remote access, busy cloud based accounting',
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
            Cloud Solution
          </span>
          <h1 className="text-display-hero text-on-background mb-6">
            Busy on Cloud Nepal
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Access your accounting software from anywhere. Multi-location sync, real-time collaboration, 
            and enterprise-grade security for modern Nepal businesses.
          </p>
        </motion.div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {CLOUD_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg p-6 bg-surface-dim border-2 border-outline hover:border-primary/50 transition-all"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-heading-sm font-bold text-on-background mb-2">{feature.title}</h3>
                <p className="text-body-sm text-on-surface-variant">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Busy on Cloud */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 rounded-lg p-8 md:p-12 mb-20"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-8 text-center">
            Why Choose Busy on Cloud?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-heading-sm font-bold text-on-background mb-4">
                For Multi-location Businesses
              </h3>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Manage multiple branches, retail stores, or warehouses from a single platform. 
                Real-time data sync ensures consistency across all locations. Get consolidated reports 
                and analytics instantly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-on-surface-variant">Unified inventory management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-on-surface-variant">Centralized accounting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-on-surface-variant">Branch-wise MIS reports</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-heading-sm font-bold text-on-background mb-4">
                For Remote Teams
              </h3>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Work from home, field offices, or while traveling. Your accounting data is always accessible. 
                No VPN setup required. Simple, secure, and intuitive.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-on-surface-variant">Mobile-friendly interface</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-on-surface-variant">No desktop required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-on-surface-variant">Role-based access control</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Pricing & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-surface-dim rounded-lg p-12 border-2 border-primary"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-4">
            Ready to Move Your Business to the Cloud?
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Busy on Cloud is included with Busy Standard and Enterprise editions. 
            Starting from Rs. 25,000 with 1 year free support and updates.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Call for Demo: {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-6">
            Available Monday to Friday, 10 AM to 6 PM
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BusyOnCloudPage;
