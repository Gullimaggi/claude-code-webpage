import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { CATEGORY_LABELS, CONTACT, OFFERS, calculatePrice, formatISK } from '../data/campsiteData';
import type { BookingInquiry, BookingPreset } from '../types/campsite';

type Errors = Partial<Record<keyof BookingInquiry, string>>;

const today = () => new Date().toISOString().slice(0, 10);

function buildMailto(f: BookingInquiry, total: number): string {
  const subject = `Fyrirspurn: ${CATEGORY_LABELS[f.category]} – ${f.arrivalDate} (${f.nights} nætur)`;
  const body = [
    'Halló,', '',
    `Nafn: ${f.fullName}`, `Netfang: ${f.email}`, `Sími: ${f.phone}`,
    `Gisting: ${CATEGORY_LABELS[f.category]}`, `Komudagur: ${f.arrivalDate}`,
    `Nætur: ${f.nights}`, `Fullorðnir: ${f.adultsCount}`,
    `16A rafmagn: ${f.wantsElectricity ? 'Já' : 'Nei'}`,
    `Keyrum.is leigusamningur: ${f.hasKeyrumRental ? 'Já (−10%)' : 'Nei'}`,
    `Áætlað verð: ${formatISK(total)}`, '', `Athugasemdir: ${f.notes ?? ''}`,
  ].join('\n');
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function BookingModal({ preset, onClose }: { preset: BookingPreset; onClose: () => void }) {
  const [f, setF] = useState<BookingInquiry>({
    fullName: '', email: '', phone: '', arrivalDate: '', notes: '',
    category: preset.category, nights: preset.nights, adultsCount: preset.adultsCount,
    wantsElectricity: preset.wantsElectricity, hasKeyrumRental: preset.hasKeyrumRental,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sentHref, setSentHref] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof BookingInquiry>(k: K, v: BookingInquiry[K]) => setF((s) => ({ ...s, [k]: v }));
  const canPower = f.category !== 'tjald';
  const price = useMemo(
    () => calculatePrice({ category: f.category, nights: f.nights, adultsCount: f.adultsCount, wantsElectricity: f.wantsElectricity, hasKeyrumRental: f.hasKeyrumRental }),
    [f],
  );

  useEffect(() => {
    firstRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (f.fullName.trim().length < 2) er.fullName = 'Sláðu inn fullt nafn';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'Ógilt netfang';
    if (f.phone.replace(/\D/g, '').length < 7) er.phone = 'Ógilt símanúmer';
    if (!f.arrivalDate || f.arrivalDate < today()) er.arrivalDate = 'Veldu komudag í framtíðinni';
    if (!(f.nights >= 1 && f.nights <= 21)) er.nights = 'Nætur: 1–21';
    setErrors(er);
    if (Object.keys(er).length) return;
    const href = buildMailto({ ...f, wantsElectricity: canPower && f.wantsElectricity }, price.total);
    setSentHref(href);
    window.location.href = href;
  };

  const input = (bad?: string) => `mt-1 w-full rounded-xl border px-3 py-2.5 text-[15px] ${bad ? 'border-red-500' : 'border-border-soft'}`;
  const err = (k: keyof BookingInquiry) => errors[k] && <span role="alert" className="mt-1 block text-xs text-red-600">{errors[k]}</span>;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-pine-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4">
          <h2 id="booking-title" className="text-2xl text-pine-900">Taka frá pláss á Tjaldsvæði Ólafsfjörður</h2>
          <button type="button" onClick={onClose} aria-label="Loka glugga" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-fog-slate"><X size={20} aria-hidden="true" /></button>
        </div>

        {sentHref ? (
          <div className="py-10 text-center" role="status">
            <CheckCircle2 size={48} className="mx-auto text-emerald-600" aria-hidden="true" />
            <p className="mt-4 text-lg font-bold text-pine-900">Takk fyrir fyrirspurnina!</p>
            <p className="mt-2 text-slate-700">Beiðni þín hefur verið send á {CONTACT.email}.</p>
            <p className="mt-4 text-sm text-slate-600">Ef tölvupóstforritið opnaðist ekki, <a className="font-semibold text-amber-warm underline" href={sentHref}>smelltu hér til að senda tölvupóstinn</a>.</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">Fullt nafn
              <input ref={firstRef} className={input(errors.fullName)} value={f.fullName} onChange={(e) => set('fullName', e.target.value)} autoComplete="name" />{err('fullName')}
            </label>
            <label className="text-sm font-semibold">Netfang
              <input type="email" className={input(errors.email)} value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />{err('email')}
            </label>
            <label className="text-sm font-semibold">Símanúmer
              <input type="tel" className={input(errors.phone)} value={f.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />{err('phone')}
            </label>
            <label className="text-sm font-semibold">Tegund gistingar
              <select className={input()} value={f.category} onChange={(e) => set('category', e.target.value as BookingInquiry['category'])}>
                {OFFERS.map((o) => <option key={o.id} value={o.category}>{CATEGORY_LABELS[o.category]}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold">Komudagur
              <input type="date" min={today()} className={input(errors.arrivalDate)} value={f.arrivalDate} onChange={(e) => set('arrivalDate', e.target.value)} />{err('arrivalDate')}
            </label>
            <label className="text-sm font-semibold">Fjöldi nátta
              <input type="number" min={1} max={21} className={input(errors.nights)} value={f.nights} onChange={(e) => set('nights', Math.min(21, Math.max(1, Math.floor(Number(e.target.value)) || 1)))} />{err('nights')}
            </label>
            <label className="text-sm font-semibold">Fullorðnir
              <input type="number" min={1} max={10} className={input()} value={f.adultsCount} onChange={(e) => set('adultsCount', Math.min(10, Math.max(1, Math.floor(Number(e.target.value)) || 1)))} />
            </label>
            <label className={`flex items-center gap-3 self-end rounded-xl border border-border-soft p-3 text-sm font-semibold ${canPower ? '' : 'opacity-50'}`}>
              <input type="checkbox" className="h-5 w-5 accent-amber-warm" disabled={!canPower} checked={canPower && f.wantsElectricity} onChange={(e) => set('wantsElectricity', e.target.checked)} />
              16A rafmagn: {canPower && f.wantsElectricity ? 'Já' : 'Nei'}
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-border-soft p-3 text-sm font-semibold sm:col-span-2">
              <input type="checkbox" className="h-5 w-5 accent-amber-warm" checked={f.hasKeyrumRental} onChange={(e) => set('hasKeyrumRental', e.target.checked)} />
              Keyrum.is afsláttur (−10%) – ég er með leigusamning
            </label>
            <label className="text-sm font-semibold sm:col-span-2">Athugasemdir
              <textarea rows={3} className={input()} value={f.notes} onChange={(e) => set('notes', e.target.value)} />
            </label>
            <div className="flex items-center justify-between rounded-2xl bg-pine-900 p-4 text-white sm:col-span-2">
              <span className="text-sm">Áætlað verð alls</span>
              <strong className="font-display text-2xl text-amber-light">{formatISK(price.total)}</strong>
            </div>
            <button type="submit" className="rounded-full bg-amber-warm px-6 py-3.5 font-bold text-white hover:bg-amber-light sm:col-span-2">Senda fyrirspurn</button>
          </form>
        )}
      </div>
    </div>
  );
}
