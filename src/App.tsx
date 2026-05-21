import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import AwardsPage from './pages/AwardsPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsPage from './pages/legal/TermsPage';
import RefundPolicyPage from './pages/legal/RefundPolicyPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './admin/layout/AdminLayout';
import AdminOverview from './admin/pages/AdminOverview';
import BlogManager from './admin/components/BlogManager';
import AwardsManager from './admin/components/AwardsManager';
import ProductManager from './admin/components/ProductManager';
import SiteContentManager from './admin/components/SiteContentManager';
import SettingsManager from './admin/components/SettingsManager';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface selection:bg-primary/20 selection:text-primary flex flex-col">
        <Routes>
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="awards" element={<AwardsManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="site" element={<SiteContentManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
