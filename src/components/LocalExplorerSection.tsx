import { MapPin } from 'lucide-react';
import { CONTACT, HIGHLIGHTS } from '../data/campsiteData';

export default function LocalExplorerSection() {
  return (
    <section id="stadsetning" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-3xl text-pine-900 sm:text-4xl">Í næsta nágrenni</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title} className="rounded-3xl border border-border-soft bg-fog-slate p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-pine-800 px-2.5 py-0.5 text-xs font-bold text-white">{h.badge}</span>
                  <span className="font-display font-extrabold text-amber-warm">{h.distance}</span>
                </div>
                <h3 className="mt-3 text-lg text-pine-900">{h.title}</h3>
                <p className="text-[15px] text-slate-600">{h.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-3xl bg-pine-900 p-8 text-white lg:col-span-2">
          <div>
            <MapPin size={36} className="text-amber-light" aria-hidden="true" />
            <h3 className="mt-4 text-2xl">Ólafsfjörður (625)</h3>
            <p className="mt-2 text-emerald-100">GPS: 66.0712° N, 18.6534° W</p>
          </div>
          <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 rounded-full bg-amber-light px-6 py-3 text-center font-bold text-pine-950 hover:bg-amber-500">
            Opna í Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
