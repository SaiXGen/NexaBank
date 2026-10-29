'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromptSuggestionsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export function PromptSuggestions({ prompts, onSelect }: PromptSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((p, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(p)}
          className="px-3 py-1.5 rounded-xl bg-[#141B29] hover:bg-[#1A2335] text-xs text-slate-300 hover:text-white border border-white/5 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
        >
          <span>{p}</span>
          <ArrowRight className="w-3 h-3 text-cyan-400" />
        </button>
      ))}
    </div>
  );
}
