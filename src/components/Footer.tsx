import { CONTACT } from '../data/campsiteData';

export default function Footer() {
  return (
    <footer className="bg-pine-950 py-12 text-emerald-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold text-white">Tjaldsvæði Ólafsfjörður</p>
          <p className="mt-1 text-sm">Lítið tjaldsvæði í paradís norðursins</p>
        </div>
        <address className="text-sm not-italic leading-7">
          <a href={`mailto:${CONTACT.email}`} className="hover:text-amber-light">{CONTACT.email}</a><br />
          Sími: <a href="tel:+3548680000" className="hover:text-amber-light">{CONTACT.phone}</a><br />
          Staðsetning: {CONTACT.address}
        </address>
        <div className="text-sm leading-7">
          Opið: {CONTACT.season}<br />
          <a href={CONTACT.keyrumUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-light">www.keyrum.is</a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-emerald-200/70">© 2026 Tjaldsvæði Ólafsfjörður. Allur réttur áskilinn.</p>
    </footer>
  );
}
