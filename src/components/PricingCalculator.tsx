import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { CATEGORY_LABELS, DEFAULT_PRESET, OFFERS, calculatePrice, formatISK } from '../data/campsiteData';
import type { BookingPreset, StayCategory } from '../types/campsite';

export default function PricingCalculator({ onBook }: { onBook: (p: BookingPreset) => void }) {
  const [p, setP] = useState<BookingPreset>(DEFAULT_PRESET);
  const set = <K extends keyof BookingPreset>(k: K, v: BookingPreset[K]) => setP((s) => ({ ...s, [k]: v }));
  const clamp = (v: string, min: number, max: number) => Math.min(max, Math.max(min, Math.floor(Number(v)) || min));
  const canPower = p.category !== 'tjald';
  const price = calculatePrice(p);
  const field = 'mt-1 w-full rounded-xl border border-border-soft bg-white px-3 py-2.5 text-[15px]';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 rounded-3xl border border-border-soft bg-white p-6 shadow-xl sm:p-8">
      <h3 className="text-2xl text-pine-900">Reiknaðu verðið</h3>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
          <label className="text-sm font-semibold sm:col-span-3 lg:col-span-2">Tegund gistingar
            <select className={field} value={p.category} onChange={(e) => set('category', e.target.value as StayCategory)}>
              {OFFERS.map((o) => <option key={o.id} value={o.category}>{CATEGORY_LABELS[o.category]}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Nætur (1–21)
            <input type="number" min={1} max={21} className={field} value={p.nights} onChange={(e) => set('nights', clamp(e.target.value, 1, 21))} />
          </label>
          <label className="text-sm font-semibold">Fullorðnir (1–10)
            <input type="number" min={1} max={10} className={field} value={p.adultsCount} onChange={(e) => set('adultsCount', clamp(e.target.value, 1, 10))} />
          </label>
          <label className={`flex items-center gap-3 rounded-xl border border-border-soft p-3 text-sm font-semibold sm:col-span-3 lg:col-span-2 ${canPower ? '' : 'opacity-50'}`}>
            <input type="checkbox" className="h-5 w-5 accent-amber-warm" disabled={!canPower} checked={canPower && p.wantsElectricity} onChange={(e) => set('wantsElectricity', e.target.checked)} />
            16A rafmagn (+1.000 ISK/nótt){!canPower && ' – ekki í boði fyrir tjöld'}
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-border-soft p-3 text-sm font-semibold sm:col-span-3 lg:col-span-2">
            <input type="checkbox" className="h-5 w-5 accent-amber-warm" checked={p.hasKeyrumRental} onChange={(e) => set('hasKeyrumRental', e.target.checked)} />
            Leigusamningur frá keyrum.is (−10%)
          </label>
        </div>
        <div className="flex flex-col justify-between rounded-2xl bg-pine-900 p-6 text-white">
          <dl className="space-y-2 text-[15px]">
            <div className="flex justify-between"><dt>Gisting</dt><dd>{formatISK(price.base)}</dd></div>
            {price.electricity > 0 && <div className="flex justify-between"><dt>Rafmagn</dt><dd>{formatISK(price.electricity)}</dd></div>}
            {price.discount > 0 && <div className="flex justify-between text-emerald-300"><dt>Keyrum.is afsláttur</dt><dd>−{formatISK(price.discount)}</dd></div>}
          </dl>
          <div className="mt-6">
            <p className="text-sm text-emerald-200">Samtals</p>
            <p className="font-display text-4xl font-extrabold text-amber-light" aria-live="polite" data-test="calc-total">{formatISK(price.total)}</p>
            <button type="button" onClick={() => onBook({ ...p, wantsElectricity: canPower && p.wantsElectricity })} className="mt-5 w-full rounded-full bg-amber-light px-5 py-3.5 font-bold text-pine-950 hover:bg-amber-500">
              Taka frá pláss á þessu verði →
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-600"><Check size={14} aria-hidden="true" /> Verð eru leiðbeinandi; endanlegt verð staðfest með tölvupósti.</p>
    </motion.div>
  );
}
