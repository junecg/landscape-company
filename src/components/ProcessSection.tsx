'use client';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    num: '01',
    titleVi: 'Tư vấn thiết kế',
    titleEn: 'Design consultation',
    descVi: 'Chúng tôi ngồi lại với bạn để thảo luận về tầm nhìn và mong muốn cho không gian xanh của bạn.',
    descEn: 'We sit down with you to understand your vision and gardening preferences.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    num: '02',
    titleVi: 'Thiết kế & lập kế hoạch',
    titleEn: 'Design & planning',
    descVi: 'Đội ngũ chuyên gia phác thảo thiết kế chi tiết phù hợp với mong muốn và không gian thực tế.',
    descEn: 'Our experts craft a detailed landscape design aligned with your desires and space.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
  {
    num: '03',
    titleVi: 'Triển khai thi công',
    titleEn: 'Implement construction',
    descVi: 'Sau khi thiết kế được duyệt, chúng tôi tiến hành thi công theo đúng kế hoạch đã định.',
    descEn: 'Once approved, we move forward to implement the plan with precision and care.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    num: '04',
    titleVi: 'Hoàn thiện & bàn giao',
    titleEn: 'Garden decorating',
    descVi: 'Chăm chút từng chi tiết để không gian xanh của bạn trở nên hoàn hảo đúng như mong muốn.',
    descEn: 'We perfect every detail so your garden looks exactly as envisioned, then hand it over.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#f7faf7] overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#328442]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#328442]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#328442] mb-4">
              {isVi ? 'Quy trình' : 'How it works'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
              {isVi ? (
                <>Các bước đơn giản<br />cho <span className="text-[#328442]">cảnh quan</span> của bạn</>
              ) : (
                <>Simple steps for our<br /><span className="text-[#328442]">landscape</span> work</>
              )}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center gap-2 self-end"
          >
            {steps.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${i === 0 ? 'w-8 h-1.5 bg-[#328442]' : 'w-2 h-1.5 bg-[#328442]/20'}`}
              />
            ))}
          </motion.div>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#328442]/20 transition-all duration-300 overflow-hidden"
            >
              {/* Top green bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#328442] to-[#48a85a] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl" />

              {/* Big ghost number */}
              <span className="absolute right-2 top-2 font-black text-[80px] leading-none text-gray-900/[0.04] select-none pointer-events-none group-hover:text-[#328442]/8 transition-colors duration-300">
                {step.num}
              </span>

              {/* Icon */}
              <div className="relative w-12 h-12 rounded-2xl bg-[#328442]/8 text-[#328442] flex items-center justify-center mb-6 group-hover:bg-[#328442] group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>

              {/* Step label */}
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#328442] font-semibold mb-3">
                {isVi ? `Bước ${step.num}` : `Step ${step.num}`}
              </p>

              <h3 className="font-display text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#328442] transition-colors duration-300">
                {isVi ? step.titleVi : step.titleEn}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {isVi ? step.descVi : step.descEn}
              </p>

              {/* Arrow bottom right */}
              <div className="mt-6 flex justify-end">
                <div className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-[#328442] group-hover:bg-[#328442] flex items-center justify-center transition-all duration-300">
                  <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom connector — desktop only */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="hidden lg:block mt-8 h-px bg-gradient-to-r from-transparent via-[#328442]/20 to-transparent origin-left"
        />
      </div>
    </section>
  );
}
