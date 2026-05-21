import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useSiteContent } from '../hooks/useSiteContent';
import type { Award } from '../admin/components/AwardsManager';

const DEFAULT_AWARDS: Award[] = [
  { id: 1, title: 'Overseas Runnerup', year: '2019-20', image: '/image/achie 1.svg' },
  { id: 2, title: 'No. 1 Partner Award', year: '', image: '/image/achievement 1.svg' },
  { id: 3, title: 'Excellence in Service', year: '', image: '/image/owner achievement 1.svg' },
];

const Awards = () => {
  const { home } = useSiteContent();
  const sec = home.awardsSection;
  const [awards, setAwards] = useState<Award[]>(DEFAULT_AWARDS);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('awards').select('*').order('sort_order', { ascending: true });
      if (!error && data?.length) setAwards(data);
    })();
  }, []);

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="awards">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-headline-lg text-on-background mb-4">{sec.title}</h2>
            <p className="text-body-lg text-on-surface-variant">{sec.subtitle}</p>
          </div>
          <Link to="/awards" className="text-primary font-semibold text-label-md hover:underline">{sec.linkLabel}</Link>
        </div>
        {awards.length === 0 ? (
          <p className="text-center text-on-surface-variant py-12">Awards coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award) => {
              const imageSrc = award.images?.[0] || award.image;
              return (
                <motion.button
                  key={award.id}
                  type="button"
                  whileHover={{ y: -10 }}
                  onClick={() => imageSrc && setLightbox(imageSrc)}
                  className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all text-left cursor-pointer"
                >
                  {imageSrc && <img alt={award.title} className="w-full h-64 object-cover rounded-xl mb-4" src={imageSrc} loading="lazy" />}
                  <h4 className="text-headline-sm text-on-background">{award.title}</h4>
                  {award.year && <p className="text-label-md text-primary font-bold">{award.year}</p>}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-on-background/80 flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Award" className="max-h-[90vh] max-w-full rounded-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default Awards;
