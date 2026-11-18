export type StayCategory = 'tjald' | 'tjaldvagn' | 'husbill';

export interface ServiceOffer {
  id: string;
  name: string;
  category: StayCategory;
  basePrice: number;
  unit: string;
  badge: string;
  description: string;
  features: string[];
  recommended?: boolean;
  electricityAvailable: boolean;
}

export interface AmenityItem {
  icon: string;
  title: string;
  description: string;
}

export interface LocalHighlight {
  title: string;
  distance: string;
  description: string;
  badge: string;
}

export interface BookingInquiry {
  fullName: string;
  email: string;
  phone: string;
  category: StayCategory;
  arrivalDate: string;
  nights: number;
  adultsCount: number;
  wantsElectricity: boolean;
  hasKeyrumRental: boolean;
  notes?: string;
}

/** Values used to pre-fill the booking modal. */
export interface BookingPreset {
  category: StayCategory;
  nights: number;
  adultsCount: number;
  wantsElectricity: boolean;
  hasKeyrumRental: boolean;
}
