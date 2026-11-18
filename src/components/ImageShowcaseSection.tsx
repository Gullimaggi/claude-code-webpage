import { motion } from 'motion/react';

const SHOTS = [
  { src: '/assets/ich1.jpg', label: 'ich1.jpg • Víðmynd af svæðinu', caption: 'Rósemi við vatnsbakkann – 100m í vatnið með tignarlegan fjallgarð í baksýn.', alt: 'Víðmynd af tjaldsvæðinu, vatninu og fjöllunum / Wide view of the campsite, lake and mountains', ratio: 'aspect-[16/9] lg:col-span-2' },
  { src: '/assets/ich2.jpg', label: 'ich2.jpg • Stemning & Aðstaða', caption: 'Hlýleg stemning og vönduð aðstaða – Slétt undirlag og 16A rafmagnstenglar.', alt: 'Húsbíll og aðstaða á tjaldsvæðinu / Campervan and campsite facilities', ratio: 'aspect-[4/3] lg:col-span-2' },
];

export default function ImageShowcaseSection() {
  return (
    <section id="myndir" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl text-pine-900 sm:text-4xl">Myndasýnd</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {SHOTS.map((s) => (
            <motion.figure key={s.src} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`overflow-hidden rounded-3xl bg-fog-slate shadow-lg ${s.ratio.includes('col-span') ? s.ratio.split(' ')[1] : ''}`}>
              <div className={`relative ${s.ratio.split(' ')[0]}`}>
                <img data-test="showcase-img" src={s.src} alt={s.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-pine-950/80 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur">{s.label}</span>
              </div>
              <figcaption className="p-5 text-[15px] text-slate-700">{s.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
