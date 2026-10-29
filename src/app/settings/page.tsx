'use client';

import React, { useState } from 'react';
import {
  Settings,
  User,
  Wallet,
  ShieldCheck,
  Bell,
  Globe,
  Lock,
  LogOut,
  Download,
  Trash2,
  Check,
  RotateCcw,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useWeb3 } from '@/context/Web3Context';
import { useToast } from '@/context/ToastContext';

export default function SettingsPage() {
  const { address, ensName, network, switchNetwork, disconnectWallet, resetToDefaults, isDemo } = useWeb3();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'wallet' | 'security' | 'notifications' | 'networks' | 'privacy'>('profile');

  // Form states
  const [profileName, setProfileName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex@vance.capital');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [passkeyEnabled, setPasskeyEnabled] = useState(true);
  const [zkProofMode, setZkProofMode] = useState(true);

  const handleExportData = () => {
    const data = {
      user: { address, ensName, name: profileName, email },
      network,
      exportTimestamp: new Date().toISOString(),
      note: 'Exported from NexaFi Protocol',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexafi-account-backup-${Date.now()}.json`;
    a.click();

    addToast({
      type: 'success',
      title: 'Data Exported',
      message: 'Your account data has been downloaded as JSON.',
    });
  };

  const handleSave = () => {
    addToast({
      type: 'success',
      title: 'Preferences Saved',
      message: 'Account settings have been updated.',
    });
  };

  return (
    <AppLayout
      title="Account & Security Settings"
      subtitle="Manage your profile, keys, connected networks, and privacy preferences."
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="p-3 rounded-2xl bg-[#0E131E] border border-white/[0.08] space-y-1 h-fit">
          {[
            { id: 'profile', label: 'Profile & ENS', icon: User },
            { id: 'wallet', label: 'Wallet & Keys', icon: Wallet },
            { id: 'security', label: 'Security & Passkeys', icon: ShieldCheck },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'networks', label: 'Connected Networks', icon: Globe },
            { id: 'privacy', label: 'Privacy & ZK Mode', icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="md:col-span-3 space-y-6">
          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm space-y-5">
              <h3 className="text-base font-bold text-white">Profile Information</h3>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  AV
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">{ensName}</span>
                  <span className="text-xs text-slate-400 font-mono">{address}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Display Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Notification Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500/60"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* WALLET */}
          {activeTab === 'wallet' && (
            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Wallet & Key Management</h3>
              <div className="p-4 rounded-xl bg-[#141B29] border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Current Primary Address</span>
                  <span className="text-emerald-400 font-medium">Verified Active</span>
                </div>
                <p className="font-mono text-xs text-white break-all">{address}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#141B29] border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Connection Mode</span>
                  <span className="text-indigo-400 font-medium">{isDemo ? 'Simulation Demo' : 'Injected Web3'}</span>
                </div>
                <p className="text-xs text-slate-400">
                  You can disconnect or connect any EVM browser extension at any time.
                </p>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm space-y-5">
              <h3 className="text-base font-bold text-white">Security & Multi-Factor Auth</h3>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B29] border border-white/5">
                <div>
                  <h4 className="text-xs font-semibold text-white">WebAuthn Biometric Passkeys</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Authorize loan originations and large transfers using TouchID / Windows Hello
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={passkeyEnabled}
                  onChange={(e) => setPasskeyEnabled(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B29] border border-white/5">
                <div>
                  <h4 className="text-xs font-semibold text-white">Session Time-Out Safeguard</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Automatically de-authorize wallet signature sessions after 30 minutes of inactivity
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Enabled</span>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Notifications & Alerts</h3>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B29] border border-white/5">
                <div>
                  <h4 className="text-xs font-semibold text-white">Loan Due Date Reminders</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Get alerted 7 days prior to loan maturity to protect your Trust Score
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B29] border border-white/5">
                <div>
                  <h4 className="text-xs font-semibold text-white">Trust Circle Peer Actions</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Notifications when members join, stake guarantees, or settle loans
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 rounded" />
              </div>
            </div>
          )}

          {/* NETWORKS */}
          {activeTab === 'networks' && (
            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Supported EVM Chains</h3>
              <p className="text-xs text-slate-400">
                NexaFi deploys contracts across major Layer 1 and Layer 2 rollups for low fees.
              </p>

              <div className="space-y-2">
                {[
                  { name: 'Ethereum', id: '1', status: 'Mainnet & Sepolia Testnet' },
                  { name: 'Arbitrum', id: '42161', status: 'Arbitrum One & Sepolia' },
                  { name: 'Base', id: '8453', status: 'Base Mainnet' },
                  { name: 'Polygon', id: '137', status: 'Polygon PoS' },
                ].map((net) => (
                  <div
                    key={net.name}
                    className="p-3.5 rounded-xl bg-[#141B29] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{net.name}</span>
                      <span className="text-[11px] text-slate-400">{net.status}</span>
                    </div>
                    <button
                      onClick={() => switchNetwork(net.name as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        network === net.name
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {network === net.name ? 'Active' : 'Switch'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Zero-Knowledge & Data Privacy</h3>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B29] border border-white/5">
                <div>
                  <h4 className="text-xs font-semibold text-white">ZK Balance Proofs</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Generate zk-SNARK cryptographic assertions of balance without exposing wallet net worth
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={zkProofMode}
                  onChange={(e) => setZkProofMode(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </div>
            </div>
          )}

          {/* DANGER ZONE / ACTIONS */}
          <div className="p-6 rounded-3xl bg-[#0E131E] border border-rose-500/20 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Account Actions</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleExportData}
                className="p-3 rounded-xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Data</span>
              </button>

              <button
                onClick={resetToDefaults}
                className="p-3 rounded-xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-indigo-400" />
                <span>Reset Demo State</span>
              </button>

              <button
                onClick={disconnectWallet}
                className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
