import { defaultSiteContent } from '../content/seedData';

// Dynamic getter to support runtime content updates
const getPolicies = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem('wegro_db_site_content.json');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.policies) return parsed.policies;
      }
    } catch (e) {}
  }
  return defaultSiteContent.policies;
};

export const legalPagesData = defaultSiteContent.policies;
