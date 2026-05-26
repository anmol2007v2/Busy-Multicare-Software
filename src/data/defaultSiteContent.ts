import type { GlobalSiteContent, HomeSiteContent } from '../types/siteContent';

export const DEFAULT_HOME_CONTENT: HomeSiteContent = {
  navbar: {
    links: [
      { name: 'Home', path: '/', visible: true, order: 0 },
      { name: 'Products', path: '/products', visible: true, order: 1 },
      { name: 'Awards', path: '/awards', visible: true, order: 2 },
      { name: 'About Us', path: '/about', visible: true, order: 3 },
      { name: 'Blog', path: '/blog', visible: true, order: 4 },
      { name: 'Support', path: '/support', visible: true, order: 5 },
    ],
  },
  hero: {
    badge: 'Official Busy Partner Nepal',
    titleHighlight: 'Busy Accounting Software',
    titleRest: ' Nepal - Official Dealer in Kathmandu',
    subtitle:
      'Empowering 10,000+ businesses with IRD-approved accounting, VAT billing, inventory & cloud solutions.',
    phoneLabel: 'Call / WhatsApp:',
    ctaPrimary: 'Get Free Demo',
    ctaSecondary: 'Watch Demo Video',
    image: '/image/a 1.svg',
    stats: [
      { value: '10k+', label: 'Businesses' },
      { value: '15+ Yrs', label: 'Experience' },
      { value: 'IRD', label: 'Approved' },
    ],
  },
  ticker: {
    items: [
      'VAT COMPLIANT SOFTWARE',
      '100,000+ INSTALLATIONS',
      "NEPAL'S NO. 1 BUSINESS SOLUTION",
      'OFFICIAL BUSY PARTNER',
      '20+ YEARS OF EXCELLENCE',
      'IRD APPROVED BILLING',
      '24/7 TECHNICAL SUPPORT',
    ],
  },
  trustedBy: {
    label: 'Global Standards, Local Expertise',
    logos: ['VAT COMPLIANT', 'IRD NEPAL', 'BUSY 21', 'ISO CERTIFIED'],
  },
  features: {
    title: 'Complete Business Control',
    subtitle:
      'One software to manage everything from inventory and VAT to payroll and multi-branch operations.',
    items: [
      { icon: 'account_balance', title: 'Core Accounting', description: "General ledger, multi-currency support, and real-time financial reporting tailored for Nepal's market." },
      { icon: 'inventory_2', title: 'Smart Inventory', description: 'Batch-wise inventory, expiry tracking, and multi-location management with barcode integration.' },
      { icon: 'description', title: 'VAT & Compliance', description: 'IRD-approved VAT reports, automatic tax calculations, and electronic filing support.' },
      { icon: 'cloud_done', title: 'Cloud Accounting', description: 'Access your data anywhere, anytime. Secure cloud backups and mobile sync functionality.' },
      { icon: 'point_of_sale', title: 'Advanced POS', description: 'High-speed retail billing, touch-screen support, and integrated loyalty programs.' },
      { icon: 'groups', title: 'HR & Payroll', description: 'Complete employee management, attendance tracking, and automated salary slip generation.' },
    ],
  },
  pricing: {
    title: 'Busy Software',
    titleHighlight: 'Pricing Nepal',
    subtitle: 'Official dealer pricing. Prices are VAT exclusive.',
    annualLabel: 'Annual',
    monthlyLabel: 'Monthly',
  },
  showcase: {
    title: 'Experience the Future with BUSY 21',
    description:
      'Our latest release brings unprecedented power to your hands. With advanced features like HO BO Management, Auto Sync in Mobile, and Barcode Reading, managing your business has never been easier.',
    bullets: [
      'Real-time Audit Logs for maximum security',
      'Integrated Mobile App for data viewing on-the-go',
      'Seamless multi-branch data synchronization',
    ],
    ctaLabel: 'Learn More About BUSY 21',
    image1: '/image/busy 21 1.svg',
    image2: '/image/cloud services 1.svg',
  },
  awardsSection: {
    title: 'Recognized Excellence',
    subtitle: "International recognition as Nepal's leading Busy software partner.",
    linkLabel: 'View all awards →',
  },
  exhibitions: {
    title: 'At the Forefront of Innovation',
    images: [
      { src: '/image/aa 1.svg', alt: 'Large Exhibition Booth', caption: 'CAN Info-Tech Major Presence' },
      { src: '/image/aa 2.svg', alt: 'Award Ceremony' },
      { src: '/image/ac 1.svg', alt: 'Team Collaboration' },
      { src: '/image/ac 2.svg', alt: 'Exhibition View' },
    ],
  },
  leadership: {
    title: 'Our Leadership & Vision',
    description:
      'Under the visionary leadership of our executive team, Busy Multi Care has grown to become the standard for business automation in Nepal. We combine deep local market understanding with global software expertise.',
    image: '/image/owner achievement 1.svg',
    leaders: [
      { name: 'Ashish Tamang', role: 'Strategic Operations' },
      { name: 'Rojina Tandukar', role: 'Business Development' },
      { name: 'Manish Shrestha', role: 'Technical Support Head' },
      { name: 'Anisha Thapa', role: 'Customer Relations' },
    ],
  },
  testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Real experiences from business owners who transformed their operations with Busy.',
    items: [
      { initials: 'RK', name: 'Rajesh Khatri', company: 'Retail Solutions Pvt. Ltd.', quote: 'Busy has completely revolutionized how we handle our multi-branch inventory. The VAT compliance is a lifesaver.' },
      { initials: 'SB', name: 'Suman Baral', company: 'Baral Enterprises', quote: 'The best decision we made for our business. Support from Busy Multi Care is exceptional and always there when needed.', featured: true },
      { initials: 'NT', name: 'Nirmala Thapa', company: 'Grace Boutique', quote: 'Transitioning to the cloud was seamless. I can now manage my shop in Pokhara while sitting in Kathmandu.' },
    ],
  },
  seoContent: {
    articles: [],
  },
  faq: {
    title: 'Frequently Asked',
    titleHighlight: 'Questions',
    subtitle: 'Everything you need to know about Busy accounting software in Nepal',
    items: [
      { q: 'What is the price of Busy accounting software in Nepal?', a: 'Busy accounting software prices in Nepal start from NPR 12,000 per year for Busy Basic. Contact us for the latest pricing.' },
      { q: 'Where can I buy Busy software in Kathmandu?', a: 'Busy Multicare Software Pvt. Ltd. is an authorized Busy software dealer in Kathmandu, Nepal.' },
      { q: "Does Busy accounting software support Nepal VAT and tax formats?", a: "Yes, Busy software is fully compatible with Nepal's VAT system, IRD requirements, and Nepali fiscal year (Bikram Sambat)." },
      { q: 'Is there a free demo of Busy software available?', a: 'Yes! We offer a free demo of all Busy software products. WhatsApp us to schedule your free demo today.' },
      { q: 'What support is provided after buying Busy software?', a: 'We provide installation support, staff training, annual maintenance, and ongoing WhatsApp/phone support. Sunday–Friday, 10 AM–6 PM.' },
    ],
  },
  footer: {
    tagline: "Nepal's authorized Busy Accounting Software dealer for over two decades.",
    solutionsTitle: 'Solutions',
    solutionsLinks: [
      { label: 'Busy Products & Prices', path: '/products' },
      { label: 'Pricing', path: '/#pricing' },
      { label: 'Awards', path: '/awards' },
    ],
    companyTitle: 'Company',
    companyLinks: [
      { label: 'About Us', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact Us', path: '/contact' },
    ],
    legalTitle: 'Legal',
    legalLinks: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Refund Policy', path: '/refund-policy' },
    ],
    copyright: "Nepal's No. 1 Busy Accounting Solution. All rights reserved.",
  },
  contact: {
    eyebrow: 'Contact Us',
    title: 'Get In',
    titleHighlight: 'Touch',
    subtitle: 'Tell us about your business. Our team will recommend the right Busy solution and guide you through setup.',
    trustPoints: ['Free consultation', 'Response within 24 hours', 'IRD-approved solutions'],
    formTitle: 'Send an inquiry',
    formSubtitle: "We'll get back to you shortly",
  },
};

export const DEFAULT_GLOBAL_CONTENT: GlobalSiteContent = {
  phoneDisplay: '+977-9851125905',
  phoneRaw: '9851125905',
  email: 'info@busymulticare.com',
  emailAlt: 'busyedu@gmail.com',
  address: 'Putalisadak, Kathmandu, Nepal',
  workingHours: 'SUN TO FRI 10AM TO 7PM',
  whatsappNumber: '9779851125905',
  social: {
    facebook: 'https://www.facebook.com/p/Busy-Multi-Care-Pvt-Ltd-100063584352392/',
    youtube: 'https://www.youtube.com/@busymulticare',
    linkedin: 'https://www.linkedin.com/company/busymulticare',
  },
};

export function mergeHomeContent(partial: Partial<HomeSiteContent> | null | undefined): HomeSiteContent {
  if (!partial) return DEFAULT_HOME_CONTENT;
  return {
    ...DEFAULT_HOME_CONTENT,
    ...partial,
    navbar: { ...DEFAULT_HOME_CONTENT.navbar, ...partial.navbar, links: partial.navbar?.links?.length ? partial.navbar.links : DEFAULT_HOME_CONTENT.navbar.links },
    hero: { ...DEFAULT_HOME_CONTENT.hero, ...partial.hero, stats: partial.hero?.stats?.length ? partial.hero.stats : DEFAULT_HOME_CONTENT.hero.stats },
    ticker: { items: partial.ticker?.items?.length ? partial.ticker.items : DEFAULT_HOME_CONTENT.ticker.items },
    trustedBy: { ...DEFAULT_HOME_CONTENT.trustedBy, ...partial.trustedBy, logos: partial.trustedBy?.logos?.length ? partial.trustedBy.logos : DEFAULT_HOME_CONTENT.trustedBy.logos },
    features: { ...DEFAULT_HOME_CONTENT.features, ...partial.features, items: partial.features?.items?.length ? partial.features.items : DEFAULT_HOME_CONTENT.features.items },
    pricing: { ...DEFAULT_HOME_CONTENT.pricing, ...partial.pricing },
    showcase: { ...DEFAULT_HOME_CONTENT.showcase, ...partial.showcase, bullets: partial.showcase?.bullets?.length ? partial.showcase.bullets : DEFAULT_HOME_CONTENT.showcase.bullets },
    awardsSection: { ...DEFAULT_HOME_CONTENT.awardsSection, ...partial.awardsSection },
    exhibitions: { ...DEFAULT_HOME_CONTENT.exhibitions, ...partial.exhibitions, images: partial.exhibitions?.images?.length ? partial.exhibitions.images : DEFAULT_HOME_CONTENT.exhibitions.images },
    leadership: { ...DEFAULT_HOME_CONTENT.leadership, ...partial.leadership, leaders: partial.leadership?.leaders?.length ? partial.leadership.leaders : DEFAULT_HOME_CONTENT.leadership.leaders },
    testimonials: { ...DEFAULT_HOME_CONTENT.testimonials, ...partial.testimonials, items: partial.testimonials?.items?.length ? partial.testimonials.items : DEFAULT_HOME_CONTENT.testimonials.items },
    faq: { ...DEFAULT_HOME_CONTENT.faq, ...partial.faq, items: partial.faq?.items?.length ? partial.faq.items : DEFAULT_HOME_CONTENT.faq.items },
    footer: {
      ...DEFAULT_HOME_CONTENT.footer,
      ...partial.footer,
      solutionsLinks: partial.footer?.solutionsLinks?.length ? partial.footer.solutionsLinks : DEFAULT_HOME_CONTENT.footer.solutionsLinks,
      companyLinks: partial.footer?.companyLinks?.length ? partial.footer.companyLinks : DEFAULT_HOME_CONTENT.footer.companyLinks,
      legalLinks: partial.footer?.legalLinks?.length ? partial.footer.legalLinks : DEFAULT_HOME_CONTENT.footer.legalLinks,
    },
    contact: { ...DEFAULT_HOME_CONTENT.contact, ...partial.contact, trustPoints: partial.contact?.trustPoints?.length ? partial.contact.trustPoints : DEFAULT_HOME_CONTENT.contact.trustPoints },
  };
}

export function mergeGlobalContent(partial: Partial<GlobalSiteContent> | null | undefined): GlobalSiteContent {
  if (!partial) return DEFAULT_GLOBAL_CONTENT;
  return {
    ...DEFAULT_GLOBAL_CONTENT,
    ...partial,
    social: { ...DEFAULT_GLOBAL_CONTENT.social, ...partial.social },
  };
}

