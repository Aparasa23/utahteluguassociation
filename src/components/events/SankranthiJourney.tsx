'use client';
import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,Check,Users,Flower2,Trophy,Music2,ShieldCheck} from 'lucide-react';

type Activity='rangoli'|'pickleball'|'volleyball'|'grand_festival';
const activities:{key:Activity;title:string;subtitle:string;detail:string;icon:typeof Users}[]=[
 {key:'rangoli',title:'Muggu & Rangoli',subtitle:'Traditional artistry',detail:'Solo or family/team participation',icon:Flower2},
 {key:'pickleball',title:'Pickleball',subtitle:'Skill, friendship & fun',detail:'Choose your division and partner',icon:Trophy},
 {key:'volleyball',title:'Volleyball',subtitle:'Team spirit',detail:'Join as a captain or player',icon:Trophy},
 {key:'grand_festival',title:'Cultural Celebration',subtitle:'Performances & festivities',detail:'Share your family attendance',icon:Music2}
];

export default function SankranthiJourney(){
 const [step,setStep]=useState(0),[selected,setSelected]=useState<Activity[]>([]);
 const [familySize,setFamilySize]=useState(1),[adultCount,setAdultCount]=useState(1);
 const [details,setDetails]=useState<Record<string,string>>({});
 const [ack,setAck]=useState(false);
 const [notice,setNotice]=useState('');
 useEffect(()=>{
  try{
   const saved=sessionStorage.getItem('uta-sankranthi-plan-preview');
   if(!saved)return;
   const data=JSON.parse(saved);
   if(Array.isArray(data.selected))setSelected(data.selected.filter((key:unknown)=>activities.some(activity=>activity.key===key)));
   if(Number.isInteger(data.familySize)&&data.familySize>=1&&data.familySize<=30)setFamilySize(data.familySize);
   if(Number.isInteger(data.adultCount)&&data.adultCount>=1&&data.adultCount<=30)setAdultCount(Math.min(data.adultCount,data.familySize||30));
   if(data.details&&typeof data.details==='object')setDetails(data.details);
   setNotice('Your saved plan was restored in this browser tab.');
  }catch{sessionStorage.removeItem('uta-sankranthi-plan-preview')}
 },[]);
 const savePlan=()=>{
  try{
   sessionStorage.setItem('uta-sankranthi-plan-preview',JSON.stringify({selected,familySize,adultCount,details}));
   setNotice('Saved for this browser tab. Nothing was submitted to UTA.');
  }catch{setNotice('Saving is unavailable in this browser. You can still download your plan.')}
 };
 const downloadPlan=()=>{
  const summary=['UTA Sankranthi 2027 — PLANNING PREVIEW, NOT A REGISTRATION','',
   ...selected.map((key,i)=>(i+1)+'. '+(activities.find(item=>item.key===key)?.title||key)),'',
   'Household: '+familySize,'Adults: '+adultCount,'Children: '+Math.max(0,familySize-adultCount),'',
   ...Object.entries(details).filter(([,value])=>value.trim()).map(([key,value])=>key+': '+value),
   '','No place has been reserved and no ticket has been issued. Check official UTA announcements.'].join('\n');
  const blob=new Blob([summary],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);const anchor=document.createElement('a');
  anchor.href=url;anchor.download='UTA-Sankranthi-2027-Planning-Preview.txt';
  document.body.appendChild(anchor);anchor.click();anchor.remove();URL.revokeObjectURL(url);
  setNotice('Plan downloaded. This is not a registration confirmation.');
 };
 const change=(key:string,value:string)=>setDetails(old=>({...old,[key]:value}));
 const toggle=(key:Activity)=>setSelected(old=>old.includes(key)?old.filter(k=>k!==key):[...old,key]);
 const field=(id:string,label:string,placeholder:string)=> <label className="block"><span className="block text-sm mb-2 text-[#594636]">{label}</span><input aria-label={label} value={details[id]||''} onChange={e=>change(id,e.target.value)} placeholder={placeholder} className="w-full border border-[#d9c3a5] bg-[#fffcf8] rounded-xl px-4 py-3 text-[#34281f] focus-visible:outline-2 focus-visible:outline-[#bd7940]"/></label>;
 return <div className="min-h-screen bg-[#f7f0e5] text-[#2c261f]">
 <style jsx global>{`
 .sk-hub .sk-hero{background:radial-gradient(ellipse at 70% 30%,#bb764c66,transparent 55%),linear-gradient(130deg,#39271c,#70402d 57%,#2e3738);color:#fff8eb}
 .sk-hub .sk-card{background:#fffdf8;border:1px solid #eadbc6;border-radius:22px;box-shadow:0 16px 40px #3d291208}
 .sk-hub button:focus-visible,.sk-hub a:focus-visible{outline:3px solid #b56e36;outline-offset:3px}
 .sk-hub .sk-choice{border:2px solid #e5d5bf;background:#fffdf8;border-radius:18px;padding:22px;text-align:left;transition:background .18s,border .18s}
 .sk-hub .sk-choice[aria-pressed=true]{background:#fbeacb;border-color:#bb7844}
 `}</style>
 <main className="sk-hub">
 <section className="sk-hero px-5 py-16 md:py-24"><div className="max-w-6xl mx-auto"><Link href="/" className="inline-flex gap-2 items-center text-sm opacity-80 hover:opacity-100"><ArrowLeft size={16}/> UTA Home</Link><p className="mt-10 text-xs font-bold tracking-[.3em] uppercase text-[#ffd69a]">Celebrate our traditions together</p><h1 className="font-serif text-5xl md:text-8xl tracking-tight mt-4">Sankranthi <span className="text-[#ffc877]">2027</span></h1><p className="mt-5 text-lg text-[#f2ddc5] max-w-xl leading-relaxed">One festival. Four ways to join in. Plan your family&apos;s activities in one simple journey.</p><p className="mt-5 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">Registration planning preview · Official registration not yet open</p></div></section>
 <section className="max-w-6xl mx-auto px-5 py-12 md:py-16"><div className="flex gap-3 text-sm text-[#796956] mb-8" aria-label="Registration planning progress">{['Choose activities','Household & details','Review'].map((v,i)=><span key={v} className={i===step?'font-bold text-[#8d4927]':''}>{i+1}. {v}{i<2?'  / ':''}</span>)}</div>
 <div className="sk-card p-5 md:p-10">{notice&&<p role="status" className="mb-5 rounded-lg bg-[#eaf1e2] text-[#38513a] px-4 py-3 text-sm">{notice}</p>}<div aria-live="polite">
 {step===0&&<><p className="text-xs tracking-[.22em] uppercase font-semibold text-[#956341]">Step 1</p><h2 className="text-3xl md:text-5xl font-serif my-3">Choose your experiences.</h2><p className="text-[#655748] mb-8">Select all the activities your household would like to join.</p><div className="grid sm:grid-cols-2 gap-4">{activities.map(({key,title,subtitle,detail,icon:Icon})=><button type="button" key={key} onClick={()=>toggle(key)} aria-pressed={selected.includes(key)} className="sk-choice relative"><div className="flex justify-between items-start"><Icon size={28} color="#a76333"/><span className="rounded-full w-7 h-7 border border-[#aa8e6e] flex justify-center items-center">{selected.includes(key)&&<Check size={18}/>}</span></div><h3 className="text-2xl font-serif mt-5">{title}</h3><p className="text-sm mt-1 text-[#895a33]">{subtitle}</p><p className="text-sm mt-4 text-[#6f6255]">{detail}</p></button>)}</div></>}
 {step===1&&<><p className="text-xs tracking-[.22em] uppercase font-semibold text-[#956341]">Step 2</p><h2 className="text-3xl md:text-5xl font-serif my-3">Your family, together.</h2><p className="text-[#655748] mb-7">Household details are collected once. This planning preview keeps them on your device only.</p><div className="grid sm:grid-cols-2 gap-5"><label className="block"><span className="block text-sm mb-2">Household size *</span><input type="number" min={1} max={30} value={familySize} onChange={e=>{const n=Math.max(1,Math.min(30,Number(e.target.value)||1));setFamilySize(n);setAdultCount(Math.min(adultCount,n))}} className="w-full border border-[#d9c3a5] bg-white rounded-xl px-4 py-3"/></label><label className="block"><span className="block text-sm mb-2">Number of adults *</span><input type="number" min={1} max={familySize} value={adultCount} onChange={e=>setAdultCount(Math.max(1,Math.min(familySize,Number(e.target.value)||1)))} className="w-full border border-[#d9c3a5] bg-white rounded-xl px-4 py-3"/></label></div><div className="mt-7 space-y-6">{selected.includes('rangoli')&&<div><h3 className="font-serif text-2xl mb-3">Muggu & Rangoli</h3>{field('rangoliTeam','Team or participant names','Names of participants')}</div>}{selected.includes('pickleball')&&<div><h3 className="font-serif text-2xl mb-3">Pickleball</h3>{field('pickleballPartner','Partner or team information','Player names / division')}</div>}{selected.includes('volleyball')&&<div><h3 className="font-serif text-2xl mb-3">Volleyball</h3>{field('volleyballTeam','Team and captain','Team name / captain')}</div>}{selected.includes('grand_festival')&&<div><h3 className="font-serif text-2xl mb-3">Cultural Celebration</h3>{field('performance','Performance interest (optional)','Dance, music, or general attendance')}</div>}</div></>}
 {step===2&&<><p className="text-xs tracking-[.22em] uppercase font-semibold text-[#956341]">Step 3</p><h2 className="text-3xl md:text-5xl font-serif my-3">Your festival plan.</h2><p className="text-[#655748] mb-7">Review your selections. This is not a submitted registration or confirmed ticket.</p><div className="rounded-2xl bg-[#f7eddf] p-6"><p className="font-semibold mb-2">Selected activities</p><ul className="space-y-2 list-disc pl-5">{activities.filter(x=>selected.includes(x.key)).map(x=><li key={x.key}>{x.title}</li>)}</ul><p className="mt-5">Household: {familySize} people · {adultCount} adult{adultCount===1?'':'s'} · {familySize-adultCount} child{familySize-adultCount===1?'':'ren'}</p></div><label className="flex items-start gap-3 mt-6 text-sm"><input type="checkbox" className="mt-1" checked={ack} onChange={e=>setAck(e.target.checked)}/><span>I understand this is a planning preview only. No registration, payment, or ticket is created.</span></label>{ack&&<p className="mt-6 rounded-xl bg-[#eaf0e4] px-5 py-4 text-[#34533b]" role="status"><ShieldCheck size={19} className="inline mr-2"/>Your plan is ready to review. Registration will be available after UTA announces official dates, fees, and eligibility.</p>}</>}
 </div><div className="flex flex-wrap gap-3 items-center mt-7"><button type="button" onClick={savePlan} className="rounded-full border border-[#a77d52] text-[#6d4228] px-5 py-2 text-sm font-semibold">Save plan in this tab</button><button type="button" onClick={downloadPlan} className="rounded-full border border-[#a77d52] text-[#6d4228] px-5 py-2 text-sm font-semibold">Download plan</button></div><div className="flex flex-wrap justify-between gap-4 items-center mt-10 pt-7 border-t border-[#e9dbc9]"><button type="button" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} className="px-6 py-3 rounded-full border border-[#ad9070] disabled:opacity-30 flex items-center gap-2"><ArrowLeft size={16}/> Back</button>{step<2?<button type="button" disabled={step===0&&!selected.length} onClick={()=>setStep(s=>Math.min(2,s+1))} className="bg-[#924b2c] text-white font-semibold px-7 py-3 rounded-full flex items-center gap-2 disabled:opacity-40">Continue <ArrowRight size={16}/></button>:<Link href="/events" className="bg-[#924b2c] text-white font-semibold px-7 py-3 rounded-full">Explore other events</Link>}</div>
 </div><p className="text-sm text-[#716454] mt-7 text-center">For official event dates, venues, and registration availability, consult published UTA announcements.</p></section></main></div>;
}
