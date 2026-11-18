import { motion } from 'motion/react';
import { Dog, Leaf, Moon, Users, type LucideIcon } from 'lucide-react';
import { PILLARS } from '../data/campsiteData';

const ICONS: Record<string, LucideIcon> = { Moon, Leaf, Users, Dog };

export default function TrustCharterSection() {
  return (
    <section id="fridsemd" className="bg-pine-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-light">Friðsemdarsáttmáli</p>
          <blockquote className="mt-4 font-display text-2xl font-extrabold leading-snug sm:text-4xl">
            „Viljum fá fólk sem er að njóta náttúrunnar og í friðsemd við hina á svæðinu.“
          </blockquote>
          <p className="mt-5 text-base leading-relaxed text-emerald-100/90">
            Svæðið er ekki ætlað fyrir hávær partí heldur fyrir náttúruunnendur og fjölskyldur sem meta hvíld og ró.
          </p>
        </motion.div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <motion.li key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-3xl bg-pine-800 p-6 shadow-lg">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pine-700 text-amber-light"><Icon size={24} aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-emerald-100/85">{p.text}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
