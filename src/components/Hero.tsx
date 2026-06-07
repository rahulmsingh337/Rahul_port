import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Linkedin, Mail, Phone, Download, MapPin, Globe, Instagram } from 'lucide-react';
import { contentData } from '../data/ContentData';

/* ─── Sections 1 & 2: scroll-animated overlays ─── */
const ScrollSection: React.FC<{
  section: any;
  index: number; // 1 or 2
  scrollYProgress: MotionValue<number>;
}> = ({ section, index, scrollYProgress }) => {
  const start = index * 0.4;
  const end = (index + 1) * 0.4;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [start, end], [40, -40]);
  const subtextColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#8B5CF6', '#D8B4FE', '#22D3EE']
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      <motion.h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.1]">
        {section.text.split('. ').map((part: string, i: number) => (
          <span key={i} className="block mt-2">{part}</span>
        ))}
      </motion.h1>
      <motion.p
        style={{ color: subtextColor }}
        className="mt-8 font-mono text-sm uppercase tracking-[0.4em] md:text-lg font-medium"
      >
        {section.subtextText}
      </motion.p>
    </motion.div>
  );
};

/* ─── Section 0: static hero with banner ─── */
const HeroInitial: React.FC<{ scrollYProgress: MotionValue<number> }> = ({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.4], [1, 1, 0]);
  const subtextColor = useTransform(scrollYProgress, [0, 0.5, 1], ['#8B5CF6', '#D8B4FE', '#22D3EE']);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-start pt-20 px-6 overflow-hidden"
    >
      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white text-center leading-tight"
      >
        RAHUL SINGH
        <span className="block text-base md:text-xl font-normal tracking-widest text-slate-400 mt-1">
          SAP ABAP Lead · S/4HANA & ABAP Cloud
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ color: subtextColor }}
        className="mt-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-center"
      >
        Accenture · Noida · Open to SAP ABAP Lead / BTP Consultant Roles
      </motion.p>

      {/* Banner — centrepiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease: 'easeOut' }}
        className="relative mt-5 w-full max-w-3xl"
      >
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-royal-indigo/50 via-vibrant-cyan/20 to-royal-indigo/50 blur-lg opacity-60" />
        <img
          src="/github-banner.png"
          alt="Rahul Singh — SAP ABAP Lead Consultant"
          className="relative w-full rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.2)]"
        />
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-5 flex items-center gap-8"
      >
        {[
          { href: 'https://www.linkedin.com/in/rahul-singh-sap-abap/', icon: <Linkedin size={20} />, label: 'LinkedIn' },
          { href: 'https://github.com/rahulmsingh337/', icon: <Globe size={20} />, label: 'GitHub' },
          { href: 'https://www.instagram.com/squatile3375/', icon: <Instagram size={20} />, label: 'Instagram' },
          { href: 'mailto:rs58598@gmail.com', icon: <Mail size={20} />, label: 'Email' },
          { href: 'https://wa.me/918989805836', icon: <Phone size={20} />, label: 'WhatsApp' },
        ].map(({ href, icon, label }) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -4, color: 'var(--color-royal-indigo)' }}
            whileTap={{ scale: 0.9 }}
            className="text-slate-500 transition-colors"
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Location + Resume row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="mt-4 flex flex-wrap items-center justify-center gap-4"
      >
        <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <MapPin size={11} className="text-royal-indigo" />
          <span>Noida, Uttar Pradesh, India</span>
        </div>

        <motion.a
          href="/resume.pdf"
          download="Rahul_Singh_Resume.pdf"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(99,102,241,0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full border border-royal-indigo/40 bg-royal-indigo/10 px-6 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition-all hover:bg-royal-indigo/20"
        >
          <Download size={13} />
          Download Resume
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Hero — compressed from 300vh to 200vh ─── */
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section 0 */}
        <HeroInitial scrollYProgress={scrollYProgress} />

        {/* Sections 1 & 2 */}
        {contentData.heroSections.slice(1).map((section, i) => (
          <ScrollSection
            key={section.id}
            section={section}
            index={i + 1}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};
