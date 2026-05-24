import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateWebPageSchema, generateBreadcrumbSchema } from '../seo-utils';

// Helper to inject JSON-LD script into head
function injectSchema(id: string, data: object) {
  const scriptId = `schema-${id}`;
  let el = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = scriptId;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
import { useSiteContent } from '../hooks/useSiteContent';

export default function SEOContent() {
  const { home } = useSiteContent();

  const { pathname } = useLocation();

  useEffect(() => {
    // WebPage schema
    const webPage = generateWebPageSchema({
      name: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      url: window.location.href,
    });
    injectSchema('webpage', webPage);

    // Breadcrumb schema
    const breadcrumbs = [{ name: 'Home', position: 1, url: window.location.origin }];
    if (pathname !== '/') {
      breadcrumbs.push({ name: pathname.replace('/', '').toUpperCase(), position: 2, url: window.location.href });
    }
    injectSchema('breadcrumb', generateBreadcrumbSchema(breadcrumbs));

    // FAQ schema (static example)
    const FAQ_ITEMS = [
      { question: 'What is Busy Multicare Software?', answer: 'Busy Multicare Software is a comprehensive practice management, accounting, and ERP solution for healthcare clinics in Nepal.' },
      { question: 'Does it work on Windows?', answer: 'Yes – it runs on Windows 10, 11 and Windows Server.' },
    ];
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    };
    injectSchema('faq', faqSchema);
  }, [pathname]);

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto space-y-16">
        {home.seoContent.articles.map((article) => (
          <article key={article.title}>
            <h2 className="text-headline-md text-on-background mb-4">{article.title}</h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {article.body}
              {article.title.includes('Features') && (
                <>
                  {' '}
                  Explore our{' '}
                  <Link to="/products" className="text-primary font-semibold hover:underline">
                    Busy software products &amp; prices
                  </Link>
                  .
                </>
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
