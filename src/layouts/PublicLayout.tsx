import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import SkipNav from '../components/SkipNav';
import { SiteContentProvider } from '../hooks/useSiteContent';

export default function PublicLayout() {
  return (
    <SiteContentProvider>
      <SkipNav />
      <Navbar />
      <main id="main" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </SiteContentProvider>
  );
}
