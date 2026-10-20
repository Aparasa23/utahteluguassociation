'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Plus, Trash2, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Plan {
  id: string;
  code: string;
  name: string;
  price: number;
  maxFamilyMembers: number;
  description: string;
}

interface FamilyMemberEntry {
  fullName: string;
  relationship: 'SPOUSE' | 'CHILD' | 'PARENT' | 'OTHER';
  age: number | '';
  gender: string;
}

interface FamilyFormProps {
  plans: Plan[];
  selectedPlanCode?: string;
}

export function FamilyForm({ plans, selectedPlanCode = 'FAMILY_ANNUAL' }: FamilyFormProps) {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    plans.find((p) => p.code === selectedPlanCode)?.id || plans[0]?.id || ''
  );

  const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  // Primary Member Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('South Jordan');
  const [state, setState] = useState('UT');
  const [zipCode, setZipCode] = useState('84095');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Family Members Roster
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberEntry[]>([
    { fullName: '', relationship: 'SPOUSE', age: '', gender: 'Female' },
  ]);

  const [consentRules, setConsentRules] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const totalFamilyCount = 1 + familyMembers.filter((m) => m.fullName.trim() !== '').length;

  const addFamilyMember = () => {
    if (totalFamilyCount >= currentPlan.maxFamilyMembers) {
      setErrorMessage(`The selected plan allows a maximum of ${currentPlan.maxFamilyMembers} family members.`);
      return;
    }
    setErrorMessage('');
    setFamilyMembers([
      ...familyMembers,
      { fullName: '', relationship: 'CHILD', age: '', gender: 'Female' },
    ]);
  };

  const removeFamilyMember = (index: number) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMemberEntry, value: any) => {
    const updated = [...familyMembers];
    updated[index] = { ...updated[index], [field]: value };
    setFamilyMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName || !email || !phone) {
      setErrorMessage('Please fill in all required primary contact fields.');
      return;
    }

    if (!consentRules) {
      setErrorMessage('You must agree to association membership rules.');
      return;
    }

    if (currentPlan.code === 'FAMILY_ANNUAL' && familyMembers.length === 0) {
      setErrorMessage('Family plan requires at least spouse or family details.');
      return;
    }

    if (totalFamilyCount > currentPlan.maxFamilyMembers) {
      setErrorMessage(`Family size (${totalFamilyCount}) exceeds plan limit of ${currentPlan.maxFamilyMembers}.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/membership/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: currentPlan.id,
          primaryMember: {
            fullName,
            email,
            phone,
            addressLine1,
            city,
            state,
            zipCode,
            emergencyContact,
            emergencyPhone,
          },
          familyMembers: familyMembers.filter((m) => m.fullName.trim() !== ''),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit membership.');

      setSuccessMessage('Enrollment successful! Redirecting to member dashboard...');
      setTimeout(() => {
        router.push('/dashboard/membership-card');
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
      {/* Plan Selection Radio Cards */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white uppercase tracking-wider font-display">
          1. Select Your Membership Plan
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plans.map((p) => {
            const isSelected = p.id === selectedPlanId;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPlanId(p.id);
                  setErrorMessage('');
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#f4bb59] bg-[#f4bb59]/20 shadow-xl'
                    : 'border-[#f4bb59]/20 bg-[#09222c]/90 hover:border-[#f4bb59]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{p.name}</span>
                  <span className="text-base font-black text-[#f4bb59] font-display">
                    {formatCurrency(p.price)}
                  </span>
                </div>
                <p className="text-xs text-[#a5c2cb] mt-1">{p.description}</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-[#071a20] bg-[#f4bb59] px-2 py-0.5 rounded font-bold">
                  Max Family Capacity: {p.maxFamilyMembers} members
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Member Information */}
      <div className="glass-panel p-6 rounded-2xl border border-[#f4bb59]/25 bg-[#09222c]/90 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
          <Users className="w-4 h-4 text-[#f4bb59]" />
          <span>2. Primary Member Information (Utah Resident)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-white mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Venkat Rao"
              className="w-full px-3 py-2 rounded-lg bg-[#071a20] border border-[#f4bb59]/30 text-white text-sm focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. member@utahtelugu.org"
              className="w-full px-3 py-2 rounded-lg bg-[#071a20] border border-[#f4bb59]/30 text-white text-sm focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">Phone Number (Cell) *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(801) 555-0123"
              className="w-full px-3 py-2 rounded-lg bg-[#071a20] border border-[#f4bb59]/30 text-white text-sm focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">Street Address</label>
            <input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="11422 S Grandville Ave"
              className="w-full px-3 py-2 rounded-lg bg-[#071a20] border border-[#f4bb59]/30 text-white text-sm focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:col-span-2">
            <div>
              <label className="block text-xs font-bold text-white mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#071a20] border border-[#f4bb59]/30 text-white text-sm focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white mb-1">State</label>
              <input
                type="text"
                value={state}
                disabled
                className="w-full px-3 py-2 rounded-lg bg-[#071a20]/60 border border-[#f4bb59]/20 text-[#a5c2cb] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white mb-1">ZIP</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#071a20] border border-[#f4bb59]/30 text-white text-sm focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Family Members Roster (when applicable) */}
      {currentPlan.maxFamilyMembers > 1 && (
        <div className="glass-panel p-6 rounded-2xl border border-[#f4bb59]/25 bg-[#09222c]/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">3. Eligible Family Members Roster</h3>
              <p className="text-xs text-[#a5c2cb]">
                Spouse and dependent children residing in the same Utah household.
              </p>
            </div>
            <button
              type="button"
              onClick={addFamilyMember}
              disabled={totalFamilyCount >= currentPlan.maxFamilyMembers}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#f4bb59]/15 text-[#f4bb59] border border-[#f4bb59]/30 hover:bg-[#f4bb59]/25 transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>

          <div className="space-y-3">
            {familyMembers.map((member, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#071a20]/90 border border-[#f4bb59]/20 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={member.fullName}
                    onChange={(e) => updateFamilyMember(idx, 'fullName', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#041216] border border-[#f4bb59]/30 text-white text-xs focus:outline-none focus:border-[#f4bb59]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <select
                    value={member.relationship}
                    onChange={(e) => updateFamilyMember(idx, 'relationship', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#041216] border border-[#f4bb59]/30 text-white text-xs focus:outline-none focus:border-[#f4bb59]"
                  >
                    <option value="SPOUSE">Spouse</option>
                    <option value="CHILD">Child</option>
                    <option value="PARENT">Parent</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="number"
                    placeholder="Age"
                    value={member.age}
                    onChange={(e) => updateFamilyMember(idx, 'age', parseInt(e.target.value) || '')}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#041216] border border-[#f4bb59]/30 text-white text-xs focus:outline-none focus:border-[#f4bb59]"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFamilyMember(idx)}
                    className="p-1.5 text-[#a5c2cb] hover:text-rose-400 rounded-lg hover:bg-rose-950/40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consent & Association Bylaws Check */}
      <div className="p-4 rounded-xl bg-[#071a20]/90 border border-[#f4bb59]/20 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentRules}
            onChange={(e) => setConsentRules(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-[#f4bb59]/30 text-[#f4bb59] focus:ring-[#f4bb59]"
          />
          <span className="text-xs text-[#e7d5b8] leading-relaxed">
            I confirm that all registered family members reside at this Utah address and agree to abide by the bylaws, non-profit community guidelines, and volunteer policies of the Utah Telugu Association (UTA).
          </span>
        </label>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4 border-t border-[#f4bb59]/20">
        <div>
          <span className="text-xs text-[#a5c2cb]">Total Annual Dues:</span>
          <p className="text-2xl font-black text-[#f4bb59] font-display">{formatCurrency(currentPlan.price)}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl font-extrabold bg-gradient-to-r from-[#f4bb59] to-[#d8972b] hover:brightness-110 text-[#071a20] shadow-xl flex items-center gap-2 disabled:opacity-50 text-xs transition-all"
        >
          {isSubmitting ? (
            <span>Processing Enrollment...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#071a20]" />
              <span>Complete Enrollment & Issue ID</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
