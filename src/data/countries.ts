export interface CountryData {
  code: string;
  slug: string;
  name: string;
  currency: string;
  currencySymbol: string;
  price: string;
  priceValue: number;
  region: string;
  locale: string;
  trustedByText: string;
  heroSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

const toSlug = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const make = (
  code: string,
  name: string,
  region: string,
  locale: string,
  keywords: string,
  shortName?: string,
): CountryData => {
  const display = shortName ?? name;
  return {
    code,
    slug: toSlug(name),
    name,
    currency: "USD",
    currencySymbol: "$",
    price: "$1",
    priceValue: 1,
    region,
    locale,
    trustedByText: `Trusted by 500+ Interior Professionals in ${display}`,
    heroSubtitle: `All-in-one interior design project management software with quotation builder, invoice generator, client management & team collaboration. Trusted by interior designers and contractors across ${display}.`,
    seoTitle: `Best Interior Design Software ${display} 2025 | Free Quotation & Invoice Maker`,
    seoDescription: `Intorza is ${display}'s leading interior design project management software. Create professional quotations, generate invoices, manage clients & team collaboration. Start Free!`,
    seoKeywords: keywords,
  };
};

export const countries: CountryData[] = [
  // North America
  make("us", "United States", "North America", "en-US",
    "interior design software USA, interior design project management, quotation software for interior designers, invoice software for contractors, interior business management, client management software, best interior design software America",
    "the United States"),
  make("ca", "Canada", "North America", "en-CA",
    "interior design software Canada, quotation software for interior designers, invoice software for contractors, interior business management Canada"),
  make("mx", "Mexico", "North America", "es-MX",
    "interior design software Mexico, software de diseño de interiores, quotation software, invoice software, interior business management Mexico"),

  // Europe
  make("uk", "United Kingdom", "Europe", "en-GB",
    "interior design software UK, quotation software for interior designers, invoice software for contractors, interior business management UK",
    "the United Kingdom"),
  make("de", "Germany", "Europe", "de-DE",
    "interior design software Germany, Innenarchitektur-Software, quotation software, invoice software, interior business management Germany"),
  make("fr", "France", "Europe", "fr-FR",
    "interior design software France, logiciel de design d'intérieur, quotation software, invoice software, interior business management France"),
  make("it", "Italy", "Europe", "it-IT",
    "interior design software Italy, software di design d'interni, quotation software, invoice software, interior business management Italy"),
  make("es", "Spain", "Europe", "es-ES",
    "interior design software Spain, software de diseño de interiores, quotation software, invoice software, interior business management Spain"),
  make("nl", "Netherlands", "Europe", "nl-NL",
    "interior design software Netherlands, interieurontwerp software, quotation software, invoice software, interior business management Netherlands",
    "the Netherlands"),
  make("be", "Belgium", "Europe", "nl-BE",
    "interior design software Belgium, quotation software, invoice software, interior business management Belgium"),
  make("ch", "Switzerland", "Europe", "de-CH",
    "interior design software Switzerland, quotation software, invoice software, interior business management Switzerland"),
  make("at", "Austria", "Europe", "de-AT",
    "interior design software Austria, Innenarchitektur-Software, quotation software, invoice software, interior business management Austria"),
  make("se", "Sweden", "Europe", "sv-SE",
    "interior design software Sweden, inredningsdesign programvara, quotation software, invoice software, interior business management Sweden"),
  make("no", "Norway", "Europe", "no-NO",
    "interior design software Norway, quotation software, invoice software, interior business management Norway"),
  make("dk", "Denmark", "Europe", "da-DK",
    "interior design software Denmark, quotation software, invoice software, interior business management Denmark"),
  make("fi", "Finland", "Europe", "fi-FI",
    "interior design software Finland, quotation software, invoice software, interior business management Finland"),
  make("ie", "Ireland", "Europe", "en-IE",
    "interior design software Ireland, quotation software, invoice software, interior business management Ireland"),
  make("pt", "Portugal", "Europe", "pt-PT",
    "interior design software Portugal, quotation software, invoice software, interior business management Portugal"),
  make("pl", "Poland", "Europe", "pl-PL",
    "interior design software Poland, quotation software, invoice software, interior business management Poland"),
  make("gr", "Greece", "Europe", "el-GR",
    "interior design software Greece, quotation software, invoice software, interior business management Greece"),

  // Middle East
  make("ae", "United Arab Emirates", "Middle East", "ar-AE",
    "interior design software UAE, interior design software Dubai, quotation software, invoice software, interior business management UAE",
    "the UAE"),
  make("sa", "Saudi Arabia", "Middle East", "ar-SA",
    "interior design software Saudi Arabia, quotation software, invoice software, interior business management Saudi Arabia"),
  make("qa", "Qatar", "Middle East", "ar-QA",
    "interior design software Qatar, quotation software, invoice software, interior business management Qatar"),
  make("kw", "Kuwait", "Middle East", "ar-KW",
    "interior design software Kuwait, quotation software, invoice software, interior business management Kuwait"),
  make("bh", "Bahrain", "Middle East", "ar-BH",
    "interior design software Bahrain, quotation software, invoice software, interior business management Bahrain"),
  make("om", "Oman", "Middle East", "ar-OM",
    "interior design software Oman, quotation software, invoice software, interior business management Oman"),
  make("il", "Israel", "Middle East", "he-IL",
    "interior design software Israel, quotation software, invoice software, interior business management Israel"),
  make("tr", "Turkey", "Middle East", "tr-TR",
    "interior design software Turkey, iç tasarım yazılımı, quotation software, invoice software, interior business management Turkey"),

  // Asia Pacific
  make("au", "Australia", "Asia Pacific", "en-AU",
    "interior design software Australia, quotation software for interior designers, invoice software for contractors, interior business management Australia"),
  make("nz", "New Zealand", "Asia Pacific", "en-NZ",
    "interior design software New Zealand, quotation software, invoice software, interior business management New Zealand"),
  make("sg", "Singapore", "Asia Pacific", "en-SG",
    "interior design software Singapore, quotation software, invoice software, interior business management Singapore"),
  make("my", "Malaysia", "Asia Pacific", "ms-MY",
    "interior design software Malaysia, quotation software, invoice software, interior business management Malaysia"),
  make("th", "Thailand", "Asia Pacific", "th-TH",
    "interior design software Thailand, quotation software, invoice software, interior business management Thailand"),
  make("id", "Indonesia", "Asia Pacific", "id-ID",
    "interior design software Indonesia, perangkat lunak desain interior, quotation software, invoice software, interior business management Indonesia"),
  make("ph", "Philippines", "Asia Pacific", "en-PH",
    "interior design software Philippines, quotation software, invoice software, interior business management Philippines",
    "the Philippines"),
  make("vn", "Vietnam", "Asia Pacific", "vi-VN",
    "interior design software Vietnam, phần mềm thiết kế nội thất, quotation software, invoice software, interior business management Vietnam"),
  make("jp", "Japan", "Asia Pacific", "ja-JP",
    "interior design software Japan, インテリアデザインソフトウェア, quotation software, invoice software, interior business management Japan"),
  make("kr", "South Korea", "Asia Pacific", "ko-KR",
    "interior design software South Korea, 인테리어 디자인 소프트웨어, quotation software, invoice software, interior business management South Korea"),
  make("hk", "Hong Kong", "Asia Pacific", "zh-HK",
    "interior design software Hong Kong, 室內設計軟件, quotation software, invoice software, interior business management Hong Kong"),
  make("tw", "Taiwan", "Asia Pacific", "zh-TW",
    "interior design software Taiwan, 室內設計軟體, quotation software, invoice software, interior business management Taiwan"),
  make("cn", "China", "Asia Pacific", "zh-CN",
    "interior design software China, 室内设计软件, quotation software, invoice software, interior business management China"),

  // South Asia
  make("in", "India", "South Asia", "en-IN",
    "interior design software India, GST quotation software, GST invoice software, interior design project management India, contractor business management"),
  make("pk", "Pakistan", "South Asia", "ur-PK",
    "interior design software Pakistan, quotation software, invoice software, interior business management Pakistan"),
  make("bd", "Bangladesh", "South Asia", "bn-BD",
    "interior design software Bangladesh, quotation software, invoice software, interior business management Bangladesh"),
  make("lk", "Sri Lanka", "South Asia", "si-LK",
    "interior design software Sri Lanka, quotation software, invoice software, interior business management Sri Lanka"),
  make("np", "Nepal", "South Asia", "ne-NP",
    "interior design software Nepal, quotation software, invoice software, interior business management Nepal"),

  // Africa
  make("za", "South Africa", "Africa", "en-ZA",
    "interior design software South Africa, quotation software, invoice software, interior business management South Africa"),
  make("ng", "Nigeria", "Africa", "en-NG",
    "interior design software Nigeria, quotation software, invoice software, interior business management Nigeria"),
  make("ke", "Kenya", "Africa", "en-KE",
    "interior design software Kenya, quotation software, invoice software, interior business management Kenya"),
  make("eg", "Egypt", "Africa", "ar-EG",
    "interior design software Egypt, quotation software, invoice software, interior business management Egypt"),
  make("gh", "Ghana", "Africa", "en-GH",
    "interior design software Ghana, quotation software, invoice software, interior business management Ghana"),
  make("ma", "Morocco", "Africa", "ar-MA",
    "interior design software Morocco, quotation software, invoice software, interior business management Morocco"),

  // South America
  make("br", "Brazil", "South America", "pt-BR",
    "interior design software Brazil, software de design de interiores, quotation software, invoice software, interior business management Brazil"),
  make("ar", "Argentina", "South America", "es-AR",
    "interior design software Argentina, software de diseño de interiores, quotation software, invoice software, interior business management Argentina"),
  make("cl", "Chile", "South America", "es-CL",
    "interior design software Chile, software de diseño de interiores, quotation software, invoice software, interior business management Chile"),
  make("co", "Colombia", "South America", "es-CO",
    "interior design software Colombia, software de diseño de interiores, quotation software, invoice software, interior business management Colombia"),
  make("pe", "Peru", "South America", "es-PE",
    "interior design software Peru, software de diseño de interiores, quotation software, invoice software, interior business management Peru"),
];

export const getAllCountryCodes = (): string[] => countries.map((c) => c.code);
export const getAllCountrySlugs = (): string[] => countries.map((c) => c.slug);
export const getLocaleByCode = (code: string): string =>
  countries.find((c) => c.code === code.toLowerCase())?.locale || "en";
export const getCountryByCode = (code: string): CountryData | undefined =>
  countries.find((c) => c.code === code.toLowerCase());
export const getCountryBySlug = (slug: string): CountryData | undefined => {
  const s = slug.toLowerCase();
  return countries.find((c) => c.slug === s) || countries.find((c) => c.code === s);
};

export const getCountriesByRegion = (): Record<string, CountryData[]> =>
  countries.reduce(
    (acc, country) => {
      (acc[country.region] ||= []).push(country);
      return acc;
    },
    {} as Record<string, CountryData[]>,
  );

export const getAllRegions = (): string[] => [...new Set(countries.map((c) => c.region))];
