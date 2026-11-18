import { motion } from 'motion/react';
import { Droplets, HeartHandshake, ShowerHead, Sparkles, Utensils, Waves, Wifi, Zap, type LucideIcon } from 'lucide-react';
import { AMENITIES } from '../data/campsiteData';

const ICONS: Record<string, LucideIcon> = { Zap, ShowerHead, Sparkles, Utensils, Wifi, Droplets, HeartHandshake, Waves };

export default function AmenitiesSection() {
  return (
    <section id="adstada" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl text-pine-900 sm:text-4xl">Allt sem þú þarft</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map((a, i) => {
            const Icon = ICONS[a.icon];
            return (
              <motion.li key={a.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }} className="rounded-3xl border border-border-soft bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pine-800 text-amber-light"><Icon size={24} aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg text-pine-900">{a.title}</h3>
                <p className="mt-1 text-[15px] text-slate-600">{a.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
