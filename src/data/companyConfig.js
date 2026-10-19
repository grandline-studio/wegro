export const companyConfig = {
  name: "WeGro",
  legalName: "WeGro Research Analysts Private Limited",
  tagline: "Where independent research meets disciplined capital — built for investors who value data over speculation.",
  heroHeadline: "Your search ends with our research!",
  heroSubheadline: "In-depth market research and analysis to help you make more informed business decisions.",
  
  // Regulatory Credentials
  bseMembershipNumber: "5422",
  sebiRegistrationNumber: "INH000008093",
  cinNumber: "U72900MH2020PTC346236",
  
  offices: {
    registeredOffice: {
      title: "Registered Office",
      address: "B-204, 2nd Floor, Universal Business Park, Chandivali Farm Road, Off Saki Vihar Road, Andheri (East), Mumbai, Maharashtra – 400072, India."
    },
    principalPlace: {
      title: "Principal Place of Business",
      address: "No. 42, 3rd Floor, 100 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka – 560034, India."
    }
  },

  contact: {
    email: "support@wegro.in",
    phone: "+91 80 4718 5555 / +91 98200 12345",
    supportHours: "Monday – Friday: 8:30 AM – 5:30 PM IST (Trading Days)"
  },

  officialPortals: {
    sebiScores: "https://scores.sebi.gov.in",
    sebiScoresApp: "https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN",
    smartOdr: "https://smartodr.in/login",
    odrCircular: "https://www.sebi.gov.in/legal/circulars/jul-2023/online-resolution-of-disputes-in-the-indian-securities-market_74574.html"
  },

  riskDisclosure: "Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Futures & Options and Commodity trading involve substantial leverage risk.",

  navigation: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Pricing", path: "/pricing" },
    { label: "Complaint Board", path: "/complaints" }
  ],

  importantLinks: [
    { label: "Disclaimer", path: "/disclosures" },
    { label: "Disclosure", path: "/disclosures" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Service Delivery Policy", path: "/service-delivery" },
    { label: "Refund & cancellation policy", path: "/refund-cancellation" },
    { label: "Risk with short term investments", path: "/disclosures" },
    { label: "Investor Charter", path: "/investor-charter" },
    { label: "ODR Link", path: "/odr" },
    { label: "ODR Circular Link", path: "https://www.sebi.gov.in/legal/circulars/jul-2023/online-resolution-of-disputes-in-the-indian-securities-market_74574.html", isExternal: true },
    { label: "SEBI Scores App Link", path: "https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN", isExternal: true },
    { label: "SEBI Scores Website Link", path: "https://scores.sebi.gov.in", isExternal: true }
  ]
};
