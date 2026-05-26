'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Featured layout: 1 large + 2 small
  const featured = projects.slice(0, 6);
  const main = featured[0];
  const secondary = featured.slice(1, 3);
  const rest = featured.slice(3, 6);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#328442] mb-3">
              {isVi ? 'Dự án' : 'Works'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
              {isVi ? (
                <>Khám phá những<br />công trình <span className="text-[#328442]">mới nhất</span></>
              ) : (
                <>Get to know our<br /><span className="text-[#328442]">latest</span> garden works</>
              )}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#328442] hover:text-[#48a85a] transition-colors group"
            >
              {isVi ? 'Xem tất cả dự án' : 'View All Projects'}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Main featured layout: large + 2 side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Large main project */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Link
              href={`/${locale}/projects/${main.slug}`}
              className="group block relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[520px]"
              onMouseEnter={() => setHoveredIdx(0)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Image
                src={main.image}
                alt={isVi ? main.title : main.titleEn}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Project info */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-px bg-[#48a85a]" />
                  <span className="text-[10px] tracking-widest uppercase text-[#48a85a] font-semibold">
                    {String(1).padStart(2, '0')} — {main.category}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-snug mb-2">
                  {isVi ? main.title : main.titleEn}
                </h3>
                <p className="text-white/50 text-sm">
                  {main.location} · {main.year}
                </p>
              </div>

              {/* Hover arrow */}
              <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-[#328442] flex items-center justify-center transition-all duration-300 ${hoveredIdx === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* 2 side projects stacked */}
          <div className="flex flex-row lg:flex-col gap-4">
            {secondary.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                className="flex-1 lg:flex-none"
              >
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[250px]"
                  onMouseEnter={() => setHoveredIdx(i + 1)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <Image
                    src={project.image}
                    alt={isVi ? project.title : project.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="text-[10px] tracking-widest uppercase text-[#48a85a] font-semibold mb-1">
                      {project.category}
                    </p>
                    <h3 className="font-semibold text-white text-sm md:text-base leading-snug">
                      {isVi ? project.title : project.titleEn}
                    </h3>
                    <p className="text-white/40 text-xs mt-1">{project.location}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom row: 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            >
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="group block relative rounded-2xl overflow-hidden aspect-[4/3]"
                onMouseEnter={() => setHoveredIdx(i + 3)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Image
                  src={project.image}
                  alt={isVi ? project.title : project.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[9px] tracking-widest uppercase text-[#48a85a] font-semibold mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-semibold text-white text-sm leading-snug">
                    {isVi ? project.title : project.titleEn}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 border-2 border-[#328442]/0 rounded-2xl transition-all duration-300 ${hoveredIdx === i + 3 ? 'border-[#328442]/60' : ''}`} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#328442]/50 text-[#328442] font-semibold text-sm rounded-full hover:bg-[#328442] hover:text-white hover:border-[#328442] transition-all duration-300 group"
          >
            {isVi ? 'Xem toàn bộ dự án' : t('viewAll')}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
