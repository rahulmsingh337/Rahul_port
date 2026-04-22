import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

const certs = [
  "SAP Certified - Back-End Developer - ABAP Cloud",
  "Data Management and ABAP Services for SAP Cloud Platform",
  "SAP ALE IDocs Certification",
  "Advanced Programming in ABAP",
  "Data Privacy, Data Compliance & Risk"
];

export const Certifications: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-12 lg:grid-cols-2 items-center"
        >
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-royal-indigo">Verified Expertise</h2>
            <h3 className="mt-4 text-4xl font-bold text-white tracking-tighter">Certifications</h3>
            <p className="mt-6 text-slate-500 max-w-md leading-relaxed">
              Formally recognized proficiency in core SAP architectures and cloud-native development paradigms.
            </p>
          </div>

          <div className="space-y-4">
            {certs.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="group flex items-center gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/5 transition-all"
              >
                <div className="p-3 rounded-xl bg-royal-indigo/10 text-royal-indigo group-hover:scale-110 group-hover:bg-royal-indigo transition-all">
                  <ShieldCheck size={20} className="group-hover:text-white" />
                </div>
                <span className="font-display font-medium text-white/80 group-hover:text-white transition-colors">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
