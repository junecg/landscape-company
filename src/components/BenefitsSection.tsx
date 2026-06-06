'use client';
import { useLocale } from 'next-intl';
import ScrollReveal from './ScrollReveal';

const benefits = [
  {
    titleVi: 'Tăng Giá Trị Bất Động Sản',
    titleEn: 'Increase Property Value',
    descVi: 'Một cảnh quan được thiết kế hài hòa và chuyên nghiệp góp phần gia tăng giá trị cho bất động sản của bạn.',
    descEn: 'A professionally designed landscape significantly increases the value of your property.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    titleVi: 'Cải Thiện Chất Lượng Sống',
    titleEn: 'Improve Quality of Life',
    descVi: 'Không gian xanh giúp con người gần gũi thiên nhiên hơn, giảm căng thẳng và mang lại cảm giác thư thái.',
    descEn: 'Green spaces bring people closer to nature, reduce stress, and create a sense of tranquility.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    titleVi: 'Bảo Vệ Môi Trường',
    titleEn: 'Protect the Environment',
    descVi: 'Thiết kế cảnh quan thông minh góp phần bảo tồn tài nguyên đất, nước và tạo môi trường sinh sống bền vững.',
    descEn: 'Smart landscape design helps conserve soil and water resources, creating a sustainable habitat.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    titleVi: 'Tối Ưu Hóa Không Gian',
    titleEn: 'Optimize Space Usage',
    descVi: 'Cảnh quan được quy hoạch hợp lý giúp khai thác tối đa diện tích và mang lại giá trị thẩm mỹ cao.',
    descEn: 'Well-planned landscaping maximizes usable area, bringing comfort and aesthetic value.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
  },
];

export default function BenefitsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section relative overflow-hidden" style={{ backgroundColor: '#0e2208' }}>
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #0f541e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: '#c7dc49', filter: 'blur(120px)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: '#0f541e' }}>
              {isVi ? 'Lợi ích' : 'Benefits'}
            </p>
            <h2
              className="font-display font-bold leading-tight text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              {isVi
                ? <span>Tại sao chọn<br /><span style={{ color: '#0f541e' }}>cảnh quan xanh?</span></span>
                : <span>Why Choose<br /><span style={{ color: '#0f541e' }}>Green Landscaping?</span></span>
              }
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {isVi
                ? 'Không gian xanh không chỉ là vẻ đẹp — đó là đầu tư thông minh cho cuộc sống.'
                : 'Green spaces are not just beauty — they are a smart investment for your life.'}
            </p>
          </ScrollReveal>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.titleEn} delay={i % 4} duration={600}>
              <div
                className="benefit-card group p-7 border transition-all duration-300 cursor-default h-full"
                style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = '#c7dc49';
                  el.style.borderColor = '#c7dc49';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ backgroundColor: 'rgba(130,180,64,0.15)', color: '#0f541e' }}
                >
                  {b.icon}
                </div>
                <h3
                  className="font-bold text-base mb-3 transition-colors duration-300 text-white"
                >
                  {isVi ? b.titleVi : b.titleEn}
                </h3>
                <p
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {isVi ? b.descVi : b.descEn}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .benefit-card:hover h3 { color: white; }
        .benefit-card:hover p { color: rgba(255,255,255,0.8) !important; }
        .benefit-card:hover [style*="rgba(130,180,64,0.15)"] {
          background-color: rgba(255,255,255,0.2) !important;
          color: white !important;
        }
      `}</style>
    </section>
  );
}
