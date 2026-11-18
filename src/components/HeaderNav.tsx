import { useState } from 'react';
import { Menu, Tent, X } from 'lucide-react';
import { T, type Lang } from '../data/i18n';

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  onBook: () => void;
}

const IDS = ['gisting', 'fridsemd', 'adstada', 'myndir', 'myndband', 'stadsetning'] as const;

export default function HeaderNav({ lang, onLang, onBook }: Props) {
  const [open, setOpen] = useState(false);
  const t = T[lang];
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-pine-800 text-amber-light">
            <Tent size={22} aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-extrabold text-pine-900">Tjaldsvæði Ólafsfjörður</span>
            <span className="hidden text-xs text-slate-600 sm:block">{t.subtitle}</span>
          </span>
        </a>

        <nav aria-label="Aðalvalmynd" className="hidden items-center gap-5 lg:flex">
          {IDS.map((id) => (
            <a key={id} href={`#${id}`} className="text-sm font-medium text-slate-700 transition hover:text-amber-warm">
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-border-soft p-0.5 text-xs font-bold" role="group" aria-label="Language">
            {(['is', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => onLang(l)}
                className={`rounded-full px-2.5 py-1 ${lang === l ? 'bg-pine-800 text-white' : 'text-slate-600'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" onClick={onBook} className="hidden rounded-full bg-amber-warm px-4 py-2 text-sm font-bold text-white shadow hover:bg-amber-light sm:block">
            {t.book}
          </button>
          <button
            type="button"
            aria-label={open ? 'Loka valmynd' : 'Opna valmynd'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border-soft lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Farsímavalmynd" className="grid gap-1 border-t border-border-soft bg-white px-4 py-3 lg:hidden">
          {IDS.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 font-medium text-slate-800 hover:bg-fog-slate">
              {t.nav[id]}
            </a>
          ))}
          <button type="button" onClick={() => { setOpen(false); onBook(); }} className="mt-1 rounded-full bg-amber-warm px-4 py-3 font-bold text-white sm:hidden">
            {t.book}
          </button>
        </nav>
      )}
    </header>
  );
}
