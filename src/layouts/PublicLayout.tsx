import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import SkipNav from '../components/SkipNav';


export default function PublicLayout() {
  return (
    <>
      <SkipNav />
      <Navbar />
      <main id="main" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />

    </>
  );
}
