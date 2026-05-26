'use client';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function VideoSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [playing, setPlaying] = useState(false);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#f7faf7] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(50,132,66,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#328442] mb-3">
              Showreel
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
              {isVi ? (
                <>Hành trình<br />kiến tạo <span className="text-[#328442]">cảnh quan</span></>
              ) : (
                <>The art of<br /><span className="text-[#328442]">landscape</span> making</>
              )}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base max-w-xs leading-relaxed md:text-right"
          >
            {isVi
              ? 'Xem video giới thiệu về hành trình và các dự án tiêu biểu của Lapla.'
              : 'Watch our showreel to experience the journey and featured projects of Lapla.'}
          </motion.p>
        </div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative border frame */}
          <div className="absolute -inset-4 md:-inset-6 rounded-[32px] border border-[#328442]/15 pointer-events-none" />

          <div className="relative aspect-video rounded-2xl overflow-hidden">
            {!playing ? (
              <div
                className="relative w-full h-full group cursor-pointer"
                onClick={() => setPlaying(true)}
              >
                <img
                  src="https://img.youtube.com/vi/B9VRvOKKwfs/maxresdefault.jpg"
                  alt="Lapla Showreel"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                {/* Center play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <div className="relative">
                    {/* Pulse rings */}
                    <motion.div
                      animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full bg-[#328442]/40"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.4], opacity: [0.25, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                      className="absolute inset-0 rounded-full bg-white/15"
                    />
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl"
                    >
                      <svg className="w-8 h-8 md:w-9 md:h-9 text-[#328442] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                  <span className="text-white/70 text-xs tracking-[0.3em] uppercase font-medium">
                    {isVi ? 'Xem video' : 'Watch now'}
                  </span>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Lapla Landscape</p>
                    <p className="text-white font-semibold text-base md:text-lg leading-snug">
                      {isVi ? 'Hành Trình Kiến Tạo Cảnh Quan' : 'The Art of Landscape Making'}
                    </p>
                  </div>
                  <span className="shrink-0 ml-4 px-3 py-1.5 rounded-full bg-[#328442] text-white text-[10px] font-semibold tracking-widest uppercase">
                    Showreel
                  </span>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/B9VRvOKKwfs?autoplay=1&mute=1&rel=0"
                title="Lapla Landscape Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: '17+', labelVi: 'Năm kinh nghiệm', labelEn: 'Years of expertise' },
            { value: '200+', labelVi: 'Dự án hoàn thành', labelEn: 'Projects delivered' },
            { value: '5★', labelVi: 'Đánh giá khách hàng', labelEn: 'Client rating' },
          ].map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <span className="text-3xl md:text-4xl font-bold text-gray-900">{s.value}</span>
              <span className="text-[11px] text-gray-400 tracking-wide leading-tight max-w-[80px] uppercase">
                {isVi ? s.labelVi : s.labelEn}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
