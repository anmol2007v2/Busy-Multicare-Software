import { useSiteContent } from '../hooks/useSiteContent';

const Exhibitions = () => {
  const { home } = useSiteContent();
  const e = home.exhibitions;
  const [main, wide, a, b] = e.images;

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface" id="exhibitions">
      <div className="max-w-container-max mx-auto">
        <h2 className="text-headline-lg text-on-background mb-12 text-center">{e.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {main && (
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg">
              <img alt={main.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={main.src} />
              {main.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-surface-bright text-headline-sm">{main.caption}</p>
                </div>
              )}
            </div>
          )}
          {wide && (
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl shadow-lg">
              <img alt={wide.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={wide.src} />
            </div>
          )}
          {a && (
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img alt={a.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={a.src} />
            </div>
          )}
          {b && (
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img alt={b.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={b.src} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;
