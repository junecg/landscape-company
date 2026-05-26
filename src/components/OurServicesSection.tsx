'use client';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';

const services = [
  {
    number: '01',
    titleVi: 'Thiết kế & Thi công cảnh quan',
    titleEn: 'Home Garden',
    subtitleVi: 'Thiết kế · Thi công',
    subtitleEn: 'Design · Build',
    descVi: 'Kiến tạo không gian xanh hoàn hảo cho ngôi nhà của bạn, từ sân vườn đến nội thất xanh.',
    descEn: 'Crafting the perfect garden space for your home, whether indoor or outdoor, all ready for your greenery needs.',
    image: '/images/hero/FUSION 1.webp',
  },
  {
    number: '02',
    titleVi: 'Tuyển chọn cây xanh',
    titleEn: 'Plant Selection',
    subtitleVi: 'Cây xanh · Thảm cỏ',
    subtitleEn: 'Greenery · Turf',
    descVi: 'Tuyển chọn và cung cấp cây xanh, thảm cỏ chất lượng cao phù hợp với mọi công trình.',
    descEn: 'Carefully selecting and providing the perfect plants and greenery for your landscape.',
    image: '/images/hero/FUSION 2.jpg',
  },
  {
    number: '03',
    titleVi: 'Cảnh quan cứng',
    titleEn: 'Hard Scaping',
    subtitleVi: 'Đá · Vật liệu',
    subtitleEn: 'Stone · Materials',
    descVi: 'Thiết kế và thi công các hạng mục cứng: lối đi, sân đá, hồ nước, tiểu cảnh nghệ thuật.',
    descEn: 'Designing and constructing hardscape elements: pathways, stone patios, water features and art installations.',
    image: '/images/hero/FUSION 4.png',
  },
  {
    number: '04',
    titleVi: 'Cảnh quan công cộng',
    titleEn: 'Public Garden',
    subtitleVi: 'Công viên · Đô thị',
    subtitleEn: 'Park · Urban',
    descVi: 'Thiết kế và thi công cảnh quan cho các dự án công viên, khu đô thị và không gian công cộng.',
    descEn: 'Landscape design and construction for parks, urban developments and public spaces.',
    image: '/images/hero/HÌNH 3.jpg',
  },
  {
    number: '05',
    titleVi: 'Bảo dưỡng cảnh quan',
    titleEn: 'Maintenance',
    subtitleVi: 'Bảo dưỡng · Chăm sóc',
    subtitleEn: 'Care · Upkeep',
    descVi: 'Dịch vụ bảo dưỡng định kỳ để không gian xanh của bạn luôn tươi đẹp và phát triển tốt.',
    descEn: 'Regular maintenance services to keep your green spaces vibrant, healthy and thriving year-round.',
    image: '/images/hero/HÌNH 4.jpg',
  },
];

export default function OurServicesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#f7faf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#328442] mb-3">
              {isVi ? 'Dịch vụ' : 'Services'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
              {isVi ? 'Dịch vụ của chúng tôi' : 'Our Services'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#328442] hover:text-[#48a85a] transition-colors group"
            >
              {isVi ? 'Xem tất cả dịch vụ' : 'See More Services'}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Service cards — outer div handles mobile scroll breakout */}
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0">
          {/* Inner div: row on mobile (w-max so cards don't shrink), grid on desktop */}
          <div className="flex gap-4 w-max snap-x snap-mandatory md:snap-none md:grid md:grid-cols-5 md:w-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative group snap-start w-[220px] md:w-auto rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background image */}
              <div className="relative h-[380px] md:h-[460px]">
                <Image
                  src={service.image}
                  alt={isVi ? service.titleVi : service.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 260px, 20vw"
                />
                {/* Gradient overlay — always present, deepens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />

                {/* Top tags */}
                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[10px] tracking-widest uppercase text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                      {isVi ? service.subtitleVi.split('·')[0].trim() : service.subtitleEn.split('·')[0].trim()}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                      {isVi ? service.subtitleVi.split('·')[1]?.trim() : service.subtitleEn.split('·')[1]?.trim()}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-white/40">{service.number}</span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug mb-2">
                    {isVi ? service.titleVi : service.titleEn}
                  </h3>

                  {/* Description — slides up on hover */}
                  <motion.div
                    animate={{ height: hovered === i ? 'auto' : 0, opacity: hovered === i ? 1 : 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/70 text-sm leading-relaxed pt-1 pb-3">
                      {isVi ? service.descVi : service.descEn}
                    </p>
                  </motion.div>

                  {/* Arrow */}
                  <div className={`w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 ${hovered === i ? 'bg-[#328442] border-[#328442]' : ''}`}>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>{/* end inner flex/grid */}
        </div>{/* end outer scroll wrapper */}

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 md:mt-16 grid grid-cols-3 rounded-2xl overflow-hidden border border-green-100 shadow-sm"
        >
          {[
            { value: '17+', labelVi: 'Năm kinh nghiệm', labelEn: 'Years Experience' },
            { value: '200+', labelVi: 'Dự án hoàn thành', labelEn: 'Projects Completed' },
            { value: '5★', labelVi: 'Đánh giá khách hàng', labelEn: 'Client Rating' },
          ].map((stat, i) => (
            <div key={stat.value} className={`relative bg-white px-2 md:px-6 py-5 md:py-8 text-center ${i < 2 ? 'border-r border-green-100' : ''}`}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#328442] to-[#48a85a]" />
              <p className="text-xl md:text-3xl font-bold text-[#328442] mb-1">{stat.value}</p>
              <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-gray-400">
                {isVi ? stat.labelVi : stat.labelEn}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
