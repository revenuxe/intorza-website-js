// City-specific long-tail keyword strategy for SEO blog content
// Each city has targeted keywords and blog topic suggestions

export interface CityBlogKeyword {
  keyword: string;
  searchVolume: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
  intent: "informational" | "commercial" | "transactional";
}

export interface CityBlogTopic {
  title: string;
  keywords: string[];
  targetUrl: string; // Internal link target
  priority: number; // 1-5, higher = more important
}

export interface CityBlogStrategy {
  citySlug: string;
  cityName: string;
  countryCode: string;
  countryName: string;
  primaryKeywords: CityBlogKeyword[];
  blogTopics: CityBlogTopic[];
  localTerms: string[]; // Local terminology/slang
  competitors: string[]; // Local competitors to reference
}

export const cityBlogStrategies: CityBlogStrategy[] = [
  // New York, USA
  {
    citySlug: "new-york",
    cityName: "New York",
    countryCode: "us",
    countryName: "United States",
    primaryKeywords: [
      { keyword: "interior designer software NYC", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "best quotation software for Manhattan designers", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "interior design project management New York", searchVolume: "medium", difficulty: "medium", intent: "informational" },
      { keyword: "how to price interior design projects NYC", searchVolume: "high", difficulty: "easy", intent: "informational" },
      { keyword: "Brooklyn interior design business software", searchVolume: "low", difficulty: "easy", intent: "commercial" },
      { keyword: "NYC contractor invoice software", searchVolume: "medium", difficulty: "medium", intent: "transactional" },
      { keyword: "Queens interior design client management", searchVolume: "low", difficulty: "easy", intent: "informational" },
    ],
    blogTopics: [
      {
        title: "How NYC Interior Designers Price Projects in 2025: Complete Guide",
        keywords: ["NYC interior design pricing", "Manhattan designer rates", "interior design cost New York"],
        targetUrl: "/us/new-york",
        priority: 5,
      },
      {
        title: "Best Software for Managing Interior Design Projects in Manhattan",
        keywords: ["Manhattan interior design software", "project management NYC designers"],
        targetUrl: "/us/new-york",
        priority: 5,
      },
      {
        title: "How Brooklyn Interior Designers Create Professional Quotations",
        keywords: ["Brooklyn designer quotations", "interior design quotes Brooklyn"],
        targetUrl: "/us/new-york",
        priority: 4,
      },
      {
        title: "Interior Design Client Management Tips for New York Professionals",
        keywords: ["NYC client management", "interior design CRM New York"],
        targetUrl: "/us/new-york",
        priority: 4,
      },
      {
        title: "GST-Free Invoice Guide for US Interior Designers (NYC Focus)",
        keywords: ["interior design invoicing NYC", "designer invoice software USA"],
        targetUrl: "/us/new-york",
        priority: 3,
      },
    ],
    localTerms: ["co-op", "brownstone", "walk-up", "loft", "prewar", "The City", "Tri-State area"],
    competitors: ["Houzz Pro", "Ivy", "Studio Designer"],
  },

  // Los Angeles, USA
  {
    citySlug: "los-angeles",
    cityName: "Los Angeles",
    countryCode: "us",
    countryName: "United States",
    primaryKeywords: [
      { keyword: "interior design software Los Angeles", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "Beverly Hills designer project management", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "Hollywood interior design business tools", searchVolume: "medium", difficulty: "easy", intent: "informational" },
      { keyword: "LA interior designer quotation templates", searchVolume: "medium", difficulty: "easy", intent: "transactional" },
      { keyword: "Santa Monica interior design software", searchVolume: "low", difficulty: "easy", intent: "commercial" },
    ],
    blogTopics: [
      {
        title: "Interior Design Software Every LA Designer Needs in 2025",
        keywords: ["LA interior design software", "Los Angeles designer tools"],
        targetUrl: "/us/los-angeles",
        priority: 5,
      },
      {
        title: "How Beverly Hills Designers Create Luxury Quotations",
        keywords: ["Beverly Hills interior design", "luxury design quotations LA"],
        targetUrl: "/us/los-angeles",
        priority: 5,
      },
      {
        title: "Managing High-End Interior Projects in Hollywood",
        keywords: ["Hollywood interior design", "celebrity home design management"],
        targetUrl: "/us/los-angeles",
        priority: 4,
      },
      {
        title: "Santa Monica Interior Design Business: Complete Guide",
        keywords: ["Santa Monica interior design", "West LA designer business"],
        targetUrl: "/us/los-angeles",
        priority: 3,
      },
    ],
    localTerms: ["mid-century modern", "Spanish revival", "beach house", "hillside home", "SoCal style"],
    competitors: ["Houzz Pro", "Design Manager", "Studio Designer"],
  },

  // London, UK
  {
    citySlug: "london",
    cityName: "London",
    countryCode: "uk",
    countryName: "United Kingdom",
    primaryKeywords: [
      { keyword: "interior design software UK", searchVolume: "high", difficulty: "hard", intent: "commercial" },
      { keyword: "Chelsea interior designer tools", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "London interior design quotation software", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "Mayfair interior design project management", searchVolume: "low", difficulty: "easy", intent: "informational" },
      { keyword: "Kensington designer invoice software", searchVolume: "low", difficulty: "easy", intent: "transactional" },
      { keyword: "VAT invoice software for UK designers", searchVolume: "medium", difficulty: "medium", intent: "transactional" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for London Designers 2025",
        keywords: ["London interior design software", "UK designer tools"],
        targetUrl: "/uk/london",
        priority: 5,
      },
      {
        title: "How Chelsea Interior Designers Create Professional Quotations",
        keywords: ["Chelsea interior design", "luxury design quotes London"],
        targetUrl: "/uk/london",
        priority: 5,
      },
      {
        title: "VAT Invoicing Guide for UK Interior Designers",
        keywords: ["VAT interior design UK", "designer invoice VAT"],
        targetUrl: "/uk/london",
        priority: 4,
      },
      {
        title: "Managing High-End Projects in Mayfair and Kensington",
        keywords: ["Mayfair interior design", "Kensington designer projects"],
        targetUrl: "/uk/london",
        priority: 4,
      },
      {
        title: "Interior Design Business Tips for Notting Hill Professionals",
        keywords: ["Notting Hill interior design", "West London designer business"],
        targetUrl: "/uk/london",
        priority: 3,
      },
    ],
    localTerms: ["townhouse", "mews house", "period property", "listed building", "garden flat", "maisonette"],
    competitors: ["Houzz Pro UK", "Design Manager", "Interior Design Software UK"],
  },

  // Sydney, Australia
  {
    citySlug: "sydney",
    cityName: "Sydney",
    countryCode: "au",
    countryName: "Australia",
    primaryKeywords: [
      { keyword: "interior design software Australia", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "Sydney interior designer tools", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "NSW interior design business software", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "Bondi interior design project management", searchVolume: "low", difficulty: "easy", intent: "informational" },
      { keyword: "GST invoice software Australian designers", searchVolume: "medium", difficulty: "medium", intent: "transactional" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for Sydney Designers 2025",
        keywords: ["Sydney interior design software", "Australian designer tools"],
        targetUrl: "/au/sydney",
        priority: 5,
      },
      {
        title: "How Sydney Interior Designers Create Winning Quotations",
        keywords: ["Sydney design quotations", "NSW interior design quotes"],
        targetUrl: "/au/sydney",
        priority: 5,
      },
      {
        title: "GST Invoicing Guide for Australian Interior Designers",
        keywords: ["GST interior design Australia", "designer invoice GST"],
        targetUrl: "/au/sydney",
        priority: 4,
      },
      {
        title: "Managing Coastal Design Projects in Bondi and Surry Hills",
        keywords: ["Bondi interior design", "Surry Hills designer projects"],
        targetUrl: "/au/sydney",
        priority: 3,
      },
    ],
    localTerms: ["federation style", "coastal modern", "Hamptons style", "beachside", "harbourside"],
    competitors: ["Houzz Pro", "Co-construct", "BuilderTrend"],
  },

  // Dubai, UAE
  {
    citySlug: "dubai",
    cityName: "Dubai",
    countryCode: "ae",
    countryName: "United Arab Emirates",
    primaryKeywords: [
      { keyword: "interior design software Dubai", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "UAE interior designer tools", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "Dubai luxury interior design management", searchVolume: "medium", difficulty: "medium", intent: "informational" },
      { keyword: "Palm Jumeirah interior design software", searchVolume: "low", difficulty: "easy", intent: "commercial" },
      { keyword: "VAT invoice software UAE designers", searchVolume: "medium", difficulty: "easy", intent: "transactional" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for Dubai Designers 2025",
        keywords: ["Dubai interior design software", "UAE designer tools"],
        targetUrl: "/ae/dubai",
        priority: 5,
      },
      {
        title: "How Dubai Interior Designers Create Luxury Quotations",
        keywords: ["Dubai luxury design quotations", "UAE interior design quotes"],
        targetUrl: "/ae/dubai",
        priority: 5,
      },
      {
        title: "VAT Invoicing Guide for UAE Interior Designers",
        keywords: ["VAT interior design UAE", "Dubai designer invoice"],
        targetUrl: "/ae/dubai",
        priority: 4,
      },
      {
        title: "Managing High-End Villa Projects in Dubai",
        keywords: ["Dubai villa interior design", "Palm Jumeirah design projects"],
        targetUrl: "/ae/dubai",
        priority: 4,
      },
    ],
    localTerms: ["villa", "penthouse", "majlis", "Arabic contemporary", "luxury finish"],
    competitors: ["Houzz Pro", "Design Manager", "Morpholio"],
  },

  // Toronto, Canada
  {
    citySlug: "toronto",
    cityName: "Toronto",
    countryCode: "ca",
    countryName: "Canada",
    primaryKeywords: [
      { keyword: "interior design software Canada", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "Toronto interior designer tools", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "GTA interior design business software", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "Yorkville interior design management", searchVolume: "low", difficulty: "easy", intent: "informational" },
      { keyword: "HST invoice software Canadian designers", searchVolume: "medium", difficulty: "medium", intent: "transactional" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for Toronto Designers 2025",
        keywords: ["Toronto interior design software", "Canadian designer tools"],
        targetUrl: "/ca/toronto",
        priority: 5,
      },
      {
        title: "How Toronto Interior Designers Create Professional Quotations",
        keywords: ["Toronto design quotations", "GTA interior design quotes"],
        targetUrl: "/ca/toronto",
        priority: 5,
      },
      {
        title: "HST Invoicing Guide for Canadian Interior Designers",
        keywords: ["HST interior design Canada", "designer invoice HST Ontario"],
        targetUrl: "/ca/toronto",
        priority: 4,
      },
      {
        title: "Managing Condo Design Projects in Downtown Toronto",
        keywords: ["Toronto condo interior design", "Yorkville designer projects"],
        targetUrl: "/ca/toronto",
        priority: 3,
      },
    ],
    localTerms: ["condo", "townhome", "semi-detached", "loft conversion", "heritage home"],
    competitors: ["Houzz Pro", "Co-construct", "BuilderTrend"],
  },

  // Berlin, Germany
  {
    citySlug: "berlin",
    cityName: "Berlin",
    countryCode: "de",
    countryName: "Germany",
    primaryKeywords: [
      { keyword: "Innenarchitektur Software Deutschland", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "Berlin interior design software", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "Angebotssoftware Innenarchitekten", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "Mitte interior design tools", searchVolume: "low", difficulty: "easy", intent: "informational" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for Berlin Designers 2025",
        keywords: ["Berlin interior design software", "German designer tools"],
        targetUrl: "/de/berlin",
        priority: 5,
      },
      {
        title: "How Berlin Interior Designers Create Professional Quotations",
        keywords: ["Berlin design quotations", "Innenarchitektur Angebote"],
        targetUrl: "/de/berlin",
        priority: 5,
      },
      {
        title: "MwSt Invoicing Guide for German Interior Designers",
        keywords: ["MwSt interior design", "designer invoice Germany"],
        targetUrl: "/de/berlin",
        priority: 4,
      },
    ],
    localTerms: ["Altbau", "Neubau", "Bauhaus style", "industrial loft", "Berliner Zimmer"],
    competitors: ["Houzz Pro", "pCon.planner", "RoomSketcher"],
  },

  // Paris, France
  {
    citySlug: "paris",
    cityName: "Paris",
    countryCode: "fr",
    countryName: "France",
    primaryKeywords: [
      { keyword: "logiciel design intérieur France", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "Paris interior design software", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "logiciel devis architecte intérieur", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "Le Marais interior design tools", searchVolume: "low", difficulty: "easy", intent: "informational" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for Paris Designers 2025",
        keywords: ["Paris interior design software", "French designer tools"],
        targetUrl: "/fr/paris",
        priority: 5,
      },
      {
        title: "How Parisian Interior Designers Create Professional Quotations",
        keywords: ["Paris design quotations", "devis design intérieur"],
        targetUrl: "/fr/paris",
        priority: 5,
      },
      {
        title: "TVA Invoicing Guide for French Interior Designers",
        keywords: ["TVA design intérieur", "facture designer France"],
        targetUrl: "/fr/paris",
        priority: 4,
      },
    ],
    localTerms: ["Haussmannian", "appartement parisien", "pied-à-terre", "chambre de bonne", "Art Deco"],
    competitors: ["Houzz Pro", "Kozikaza Pro", "HomeByMe Pro"],
  },

  // Singapore
  {
    citySlug: "singapore",
    cityName: "Singapore",
    countryCode: "sg",
    countryName: "Singapore",
    primaryKeywords: [
      { keyword: "interior design software Singapore", searchVolume: "high", difficulty: "medium", intent: "commercial" },
      { keyword: "Singapore ID firm management tools", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "HDB renovation quotation software", searchVolume: "high", difficulty: "easy", intent: "transactional" },
      { keyword: "condo interior design Singapore", searchVolume: "medium", difficulty: "medium", intent: "informational" },
      { keyword: "GST invoice software Singapore designers", searchVolume: "medium", difficulty: "easy", intent: "transactional" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for Singapore Designers 2025",
        keywords: ["Singapore interior design software", "SG designer tools"],
        targetUrl: "/sg/singapore",
        priority: 5,
      },
      {
        title: "How Singapore ID Firms Create HDB Renovation Quotations",
        keywords: ["HDB renovation quotes", "Singapore ID quotation"],
        targetUrl: "/sg/singapore",
        priority: 5,
      },
      {
        title: "GST Invoicing Guide for Singapore Interior Designers",
        keywords: ["GST interior design Singapore", "designer invoice GST SG"],
        targetUrl: "/sg/singapore",
        priority: 4,
      },
      {
        title: "Managing Condo Interior Projects in Singapore",
        keywords: ["Singapore condo interior design", "luxury condo renovation SG"],
        targetUrl: "/sg/singapore",
        priority: 4,
      },
    ],
    localTerms: ["HDB", "BTO", "resale flat", "condo", "landed property", "good class bungalow", "EC"],
    competitors: ["Houzz Pro", "Qanvast Pro", "Hometrust"],
  },

  // Tokyo, Japan
  {
    citySlug: "tokyo",
    cityName: "Tokyo",
    countryCode: "jp",
    countryName: "Japan",
    primaryKeywords: [
      { keyword: "interior design software Japan", searchVolume: "medium", difficulty: "medium", intent: "commercial" },
      { keyword: "Tokyo interior designer tools", searchVolume: "medium", difficulty: "easy", intent: "commercial" },
      { keyword: "インテリアデザイン ソフトウェア", searchVolume: "high", difficulty: "medium", intent: "commercial" },
    ],
    blogTopics: [
      {
        title: "Best Interior Design Software for Tokyo Designers 2025",
        keywords: ["Tokyo interior design software", "Japanese designer tools"],
        targetUrl: "/jp/tokyo",
        priority: 5,
      },
      {
        title: "How Tokyo Interior Designers Create Professional Quotations",
        keywords: ["Tokyo design quotations", "Japanese interior design quotes"],
        targetUrl: "/jp/tokyo",
        priority: 5,
      },
    ],
    localTerms: ["minimalist", "Japanese modern", "tatami room", "genkan", "shoji"],
    competitors: ["Houzz Japan", "RoomClip"],
  },
];

// Helper function to get strategy by city slug
export const getCityBlogStrategy = (citySlug: string): CityBlogStrategy | undefined => {
  return cityBlogStrategies.find(s => s.citySlug === citySlug);
};

// Helper function to get all blog topics for a country
export const getCountryBlogTopics = (countryCode: string): CityBlogTopic[] => {
  return cityBlogStrategies
    .filter(s => s.countryCode === countryCode)
    .flatMap(s => s.blogTopics);
};

// Helper function to generate internal link suggestions
export const getInternalLinkSuggestions = (citySlug: string): string[] => {
  const strategy = getCityBlogStrategy(citySlug);
  if (!strategy) return [];
  
  return [
    `Check out our [${strategy.cityName} interior design software](${strategy.blogTopics[0]?.targetUrl || `/${strategy.countryCode}/${citySlug}`}) for more details.`,
    `Interior designers in ${strategy.cityName} are using [Intorza](${strategy.blogTopics[0]?.targetUrl || `/${strategy.countryCode}/${citySlug}`}) to streamline their business.`,
    `Learn more about [interior design tools for ${strategy.cityName} professionals](${strategy.blogTopics[0]?.targetUrl || `/${strategy.countryCode}/${citySlug}`}).`,
  ];
};

// Get all available city slugs
export const getAllCitySlugs = (): string[] => {
  return cityBlogStrategies.map(s => s.citySlug);
};

// Get cities by country
export const getCitiesByCountry = (countryCode: string): CityBlogStrategy[] => {
  return cityBlogStrategies.filter(s => s.countryCode === countryCode);
};
