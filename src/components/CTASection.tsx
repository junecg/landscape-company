'use client';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CTASection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#07130a] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/HÌNH 4.jpg"
        alt=""
        fill
        className="object-cover opacity-30"
        sizes="100vw"
        aria-hidden
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07130a]/90 via-[#07130a]/60 to-[#07130a]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07130a]/60 to-transparent" />

      {/* Decorative green line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#328442]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#48a85a] mb-5"
          >
            {isVi ? 'Liên hệ' : 'Works'}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8"
          >
            {isVi ? (
              <>Sẵn sàng biến đổi<br /><span className="text-[#48a85a]">không gian xanh</span><br />của bạn?</>
            ) : (
              <>Ready to transform<br /><span className="text-[#48a85a]">your garden</span>?</>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            {isVi
              ? 'Hãy để Lapla biến không gian sống của bạn thành một khu vườn đẹp như mơ. Liên hệ ngay hôm nay để nhận tư vấn miễn phí.'
              : 'Let Lapla turn your living space into a dream garden. Contact us today for a free consultation.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#328442] text-white font-semibold rounded-full hover:bg-[#48a85a] transition-colors shadow-lg shadow-[#328442]/30"
            >
              {isVi ? 'Liên hệ ngay' : 'Contact Us'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              {isVi ? 'Xem dự án' : 'View Projects'}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative floating numbers */}
      <div className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-right">
        {['200+', '17+', '5★'].map((num, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            className="text-right"
          >
            <p className="text-3xl font-bold text-white/90">{num}</p>
            <p className="text-[10px] tracking-widest uppercase text-white/40 mt-0.5">
              {i === 0 ? (locale === 'vi' ? 'Dự án' : 'Projects') : i === 1 ? (locale === 'vi' ? 'Năm KN' : 'Years') : (locale === 'vi' ? 'Đánh giá' : 'Rating')}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
