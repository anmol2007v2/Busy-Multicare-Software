export const BLOG_CATEGORIES = ["Founder's Story", 'Team Story', 'Software Updates'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_FILTER_CATEGORIES = ['All', ...BLOG_CATEGORIES] as const;

export const DEFAULT_BLOG_CATEGORY: BlogCategory = "Founder's Story";
