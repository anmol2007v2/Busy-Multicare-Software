import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { handleInquiry } from '../utils/whatsapp';
import Logo from '../components/Logo';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    noIndex: true,
  });

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <Logo variant="nav" />
      <p className="mt-8 text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-headline-lg text-on-background">Page not found</h1>
      <p className="mt-2 text-body-lg text-on-surface-variant max-w-md">
        माफ गर्नुहोस् — यो पृष्ठ भेटिएन। / Sorry, this page does not exist.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link to="/" className="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition">
          Go to Home
        </Link>
        <button
          type="button"
          onClick={() => handleInquiry()}
          className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition"
        >
          Chat on WhatsApp
        </button>
      </div>
    </div>
  );
}
