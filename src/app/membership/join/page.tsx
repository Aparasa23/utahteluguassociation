import Link from 'next/link';
import {Users,ShieldCheck,ArrowRight} from 'lucide-react';
export const metadata={title:'Membership Enrollment — Utah Telugu Association',description:'UTA membership enrollment information and enrollment availability.'};
export default function JoinPage(){
 return <main className="max-w-4xl mx-auto px-5 py-20 text-white">
  <span className="text-xs uppercase tracking-[.25em] text-amber-300">Utah Telugu Association</span>
  <h1 className="text-4xl sm:text-6xl font-serif mt-5">Find your place in our community.</h1>
  <p className="text-lg leading-relaxed text-slate-200 mt-6 max-w-2xl">Membership gives Telugu families a way to connect, volunteer and participate in community celebrations throughout Utah.</p>
  <section className="rounded-3xl border border-amber-400/25 bg-[#182d33] mt-12 p-6 sm:p-10">
  <ShieldCheck size={32} className="text-amber-300" aria-hidden="true"/>
  <h2 className="text-2xl font-serif mt-4">Online enrollment is being prepared</h2>
  <p className="text-slate-200 mt-4 leading-relaxed">We are finalizing verified membership plans and a secure checkout process. The online application cannot accept personal details or payments yet. You will not be charged or enrolled by visiting this page.</p>
  <div className="flex flex-wrap gap-4 mt-8"><Link href="/membership" className="inline-flex items-center gap-2 rounded-full bg-amber-300 text-[#182d33] px-6 py-3 font-semibold">Explore membership <ArrowRight size={17}/></Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3">Contact the UTA team</Link></div>
  </section>
  <p className="mt-8 text-sm text-slate-300 flex items-center gap-2"><Users size={18}/> Official fees and membership categories will appear after UTA approval.</p>
 </main>
}
