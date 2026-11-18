import { useCallback, useEffect, useState } from 'react';
import type { BookingPreset } from './types/campsite';
import { DEFAULT_PRESET } from './data/campsiteData';
import type { Lang } from './data/i18n';
import TopAnnouncementBar from './components/TopAnnouncementBar';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import TrustCharterSection from './components/TrustCharterSection';
import PricingOffersSection from './components/PricingOffersSection';
import ImageShowcaseSection from './components/ImageShowcaseSection';
import VideoShowcaseSection from './components/VideoShowcaseSection';
import AmenitiesSection from './components/AmenitiesSection';
import LocalExplorerSection from './components/LocalExplorerSection';
import PartnerKeyrumBanner from './components/PartnerKeyrumBanner';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Lang>('is');
  const [preset, setPreset] = useState<BookingPreset | null>(null);
  const open = useCallback((p?: BookingPreset) => setPreset(p ?? DEFAULT_PRESET), []);
  const close = useCallback(() => setPreset(null), []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <>
      <TopAnnouncementBar lang={lang} />
      <HeaderNav lang={lang} onLang={setLang} onBook={() => open()} />
      <main>
        <HeroSection lang={lang} onBook={() => open()} />
        <PricingOffersSection onBook={open} />
        <TrustCharterSection />
        <AmenitiesSection />
        <ImageShowcaseSection />
        <VideoShowcaseSection onBook={() => open()} />
        <LocalExplorerSection />
        <PartnerKeyrumBanner />
      </main>
      <Footer />
      {preset && <BookingModal preset={preset} onClose={close} />}
    </>
  );
}
