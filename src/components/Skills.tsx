import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
            Technical <span className="text-blue-500">Skills</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">My core competencies and proficiency levels.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {resumeData.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">{skill.name}</span>
                <span className="text-xs font-bold text-blue-500">{skill.level}/5</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                />
              </div>
              <div className="mt-4 flex justify-between">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`h-2 w-2 rounded-full ${
                      dot <= skill.level ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
