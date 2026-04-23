import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Linkedin, Mail, Phone, Download, MapPin, Globe, Instagram } from 'lucide-react';
import { contentData } from '../data/ContentData';

const HeroSectionContent: React.FC<{
  section: any;
  index: number;
  scrollYProgress: MotionValue<number>;
}> = ({ section, index, scrollYProgress }) => {
  const start = index * 0.33;
  const end = (index + 1) * 0.33;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(scrollYProgress, [start, end], [60, -60]);

  const subtextColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#8B5CF6", "#D8B4FE", "#22D3EE"]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute flex flex-col items-center text-center max-w-5xl"
    >
      {index === 0 && (
         <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 right-4 h-2 w-2 rounded-full bg-vibrant-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
       )}

      <motion.h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.1]">
        {section.text.split('. ').map((part: string, i: number) => (
          <span key={i} className="block mt-2">
            {part}
          </span>
        ))}
      </motion.h1>

      <motion.p
        style={{ color: subtextColor }}
        className="mt-10 font-mono text-sm uppercase tracking-[0.4em] md:text-xl font-medium"
      >
        {section.subtextText}
      </motion.p>

      {index === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-10">
            <motion.a
              href="https://www.linkedin.com/in/rahul-singh-sap-abap/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "var(--color-royal-indigo)" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-500 transition-colors"
            >
              <Linkedin size={22} />
            </motion.a>
            <motion.a
              href="https://github.com/rahulmsingh337/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "var(--color-royal-indigo)" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-500 transition-colors"
            >
              <Globe size={22} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/squatile3375/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "var(--color-royal-indigo)" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-500 transition-colors"
            >
              <Instagram size={22} />
            </motion.a>
            <motion.a
              href="mailto:rs58598@gmail.com"
              whileHover={{ y: -5, color: "var(--color-royal-indigo)" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-500 transition-colors"
            >
              <Mail size={22} />
            </motion.a>
            <motion.a
              href="https://wa.me/918989805836"
              whileHover={{ y: -5, color: "var(--color-royal-indigo)" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-500 transition-colors"
            >
              <Phone size={22} />
            </motion.a>
          </div>

          <div className="flex items-center gap-3 rounded-full bg-white/5 border border-white/5 px-4 py-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
            <MapPin size={12} className="text-royal-indigo" />
            <span>Noida, Uttar Pradesh, India</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6">
        {contentData.heroSections.map((section, index) => (
          <HeroSectionContent
            key={section.id}
            section={section}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Action Button - Floating at bottom */}
        <motion.div 
          className="absolute bottom-16 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {/* Subtle Continuous Pulsing Glow */}
          <motion.div
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 z-0 bg-navy blur-2xl rounded-full"
          />

          <motion.a
            href="/resume.pdf"
            download="Rahul_Singh_Resume.pdf"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "var(--color-navy)",
              borderColor: "rgba(139, 92, 246, 0.5)",
              boxShadow: "0 0 40px rgba(15, 23, 42, 0.8)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative z-10 flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-10 py-5 backdrop-blur-xl transition-all"
          >
            <Download className="text-white group-hover:animate-bounce" size={18} />
            <span className="font-display text-sm font-bold tracking-widest text-white uppercase">Obtain Resume</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
