'use client';

import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Search,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  RefreshCw,
  Clock,
} from 'lucide-react';

export default function AdminCheckInPage() {
  const [tokenInput, setTokenInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [recentScans, setRecentScans] = useState<any[]>([]);

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
          staffName: 'Executive Check-In Desk',
        }),
      });

      const data = await res.json();
      setScanResult(data);

      if (data.status === 'VERIFIED') {
        setRecentScans((prev) => [
          {
            ticketNumber: data.ticketNumber,
            attendeeName: data.attendeeName,
            time: new Date().toLocaleTimeString('en-US', { timeZone: 'America/Denver' }),
            ticketType: data.ticketType,
          },
          ...prev,
        ]);
      }
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            Venue Gate Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c140e] font-display mt-2">
            Idempotent Event QR Check-In
          </h1>
          <p className="text-xs text-[#705544]">
            Real-time barcode/QR scanner with duplicate-scan prevention and audit logging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 font-mono">
            GATE SCANNER ACTIVE
          </span>
        </div>
      </div>

      {/* Main Scanner Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-md space-y-6">
        <div>
          <label className="block text-xs font-bold text-[#1c140e] uppercase tracking-wider mb-2">
            Scan Barcode / Enter QR Token or Ticket ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleScan();
              }}
              placeholder="e.g. TKT-SKR-2027-0101 or scan token from ticket"
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-amber-900/20 text-[#1c140e] text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-mono placeholder:text-[#8c7664]"
            />
            <button
              onClick={() => handleScan()}
              disabled={isScanning || !tokenInput.trim()}
              className="btn-magnetic px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md disabled:opacity-40"
            >
              <Search className="w-4 h-4" />
              <span>{isScanning ? 'Verifying...' : 'Check-In Attendee'}</span>
            </button>
          </div>
        </div>

        {/* Quick Testing Simulation Shortcuts */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-900/10 space-y-2 text-xs">
          <span className="text-[11px] font-bold text-[#705544] uppercase tracking-wider">
            Fast Test Scenarios (Click to test idempotency):
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setTokenInput('TKT-SKR-2027-0101');
                handleScan('TKT-SKR-2027-0101');
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 font-semibold"
            >
              Scan Ticket #1 (Venkat Rao)
            </button>
            <button
              onClick={() => {
                setTokenInput('TKT-SKR-2027-0102');
                handleScan('TKT-SKR-2027-0102');
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 font-semibold"
            >
              Scan Ticket #2 (Priya Rao)
            </button>
            <button
              onClick={() => {
                setTokenInput('INVALID-TICKET-9999');
                handleScan('INVALID-TICKET-9999');
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200 font-semibold"
            >
              Scan Fake / Invalid Ticket
            </button>
          </div>
        </div>

        {/* Real-time Scan Result Banner */}
        {scanResult && (
          <div
            className={`p-6 rounded-2xl border animate-in zoom-in-95 ${
              scanResult.status === 'VERIFIED'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : scanResult.status === 'DUPLICATE'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <div className="flex items-start gap-4">
              {scanResult.status === 'VERIFIED' ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#1c140e]">{scanResult.message}</h3>
                {scanResult.attendeeName && (
                  <div className="text-xs space-y-0.5 text-[#5a483a] pt-1">
                    <p>Attendee: <strong className="text-[#1c140e]">{scanResult.attendeeName}</strong></p>
                    <p>Event: {scanResult.eventName}</p>
                    <p>Admission Tier: {scanResult.ticketType}</p>
                    <p className="font-mono text-[10px] text-[#705544]">Reference: {scanResult.ticketNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Gate Feed */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#1c140e] font-display flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>Live Check-In Activity (This Session)</span>
        </h2>

        {recentScans.length > 0 ? (
          <div className="space-y-2">
            {recentScans.map((scan, idx) => (
              <div
                key={idx}
                className="glass-panel p-3.5 rounded-xl border border-amber-900/15 bg-white/95 shadow-sm flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold text-[#1c140e] block">{scan.attendeeName}</span>
                    <span className="text-[11px] text-[#705544]">{scan.ticketType} • {scan.ticketNumber}</span>
                  </div>
                </div>
                <span className="font-mono text-emerald-800 text-xs font-semibold">{scan.time} MDT</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#8c7664] italic">No tickets checked in during this session yet.</p>
        )}
      </div>
    </div>
  );
}
