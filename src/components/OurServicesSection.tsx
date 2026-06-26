'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

type Service = {
  id: string;
  slug: string;
  icon: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  images: string[];
  published: boolean;
  order: number;
};

export default function OurServicesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.ok ? r.json() : [])
      .then((data: Service[]) => setServices(data.filter(s => s.published).slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <section className="leafix-section relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="absolute inset-0 pointer-events-none select-none" style={{ backgroundImage: 'url(/images/shapes/service-bg-shape.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover', opacity: 0.35 }} />
      {/* Decorative background text */}
      <div
        className="absolute top-0 right-0 font-display font-bold select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(8rem, 18vw, 21.6rem)',
          color: 'rgba(130,180,64,0.06)',
          lineHeight: 1,
          top: '-2rem',
          right: '-2rem',
        }}
      >
        GREEN
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
              {isVi ? 'Dịch vụ của chúng tôi' : 'Our Service'}
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 4.8rem)', color: 'var(--color-text-primary)' }}
            >
              {isVi
                ? <>Giải pháp cho cảnh quan<br />dân dụng và thương mại</>
                : <>Solutions for Residential<br />and Commercial Landscaping</>
              }
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:gap-3"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dịch vụ' : 'View All Services'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i % 3} duration={650}>
              <Link
                href={`/${locale}/services`}
                className="group block bg-white transition-all duration-300 h-full"
                style={{ borderRadius: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(130,180,64,0.22)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ padding: '28px' }}>
                  {/* Header row: title + icon badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <h3
                      className="font-display font-bold text-lg leading-snug transition-colors duration-200 group-hover:text-[var(--color-brand)]"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {isVi ? service.titleVi : service.titleEn}
                    </h3>
                    <div
                      className="shrink-0 w-14 h-14 flex items-center justify-center text-2xl transition-colors duration-300"
                      style={{ backgroundColor: '#f5f1e6', borderRadius: '14px' }}
                    >
                      {service.icon}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-40 overflow-hidden mb-5 flex items-center justify-center" style={{ borderRadius: '16px', backgroundColor: '#f5f1e6' }}>
                    {service.images?.[0] ? (
                      <Image
                        src={service.images[0]}
                        alt={isVi ? service.titleVi : service.titleEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <span className="text-6xl">{service.icon}</span>
                    )}
                    <div
                      className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: 'rgba(130,180,64,0.3)' }}
                    />
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                    {isVi ? service.descVi : service.descEn}
                  </p>

                  {/* Divider */}
                  <div className="h-px w-full mb-5" style={{ backgroundColor: '#ececec' }} />

                  {/* Icon button + label */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text-primary)', borderRadius: '10px' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>
                      {isVi ? 'Xem chi tiết' : 'View Details'}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA text */}
        <ScrollReveal delay={2} className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {isVi
              ? 'Chúng tôi là công ty cảnh quan độc lập lớn nhất · '
              : 'We Are the Largest Independent Landscaping Company · '}
            <Link
              href={`/${locale}/services`}
              className="font-bold transition-colors duration-200"
              style={{ color: 'var(--color-brand)' }}
            >
              {isVi ? 'Xem tất cả dịch vụ →' : 'View All Services →'}
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
