import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase, Calendar, MapPin, Star } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 px-6 scroll-mt-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
            Professional <span className="text-blue-500">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">My career journey and technical contributions.</p>
        </motion.div>

        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                expandedIndex === index
                  ? 'border-blue-500/50 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                  : 'border-slate-200 bg-white hover:border-blue-500/30 dark:border-slate-800 dark:bg-slate-900/50'
              }`}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex w-full items-start justify-between p-8 text-left"
              >
                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <p className="mb-2 font-medium text-blue-500">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {exp.dates}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {exp.location}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  className="text-slate-400"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-slate-200 px-8 pb-8 pt-6 dark:border-slate-800">
                      <div className="mb-6 flex flex-wrap gap-2">
                        {exp.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500"
                          >
                            <Star size={12} /> {metric}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
