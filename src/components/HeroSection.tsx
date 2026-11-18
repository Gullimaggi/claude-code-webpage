import { motion } from 'motion/react';
import { Droplets, Waves, Zap } from 'lucide-react';
import { T, type Lang } from '../data/i18n';
import ShaderBackground from './ui/shader-background';

export default function HeroSection({ lang, onBook }: { lang: Lang; onBook: () => void }) {
  const t = T[lang];
  const trust = [
    { icon: <span aria-hidden="true">★</span>, big: '4.9 / 5.0', small: 'Gestaeinkunn (Kyrrð & Hreinleiki)' },
    { icon: <Zap size={18} aria-hidden="true" />, big: '16A Rafmagn', small: 'fyrir alla vagna og bíla' },
    { icon: <Droplets size={18} aria-hidden="true" />, big: 'Heitt vatn', small: 'og sturtur innifaldar' },
    { icon: <Waves size={18} aria-hidden="true" />, big: '2 mín.', small: 'í Sundlaug Ólafsfjarðar' },
  ];
  return (
    <section id="top" className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-pine-950 text-white lg:min-h-[720px]">
      <img
        src="/assets/ich1.jpg"
        alt="Tjaldsvæðið í Ólafsfirði við vatnið með Tröllaskaga í baksýn / Campsite by the lake with the Tröllaskagi mountains behind"
        width={1600}
        height={900}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <ShaderBackground className="-z-10 opacity-60 mix-blend-screen" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/60 to-pine-950/20" />
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">{t.heroPill}</p>
          <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{t.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">{t.sub}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onBook} className="rounded-full bg-amber-light px-7 py-3.5 font-bold text-pine-950 shadow-lg transition hover:bg-amber-500">
              {t.ctaPrimary}
            </button>
            <a href="#gisting" className="rounded-full border border-white/60 px-7 py-3.5 text-center font-semibold backdrop-blur transition hover:bg-white/10">
              {t.ctaSecondary}
            </a>
          </div>
        </motion.div>
        <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {trust.map((x) => (
            <li key={x.big} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <p className="flex items-center gap-2 font-display text-lg font-extrabold text-amber-light">{x.icon} {x.big}</p>
              <p className="text-[13px] text-slate-200">{x.small}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
