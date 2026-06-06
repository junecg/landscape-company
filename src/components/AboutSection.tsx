'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <section className="leafix-section overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Images + floating stats */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main large image */}
              <div
                className="relative rounded overflow-hidden"
                style={{ height: '520px' }}
              >
                <Image
                  src="/images/hero/hinh-3.jpg"
                  alt="Landscape garden"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Small inset image — top right */}
              <div
                className="absolute -top-6 -right-6 w-44 h-36 rounded overflow-hidden hidden md:block"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.15)', border: '4px solid white' }}
              >
                <Image
                  src="/images/hero/FUSION 2.jpg"
                  alt="Garden detail"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>

              {/* Floating stats card */}
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded px-6 py-5 hidden md:block"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)', minWidth: '220px' }}
              >
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '25k+', label: isVi ? 'Cây trồng' : 'Plants' },
                    { value: '350+', label: isVi ? 'Vườn' : 'Gardens' },
                    { value: '100%', label: isVi ? 'Hài lòng' : 'Satisfied' },
                  ].map((s) => (
                    <div key={s.value} className="text-center">
                      <p className="font-display font-bold text-lg leading-none" style={{ color: '#0f541e' }}>
                        {s.value}
                      </p>
                      <p className="text-[10px] mt-1 uppercase tracking-wider" style={{ color: '#545454' }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative green square behind image */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded -z-10 hidden md:block"
                style={{ backgroundColor: '#c7dc49', opacity: 0.15 }}
              />
            </div>
          </ScrollReveal>

          {/* RIGHT: Text content */}
          <ScrollReveal direction="right" delay={2}>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: '#0f541e' }}>
              {isVi ? 'Về chúng tôi' : 'About Us'}
            </p>
            <h2
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#111111' }}
            >
              {isVi
                ? <>Kiến tạo không gian xanh<br /><span style={{ color: '#0f541e' }}>truyền cảm hứng sống</span></>
                : <>Crafting Green Spaces<br />That <span style={{ color: '#0f541e' }}>Inspire Living</span></>
              }
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: '#545454', lineHeight: '28px' }}>
              {isVi
                ? 'Với hơn 17 năm kinh nghiệm, Lapla đã và đang kiến tạo những không gian xanh đẳng cấp cho hàng trăm công trình dân dụng và thương mại. Chúng tôi kết hợp thiết kế sáng tạo với kỹ thuật thi công chuyên nghiệp, mang đến những khu vườn bền đẹp vượt thời gian.'
                : 'With over 17 years of experience, Lapla has been crafting premium green spaces for hundreds of residential and commercial projects. We combine creative design with professional construction, delivering timeless gardens that endure.'
              }
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-10">
              {(isVi ? [
                { title: 'Thiết kế cá nhân hóa', desc: 'Mỗi dự án được thiết kế riêng biệt, phù hợp với phong cách và nhu cầu của từng khách hàng.' },
                { title: 'Đội ngũ chuyên gia', desc: 'Kiến trúc sư cảnh quan giàu kinh nghiệm, am hiểu đặc điểm khí hậu và thổ nhưỡng địa phương.' },
                { title: 'Bảo dưỡng dài hạn', desc: 'Dịch vụ chăm sóc định kỳ giúp không gian xanh luôn tươi đẹp quanh năm.' },
              ] : [
                { title: 'Personalized Design', desc: 'Every project is uniquely designed to match each client\'s style and requirements.' },
                { title: 'Expert Team', desc: 'Experienced landscape architects with deep knowledge of local climate and soil conditions.' },
                { title: 'Long-term Maintenance', desc: 'Regular care services keep your green spaces vibrant and beautiful year-round.' },
              ]).map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded shrink-0 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: '#f5f9f0' }}
                  >
                    <svg className="w-5 h-5" style={{ color: '#0f541e' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: '#111111' }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#545454' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-3 px-7 py-3.5 text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#c7dc49', color: '#141414', borderRadius: '10px', }}
            >
              {isVi ? 'Tìm hiểu thêm' : 'Discover More'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
