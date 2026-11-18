import type { AmenityItem, BookingPreset, LocalHighlight, ServiceOffer, StayCategory } from '../types/campsite';

export const CONTACT = {
  email: 'fetiframar@gmail.com',
  phone: '+354 868 0000',
  address: '625 Ólafsfjörður',
  season: '1. júní – 30. september',
  keyrumUrl: 'https://www.keyrum.is',
  mapsUrl: 'https://www.google.com/maps?q=66.0712,-18.6534',
} as const;

export const ELECTRICITY_PRICE_PER_NIGHT = 1000;
export const KEYRUM_DISCOUNT = 0.1;

export const OFFERS: ServiceOffer[] = [
  {
    id: 'tjold',
    name: 'Gisting Tjöld',
    category: 'tjald',
    basePrice: 2200,
    unit: 'nótt pr. fullorðinn',
    badge: 'Börn yngri en 14 frítt',
    description: 'Fyrir þá sem vilja vakna beint í náttúrunni.',
    features: ['Slétt graslendi', 'Skjólbelti', 'Heitt vatn og sturtur innifaldar', 'Eldunaraðstaða innandyra'],
    electricityAvailable: false,
  },
  {
    id: 'tjaldvagnar',
    name: 'Gisting Tjaldvagnar & Fellihýsi',
    category: 'tjaldvagn',
    basePrice: 2900,
    unit: 'nótt pr. vagn',
    badge: 'Vinsælast',
    description: 'Þægileg og skjólgóð pláss fyrir vagna.',
    features: ['Styrkt slétt plan', 'Stutt í 16A rafmagn', 'Drykkjarvatn', 'Grávatnslosun', 'Leiksvæði í nágrenni'],
    recommended: true,
    electricityAvailable: true,
  },
  {
    id: 'husbilar',
    name: 'Gisting Húsbílar & Búslóðabílar',
    category: 'husbill',
    basePrice: 3400,
    unit: 'nótt pr. bíl',
    badge: 'Allt að 12 m',
    description: 'Rúmgóð pláss með útsýni yfir vatnið.',
    features: ['Sérstaklega styrkt pláss (allt að 12m)', '16A tengill', 'Svart- og grávatnslosun', 'Vatnsáfylling', 'Útsýni yfir vatnið'],
    electricityAvailable: true,
  },
];

export const CATEGORY_LABELS: Record<StayCategory, string> = {
  tjald: 'Tjald',
  tjaldvagn: 'Tjaldvagn / Fellihýsi',
  husbill: 'Húsbíll',
};

export const DEFAULT_PRESET: BookingPreset = {
  category: 'tjaldvagn',
  nights: 2,
  adultsCount: 2,
  wantsElectricity: false,
  hasKeyrumRental: false,
};

export interface PriceBreakdown {
  base: number;
  electricity: number;
  discount: number;
  total: number;
}

/** Tents are priced per adult; caravans and motorhomes per unit. */
export function calculatePrice(p: BookingPreset): PriceBreakdown {
  const offer = OFFERS.find((o) => o.category === p.category) ?? OFFERS[0];
  const nights = Math.max(1, Math.floor(p.nights) || 1);
  const adults = Math.max(1, Math.floor(p.adultsCount) || 1);
  const units = p.category === 'tjald' ? adults : 1;
  const base = offer.basePrice * units * nights;
  const electricity = p.category !== 'tjald' && p.wantsElectricity ? ELECTRICITY_PRICE_PER_NIGHT * nights : 0;
  const subtotal = base + electricity;
  const discount = p.hasKeyrumRental ? Math.round(subtotal * KEYRUM_DISCOUNT) : 0;
  return { base, electricity, discount, total: subtotal - discount };
}

export const formatISK = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ISK`;

export const AMENITIES: AmenityItem[] = [
  { icon: 'Zap', title: '16A Rafmagn', description: 'Örugg tengi fyrir húsbíla og vagna' },
  { icon: 'ShowerHead', title: 'Heitar sturtur', description: 'Ótakmarkað heitt vatn innifalið' },
  { icon: 'Sparkles', title: 'Hreinlætisaðstaða', description: 'Þrifin margsinnis á dag' },
  { icon: 'Utensils', title: 'Innieldunaraðstaða', description: 'Eldunaraðstaða og setkrókur' },
  { icon: 'Wifi', title: 'Frítt Wi-Fi', description: 'Nær yfir allt svæðið' },
  { icon: 'Droplets', title: 'Drykkjarvatn & Losun', description: 'Ferskt lindarvatn og tæming' },
  { icon: 'HeartHandshake', title: 'Friðsemdarsáttmáli', description: 'Næturró 23:00 – 07:00' },
  { icon: 'Waves', title: 'Sundlaug í nágrenninu', description: 'Heitir pottar, rennibrautir og gufa' },
];

export const HIGHLIGHTS: LocalHighlight[] = [
  { title: 'Sundlaug Ólafsfjarðar', distance: '300 m', description: 'Heitir pottar og rennibrautir', badge: 'Sund' },
  { title: 'Ólafsfjarðarvatn', distance: '100 m', description: 'Silungaveiði og kajak', badge: 'Vatn' },
  { title: 'Brimnes & Gönguleiðir', distance: '1 km', description: 'Merktar fjallaleiðir', badge: 'Göngur' },
  { title: 'Pálshús Náttúrugripasafn', distance: '800 m', description: 'Fuglasýning og saga', badge: 'Safn' },
];

export const PILLARS = [
  { icon: 'Moon', title: 'Næturró kl. 23:00 – 07:00', text: 'Djúpur og friðsæll svefn tryggður fyrir alla.' },
  { icon: 'Leaf', title: 'Gengið um af virðingu', text: 'Við skiljum við náttúruna eins og við viljum koma að henni.' },
  { icon: 'Users', title: 'Góðir nágrannar', text: 'Lítið og innilegt svæði þar sem fólk heilsast og sýnir tillitsemi.' },
  { icon: 'Dog', title: 'Fjórfættir vinir í bandi', text: 'Hundar velkomnir með ábyrgum eigendum í taumi.' },
] as const;

