'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
  Lock,
  ArrowLeft,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/account';

  const [portalMode, setPortalMode] = useState<'member' | 'admin'>('member');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Quick fill helper for convenience
  const handleQuickFill = (targetEmail: string, mode: 'member' | 'admin') => {
    setEmail(targetEmail);
    setPortalMode(mode);
    setError(null);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code.');
      }

      setStep('code');
      setSuccessMessage(
        data.devCode
          ? `Code dispatched! (Preview code: ${data.devCode})`
          : 'A 6-digit one-time code was sent to your inbox. Please enter it below.'
      );
      if (data.devCode) {
        setCode(data.devCode);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while requesting code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: code.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      const userRoles = data.user?.roles || [];
      const isAdminUser =
        userRoles.includes('SUPER_ADMIN') ||
        userRoles.includes('PRESIDENT') ||
        userRoles.includes('TREASURER');

      if (portalMode === 'admin' && !isAdminUser) {
        throw new Error(
          'Your account does not possess administrative privileges. Please access the Member Portal.'
        );
      }

      // Route to destination
      const destination =
        portalMode === 'admin'
          ? '/admin'
          : returnUrl.startsWith('/admin')
          ? '/account'
          : returnUrl;

      router.push(destination);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-gold)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        {/* Card Header */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--border-card)] text-[var(--accent-gold)] text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Utah Telugu Association</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
              {portalMode === 'admin' ? 'Administration Portal' : 'Member Portal Access'}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              {portalMode === 'admin'
                ? 'Authorized executive officers, coordinators, and directors.'
                : 'Manage your household, view passes, and register for events.'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-black/40 border border-[var(--border-card)] text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setPortalMode('member');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                portalMode === 'member'
                  ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)] shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Member Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPortalMode('admin');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                portalMode === 'admin'
                  ? 'bg-[var(--accent-crimson)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </button>
          </div>

          {/* Alert messages */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{successMessage}</p>
            </div>
          )}

          {/* Step 1: Email Form */}
          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={portalMode === 'admin' ? 'admin@utahtelugu.org' : 'your.email@domain.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-[var(--border-card)] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <span>{loading ? 'Sending Code...' : 'Send Verification Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Step 2: Code Form */
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    6-Digit Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="text-[11px] text-[var(--accent-gold)] hover:underline font-semibold"
                  >
                    Change Email
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-[var(--border-card)] text-white text-base tracking-widest font-mono placeholder:text-slate-600 focus:outline-none focus:border-[var(--accent-gold)] transition-colors text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <span>{loading ? 'Verifying...' : 'Sign In to Portal'}</span>
                <ShieldCheck className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={loading}
                  className="text-xs text-[var(--text-secondary)] hover:text-white underline"
                >
                  Resend code
                </button>
              </div>
            </form>
          )}

          {/* Demonstration Quick Fill Accounts */}
          <div className="pt-4 border-t border-[var(--border-card)] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Demonstration Quick Accounts
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <button
                type="button"
                onClick={() => handleQuickFill('member@utahtelugu.org', 'member')}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 hover:border-[var(--accent-gold)] hover:text-white transition-all"
              >
                Demo Family Member
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@utahtelugu.org', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 hover:border-rose-400 hover:text-white transition-all"
              >
                Demo Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('treasurer@utahtelugu.org', 'admin')}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 hover:border-amber-400 hover:text-white transition-all"
              >
                Demo Treasurer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-white">
          <div className="animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
            <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase">Loading secure identity portal...</span>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
