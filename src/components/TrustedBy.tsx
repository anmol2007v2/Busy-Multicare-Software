import { useSiteContent } from '../hooks/useSiteContent';

const TrustedBy = () => {
  const { home } = useSiteContent();
  const t = home.trustedBy;

  return (
    <section className="py-12 bg-surface-container-lowest border-y border-surface-container">
      <div className="max-w-container-max mx-auto px-margin-desktop text-center">
        <p className="text-label-sm text-outline mb-8 uppercase tracking-widest">{t.label}</p>
        <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
          {t.logos.map((logo) => (
            <div key={logo} className="text-headline-md grayscale font-bold">{logo}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
