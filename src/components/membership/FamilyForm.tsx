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
        <label className="block text-sm font-bold text-white uppercase tracking-wider">
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
                    ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{p.name}</span>
                  <span className="text-base font-extrabold text-amber-400">
                    {formatCurrency(p.price)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                <span className="inline-block mt-2 text-[10px] font-semibold text-slate-300 px-2 py-0.5 rounded bg-black/40">
                  Max Family Capacity: {p.maxFamilyMembers} members
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Member Information */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          <span>2. Primary Member Information (Utah Resident)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Venkat Rao"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. member@utahtelugu.org"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Cell) *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(801) 555-0123"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address</label>
            <input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="11422 S Grandville Ave"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:col-span-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
              <input
                type="text"
                value={state}
                disabled
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-slate-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ZIP</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Family Members Roster (when applicable) */}
      {currentPlan.maxFamilyMembers > 1 && (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">3. Eligible Family Members Roster</h3>
              <p className="text-xs text-slate-400">
                Spouse and dependent children residing in the same Utah household.
              </p>
            </div>
            <button
              type="button"
              onClick={addFamilyMember}
              disabled={totalFamilyCount >= currentPlan.maxFamilyMembers}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>

          <div className="space-y-3">
            {familyMembers.map((member, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={member.fullName}
                    onChange={(e) => updateFamilyMember(idx, 'fullName', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <select
                    value={member.relationship}
                    onChange={(e) => updateFamilyMember(idx, 'relationship', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
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
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFamilyMember(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10"
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
      <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentRules}
            onChange={(e) => setConsentRules(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400"
          />
          <span className="text-xs text-slate-300 leading-relaxed">
            I confirm that all registered family members reside at this Utah address and agree to abide by the bylaws, non-profit community guidelines, and volunteer policies of the Utah Telugu Association (UTA).
          </span>
        </label>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <span className="text-xs text-slate-400">Total Annual Dues:</span>
          <p className="text-2xl font-extrabold text-amber-400">{formatCurrency(currentPlan.price)}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Processing Enrollment...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Complete Enrollment & Issue ID</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
