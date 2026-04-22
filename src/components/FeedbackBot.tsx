import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { contentData } from '../data/ContentData';

const SYSTEM_PROMPT = `
You are RS Neural Interface, the digital AI representative for Rahul Singh, a Lead SAP ABAP Consultant at Accenture.
Your goal is to answer questions about Rahul's professional background, skills, and projects in a professional, high-tech, and helpful manner.

Context for Rahul Singh:
- Current Role: Software Development Lead at Accenture (Dec 2025 – Present).
- Previous Role: SAP ABAP & Fiori Consultant at Infosys (May 2021 – Dec 2025).
- Expertise: S/4HANA Migration, ABAP Cloud, RAP (RESTful ABAP Programming Model), CDS Views, OData Services, HANA Remediation.
- Recent Certifications: SAP Certified Back-End Developer (ABAP Cloud).
- Notable Projects: SmartShift Automation Tool, Traceability Report Development, US Email Automation (BOL & Packing Slip), COPA Report Reconciliation.
- Achievements: 16 Consecutive INSTA Rewards at Infosys, Rookie of the Quarter.
- Location: Noida, UP, India.

Conversation Style:
- Professional yet technologically sophisticated (using terms like "Neural Interface", "Synchronizing", "Processing").
- Concise and direct.
- If asked about something you don't know, suggest contacting Rahul directly via email (rs58598@gmail.com) or LinkedIn.
- Keep responses short, ideally under 3-4 sentences.
`;

export const FeedbackBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Neural Interface online. I am Rahul\'s cognitive representative. How may I assist your inquiry today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "I encountered a synchronization error. Please try again or reach out to Rahul directly.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("AI Interface Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Neural link interrupted. Please check your connectivity or contact Rahul via email.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 overflow-hidden rounded-2xl border border-white/10 bg-surface/90 shadow-2xl backdrop-blur-xl md:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-royal-indigo to-vibrant-cyan p-5 text-white">
              <div className="flex items-center gap-3">
                <Bot size={20} />
                <span className="font-display text-xs font-bold uppercase tracking-widest">RS Neural Interface</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:opacity-70 transition-opacity p-1"
                aria-label="Close interface"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="h-[400px] overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-[1.5rem] p-4 text-sm font-sans leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-royal-indigo text-white shadow-lg' 
                      : 'bg-white/5 text-slate-300 border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 text-slate-500 rounded-full px-4 py-2 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-[10px] uppercase tracking-widest font-mono">Processing...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-5 flex gap-3 bg-white/[0.02]">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Synchronize query..."
                disabled={isTyping}
                className="flex-1 bg-white/5 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-royal-indigo transition-all disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-royal-indigo text-white p-3 rounded-2xl hover:scale-110 transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                aria-label="Send query"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-tr from-royal-indigo to-vibrant-cyan text-white shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all"
        aria-label="Toggle Neural Interface"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};
