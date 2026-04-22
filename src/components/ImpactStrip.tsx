import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { contentData } from '../data/ContentData';

const CountUp: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-display text-4xl font-bold text-white tracking-tight md:text-5xl"
      >
        {value}
      </motion.span>
    </div>
  );
};

export const ImpactStrip: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1]);

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="mx-auto max-w-7xl px-6"
    >
      <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] py-20 px-10 shadow-2xl backdrop-blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-indigo/5 to-transparent pointer-events-none" />
        
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8">
          {contentData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-8 p-6 rounded-[2rem] bg-surface/40 border border-white/10 group-hover:bg-royal-indigo/10 group-hover:border-royal-indigo/30 transition-all duration-500 shadow-xl group-hover:scale-110">
                {stat.icon}
              </div>
              <CountUp value={stat.value} label={stat.label} />
              <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 group-hover:text-vibrant-cyan transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
