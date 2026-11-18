import { ExternalLink } from 'lucide-react';
import { CONTACT } from '../data/campsiteData';
import { T, type Lang } from '../data/i18n';

export default function TopAnnouncementBar({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="bg-pine-950 text-emerald-200 text-[13px] min-h-[40px] py-1.5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 lg:justify-between">
        <p className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-amber-light px-2.5 py-0.5 text-xs font-bold text-pine-950">{t.promoBadge}</span>
          <a href={CONTACT.keyrumUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
            {t.promoText} <ExternalLink size={12} aria-hidden="true" />
          </a>
        </p>
        <p className="hidden text-emerald-200/80 lg:block">
          {t.meta} • {CONTACT.email}
        </p>
      </div>
    </div>
  );
}
