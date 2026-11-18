import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { DEFAULT_PRESET, OFFERS, formatISK } from '../data/campsiteData';
import type { BookingPreset } from '../types/campsite';
import PricingCalculator from './PricingCalculator';

export default function PricingOffersSection({ onBook }: { onBook: (p: BookingPreset) => void }) {
  return (
    <section id="gisting" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-pine-900 sm:text-4xl">Gisting & verð</h2>
          <p className="mt-3 text-slate-600">Veldu það sem hentar þínum ferðamáta. Heitt vatn og sturtur eru innifalin.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {OFFERS.map((o, i) => (
            <motion.article
              key={o.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex flex-col rounded-3xl bg-white p-7 shadow-lg ${o.recommended ? 'border-2 border-amber-warm' : 'border border-border-soft'}`}
            >
              <span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold ${o.recommended ? 'bg-amber-warm text-white' : 'bg-pine-800 text-white'}`}>{o.badge}</span>
              <h3 className="text-xl text-pine-900">{o.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{o.description}</p>
              <p className="mt-5"><span className="font-display text-4xl font-extrabold text-pine-800">{formatISK(o.basePrice)}</span><span className="block text-sm text-slate-600">/ {o.unit}</span></p>
              <ul className="my-6 flex-1 space-y-2.5">
                {o.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[15px] text-slate-700"><Check size={18} className="mt-0.5 shrink-0 text-amber-warm" aria-hidden="true" />{f}</li>
                ))}
              </ul>
              <button type="button" onClick={() => onBook({ ...DEFAULT_PRESET, category: o.category })} className="rounded-full bg-pine-800 px-5 py-3 font-bold text-white hover:bg-pine-700">
                Taka frá pláss
              </button>
            </motion.article>
          ))}
        </div>
        <PricingCalculator onBook={onBook} />
      </div>
    </section>
  );
}
