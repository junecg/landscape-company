'use client';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const benefits = [
  {
    icon: '🏡',
    titleVi: 'Tăng Giá Trị Bất Động Sản',
    titleEn: 'Increase Property Value',
    descVi: 'Một cảnh quan được thiết kế hài hòa và chuyên nghiệp không chỉ nâng cao vẻ đẹp tổng thể mà còn góp phần gia tăng giá trị cho bất động sản.',
    descEn: 'A professionally designed landscape not only enhances overall beauty but also significantly increases the value of your property.',
  },
  {
    icon: '🌿',
    titleVi: 'Cải Thiện Chất Lượng Sống',
    titleEn: 'Improve Quality of Life',
    descVi: 'Không gian xanh giúp con người gần gũi hơn với thiên nhiên, giảm căng thẳng, cải thiện tâm trạng và mang lại cảm giác thư thái, trong lành.',
    descEn: 'Green spaces bring people closer to nature, reduce stress, improve mood, and create a sense of tranquility and freshness.',
  },
  {
    icon: '🌍',
    titleVi: 'Bảo Vệ Môi Trường',
    titleEn: 'Protect the Environment',
    descVi: 'Thiết kế cảnh quan thông minh góp phần bảo tồn tài nguyên đất, nước, đồng thời tạo môi trường sinh sống bền vững cho hệ sinh thái động – thực vật.',
    descEn: 'Smart landscape design helps conserve soil and water resources, while creating a sustainable habitat for flora and fauna ecosystems.',
  },
  {
    icon: '📐',
    titleVi: 'Tối Ưu Hóa Không Gian',
    titleEn: 'Optimize Space',
    descVi: 'Cảnh quan được quy hoạch hợp lý giúp khai thác tối đa diện tích sử dụng, mang lại sự tiện nghi và giá trị thẩm mỹ cho toàn bộ công trình.',
    descEn: 'Well-planned landscaping maximizes usable area, bringing comfort and aesthetic value to the entire project.',
  },
];

export default function BenefitsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#07130a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[#328442] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            {isVi ? 'Lợi Ích' : 'Benefits'}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            {isVi ? 'Tại Sao Chọn Cảnh Quan Xanh?' : 'Why Choose Green Landscape?'}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#328442]/40 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="text-white font-semibold text-base mb-3 group-hover:text-[#48a85a] transition-colors">
                {isVi ? b.titleVi : b.titleEn}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {isVi ? b.descVi : b.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
