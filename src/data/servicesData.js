import { defaultSiteContent } from '../content/seedData';

// Dynamic getter to support runtime content updates
const getServices = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem('wegro_db_site_content.json');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.services?.services) return parsed.services.services;
      }
    } catch (e) {}
  }
  return defaultSiteContent.services.services;
};

export const servicesData = defaultSiteContent.services.services;
