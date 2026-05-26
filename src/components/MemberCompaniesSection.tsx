'use client';
import { useLocale } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { memberCompanies } from '@/lib/data';

type Member = typeof memberCompanies[number];

/* ── Modal ── */
function MemberModal({ member, onClose, isVi }: { member: Member; onClose: () => void; isVi: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#07130a] px-7 pt-7 pb-6">
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Đóng">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#48a85a] bg-[#328442]/20 px-3 py-1 rounded-full border border-[#328442]/30 mb-3">
            {member.tagline}
          </span>
          <div className="flex items-center gap-4 mt-1">
            <div className="w-14 h-14 rounded-2xl bg-[#328442]/20 border border-[#328442]/30 flex items-center justify-center">
              <span className="font-black text-[#48a85a] text-lg tracking-wide">{member.abbr}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-white/40 text-xs mt-0.5">{member.abbr} · Lapla Group</p>
            </div>
          </div>
        </div>
        <div className="px-7 py-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{isVi ? 'Giới thiệu' : 'About'}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{isVi ? member.description : member.descriptionEn}</p>
        </div>
        <div className="px-7 py-4 border-t border-gray-100 flex items-center gap-2 bg-gray-50/50">
          <div className="w-2 h-2 rounded-full bg-[#328442]" />
          <span className="text-xs text-gray-400">{isVi ? 'Thành viên của Lapla Group' : 'Member of Lapla Group'}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Card variants ── */
// Large featured card (first item)
function FeaturedCard({ company, onClick, isVi, index }: { company: Member; onClick: () => void; isVi: boolean; index: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onClick={onClick}
      className="group relative rounded-3xl bg-[#328442] overflow-hidden text-left cursor-pointer p-7 md:p-9 flex flex-col justify-between min-h-[240px]"
    >
      {/* Big decorative abbr watermark */}
      <span className="absolute -right-4 -bottom-4 font-black text-[120px] leading-none text-white/[0.07] select-none pointer-events-none">
        {company.abbr}
      </span>

      <div>
        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#48a85a] bg-white/10 px-3 py-1 rounded-full border border-white/20 mb-4">
          {company.tagline}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-snug">
          {company.name}
        </h3>
      </div>

      <div className="flex items-end justify-between mt-6">
        <p className="text-white/60 text-sm leading-relaxed max-w-[200px]">
          {isVi ? company.description : company.descriptionEn}
        </p>
        <div className="shrink-0 w-10 h-10 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors ml-4">
          <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

// Regular card
function MemberCard({ company, onClick, isVi, index }: { company: Member; onClick: () => void; isVi: boolean; index: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onClick={onClick}
      className="group relative rounded-2xl bg-white border border-gray-100 hover:border-[#328442]/30 hover:shadow-xl overflow-hidden text-left cursor-pointer p-6 flex flex-col justify-between transition-all duration-300"
    >
      {/* Hover top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#328442] to-[#48a85a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Abbr */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#328442]/8 group-hover:bg-[#328442] flex items-center justify-center transition-colors duration-300">
          <span className="font-black text-[#328442] group-hover:text-white text-sm tracking-wide transition-colors duration-300">
            {company.abbr}
          </span>
        </div>
        <div className="w-7 h-7 rounded-full border border-gray-100 group-hover:border-[#328442]/30 flex items-center justify-center transition-colors">
          <svg className="w-3 h-3 text-gray-300 group-hover:text-[#328442] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#328442]/60 mb-1.5">
          {company.tagline}
        </p>
        <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug group-hover:text-[#328442] transition-colors">
          {company.name}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mt-2 line-clamp-2">
          {isVi ? company.description : company.descriptionEn}
        </p>
      </div>
    </motion.button>
  );
}

/* ── Main ── */
export default function MemberCompaniesSection() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<Member | null>(null);

  const [featured, ...rest] = memberCompanies;

  return (
    <>
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
                Ecosystem
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
                {isVi ? (
                  <>Hệ sinh thái<br /><span className="text-[#328442]">Lapla Group</span></>
                ) : (
                  <>The <span className="text-[#328442]">Lapla</span><br />Ecosystem</>
                )}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right"
            >
              {isVi
                ? 'Hệ sinh thái toàn diện gồm các công ty thành viên chuyên biệt, cùng phát triển bền vững.'
                : 'A comprehensive ecosystem of specialized member companies, growing together sustainably.'}
            </motion.p>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Featured — spans 2 cols on lg */}
            <div className="sm:col-span-2 lg:col-span-2">
              <FeaturedCard
                company={featured}
                onClick={() => setSelected(featured)}
                isVi={isVi}
                index={0}
              />
            </div>

            {/* Rest — regular cards */}
            {rest.map((company, i) => (
              <MemberCard
                key={company.abbr}
                company={company}
                onClick={() => setSelected(company)}
                isVi={isVi}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <MemberModal member={selected} onClose={() => setSelected(null)} isVi={isVi} />
        )}
      </AnimatePresence>
    </>
  );
}
