import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionText,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`p-8 sm:p-12 text-center rounded-2xl bg-[#0E131E] border border-white/[0.08] ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
