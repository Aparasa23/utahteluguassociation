'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Users,
  CreditCard,
  QrCode,
  Calendar,
  Ticket,
  Receipt,
  HeartHandshake,
  Bell,
  Settings,
} from 'lucide-react';

export function MemberSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { href: '/dashboard/membership-card', label: 'Digital Member Pass', icon: QrCode },
    { href: '/dashboard/family', label: 'Family Roster', icon: Users },
    { href: '/dashboard/membership', label: 'Membership Plan', icon: CreditCard },
    { href: '/dashboard/tickets', label: 'My Event Tickets', icon: Ticket },
    { href: '/dashboard/registrations', label: 'Event Registrations', icon: Calendar },
    { href: '/dashboard/payments', label: 'Payment Receipts', icon: Receipt },
    { href: '/dashboard/volunteering', label: 'Volunteer Service', icon: HeartHandshake },
    { href: '/dashboard/profile', label: 'Profile Settings', icon: User },
    { href: '/dashboard/notifications', label: 'Announcements & Alerts', icon: Bell },
    { href: '/dashboard/settings', label: 'Account Preferences', icon: Settings },
  ];

  return (
    <aside className="w-64 glass-panel bg-[#080d22]/80 border-r border-white/10 p-4 space-y-2 shrink-0 hidden md:block">
      <div className="px-3 py-2 mb-2">
        <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase">
          Member Portal
        </span>
        <p className="text-xs text-slate-400">Venkat & Priya Rao</p>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
