'use client';

import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, AlertTriangle, Search, ShieldCheck } from 'lucide-react';

interface CheckInScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffName?: string;
}

export function CheckInScannerModal({ isOpen, onClose, staffName = 'Executive Volunteer Staff' }: CheckInScannerModalProps) {
  const [tokenInput, setTokenInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleScan = async (overrideToken?: string) => {
    const targetToken = overrideToken || tokenInput;
    if (!targetToken.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/checkin/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenOrTicketNumber: targetToken.trim(),
          staffName,
        }),
      });

      const data = await res.json();
      setScanResult(data);
    } catch {
      setScanResult({
        success: false,
        status: 'ERROR',
        message: 'Network error communicating with check-in gateway.',
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel bg-[#0b132b] border border-white/20 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4 border-b border-white/10 pb-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">On-Site Ticket Check-In</h3>
            <p className="text-xs text-slate-400">Authorized Event Staff Portal ({staffName})</p>
          </div>
        </div>

        {/* Input & Scan Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Scan Barcode / Enter QR Token or Ticket Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="e.g. TKT-SKR-2027-0101 or scan token"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-amber-400"
              />
              <button
                onClick={() => handleScan()}
                disabled={isScanning || !tokenInput.trim()}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-40"
              >
                <Search className="w-4 h-4" />
                <span>{isScanning ? 'Verifying...' : 'Check-In'}</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-Filled Buttons */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400">Quick Test Scenarios:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setTokenInput('TKT-SKR-2027-0101');
                  handleScan('TKT-SKR-2027-0101');
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-medium hover:bg-emerald-500/30"
              >
                Scan Ticket #1 (Venkat Rao)
              </button>
              <button
                onClick={() => {
                  setTokenInput('TKT-SKR-2027-0102');
                  handleScan('TKT-SKR-2027-0102');
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-medium hover:bg-emerald-500/30"
              >
                Scan Ticket #2 (Priya Rao)
              </button>
            </div>
          </div>

          {/* Scan Results Display */}
          {scanResult && (
            <div
              className={`p-4 rounded-xl border animate-in zoom-in-95 ${
                scanResult.status === 'VERIFIED'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : scanResult.status === 'DUPLICATE'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {scanResult.status === 'VERIFIED' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">{scanResult.message}</h4>
                  {scanResult.attendeeName && (
                    <div className="text-xs space-y-0.5 text-slate-300">
                      <p>Attendee: <strong className="text-white">{scanResult.attendeeName}</strong></p>
                      <p>Event: {scanResult.eventName}</p>
                      <p>Category: {scanResult.ticketType}</p>
                      <p className="font-mono text-[10px] text-slate-400">ID: {scanResult.ticketNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
