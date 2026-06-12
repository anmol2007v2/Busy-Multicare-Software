import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL, WORKING_HOURS } from '../config/site';

const TRAINING_PROGRAMS = [
  {
    title: 'Busy Basic Training',
    duration: '2-3 Days',
    mode: ['Online', 'Onsite'],
    includes: [
      'Software installation & setup',
      'Company & cost center configuration',
      'Voucher entry & daily operations',
      'Month-end closing procedures',
      'Basic reporting',
      'Troubleshooting common issues'
    ]
  },
  {
    title: 'Busy Standard Training',
    duration: '5-7 Days',
    mode: ['Online', 'Onsite'],
    includes: [
      'All Basic Training modules',
      'Advanced inventory management',
      'Multi-location sync',
      'Payroll processing',
      'GST/VAT compliance',
      'POS integration',
      'Month-end & year-end closing',
      'MIS reports & analytics'
    ]
  },
  {
    title: 'Busy Enterprise Training',
    duration: 'Customized (1-3 Weeks)',
    mode: ['Onsite', 'Mixed'],
    includes: [
      'All Standard Training modules',
      'Manufacturing module setup',
      'Advanced multi-location operations',
      'Custom report creation',
      'Database management',
      'Security & access control',
      'Power-user & admin training',
      'Ongoing support plan'
    ]
  }
];

const TRAINING_FEATURES = [
  {
    icon: Users,
    title: 'Expert Trainers',
    description: 'Learn from certified Busy experts with 20+ years of accounting software experience.'
  },
  {
    icon: MapPin,
    title: 'Flexible Delivery',
    description: 'Online training via Zoom or onsite training at your office in Kathmandu.'
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Receive a training completion certificate for all participants.'
  },
  {
    icon: Clock,
    title: 'Post-Training Support',
    description: '30 days of free support after training completion for all questions.'
  }
];

const TrainingPage = () => {
  useSEO({
    title: 'Busy Software Training Nepal – Kathmandu Office | Busy Multicare',
    description: 'Professional Busy accounting software training in Kathmandu. Online & onsite training for Basic, Standard & Enterprise. 20+ years experience. +977-9851125905.',
    canonical: `${SITE_URL}/training`,
    keywords: 'busy software training nepal, busy software training kathmandu, busy training course, busy software tutorial',
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
            Skill Development
          </span>
          <h1 className="text-display-hero text-on-background mb-6">
            Busy Software Training in Nepal
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Master Busy Accounting Software with our comprehensive training programs. 
            Learn from experts with over 20 years of experience in Nepal.
          </p>
        </motion.div>

        {/* Training Programs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TRAINING_PROGRAMS.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg p-8 bg-surface-dim border-2 border-outline hover:border-primary/50 transition-all"
            >
              <h3 className="text-heading-md font-bold text-on-background mb-2">{program.title}</h3>
              <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
                <Clock className="w-4 h-4" />
                <span>{program.duration}</span>
              </div>
              <div className="flex gap-2 mb-6">
                {program.mode.map((m) => (
                  <span key={m} className="text-label-sm font-semibold px-3 py-1 bg-primary/20 text-primary rounded-full">
                    {m}
                  </span>
                ))}
              </div>
              <h4 className="text-body-sm font-bold text-on-background mb-3">Includes:</h4>
              <ul className="space-y-2">
                {program.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-body-xs text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Why Train with Busy Multicare */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 rounded-lg p-8 md:p-12 mb-20"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-8 text-center">
            Why Train with Busy Multicare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRAINING_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-heading-sm font-bold text-on-background mb-2">{feature.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Training Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-12 text-center">
            Our Training Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
            {[
              { step: 1, title: 'Assessment', desc: 'Understand your team\'s experience level' },
              { step: 2, title: 'Customization', desc: 'Tailor content to your business needs' },
              { step: 3, title: 'Training', desc: 'Hands-on sessions with expert trainers' },
              { step: 4, title: 'Support', desc: '30 days post-training assistance' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center font-bold text-heading-sm mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-on-background mb-2">{item.title}</h4>
                <p className="text-body-xs text-on-surface-variant">{item.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-12 text-center">
            What Our Trainees Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-dim rounded-lg p-8 border-l-4 border-primary">
              <p className="text-body-sm text-on-surface-variant mb-4">
                "The training was comprehensive and practical. Our entire team could follow along easily. 
                The trainers were patient and answered all our questions thoroughly."
              </p>
              <p className="font-bold text-on-background">– Rajesh Pant, ABC Trading Pvt. Ltd.</p>
            </div>
            <div className="bg-surface-dim rounded-lg p-8 border-l-4 border-primary">
              <p className="text-body-sm text-on-surface-variant mb-4">
                "After 15 years with manual systems, switching to Busy was easy thanks to the training. 
                We've cut our accounting time by 60%."
              </p>
              <p className="font-bold text-on-background">– Priya Sharma, Nepal Retail Group</p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-primary/10 rounded-lg p-12 border-2 border-primary"
        >
          <h2 className="text-heading-lg font-bold text-on-background mb-4">
            Ready to Empower Your Team?
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Schedule your customized training session today. We'll work with your schedule.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <BookOpen className="w-5 h-5" />
              Schedule Training: {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Available: {WORKING_HOURS}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainingPage;
