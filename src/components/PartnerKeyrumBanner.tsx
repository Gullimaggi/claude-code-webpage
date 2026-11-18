import { CONTACT } from '../data/campsiteData';

export default function PartnerKeyrumBanner() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl bg-gradient-to-br from-pine-800 to-pine-950 p-8 text-center text-white shadow-xl sm:p-12">
          <h2 className="text-2xl sm:text-4xl">Ferðastu um Norðurland með keyrum.is</h2>
          <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
            Allir gestir sem framvísa leigusamningi frá www.keyrum.is fá 10% afslátt af gistigjaldi hjá okkur sumarið 2026.
          </p>
          <a href={CONTACT.keyrumUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-full bg-amber-light px-7 py-3.5 font-bold text-pine-950 hover:bg-amber-500">
            Skoða bíla á www.keyrum.is →
          </a>
        </div>
      </div>
    </section>
  );
}
