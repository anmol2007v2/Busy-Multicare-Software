import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../config/supabase';
import { DEFAULT_GLOBAL_CONTENT, DEFAULT_HOME_CONTENT, mergeGlobalContent, mergeHomeContent } from '../data/defaultSiteContent';
import type { GlobalSiteContent, HomeSiteContent } from '../types/siteContent';

type SiteContentContextValue = {
  home: HomeSiteContent;
  global: GlobalSiteContent;
  loading: boolean;
  refresh: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue>({
  home: DEFAULT_HOME_CONTENT,
  global: DEFAULT_GLOBAL_CONTENT,
  loading: true,
  refresh: () => {},
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [home, setHome] = useState<HomeSiteContent>(DEFAULT_HOME_CONTENT);
  const [global, setGlobal] = useState<GlobalSiteContent>(DEFAULT_GLOBAL_CONTENT);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [homeRes, globalRes] = await Promise.all([
      supabase.from('site_content').select('content').eq('id', 'home').maybeSingle(),
      supabase.from('site_content').select('content').eq('id', 'global').maybeSingle(),
    ]);
    if (!homeRes.error && homeRes.data?.content) {
      setHome(mergeHomeContent(homeRes.data.content as Partial<HomeSiteContent>));
    }
    if (!globalRes.error && globalRes.data?.content) {
      setGlobal(mergeGlobalContent(globalRes.data.content as Partial<GlobalSiteContent>));
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SiteContentContext.Provider value={{ home, global, loading, refresh: load }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
