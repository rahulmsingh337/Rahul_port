import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, School } from 'lucide-react';

const education = [
  {
    degree: "Bachelor of Technology – Mechanical Engineering",
    institution: "Vellore Institute of Technology",
    period: "2016 – 2020",
    location: "Vellore, Tamil Nadu"
  },
  {
    degree: "Intermediate (12th)",
    institution: "DAV Public School - Dudhichua",
    period: "2014 – 2016",
    location: "Madhya Pradesh"
  },
  {
    degree: "Matriculation (10th)",
    institution: "DAV Public School – CWS Jayant",
    period: "2002 – 2014",
    location: "Madhya Pradesh"
  }
];

export const Education: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent to-white/[0.01]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-royal-indigo">Academic Foundation</h2>
          <h3 className="mt-4 text-4xl font-bold text-white tracking-tighter">Education</h3>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/5 transition-all"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-indigo/10 text-royal-indigo group-hover:scale-110 group-hover:bg-royal-indigo group-hover:text-white transition-all">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-display text-xl font-bold text-white mb-2 leading-snug">{edu.degree}</h4>
              <p className="font-sans text-sm text-royal-indigo font-medium mb-4">{edu.institution}</p>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
                <span>{edu.period}</span>
                <span>{edu.location}</span>
              </div>

              <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-full bg-vibrant-cyan/5 blur-2xl group-hover:bg-vibrant-cyan/10 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
