'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { projects } from '@/lib/data';
import ScrollReveal from './ScrollReveal';

const TABS = [
  { keyVi: 'Tất cả', keyEn: 'All' },
  { keyVi: 'Dân dụng', keyEn: 'Residential' },
  { keyVi: 'Thương mại', keyEn: 'Commercial' },
  { keyVi: 'Golf & Resort', keyEn: 'Golf & Resort' },
];

export default function ProjectsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [activeTab, setActiveTab] = useState(0);

  const featured = projects.slice(0, 8);

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0f541e' }}>
              {isVi ? 'Dự án' : 'Our Works'}
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#111111' }}
            >
              {isVi
                ? <>Khám phá những công trình <span style={{ color: '#0f541e' }}>mới nhất</span></>
                : <>Our <span style={{ color: '#0f541e' }}>latest</span> garden works</>
              }
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:gap-3"
              style={{ color: '#0f541e' }}
            >
              {isVi ? 'Xem tất cả dự án' : 'View All Projects'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* Filter tabs */}
        <ScrollReveal delay={1} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab, i) => (
              <button
                key={tab.keyEn}
                onClick={() => setActiveTab(i)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  backgroundColor: activeTab === i ? '#c7dc49' : 'white',
                  color: activeTab === i ? 'white' : '#545454',
                  boxShadow: activeTab === i ? 'rgb(111,154,55) 0px 2px 0px 0px' : '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                {isVi ? tab.keyVi : tab.keyEn}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 4 equal-width image row — first row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {featured.slice(0, 4).map((project, i) => (
            <ScrollReveal key={project.id} delay={i % 4} duration={600}>
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="group block relative overflow-hidden rounded"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={project.image}
                  alt={isVi ? project.title : project.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                {/* Green border on hover */}
                <div
                  className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 0 3px #c7dc49' }}
                />
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: '#0f541e' }}>
                    {project.category}
                  </p>
                  <h3 className="font-display font-bold text-white text-sm leading-snug">
                    {isVi ? project.title : project.titleEn}
                  </h3>
                  <p className="text-white/50 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.location}
                  </p>
                </div>
                {/* Arrow */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100"
                  style={{ backgroundColor: '#c7dc49' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Second row — wider cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {featured.slice(4, 7).map((project, i) => (
            <ScrollReveal key={project.id} delay={i % 3} duration={600}>
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="group block relative overflow-hidden rounded"
                style={{ aspectRatio: '16/9' }}
              >
                <Image
                  src={project.image}
                  alt={isVi ? project.title : project.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div
                  className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 0 3px #c7dc49' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: '#0f541e' }}>
                    {project.category}
                  </p>
                  <h3 className="font-display font-bold text-white text-sm leading-snug">
                    {isVi ? project.title : project.titleEn}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={2} className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-3 px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200"
            style={{ border: '2px solid #c7dc49', color: '#141414' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#c7dc49';
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#c7dc49';
            }}
          >
            {isVi ? 'Xem toàn bộ dự án' : 'View All Projects'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
