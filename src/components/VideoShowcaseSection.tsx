import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

export default function VideoShowcaseSection({ onBook }: { onBook: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        const v = video.current;
        if (!v) return;
        if (e.isIntersecting && !userPaused.current) void v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; void v.play().catch(() => undefined); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <section id="myndband" className="bg-pine-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={wrap}
          data-test="video-container"
          initial={false}
          animate={{ scale: visible ? 1 : 0.95, opacity: visible ? 1 : 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative aspect-video overflow-hidden rounded-3xl bg-pine-900 shadow-2xl"
        >
          <video
            ref={video}
            src="/assets/video-stock-animation.mp4"
            poster="/assets/ich2.jpg"
            muted={muted}
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label="Myndband frá tjaldsvæðinu"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-pine-950/35" />
          <span className="absolute left-4 top-4 rounded-full bg-pine-950/80 px-3 py-1 text-xs font-semibold text-emerald-200">video (stock animation.mp4) • 1080p</span>
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="max-w-md rounded-3xl bg-white/90 p-6 text-center shadow-xl backdrop-blur-md">
              <h2 className="text-2xl text-pine-900 sm:text-3xl">Finndu þinn frið í Ólafsfirði</h2>
              <button type="button" onClick={onBook} className="mt-4 rounded-full bg-amber-warm px-6 py-3 font-bold text-white hover:bg-amber-light">Taka frá pláss núna</button>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button type="button" onClick={toggle} aria-label={playing ? 'Gera hlé á myndbandi' : 'Spila myndband'} className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-pine-900">
              {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Kveikja á hljóði' : 'Slökkva á hljóði'} className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-pine-900">
              {muted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
