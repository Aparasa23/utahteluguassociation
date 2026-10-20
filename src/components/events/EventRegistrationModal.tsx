'use client';

import React, { useState } from 'react';
import { X, Ticket, Check, AlertCircle, Sparkles, ExternalLink, QrCode } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface TicketType {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  remainingQuantity: number;
  isMembersOnly: boolean;
  maxTicketsPerOrder: number;
}

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventSlug: string;
  eventTitle: string;
  ticketTypes: TicketType[];
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventSlug,
  eventTitle,
  ticketTypes,
}: EventRegistrationModalProps) {
  const [memberNumber, setMemberNumber] = useState('');
  const [isMemberVerified, setIsMemberVerified] = useState(false);
  const [memberVerifying, setMemberVerifying] = useState(false);
  const [memberFeedback, setMemberFeedback] = useState('');

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successResult, setSuccessResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleVerifyMember = async () => {
    if (!memberNumber.trim()) return;
    setMemberVerifying(true);
    setMemberFeedback('');
    try {
      const res = await fetch('/api/membership/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenOrNumber: memberNumber.trim() }),
      });
      const data = await res.json();
      if (data.isValid) {
        setIsMemberVerified(true);
        setMemberFeedback(`Active UTA Member verified: ${data.primaryName} (${data.planName})`);
      } else {
        setIsMemberVerified(false);
        setMemberFeedback(data.message || 'Membership not found or expired.');
      }
    } catch {
      setMemberFeedback('Verification request failed.');
    } finally {
      setMemberVerifying(false);
    }
  };

  const updateQuantity = (typeId: string, delta: number, max: number) => {
    const cur = quantities[typeId] || 0;
    const next = Math.max(0, Math.min(max, cur + delta));
    setQuantities({ ...quantities, [typeId]: next });
  };

  const totalTickets = Object.values(quantities).reduce((acc, q) => acc + q, 0);
  const totalAmount = ticketTypes.reduce((acc, type) => {
    return acc + (quantities[type.id] || 0) * type.price;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (totalTickets === 0) {
      setErrorMessage('Please select at least 1 ticket.');
      return;
    }

    if (!contactName || !contactEmail) {
      setErrorMessage('Please enter your contact name and email.');
      return;
    }

    const payloadTickets = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketTypeId, quantity]) => ({
        ticketTypeId,
        quantity,
      }));

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/events/${eventSlug}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName,
          contactEmail,
          contactPhone,
          memberNumber: isMemberVerified ? memberNumber : undefined,
          tickets: payloadTickets,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to complete registration.');

      setSuccessResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel bg-[#fdfbf7] border border-amber-900/20 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#705544] hover:text-[#1c140e] rounded-xl hover:bg-amber-100/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-amber-900/10 pb-4">
          <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
            Event Registration
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c140e] font-display mt-2">{eventTitle}</h2>
        </div>

        {successResult ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#1c140e] font-display">Registration Confirmed!</h3>
            <p className="text-sm text-[#4a382c]">
              Reference: <strong className="text-amber-900 font-mono bg-amber-100 px-2 py-0.5 rounded border border-amber-300">{successResult.registrationNumber}</strong>
            </p>
            <p className="text-xs text-[#705544] max-w-md mx-auto">
              Your {successResult.ticketCount} event ticket(s) have been generated with digital QR check-in tokens and sent to your email.
            </p>

            {successResult.paymentDetails?.checkoutUrl && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-[#4a382c] text-xs text-left space-y-2 mt-4">
                <span className="font-bold text-[#1c140e]">Next Step: Payment Settlement via Zeffy</span>
                <p>
                  To complete admission for paid tickets, proceed to the non-profit Zeffy payment gateway link. Your tickets are held in pending status until payment verification.
                </p>
                <a
                  href={successResult.paymentDetails.checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-magnetic inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold hover:from-amber-600 hover:to-amber-700 mt-2 shadow-xs"
                >
                  <span>Pay Now on Zeffy</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="btn-magnetic px-5 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold text-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Member Verification Section */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-900/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1c140e] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Are you an active UTA Member?</span>
                </label>
                <span className="text-[11px] text-amber-800 font-bold">Unlocks Free Admission</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Member ID (e.g. UTA-2026-F0892)"
                  value={memberNumber}
                  onChange={(e) => setMemberNumber(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-amber-900/20 text-xs text-[#1c140e] focus:outline-none focus:border-amber-600"
                />
                <button
                  type="button"
                  onClick={handleVerifyMember}
                  disabled={memberVerifying}
                  className="btn-magnetic px-3 py-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold hover:bg-amber-200 disabled:opacity-50"
                >
                  {memberVerifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>
              {memberFeedback && (
                <p className={`text-xs ${isMemberVerified ? 'text-emerald-700 font-bold' : 'text-rose-700'}`}>
                  {memberFeedback}
                </p>
              )}
            </div>

            {/* Ticket Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c140e]">
                Select Ticket Quantities
              </h4>
              <div className="space-y-2">
                {ticketTypes.map((type) => {
                  const qty = quantities[type.id] || 0;
                  const isLocked = type.isMembersOnly && !isMemberVerified;

                  return (
                    <div
                      key={type.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                        isLocked
                          ? 'border-amber-900/10 bg-amber-50/30 opacity-60'
                          : qty > 0
                          ? 'border-amber-500 bg-amber-100/60 shadow-xs'
                          : 'border-amber-900/15 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1c140e]">{type.name}</span>
                          {type.isMembersOnly && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 font-semibold">
                              Members Only
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#705544]">{type.description}</p>
                        <span className="text-xs font-bold text-amber-900">
                          {type.price === 0 ? 'FREE' : formatCurrency(type.price)}
                        </span>
                      </div>

                      {isLocked ? (
                        <span className="text-[11px] text-[#8c7664] italic">Verify ID above</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(type.id, -1, type.maxTicketsPerOrder)}
                            disabled={qty === 0}
                            className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center justify-center hover:bg-amber-200 disabled:opacity-30 border border-amber-300"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-[#1c140e]">{qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(type.id, 1, type.maxTicketsPerOrder)}
                            disabled={qty >= type.remainingQuantity || qty >= type.maxTicketsPerOrder}
                            className="w-7 h-7 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold flex items-center justify-center hover:from-amber-600 hover:to-amber-700 disabled:opacity-30 shadow-xs"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c140e]">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#705544] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Venkat Rao"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#705544] mb-1">Email Address (for tickets) *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. venkat@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Footer Summary & Submit */}
            <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#705544]">Total: {totalTickets} ticket(s)</span>
                <p className="text-xl font-bold text-[#1c140e]">
                  {totalAmount === 0 ? 'FREE' : formatCurrency(totalAmount)}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || totalTickets === 0}
                className="btn-magnetic px-5 py-2.5 rounded-xl text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 font-bold text-xs shadow-md disabled:opacity-40"
              >
                {isSubmitting ? 'Registering...' : totalAmount === 0 ? 'Confirm Free Tickets' : 'Proceed to Checkout'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
