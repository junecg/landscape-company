'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
}

const heroSlides = [
  {
    url: '/images/hero/FUSION 1.webp',
    labelVi: 'Cảnh quan Nghỉ Dưỡng',
    labelEn: 'Resort Landscape',
    projectVi: 'Laguna Lăng Cô Resort',
    projectEn: 'Laguna Lang Co Resort',
    locationVi: 'Lăng Cô, Thừa Thiên Huế',
    locationEn: 'Lang Co, Thua Thien Hue',
    descVi: 'Cảnh quan resort 5 sao đẳng cấp quốc tế, hài hòa thiên nhiên biển và núi.',
    descEn: 'International 5-star resort landscape in harmony with sea and mountain.',
  },
  {
    url: '/images/hero/FUSION 2.jpg',
    labelVi: 'Sân Golf Quốc Tế',
    labelEn: 'International Golf Course',
    projectVi: 'Sân Golf VinaCapital Đà Nẵng',
    projectEn: 'VinaCapital Golf Da Nang',
    locationVi: 'Đà Nẵng, Việt Nam',
    locationEn: 'Da Nang, Vietnam',
    descVi: 'Thi công cảnh quan và hệ thống tưới tiêu Rainbird cho sân golf 18 lỗ chuẩn quốc tế.',
    descEn: 'Landscape construction and Rainbird irrigation for an 18-hole international-standard golf course.',
  },
  {
    url: '/images/hero/FUSION 4.png',
    labelVi: 'Khu Đô Thị Xanh',
    labelEn: 'Green Urban Development',
    projectVi: 'Casamia – Khu Đô Thị Ven Sông',
    projectEn: 'Casamia – Riverside Urban Development',
    locationVi: 'Hội An, Quảng Nam',
    locationEn: 'Hoi An, Quang Nam',
    descVi: 'Thiết kế và thi công cảnh quan khu đô thị sinh thái ven sông Cổ Cò.',
    descEn: 'Landscape design and construction for an eco-urban development along the Co Co River.',
  },
  {
    url: '/images/hero/hinh-3.jpg',
    labelVi: 'Nông Trại Sinh Thái',
    labelEn: 'Eco Farm Landscape',
    projectVi: 'Cầu Đất Farm – Đà Lạt',
    projectEn: 'Cau Dat Farm – Da Lat',
    locationVi: 'Trạm Hành, Đà Lạt, Lâm Đồng',
    locationEn: 'Tram Hanh, Da Lat, Lam Dong',
    descVi: 'Cảnh quan và Artwork biểu tượng cho khu nông trại sinh thái 230 ha tại Đà Lạt.',
    descEn: 'Landscape and iconic Artwork for a 230-ha eco-farm in Da Lat.',
  },
  {
    url: '/images/hero/hinh-4.jpg',
    labelVi: 'Resort Sinh Thái',
    labelEn: 'Eco Resort',
    projectVi: 'Fiore Resort & Spa',
    projectEn: 'Fiore Resort & Spa',
    locationVi: 'Hội An, Quảng Nam',
    locationEn: 'Hoi An, Quang Nam',
    descVi: 'Cảnh quan nhiệt đới bền vững hòa hợp với kiến trúc resort cao cấp.',
    descEn: 'Sustainable tropical landscape in harmony with the premium resort architecture.',
  },
];

// Fake avatar colors for "satisfied clients"
const avatarColors = ['#328442', '#48a85a', '#BE7B2B', '#2d6e3a', '#5bbf6a'];

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const slideDuration = prefersReducedMotion ? 0.01 : 1.6;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5500);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const slide = heroSlides[current];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">

      {/* ── Background slides ── */}
      {heroSlides.map((s, i) => (
        <motion.div
          key={s.url}
          className="absolute inset-0"
          initial={{ opacity: i === 0 ? 1 : 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: slideDuration, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              prefersReducedMotion ? {} : i === current ? { scale: [1, 1.07] } : { scale: 1 }
            }
            transition={
              i === current
                ? { duration: 6, ease: 'easeOut' }
                : { duration: slideDuration, ease: 'easeInOut' }
            }
          >
            <Image
              src={s.url}
              alt={isVi ? s.labelVi : s.labelEn}
              fill
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Gradient: heavy left, lighter right so floating card is visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* ── Main layout ── */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-28 md:py-32">

        {/* Top content row */}
        <div className="flex items-start justify-between gap-8 mt-4 md:mt-0">

          {/* LEFT — headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#48a85a]" />
              <p className="text-[#48a85a] text-[10px] font-semibold tracking-[0.35em] uppercase">
                {t('eyebrow')}
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 md:mb-8">
              {isVi ? (
                <>Tạo Ra Những<br /><span className="text-[#48a85a]">Cảnh Quan</span><br />Tuyệt Đẹp</>
              ) : (
                <>Create Your<br /><span className="text-[#48a85a]">Dream</span><br />Garden</>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed mb-8 md:mb-10">
              {t('subtitle')}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#328442] text-white font-semibold rounded-full hover:bg-[#48a85a] transition-colors shadow-lg shadow-[#328442]/30 text-sm"
              >
                {t('cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/70 transition-all text-sm"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — floating project card (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="hidden lg:block shrink-0"
          >
            <div className="w-[260px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
              {/* Card image */}
              <div className="relative h-36">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.url}
                      alt={isVi ? slide.projectVi : slide.projectEn}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Verified badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#328442] flex items-center justify-center shadow-lg">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-[10px] tracking-widest uppercase text-[#48a85a] font-semibold mb-1">
                      {isVi ? slide.labelVi : slide.labelEn}
                    </p>
                    <h4 className="text-white font-bold text-sm leading-snug mb-2">
                      {isVi ? slide.projectVi : slide.projectEn}
                    </h4>
                    <p className="text-white/55 text-xs leading-relaxed mb-3">
                      {isVi ? slide.descVi : slide.descEn}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-[#48a85a] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span className="text-white/50 text-[11px]">
                        {isVi ? slide.locationVi : slide.locationEn}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Landscape Design / New Design Commission label under card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-3 flex items-center gap-2 justify-end"
            >
              <div className="w-2 h-2 rounded-full bg-[#328442] animate-pulse" />
              <span className="text-white/40 text-[10px] tracking-wider uppercase">
                {isVi ? 'Thiết kế cảnh quan' : 'Landscape Design'}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-end justify-between gap-4">

          {/* LEFT — satisfied clients */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 1 }}
            className="flex items-center gap-3"
          >
            {/* Stacked avatars */}
            <div className="flex -space-x-2">
              {avatarColors.map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-bold text-[10px]"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-bold text-sm">500+</p>
              <p className="text-white/50 text-[10px] tracking-wide">
                {isVi ? 'Khách hàng hài lòng' : 'Satisfied Clients'}
              </p>
            </div>
          </motion.div>

          {/* CENTER — slide label + dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 1.2 }}
            className="flex flex-col items-center gap-2"
          >
            {/* Slide label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] tracking-[0.25em] text-white/50 uppercase hidden sm:block"
              >
                {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')} — {isVi ? slide.labelVi : slide.labelEn}
              </motion.span>
            </AnimatePresence>

            {/* Dot indicators */}
            <fieldset className="flex gap-1.5 items-center border-0 p-0 m-0">
              <legend className="sr-only">Chọn slide</legend>
              {heroSlides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}: ${isVi ? s.labelVi : s.labelEn}`}
                  aria-pressed={i === current}
                  className="p-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === current ? 'w-8 bg-[#48a85a]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                </button>
              ))}
            </fieldset>
          </motion.div>

          {/* RIGHT — scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 1.4 }}
            className="hidden sm:flex flex-col items-center gap-1.5"
            aria-hidden="true"
          >
            <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
