import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'indigo' | 'cyan' | 'amber' | 'rose' | 'slate';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'emerald', children, className = '', ...props }: BadgeProps) {
  const variantStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    slate: 'bg-white/5 text-slate-300 border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border font-mono ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
