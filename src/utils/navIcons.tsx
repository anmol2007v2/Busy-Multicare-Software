import { Home, Package, Trophy, Users, Newspaper, Headphones, type LucideIcon } from 'lucide-react';

const ICON_BY_PATH: Record<string, LucideIcon> = {
  '/': Home,
  '/products': Package,
  '/awards': Trophy,
  '/about': Users,
  '/blog': Newspaper,
  '/contact': Headphones,
};

export function navIconForPath(path: string): LucideIcon {
  return ICON_BY_PATH[path] ?? Home;
}
