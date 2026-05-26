'use client';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const values = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    titleVi: 'Toàn diện & chất lượng',
    titleEn: 'Comprehensive & quality',
    descVi: 'Lapla mang đến giải pháp cảnh quan toàn diện, sáng tạo và chất lượng cho mọi công trình từ resort đến đô thị.',
    descEn: 'Lapla delivers comprehensive, creative and quality landscape solutions for every project, from resorts to urban developments.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    titleVi: 'Hệ sinh thái chuyên biệt',
    titleEn: 'Specialized ecosystem',
    descVi: 'Lapla Group — hệ sinh thái gồm các công ty thành viên chuyên biệt, phối hợp đồng bộ từ thiết kế, thi công đến vận hành.',
    descEn: 'Lapla Group — an ecosystem of specialized member companies, collaborating seamlessly from design and construction to operations.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    titleVi: 'Bền vững là nền tảng',
    titleEn: 'Sustainability at the core',
    descVi: 'Hài hòa giữa thiên nhiên – kiến trúc – con người, xây dựng không gian xanh bền vững theo thời gian.',
    descEn: 'Harmonizing nature, architecture, and people to build green spaces that endure through time.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    titleVi: 'Sáng tạo không giới hạn',
    titleEn: 'Creativity unleashed',
    descVi: 'Từ cảnh quan sân golf đến Artwork biểu tượng — mỗi công trình là một dấu ấn sáng tạo độc đáo của Lapla.',
    descEn: 'From golf course landscapes to iconic Artwork — every project bears the unique creative stamp of Lapla.',
  },
];

export default function ValuesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#328442] mb-4"
        >
          {isVi ? 'Giá trị' : 'Values'}
        </motion.p>

        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">

          {/* Left — headline + image */}
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-8"
            >
              {isVi ? (
                <>Chúng tôi<br /><span className="text-[#328442]">kiến tạo</span><br />vẻ đẹp xanh</>
              ) : (
                <>We craft<br /><span className="text-[#328442]">green beauty</span><br />that endures</>
              )}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl"
            >
              <Image
                src="/images/hero/FUSION 1.webp"
                alt={isVi ? 'Cảnh quan Lapla' : 'Lapla Landscape'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-5 right-5 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#328442]">17+</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{isVi ? 'Năm KN' : 'Years'}</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#328442]">200+</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{isVi ? 'Dự án' : 'Projects'}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#328442] text-white text-sm font-semibold rounded-full hover:bg-[#48a85a] transition-colors"
              >
                {isVi ? 'Về chúng tôi' : 'About Lapla'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right — 4 value cards */}
          <div className="lg:w-1/2">
            {/* Tab-style selector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-2 mb-8"
            >
              <span className="px-4 py-1.5 rounded-full bg-[#328442] text-white text-xs font-semibold tracking-wide">
                {isVi ? 'Cảnh quan & Sân Golf' : 'Landscape & Golf'}
              </span>
              <span className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-semibold tracking-wide">
                {isVi ? 'Artwork & Resort' : 'Artwork & Resort'}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="group bg-[#f7faf7] rounded-2xl p-6 hover:bg-[#328442] transition-colors duration-300 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-white/20 flex items-center justify-center text-[#328442] group-hover:text-white transition-colors mb-4 shadow-sm">
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-white text-base mb-2 transition-colors">
                    {isVi ? v.titleVi : v.titleEn}
                  </h3>
                  <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors">
                    {isVi ? v.descVi : v.descEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
