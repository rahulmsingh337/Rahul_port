import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);

// API call goes to Netlify serverless function — key never touches the browser
const callChatAPI = async (message: string): Promise<string> => {
  const response = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.text || 'Unable to get a response right now. Please contact Rahul directly at rs58598@gmail.com.';
};

export const FeedbackBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm Rahul's AI assistant. Ask me anything about his SAP experience, projects, or skills." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const saveMessageToFirestore = async (role: 'bot' | 'user', text: string) => {
    if (auth.currentUser?.email) {
      try {
        await addDoc(collection(db, 'chat_history'), {
          role,
          text,
          userEmail: auth.currentUser.email,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error saving message', error);
      }
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    await saveMessageToFirestore('user', userMessage);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await callChatAPI(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      await saveMessageToFirestore('bot', botResponse);
    } catch (error) {
      console.error('Chat API Error:', error);
      const fallback = 'Something went wrong. Please reach out to Rahul directly at rs58598@gmail.com.';
      setMessages(prev => [...prev, { role: 'bot', text: fallback }]);
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
                <span className="font-display text-xs font-bold uppercase tracking-widest">Ask About Rahul</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 transition-opacity p-1"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-[380px] overflow-y-auto p-6 space-y-5 scrollbar-hide"
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
                    <span className="text-[10px] uppercase tracking-widest font-mono">Thinking...</span>
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
                placeholder="Ask about skills, projects, experience..."
                disabled={isTyping}
                className="flex-1 bg-white/5 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-royal-indigo transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !inputText.trim()}
                className="bg-royal-indigo text-white p-3 rounded-2xl hover:scale-110 transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                aria-label="Send message"
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
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};
