'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  Key,
  FileCheck2,
  Cpu,
  Layers,
  Fingerprint,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function SecurityPage() {
  const securityPillars = [
    {
      icon: Key,
      title: 'Wallet-Based Authentication',
      description:
        'All logins and session authorizations rely on cryptographic signatures (EIP-4361: Sign-In with Ethereum). No centralized passwords stored on servers.',
    },
    {
      icon: Fingerprint,
      title: 'Transaction Signing',
      description:
        'Every debit, loan origination, or token swap requires an explicit private key signature from your connected client or hardware device.',
    },
    {
      icon: Cpu,
      title: 'Smart Contract Architecture',
      description:
        'OpenZeppelin standard libraries, reentrancy guards, pull-payment flows, and modular upgradeable patterns keep user capital sovereign.',
    },
    {
      icon: ShieldCheck,
      title: 'Non-Custodial Architecture',
      description:
        'NexaFi never possesses or custodies your private keys. Assets remain on-chain under your sovereign multi-sig or smart contract account.',
    },
    {
      icon: Lock,
      title: 'Encrypted Application Data',
      description:
        'All client telemetry and off-chain cached preferences are encrypted at rest with AES-GCM-256 and transmitted exclusively via TLS 1.3.',
    },
    {
      icon: Layers,
      title: 'Role-Based Access & MFA',
      description:
        'Administrative routines adhere to time-locked multi-signature safeguards, with support for WebAuthn and hardware biometric passkeys.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cryptographic Integrity
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Security by Architecture, Not by Slogan.
            </h1>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              We design every layer of the NexaFi platform around deterministic on-chain verification, non-custodial custody, and defense-in-depth engineering.
            </p>
          </div>

          {/* Interactive Security Visualization */}
          <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-center">
              {/* Layer 1: Client & Wallet */}
              <div className="p-6 rounded-2xl bg-[#141B29] border border-emerald-500/30">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Client & Key Sovereignty</h3>
                <p className="text-xs text-slate-400 mt-2">
                  EIP-712 typed data signatures. Keys never leave your enclave.
                </p>
                <div className="mt-4 inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                  Zero Server Custody
                </div>
              </div>

              {/* Layer 2: Protocol Contracts */}
              <div className="p-6 rounded-2xl bg-[#141B29] border border-indigo-500/30">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Protocol Smart Contracts</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Isolated liquidity pools with strict algorithmic collateral controls.
                </p>
                <div className="mt-4 inline-block px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-mono">
                  Reentrancy Resistant
                </div>
              </div>

              {/* Layer 3: Trust Heuristic Oracles */}
              <div className="p-6 rounded-2xl bg-[#141B29] border border-cyan-500/30">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Trust Engine Verification</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Verifiable multi-factor on-chain reputation without centralized credit files.
                </p>
                <div className="mt-4 inline-block px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono">
                  Deterministic Heuristics
                </div>
              </div>
            </div>
          </div>

          {/* 6 Security Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0E131E] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prototype Disclosure Note */}
          <div className="p-6 rounded-3xl bg-[#0A0D15] border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Responsible Disclosure Notice
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
                  NexaFi is currently in active developer demonstration mode on Ethereum Sepolia and Layer 2 testnets. We do not claim third-party certifications, government guarantees, or regulatory approvals that have not been granted. Always exercise caution and verify addresses prior to interaction.
                </p>
              </div>
            </div>
            <Link
              href="/developers"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold shrink-0"
            >
              View Contract Interfaces
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
