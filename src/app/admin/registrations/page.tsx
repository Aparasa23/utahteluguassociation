import React from 'react';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { hasPermission, type AppRole } from '@/lib/rbac';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const dynamic='force-dynamic';

export default async function AdminRegistrationsPage(){
 const session=await getSession();
 if(!session)redirect('/login?returnUrl=/admin/registrations');
 const actor=await prisma.user.findUnique({
  where:{id:session.user.id},select:{isActive:true,userRoles:{select:{role:{select:{name:true}}}}}
 });
 const roles=(actor?.isActive?actor.userRoles.map(x=>x.role.name):[]) as AppRole[];
 if(!hasPermission(roles,'registrations','read'))redirect('/admin?error=insufficient_permissions');
 const registrations=await prisma.eventRegistration.findMany({
  select:{id:true,registrationNumber:true,contactName:true,contactEmail:true,
    totalAmount:true,paymentStatus:true,status:true,createdAt:true,
    event:{select:{title:true}},attendees:{select:{id:true}},tickets:{select:{id:true}}
  },
  orderBy:{createdAt:'desc'},take:250
 });
 const paid=new Set(['PAID','COMPLETED','FREE']);
 const pending=registrations.filter(r=>!paid.has(r.paymentStatus.toUpperCase())&&r.status!=='CANCELLED').length;
 return <section className="space-y-7 text-[#241b17]">
 <header><p className="text-xs tracking-widest uppercase text-amber-800 font-bold">UTA operations</p>
 <h1 className="text-3xl font-semibold mt-2">Event registrations & orders</h1>
 <p className="text-sm text-[#755b46] mt-2">Official registration records only. Pending payment is not confirmed admission. Latest 250 records.</p></header>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="rounded-xl bg-white border p-5"><p className="text-sm">Records shown</p><strong className="text-3xl">{registrations.length}</strong></div>
 <div className="rounded-xl bg-white border p-5"><p className="text-sm">Unsettled orders</p><strong className="text-3xl">{pending}</strong></div>
 <div className="rounded-xl bg-white border p-5"><p className="text-sm">Registration service</p><strong className="text-lg text-amber-800">Not open</strong></div></div>
 <div className="overflow-x-auto rounded-2xl bg-white border border-amber-900/15"><table className="w-full text-left text-sm">
 <thead className="bg-amber-50 text-[#634731]"><tr>{['Reference','Contact','Event','Attendees','Amount','Payment','Admission','Created'].map(x=><th className="px-4 py-3 whitespace-nowrap" key={x}>{x}</th>)}</tr></thead>
 <tbody className="divide-y divide-amber-900/10">
 {registrations.map(r=><tr key={r.id}><td className="px-4 py-3 font-mono text-xs">{r.registrationNumber}</td>
 <td className="px-4 py-3"><strong className="block">{r.contactName}</strong><span className="text-xs text-[#755b46]">{r.contactEmail}</span></td>
 <td className="px-4 py-3">{r.event.title}</td><td className="px-4 py-3">{r.attendees.length}</td>
 <td className="px-4 py-3">{formatCurrency(r.totalAmount)}</td>
 <td className="px-4 py-3"><span className={paid.has(r.paymentStatus.toUpperCase())?'text-green-800':'text-amber-800'}>{r.paymentStatus}</span></td>
 <td className="px-4 py-3">{r.status}</td><td className="px-4 py-3 whitespace-nowrap">{formatUtahDate(r.createdAt,'short')}</td></tr>)}
 {registrations.length===0&&<tr><td colSpan={8} className="px-4 py-10 text-center text-[#755b46]">No registration records yet.</td></tr>}
 </tbody></table></div></section>
}
