'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Plus,
  Coins,
  Share2,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useTrustCircles } from '@/hooks/useTrustCircles';
import { useToast } from '@/context/ToastContext';
import { CreateCircleModal } from '@/components/modals/CreateCircleModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { TrustCircleDto } from '@/types/api';

export default function TrustCirclesPage() {
  const { circles, isLoading, isSubmitting, error, createCircle, refetch } = useTrustCircles();
  const { addToast } = useToast();

  const [createOpen, setCreateOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<TrustCircleDto | null>(null);

  // Sync selected circle when circles load or change
  useEffect(() => {
    if (circles.length > 0 && (!selectedCircle || !circles.find((c) => c.id === selectedCircle.id))) {
      setSelectedCircle(circles[0]);
    }
  }, [circles, selectedCircle]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'info',
        title: 'Invite Link Copied',
        message: 'Share this link with prospective circle underwriters.',
      });
    }
  };

  const handleJoin = (circleId: string) => {
    addToast({
      type: 'success',
      title: 'Staked Guarantee Deposited',
      message: 'You staked 1,000 USDC into the circle risk pool. Your membership is now active.',
    });
    // Optimistically update membership state without reload
    setSelectedCircle((prev) => {
      if (!prev || prev.id !== circleId) return prev;
      return {
        ...prev,
        userIsMember: true,
        userRole: 'Underwriter',
        membersCount: prev.membersCount + 1,
        totalCapitalPooled: prev.totalCapitalPooled + 1000,
      };
    });
  };

  return (
    <AppLayout
      title="Trust Circles"
      subtitle="Decentralized peer-underwriting cohorts with mutual risk-pooling."
    >
      {error ? (
        <ErrorState
          title="Failed to Load Trust Circles"
          message={error}
          onRetry={refetch}
          className="mb-8"
        />
      ) : null}

      {/* HEADER & CREATE CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E131E] via-[#141B29] to-[#0E131E] border border-white/[0.08] shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-2">
              <Users className="w-3.5 h-3.5" />
              Social Underwriting Protocol
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Community-Backed Credit Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Pool capital with verified Web3 developers and peers. Mutual guarantees lower borrow APRs and eliminate excessive collateral requirements.
            </p>
          </div>

          <button
            onClick={() => setCreateOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Trust Circle</span>
          </button>
        </div>
      </div>

      {/* FEATURED CIRCLE BANNER */}
      {isLoading ? (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#0E131E] border border-white/[0.08] space-y-4 mb-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>
      ) : selectedCircle ? (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#0E131E] border border-emerald-500/30 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-xl font-bold text-white">{selectedCircle.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20 font-semibold">
                  {selectedCircle.category}
                </span>
                {selectedCircle.userIsMember && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                    You are a {selectedCircle.userRole}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedCircle.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Invite Members</span>
              </button>

              {!selectedCircle.userIsMember && (
                <button
                  onClick={() => handleJoin(selectedCircle.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Join with 1,000 USDC Stake</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Circle Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5">
            <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-1">Members</span>
              <div className="text-xl font-bold font-mono text-white">{selectedCircle.membersCount}</div>
              <span className="text-[10px] text-slate-500">100% Vouched</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-1">Circle Trust</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {selectedCircle.circleTrustScore}%
              </div>
              <span className="text-[10px] text-slate-500">Aggregate Rating</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-1">Active Loans</span>
              <div className="text-xl font-bold font-mono text-white">{selectedCircle.activeLoansCount}</div>
              <span className="text-[10px] text-slate-500">In Good Standing</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/5">
              <span className="text-[11px] text-slate-400 block mb-1">Repayment Rate</span>
              <div className="text-xl font-bold font-mono text-indigo-400">
                {selectedCircle.historicalRepaymentPct}%
              </div>
              <span className="text-[10px] text-slate-500">Zero Default History</span>
            </div>
          </div>

          {/* Member Preview Table */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Circle Members & Underwriters
              </span>
              <span className="text-[11px] text-slate-400">
                Pooled Stake: ${selectedCircle.totalCapitalPooled.toLocaleString()} USDC
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2.5 font-semibold">Member</th>
                    <th className="pb-2.5 font-semibold">Address / ENS</th>
                    <th className="pb-2.5 font-semibold">Trust Score</th>
                    <th className="pb-2.5 font-semibold">Staked Guarantee</th>
                    <th className="pb-2.5 font-semibold text-right">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-semibold text-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        AV
                      </div>
                      <span>Alex Vance</span>
                    </td>
                    <td className="py-3 font-mono text-slate-300">alex.nexafi.eth</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">842</td>
                    <td className="py-3 font-mono text-white">$10,000 USDC</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Founder
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-semibold text-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        EZ
                      </div>
                      <span>Elena Zhao</span>
                    </td>
                    <td className="py-3 font-mono text-slate-300">0x3b19...994e</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">875</td>
                    <td className="py-3 font-mono text-white">$15,000 USDC</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                        Underwriter
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-semibold text-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                        MK
                      </div>
                      <span>Marcus Kane</span>
                    </td>
                    <td className="py-3 font-mono text-slate-300">kane.eth</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">812</td>
                    <td className="py-3 font-mono text-white">$12,500 USDC</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                        Underwriter
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {/* ALL AVAILABLE CIRCLES */}
      <div>
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Explore Protocol Circles
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {circles.map((circle) => (
              <div
                key={circle.id}
                onClick={() => setSelectedCircle(circle)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCircle?.id === circle.id
                    ? 'bg-[#121824] border-emerald-500/50 shadow-lg'
                    : 'bg-[#0E131E] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-white">{circle.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {circle.circleTrustScore}% Trust
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{circle.description}</p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Members</span>
                    <span className="text-white font-mono font-medium">{circle.membersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Repayment Rate</span>
                    <span className="text-emerald-400 font-mono font-medium">
                      {circle.historicalRepaymentPct}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Capital</span>
                    <span className="text-white font-mono font-medium">
                      ${circle.totalCapitalPooled.toLocaleString()} USDC
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateCircleModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={async (data) => {
          return await createCircle(data);
        }}
      />
    </AppLayout>
  );
}
