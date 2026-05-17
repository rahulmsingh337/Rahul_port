import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────

const skillTags = [
  {
    id: 'func',
    title: 'SAP S/4HANA Functional Professional',
    issuer: 'Infosys',
    image: '/cert-sap-func.png',
  },
  {
    id: 'tech',
    title: 'SAP S/4 HANA Technical Professional',
    issuer: 'Infosys',
    image: '/cert-sap-tech.png',
  },
];

const riseAwards = [
  {
    id: 'coe-ace',
    title: 'COE ACE',
    category: 'Individual Category',
    period: 'H1-FY26',
    image: '/cert-coe-ace.png',
  },
  {
    id: 'eureka',
    title: 'Eureka',
    category: 'Individual Category',
    period: 'H1-FY26',
    image: '/cert-eureka.png',
  },
  {
    id: 'rookie-rise',
    title: 'Rookie of the Qtr',
    category: 'Individual Category',
    period: 'H1-FY26',
    image: '/cert-rookie.png',
  },
  {
    id: 'rookie-q2',
    title: 'Rookie of the Qtr',
    category: 'RISE Awards',
    period: 'FY25 Q2',
    image: '/ach-unit-rise.png',
  },
];

const instaAwards = [
  {
    id: 'ia1',
    title: 'Onboarding Star',
    note: 'Delivered all requirements on time as a newcomer and helped manage team workload',
    date: 'Nov 2021',
    image: '/award-1.png',
  },
  {
    id: 'ia2',
    title: 'Front-end API Development',
    note: 'Helped create API in front-end web development',
    date: 'Nov 2022',
    image: '/award-2.png',
  },
  {
    id: 'ia3',
    title: 'Debugging & RCA',
    note: 'Helped in debugging and understanding root cause analysis',
    date: 'Sep 2022',
    image: '/award-3.png',
  },
  {
    id: 'ia4',
    title: 'Project Skill Enhancement',
    note: 'Helped the team understand the project and enhance skills',
    date: 'Feb 2023',
    image: '/award-4.png',
  },
  {
    id: 'ia5',
    title: 'Firebase Auth App',
    note: 'Helped build Firebase authentication application',
    date: 'Apr 2023',
    image: '/award-5.png',
  },
  {
    id: 'ia6',
    title: 'SAP Fiori App Builder',
    note: 'Recognised for helping build SAP Fiori application',
    date: 'May 2023',
    image: '/award-6.png',
  },
  {
    id: 'ia7',
    title: 'Peer Support — HTML/CSS',
    note: 'Supportive in solving doubts; helped teammates with HTML, CSS',
    date: 'Aug 2023',
    image: '/award-7.png',
  },
  {
    id: 'ia8',
    title: 'Technical Documentation Lead',
    note: 'Prepared artifacts and recordings from technical end on Kongara Project',
    date: 'Nov 2023',
    image: '/award-8.png',
  },
  {
    id: 'ia9',
    title: 'Quick Learner & Team Excellence',
    note: 'Recognised as a quick learner and excellent team member',
    date: 'Nov 2023',
    image: '/award-9.png',
  },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed left-0 right-0 bottom-0 z-[200] bg-black/95 backdrop-blur-md"
      style={{ top: '72px', display: 'grid', placeItems: 'center', paddingBottom: '16px' }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Image — double-click to close */}
      <motion.img
        key={current}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={images[current]}
        alt="Certificate"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={onClose}
        style={{
          maxHeight: 'calc(100vh - 104px)',
          maxWidth: 'min(92vw, 960px)',
          width: 'auto',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
          borderRadius: '12px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          cursor: 'zoom-out',
          marginBottom: images.length > 1 ? '32px' : '0',
        }}
      />

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'w-6 bg-royal-indigo' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────────

export const Awards: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index: number) =>
    setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);

  return (
    <>
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>

      <section id="awards" className="py-24 px-6">
        <div className="mx-auto max-w-7xl space-y-24">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-royal-indigo">
              Recognition & Achievements
            </h2>
            <h3 className="mt-4 text-4xl font-bold text-white tracking-tighter">
              Awards & Skill Tags
            </h3>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed text-sm">
              Internal recognitions from Infosys EASSAP spanning skill certifications,
              peer nominations, and quarterly RISE awards.
            </p>
          </motion.div>

          {/* Skill Tags */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 rounded-xl bg-royal-indigo/10 text-royal-indigo">
                <Medal size={18} />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
                Infosys Skill Tags
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              {skillTags.map((tag, i) => (
                <motion.div
                  key={tag.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
                  onClick={() => openLightbox([tag.image], 0)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-white/10"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-royal-indigo to-vibrant-cyan" />
                  <div className="p-6 flex items-center gap-5">
                    <div className="shrink-0 w-20 h-14 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={tag.image}
                        alt={tag.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-royal-indigo mb-1">
                        {tag.issuer}
                      </p>
                      <h4 className="font-display font-semibold text-white/90 text-sm leading-snug group-hover:text-white transition-colors">
                        {tag.title}
                      </h4>
                    </div>
                    <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 text-royal-indigo transition-all">
                      <Star size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RISE Awards */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 rounded-xl bg-fiery-orange/10 text-fiery-orange">
                <Trophy size={18} />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
                EASSAP RISE Awards
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {riseAwards.map((award, i) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
                  onClick={() => openLightbox([award.image], 0)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-white/10"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-1">
                      {award.period}
                    </p>
                    <h4 className="font-display font-bold text-white/90 group-hover:text-white transition-colors">
                      {award.title}
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">{award.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insta Awards */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 rounded-xl bg-vibrant-cyan/10 text-vibrant-cyan">
                <Star size={18} />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
                Insta Awards — Peer Recognition
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {instaAwards.map((award, i) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: 'easeOut' }}
                  onClick={() => openLightbox(instaAwards.map((a) => a.image), i)}
                  className="group relative cursor-pointer flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:border-white/10 transition-all"
                >
                  <div className="shrink-0 w-16 h-12 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-vibrant-cyan/70 mb-0.5">
                      {award.date}
                    </p>
                    <h5 className="font-display font-semibold text-white/80 text-sm leading-tight group-hover:text-white transition-colors">
                      {award.title}
                    </h5>
                    <p className="text-slate-600 text-xs mt-1 leading-snug line-clamp-2 group-hover:text-slate-500 transition-colors">
                      {award.note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
