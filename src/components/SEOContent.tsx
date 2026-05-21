import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';

export default function SEOContent() {
  const { home } = useSiteContent();

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
