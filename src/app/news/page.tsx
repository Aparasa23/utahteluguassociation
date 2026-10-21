import {getPublicAnnouncements} from '@/lib/publicAnnouncements';
export const revalidate=60;
export const metadata={title:'Latest UTA announcements',description:'Official notices from Utah Telugu Association'};
export default async function NewsPage(){
 const items=await getPublicAnnouncements();
 return <main className="max-w-4xl mx-auto px-5 py-16"><p className="text-sm tracking-widest uppercase">Utah Telugu Association</p><h1 className="text-4xl font-serif mt-3 mb-8">Latest announcements</h1>{items.length?<div className="grid gap-5">{items.map(a=><article className="rounded-2xl p-6 bg-white text-stone-900" key={a.id}><div className="flex justify-between gap-5 text-sm"><time dateTime={a.createdAt.toISOString()}>{a.createdAt.toLocaleDateString('en-US',{timeZone:'America/Denver',month:'short',day:'numeric',year:'numeric'})}</time>{a.isUrgent&&<strong>Important notice</strong>}</div><h2 className="text-xl font-semibold mt-3">{a.title}</h2><p className="mt-2 whitespace-pre-wrap">{a.content}</p></article>)}</div>:<p role="status">No published announcements yet.</p>}</main>
}
