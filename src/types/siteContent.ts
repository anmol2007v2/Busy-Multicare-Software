export type NavLinkItem = {
  name: string;
  path: string;
  visible: boolean;
  order: number;
};

export type HeroStat = { value: string; label: string };

export type FeatureItem = { icon: string; title: string; description: string };

export type TestimonialItem = {
  initials: string;
  name: string;
  company: string;
  quote: string;
  featured?: boolean;
};

export type FaqItem = { q: string; a: string };

export type FooterLink = { label: string; path: string };

export type SeoArticle = { title: string; body: string };

export type HomeSiteContent = {
  navbar: { links: NavLinkItem[] };
  hero: {
    badge: string;
    titleHighlight: string;
    titleRest: string;
    subtitle: string;
    phoneLabel: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    stats: HeroStat[];
  };
  ticker: { items: string[] };
  trustedBy: { label: string; logos: string[] };
  features: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  pricing: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    annualLabel: string;
    monthlyLabel: string;
  };
  showcase: {
    title: string;
    description: string;
    bullets: string[];
    ctaLabel: string;
    image1: string;
    image2: string;
  };
  awardsSection: {
    title: string;
    subtitle: string;
    linkLabel: string;
  };
  exhibitions: {
    title: string;
    images: { src: string; alt: string; caption?: string }[];
  };
  leadership: {
    title: string;
    description: string;
    image: string;
    leaders: { name: string; role: string }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  seoContent: { articles: SeoArticle[] };
  faq: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: FaqItem[];
  };
  footer: {
    tagline: string;
    solutionsTitle: string;
    solutionsLinks: FooterLink[];
    companyTitle: string;
    companyLinks: FooterLink[];
    legalTitle: string;
    legalLinks: FooterLink[];
    copyright: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    trustPoints: string[];
    formTitle: string;
    formSubtitle: string;
  };
};

export type GlobalSiteContent = {
  phoneDisplay: string;
  phoneRaw: string;
  email: string;
  emailAlt: string;
  address: string;
  workingHours: string;
  whatsappNumber: string;
  social: { facebook: string; youtube: string; linkedin: string };
};

export type SiteContentRow = {
  id: string;
  content: HomeSiteContent | GlobalSiteContent;
  updated_at?: string;
};
