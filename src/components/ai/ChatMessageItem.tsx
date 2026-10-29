'use client';

import React from 'react';
import { Bot } from 'lucide-react';
import { ChatMessage } from '@/types';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectPrompt?: (prompt: string) => void;
}

export function ChatMessageItem({ message, onSelectPrompt }: ChatMessageItemProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
          isUser
            ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white'
            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
        }`}
      >
        {isUser ? 'AV' : <Bot className="w-4 h-4" />}
      </div>

      <div className="max-w-[85%] sm:max-w-[75%] space-y-3">
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-tr-none'
              : 'bg-[#141B29] border border-white/5 text-slate-200 rounded-tl-none shadow-md'
          }`}
        >
          <p className="whitespace-pre-line">{message.content}</p>

          {message.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
              {message.metrics.map((m, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-black/30">
                  <span className="text-[10px] text-slate-400 block">{m.label}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {message.suggestedActions && message.suggestedActions.length > 0 && onSelectPrompt && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.suggestedActions.map((prompt, i) => (
              <button
                key={i}
                onClick={() => onSelectPrompt(prompt)}
                className="px-2.5 py-1 rounded-xl bg-[#141B29] hover:bg-[#1A2335] text-[11px] text-slate-300 hover:text-white border border-white/5 hover:border-emerald-500/40 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
