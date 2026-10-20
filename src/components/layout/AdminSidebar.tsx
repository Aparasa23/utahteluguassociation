'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  Users,
  CreditCard,
  Calendar,
  QrCode,
  Trophy,
  Sparkles,
  HeartHandshake,
  Award,
  DollarSign,
  FileText,
  FileSpreadsheet,
  Megaphone,
  Vote,
  ShieldCheck,
  History,
  Settings,
  Layers,
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const sections = [
    {
      group: 'Operations',
      links: [
        { href: '/admin', label: 'Overview & Metrics', icon: ShieldAlert },
        { href: '/admin/check-in', label: 'Ticket QR Check-In', icon: QrCode },
        { href: '/admin/events', label: 'Events & Ticketing', icon: Calendar },
        { href: '/admin/registrations', label: 'Registrations', icon: Layers },
      ],
    },
    {
      group: 'Membership',
      links: [
        { href: '/admin/members', label: 'Member Roster', icon: Users },
        { href: '/admin/families', label: 'Family Units', icon: Users },
        { href: '/admin/membership-plans', label: 'Plan Pricing & Dues', icon: CreditCard },
      ],
    },
    {
      group: 'Programs & Sports',
      links: [
        { href: '/admin/tournaments', label: 'Sports Tournaments', icon: Trophy },
        { href: '/admin/teams', label: 'Teams & Rosters', icon: Trophy },
        { href: '/admin/performances', label: 'Stage Run-of-Show', icon: Sparkles },
        { href: '/admin/volunteers', label: 'Volunteer Shifts', icon: HeartHandshake },
        { href: '/admin/sponsors', label: 'Sponsors & Tiers', icon: Award },
      ],
    },
    {
      group: 'Finance & Governance',
      links: [
        { href: '/admin/finances', label: 'Budgets & Ledger', icon: DollarSign },
        { href: '/admin/donations', label: 'Donations', icon: DollarSign },
        { href: '/admin/governance', label: 'Bylaws & Proposals', icon: Vote },
        { href: '/admin/reports', label: 'Financial Reports & CSV', icon: FileSpreadsheet },
        { href: '/admin/announcements', label: 'Communications', icon: Megaphone },
        { href: '/admin/roles', label: 'RBAC Roles & Permissions', icon: ShieldCheck },
        { href: '/admin/audit-logs', label: 'Audit Trail', icon: History },
        { href: '/admin/settings', label: 'Association Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 glass-panel bg-[#050813]/90 border-r border-white/10 p-4 space-y-5 shrink-0 hidden md:block max-h-screen overflow-y-auto scrollbar-thin">
      <div className="px-3 py-2 border-b border-white/10">
        <span className="text-[11px] font-bold text-rose-400 tracking-wider uppercase flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Executive Control Panel</span>
        </span>
        <p className="text-xs text-slate-400">UTA Officers & Directors</p>
      </div>

      {sections.map((section, sIdx) => (
        <div key={sIdx} className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {section.group}
          </span>
          {section.links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
