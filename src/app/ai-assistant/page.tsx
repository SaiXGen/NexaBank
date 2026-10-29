'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatMessage } from '@/types';
import { useWeb3 } from '@/context/Web3Context';

export default function AiAssistantPage() {
  const { totalBalance, trustScore, availableCredit, network } = useWeb3();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'assistant',
      content:
        'Hello Alex! I am **Nexa AI**, your decentralized financial copilot. I continuously monitor your multi-chain balances, transaction forensic trails, and Trust Score underwriting metrics. How can I assist your financial strategy today?',
      timestamp: 'Just now',
      suggestedActions: [
        'What changed in my portfolio this week?',
        'Why did my Trust Score change?',
        'How much credit am I currently eligible for?',
        'Summarize my recent transactions.',
        'Show my largest spending categories.',
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setMessages((prev) => [...prev, json.data]);
      } else {
        throw new Error('Failed to get answer');
      }
    } catch {
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          content: `I reviewed your query regarding "${query}". Your NexaFi portfolio stands at $${totalBalance.toLocaleString()} across ${network} with an 842 Trust Score. Let me know if you need specific loan or transaction details.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: ['Check Trust Score', 'View Available Credit'],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout
      title="Nexa AI Copilot"
      subtitle="Intelligent on-chain assistant for portfolio analysis, credit, and transactions."
    >
      <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0A0E17]/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Nexa AI</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">
                  v2.4 FinModel
                </span>
              </div>
              <p className="text-xs text-slate-400">Your intelligent Web3 financial copilot</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Context: $24.8k Assets • 842 Score</span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 items-start ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {msg.sender === 'user' ? 'AV' : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-3`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-tr-none'
                      : 'bg-[#141B29] border border-white/5 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Metrics Badge Box if returned */}
                  {msg.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
                      {msg.metrics.map((m, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-black/30">
                          <span className="text-[10px] text-slate-400 block">{m.label}</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggested prompt chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-2.5 py-1 rounded-xl bg-[#141B29] hover:bg-[#1A2335] text-[11px] text-slate-300 hover:text-white border border-white/5 hover:border-emerald-500/40 transition-colors flex items-center gap-1"
                      >
                        <span>{prompt}</span>
                        <ArrowRight className="w-3 h-3 text-emerald-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-[#141B29] border border-white/5 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Nexa AI is querying on-chain heuristics and calculating insights...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#0A0E17]/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Nexa AI about your portfolio, trust score, or credit eligibility..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 text-white transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center">
            <span className="text-[10px] text-slate-500">
              Nexa AI delivers financial intelligence based on public blockchain state. Always verify smart contract addresses.
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
