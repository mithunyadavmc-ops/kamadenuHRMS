import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, RefreshCw, Copy, Check } from 'lucide-react';
import { apiService } from '../../services/api';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  parts: [{ text: string }];
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      parts: [
        {
          text: `Namaste! I am the **Kamadenu AI HR Assistant**, powered by Gemini 3.6 Flash.
How can I assist you today?
- 📄 **Draft a Job Description or Offer Letter**
- ❓ **Generate Interview Questions** for React / Python / HR roles
- ⚖️ **Indian Labor Law & Compliance Guidance** (PF, Gratuity, TDS, ESI)
- 📊 **Analyze Recruitment & Retention Metrics**`
        }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', parts: [{ text: query }] };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await apiService.aiChatAssistant(query, updatedMessages);
      setMessages([
        ...updatedMessages,
        { role: 'assistant', parts: [{ text: res.reply }] }
      ]);
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          parts: [{ text: `Sorry, I encountered an issue connecting to Gemini AI: ${err.message}` }]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const promptSuggestions = [
    'Draft a job description for Senior Full Stack Engineer (React + Node)',
    'Suggest 5 technical interview questions for a Python FastAPI developer',
    'What are the Indian PF & TDS tax rules for salary above ₹12 Lakhs?',
    'Write a polite Job Offer Letter for candidate Meera Sundaram'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                Kamadenu AI HR Assistant
                <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Gemini 3.6
                </span>
              </h2>
              <p className="text-xs text-blue-200">
                Enterprise Talent, Compliance & Job Description Generator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            id="close-ai-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md shadow-blue-500/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-xs relative group ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.parts[0].text}</div>

                {msg.role === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.parts[0].text, i)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-md transition-all"
                    title="Copy text"
                  >
                    {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-500 text-xs pl-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <span className="font-medium animate-pulse">
                Kamadenu AI is processing your HR query...
              </span>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex gap-2 overflow-x-auto">
            {promptSuggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-xl border border-slate-200 font-medium transition-all shadow-2xs"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI anything (e.g., Draft job description, interview questions)..."
            className="flex-1 bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            disabled={isLoading}
            id="ai-assistant-input"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-2xl transition-all shadow-md shadow-blue-500/20"
            id="ai-assistant-send-btn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
