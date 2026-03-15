import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Globe, Heart, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 bg-slate-50/30 dark:bg-slate-950/30 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Academic <span className="text-blue-500">Background</span>
              </h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full" />
            </motion.div>

            <div className="space-y-8">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    <GraduationCap size={14} />
                  </div>
                  <div className="absolute left-[11px] top-8 h-full w-[2px] bg-slate-200 dark:bg-slate-800 last:hidden" />
                  
                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-blue-500">{edu.dates}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{edu.institution}</p>
                  <p className="text-xs text-slate-400">{(edu as any).institutionLocation || edu.location}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Languages & Interests */}
          <div className="space-y-16">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="mb-4 text-3xl font-bold tracking-tighter text-slate-900 dark:text-white">
                  Languages & <span className="text-blue-500">Interests</span>
                </h2>
                <div className="h-1 w-20 bg-blue-500 rounded-full" />
              </motion.div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center gap-3 text-blue-500">
                    <Globe size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.extra.languages.map(lang => (
                      <span key={lang} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center gap-3 text-blue-500">
                    <Heart size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">Interests</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.extra.interests.map(interest => (
                      <span key={interest} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteering */}
            <div>
              <div className="mb-6 flex items-center gap-3 text-blue-500">
                <Award size={20} />
                <span className="font-bold uppercase tracking-widest text-xs">Volunteering & Organizations</span>
              </div>
              <div className="space-y-4">
                {resumeData.extra.volunteering.map(vol => (
                  <div key={vol.name} className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h4 className="font-bold text-slate-900 dark:text-white">{vol.name}</h4>
                    <p className="text-xs font-bold text-blue-500">{vol.org} • {vol.role}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{vol.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
