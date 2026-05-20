import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronRight,
  Home,
  Package,
  Trophy,
  Users,
  Newspaper,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import Logo from './Logo';
import { handleInquiry } from '../utils/whatsapp';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Awards', path: '/awards', icon: Trophy },
  { name: 'About Us', path: '/about', icon: Users },
  { name: 'Blog', path: '/blog', icon: Newspaper },
  { name: 'Support', path: '/contact', icon: Headphones },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const mobileMenu = (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-on-background/60 backdrop-blur-md z-[200] md:hidden"
            aria-hidden="true"
          />
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[min(100vw,20rem)] bg-white z-[201] md:hidden flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.12)]"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            {/* Header */}
            <motion.div className="flex items-center justify-between px-5 py-4 border-b border-surface-container shrink-0">
              <Link to="/" onClick={closeMenu} className="flex items-center">
                <Logo variant="nav" />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </motion.div>

            {/* Links — scrollable */}
            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
              <p className="text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider px-3 mb-3">
                Menu
              </p>
              <ul className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 min-h-[52px] px-4 py-3 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                            : 'text-on-background hover:bg-surface-container-low active:bg-surface-container'
                        }`}
                      >
                        <span
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-white/20' : 'bg-primary/10 text-primary'
                          }`}
                        >
                          <Icon size={20} />
                        </span>
                        <span className="font-semibold text-label-md flex-1">{link.name}</span>
                        <ChevronRight
                          size={18}
                          className={isActive ? 'opacity-100' : 'opacity-30'}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA */}
            <div
              className="shrink-0 p-5 border-t border-surface-container bg-surface-container-low/50"
              style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
            >
              <button
                type="button"
                onClick={() => { closeMenu(); handleInquiry('Free Demo'); }}
                className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary py-4 rounded-2xl font-bold shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform cursor-pointer"
              >
                Get Free Demo
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link to="/" className="hover:scale-105 transition-transform flex items-center">
          <Logo variant="nav" />
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-label-md px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-on-surface-variant hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button type="button" onClick={() => handleInquiry('Free Demo')} className="bg-primary text-on-primary px-5 py-2 rounded-full text-label-md font-semibold shadow-md cursor-pointer">Get Free Demo</button>
        </div>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="p-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(mobileMenu, document.body)}
    </nav>
  );
};

export default Navbar;
