import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'motion/react';
import { contentData } from '../data/ContentData';

const Counter: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayValue}</>;
};

const SkillCard: React.FC<{ skill: any, index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        y: -10,
        borderColor: "rgba(139, 92, 246, 0.4)",
        backgroundColor: "rgba(139, 92, 246, 0.05)"
      }}
      className="group relative rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all duration-500 overflow-hidden"
    >
      <div className="mb-10 flex items-center justify-between">
        <div className="relative">
          <motion.div 
            whileHover={{ 
              scale: 1.3,
              rotate: 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative z-10 p-5 rounded-2xl bg-navy/40 border border-white/10 text-slate-400 group-hover:text-vibrant-cyan group-hover:border-vibrant-cyan/30 transition-all shadow-2xl"
          >
            {skill.icon}
          </motion.div>
          {/* Breathing Icon Glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-royal-indigo/20 blur-xl -z-0 rounded-2xl"
          />
        </div>
        <div className="text-right">
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">Proficiency</span>
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: index * 0.1 + 0.5
            }}
            className="block font-display text-3xl font-bold text-white group-hover:text-royal-indigo transition-colors tracking-tighter"
          >
            <Counter value={skill.proficiency} />%
          </motion.span>
        </div>
      </div>
      
      <h4 className="text-2xl font-bold text-white mb-8 group-hover:translate-x-1 transition-all duration-300">{skill.name}</h4>
      
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5 border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 2.2, 
            delay: 0.3, 
            ease: [0.34, 1.56, 0.64, 1] // Bouncy ease-out
          }}
          className="relative h-full bg-gradient-to-r from-royal-indigo via-electric-blue to-vibrant-cyan shadow-[0_0_25px_rgba(139,92,246,0.5)]"
        >
          {/* Energy Surge Overlay */}
          <motion.div
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              x: ['-100%', '200%']
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>

      <div className="mt-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Peak Performance</span>
        <div className="flex gap-1">
          {[1,2,3].map(i => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              className="h-1 w-1 rounded-full bg-vibrant-cyan"
            />
          ))}
        </div>
      </div>

      {/* Decorative localized glow */}
      <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-royal-indigo/5 blur-3xl rounded-full group-hover:bg-royal-indigo/10 transition-all" />
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-vibrant-cyan">Technical Arsenal</h2>
          <h3 className="mt-4 text-5xl font-bold text-white md:text-6xl tracking-tighter">Core Competencies</h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contentData.skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
