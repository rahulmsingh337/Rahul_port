import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-blue-500/30 bg-blue-500/10 backdrop-blur-xl">
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold tracking-tighter text-blue-400">
            RS
          </div>
          <motion.div
            className="absolute inset-0 bg-blue-500/20"
            animate={{
              y: ["100%", "0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

      <div className="w-64">
        <div className="mb-2 flex justify-between text-xs font-medium uppercase tracking-widest text-blue-400/60">
          <span>Initializing</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
