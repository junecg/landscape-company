'use client';
import { useLocale } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const testimonials = [
  {
    quoteVi: 'Sự tận tâm của Lapla trong việc hiện thực hóa tầm nhìn của chúng tôi thật đặc biệt. Họ biến khu vườn bình thường thành một ốc đảo yên tĩnh tuyệt vời. Sự chú ý đến từng chi tiết và các phương pháp bền vững trong thiết kế đã thực sự gây ấn tượng với chúng tôi.',
    quoteEn: "Lapla's dedication to bringing our vision to life was exceptional. They turned our backyard into a haven of tranquility. Their attention to detail and sustainable practices on their design impressed us.",
    authorVi: 'Nguyễn Minh Tuấn',
    authorEn: 'Steve Evans',
    roleVi: 'CEO, Tập đoàn Hưng Thịnh',
    roleEn: 'CEO of Helsy Company',
  },
  {
    quoteVi: 'Chúng tôi rất hài lòng với kết quả cuối cùng. Đội ngũ Lapla làm việc chuyên nghiệp, đúng tiến độ và luôn lắng nghe ý kiến của chúng tôi trong suốt quá trình thi công.',
    quoteEn: 'We are very satisfied with the final result. The Lapla team worked professionally, on schedule and always listened to our feedback throughout the construction process.',
    authorVi: 'Trần Thu Hà',
    authorEn: 'Tran Thu Ha',
    roleVi: 'Giám đốc, Vingroup',
    roleEn: 'Director, Vingroup',
  },
  {
    quoteVi: 'Khu vườn mà Lapla thiết kế cho khu nghỉ dưỡng của chúng tôi đã trở thành điểm nhấn được khách hàng yêu thích nhất. Chuyên nghiệp từ khâu thiết kế đến thi công và bàn giao.',
    quoteEn: 'The garden Lapla designed for our resort has become the most beloved highlight for our guests. Professional from design to construction and handover.',
    authorVi: 'Lê Hoàng Nam',
    authorEn: 'Le Hoang Nam',
    roleVi: 'Chủ đầu tư, Fusion Resort',
    roleEn: 'Investor, Fusion Resort',
  },
];

export default function TestimonialsSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#f7faf7] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#328442] mb-10"
        >
          {isVi ? 'Testimonial' : 'Testimonial'}
        </motion.p>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          {/* Large quote mark */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-[#328442]/10 font-serif leading-none select-none" aria-hidden>
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-gray-700 text-lg md:text-2xl leading-relaxed font-light italic mb-10">
                <span className="text-[#328442] font-semibold not-italic">
                  {isVi ? t.quoteVi.split(' ').slice(0, 3).join(' ') : t.quoteEn.split(' ').slice(0, 2).join(' ')}
                </span>{' '}
                {isVi
                  ? t.quoteVi.split(' ').slice(3).join(' ')
                  : t.quoteEn.split(' ').slice(2).join(' ')}
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-[#328442]/40" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{isVi ? t.authorVi : t.authorEn}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{isVi ? t.roleVi : t.roleEn}</p>
                </div>
                <div className="w-8 h-px bg-[#328442]/40" />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-10"
        >
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#328442] hover:text-[#328442] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-1.5 bg-[#328442]' : 'w-2 h-2 bg-gray-300 hover:bg-[#328442]/40 -translate-y-0.5'}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#328442] hover:text-[#328442] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
