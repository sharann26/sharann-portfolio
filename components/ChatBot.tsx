import { Chat, GoogleGenAI } from "@google/genai";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, Send, Sparkles, User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  CERTIFICATIONS,
  CONTACT_INFO,
  EXPERIENCES,
  PROJECTS,
  SKILL_CATEGORIES,
  STATS,
} from "../constants";

interface Message {
  role: "user" | "model";
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I'm Sharann's AI assistant. Ask me anything about his projects, experience, or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Chat Session
  useEffect(() => {
    if (!process.env.API_KEY) {
      console.warn("API_KEY is missing from environment variables.");
      return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Construct context from constants
    const portfolioContext = JSON.stringify({
      profile: "Sharann Nagarajan - Software Developer & Technology Lead",
      contact: CONTACT_INFO,
      experience: EXPERIENCES,
      skills: SKILL_CATEGORIES,
      certifications: CERTIFICATIONS,
      stats: STATS,
      projects: PROJECTS,
    });

    const systemInstruction = `
      You are an advanced AI portfolio assistant for Sharann Nagarajan.
      Your goal is to represent Sharann professionally and answer visitor questions based STRICTLY on the data provided below.
      
      PORTFOLIO DATA:
      ${portfolioContext}

      GUIDELINES:
      1. Tone: Professional, enthusiastic, and concise.
      2. If asked about contact info, provide the email or links from the data.
      3. Highlight specific projects or skills when relevant to the user's question.
      4. If the user asks something not in the data (like personal address, or political views), politely decline and steer back to professional topics.
      5. Keep responses short (under 3 sentences) unless asked for details.
      6. You are talking TO a potential recruiter or client.
    `;

    chatSessionRef.current = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({
        message: userMessage,
      });
      const responseText = result.text;

      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-[101] p-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center justify-center"
        aria-label="Open Chat"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-40 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[60vh] z-[100] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Sharann's Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      Online with Gemini
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50 dark:bg-black/20">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-slate-200 dark:bg-slate-700"
                        : "bg-gradient-to-br from-violet-500 to-fuchsia-600"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User
                        size={14}
                        className="text-slate-600 dark:text-slate-300"
                      />
                    ) : (
                      <Bot size={14} className="text-white" />
                    )}
                  </div>

                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-tr-none"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shrink-0">
                    <Loader2 size={14} className="text-white animate-spin" />
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about my skills..."
                  disabled={isLoading}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-slate-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:hover:bg-violet-600 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
