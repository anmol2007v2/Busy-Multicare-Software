import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_NAME } from '../config/site';
import { useSiteContent } from '../hooks/useSiteContent';
import { inquiryMessage, whatsappUrl } from '../utils/whatsapp';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();
  const { home, global } = useSiteContent();
  const f = home.footer;
  const waLink = whatsappUrl(inquiryMessage());

  return (
    <footer className="bg-on-background text-surface-bright pt-section-padding pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto border-b border-white/10 pb-12">
        <div className="col-span-1">
          <div className="mb-6">
            <Logo variant="footer" />
          </div>
          <p className="opacity-70 mb-4 max-w-xs">{f.tagline}</p>
          <p className="opacity-70 text-label-sm mb-6">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary font-semibold">
              WhatsApp: {global.phoneDisplay}
            </a>
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href={global.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-label-sm font-bold" href={global.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-label-sm font-bold" href={global.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href={`mailto:${global.email}`} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-white">{f.solutionsTitle}</h5>
          <ul className="space-y-4 opacity-70">
            {f.solutionsLinks.map((link) => (
              <li key={link.path}><Link className="hover:text-primary transition-colors" to={link.path}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-white">{f.companyTitle}</h5>
          <ul className="space-y-4 opacity-70">
            {f.companyLinks.map((link) => (
              <li key={link.path}><Link className="hover:text-primary transition-colors" to={link.path}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-white">{f.legalTitle}</h5>
          <ul className="space-y-4 opacity-70">
            {f.legalLinks.map((link) => (
              <li key={link.path}><Link className="hover:text-primary transition-colors" to={link.path}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop py-8 text-center text-label-sm opacity-50">
        © {year} {COMPANY_NAME}. {f.copyright}
      </div>
    </footer>
  );
};

export default Footer;
