import { defaultSiteContent } from '../content/seedData';

// Dynamic getter to support runtime content updates
const getGlobalContent = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem('wegro_db_site_content.json');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.global) return parsed.global;
      }
    } catch (e) {}
  }
  return defaultSiteContent.global;
};

const g = defaultSiteContent.global;

export const companyConfig = {
  name: g.brandName,
  brandName: g.brandName,
  legalName: g.legalName,
  tagline: g.tagline,
  heroHeadline: defaultSiteContent.home.hero.headline,
  heroSubheadline: defaultSiteContent.home.hero.subheadline,
  
  // Regulatory Credentials
  bseMembershipNumber: g.bseMembershipNumber,
  sebiRegistrationNumber: g.sebiRegistrationNumber,
  cinNumber: g.cinNumber,
  
  offices: g.offices,

  registeredOffice: {
    addressLine1: "B-204, 2nd Floor, Universal Business Park",
    addressLine2: "Chandivali Farm Road, Off Saki Vihar Road, Andheri (East), Mumbai – 400072",
    note: "SEBI RA Corporate Compliance & Redressal Desk",
    fullAddress: g.offices.registeredOffice.address
  },

  principalPlace: {
    addressLine1: "No. 42, 3rd Floor, 100 Feet Road",
    addressLine2: "4th Block, Koramangala, Bengaluru – 560034",
    fullAddress: g.offices.principalPlace.address
  },

  contact: {
    ...g.contact,
    primaryEmail: g.contact.email
  },

  complianceOfficer: g.complianceOfficer,
  regulatoryStatus: g.regulatoryStatus,
  officialPortals: g.officialPortals,
  riskDisclosure: g.riskWarning,
  navigation: g.navigation,
  importantLinks: g.importantLinks
};
