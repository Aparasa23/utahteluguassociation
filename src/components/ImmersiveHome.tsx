'use client';
import React,{useState} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {ArrowUpRight,ChevronDown,CalendarDays,Users,Flower2,Trophy,Music2} from 'lucide-react';
const World=dynamic(()=>import('./UTACinematicScene'),{ssr:false,loading:()=> <div className="loading-3d">Entering the celebration…</div>});
type Notice={id:string,title:string,content:string,isUrgent:boolean,createdAt:string};
export default function ImmersiveHome({announcements}:{announcements:Notice[]}){
 const [selected,setSelected]=useState<string|null>(null);
 const activities=[{id:'muggu',name:'Muggu & Rangoli',description:'Tradition, color and creativity',icon:Flower2},{id:'pickleball',name:'Pickleball',description:'Friendly competition and community',icon:Trophy},{id:'volleyball',name:'Volleyball',description:'Play together, celebrate together',icon:Trophy},{id:'cultural',name:'Cultural Celebration',description:'Performances, music and memories',icon:Music2}];
 return <main className="uta-cinematic">
 <style jsx global>{`
 .uta-cinematic{--cream:#fff1dc;--gold:#f2bd62;background:#0d1724;color:var(--cream);font-family:Georgia,serif;overflow:hidden}
 .uta-cinematic *{box-sizing:border-box}.uta-cinematic a{text-decoration:none}.uta-cinematic button{cursor:pointer}
 .uta-cinematic .notice{position:relative;z-index:4;display:flex;align-items:center;gap:16px;padding:12px max(22px,calc((100vw - 1300px)/2));background:#f4c673;color:#281c16;font:600 13px/1.4 Arial,sans-serif;flex-wrap:wrap}
 .uta-cinematic .notice strong{flex:1}.uta-cinematic .notice a{text-decoration:underline;color:#281c16}
 .uta-cinematic .hero{height:calc(100svh - 40px);min-height:680px;max-height:1100px;position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(ellipse at 60% 65%,#ce875e 0,#51456b 39%,#101d35 78%)}
 .uta-cinematic .hero:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(8,16,30,.82),transparent 75%),linear-gradient(0deg,rgba(8,15,23,.95),transparent 36%);z-index:1}
 .uta-cinematic .scene{position:absolute;inset:0;z-index:0}.uta-cinematic .hero-copy{position:absolute;z-index:2;top:23%;left:max(6vw,calc((100vw - 1300px)/2));max-width:690px;padding-right:20px}
 .uta-cinematic .eyebrow{letter-spacing:.28em;text-transform:uppercase;font:600 12px/1.6 Arial,sans-serif;color:#f5c36e}.uta-cinematic h1{font-size:clamp(56px,8vw,118px);font-weight:400;letter-spacing:-.045em;line-height:.93;margin:28px 0}.uta-cinematic em{color:#f7c36d;font-weight:400}
 .uta-cinematic .hero-copy p{font:400 clamp(16px,1.6vw,20px)/1.7 Arial,sans-serif;max-width:530px;color:#f5e7d5}
 .uta-cinematic .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px}.uta-cinematic .cta{display:inline-flex;gap:10px;align-items:center;padding:15px 20px;border-radius:100px;background:#f1bd5f;color:#201916;font:700 13px Arial,sans-serif}.uta-cinematic .cta.alt{background:#ffffff19;border:1px solid #ffffff65;color:#fff}
 .uta-cinematic .scrollhint{position:absolute;z-index:2;bottom:26px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;font:12px Arial,sans-serif;letter-spacing:.25em}
 .uta-cinematic .chapter{padding:120px 6vw;background:linear-gradient(#0d1724,#192236);min-height:650px}.uta-cinematic .wrap{max-width:1220px;margin:0 auto}.uta-cinematic h2{font-size:clamp(42px,6vw,86px);line-height:1.05;font-weight:400;letter-spacing:-.035em;margin:16px 0 24px}.uta-cinematic .desc{font:17px/1.7 Arial,sans-serif;color:#e0d9d0;max-width:640px}
 .uta-cinematic .activities{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:55px}.uta-cinematic .activity{border:1px solid #f7d5a442;background:linear-gradient(140deg,#fff3df12,#fff3df07);border-radius:20px;padding:27px;min-height:250px}.uta-cinematic .activity h3{font-size:25px;font-weight:400;margin:22px 0 10px}.uta-cinematic .activity p{font:14px/1.6 Arial,sans-serif;color:#dfd2bd}.uta-cinematic .activity button{background:none;border:none;color:#fac77a;padding:15px 0;font:700 13px Arial,sans-serif}.uta-cinematic .activity a{display:inline-block;margin-top:12px;color:#ffcf8f;text-decoration:underline;font:13px Arial,sans-serif}
 .uta-cinematic .section-bottom{text-align:center;padding:115px 24px;background:#202536}.uta-cinematic .section-bottom h2{margin:20px auto 32px}
 @media(max-width:850px){.uta-cinematic .activities{grid-template-columns:repeat(2,minmax(0,1fr))}.uta-cinematic .hero-copy{left:7vw;top:26%}.uta-cinematic .hero{min-height:630px}}
 @media(max-width:560px){.uta-cinematic .hero{min-height:690px;height:90svh}.uta-cinematic .hero-copy{top:25%}.uta-cinematic h1{font-size:clamp(56px,14vw,75px)}.uta-cinematic .chapter{padding:80px 22px}.uta-cinematic .activities{grid-template-columns:1fr}.uta-cinematic .activity{min-height:200px}.uta-cinematic .notice{gap:7px;padding:12px 20px}.uta-cinematic .scrollhint{font-size:9px}}
 @media(prefers-reduced-motion:reduce){.uta-cinematic *{scroll-behavior:auto!important;animation:none!important}}
 `}</style>
 {announcements.length>0&&<aside className="notice" aria-label="Latest announcement"><span>{announcements[0].isUrgent?'IMPORTANT NOTICE':'LATEST AT UTA'}</span><strong>{announcements[0].title}</strong><Link href="/news">All announcements ↗</Link></aside>}
 <section className="hero" aria-label="Immersive UTA welcome">
 <div className="scene" aria-hidden="true"><World/></div>
 <div className="hero-copy"><span className="eyebrow">Culture ✦ Community ✦ Belonging</span><h1>Our roots.<br/><em>Our Utah.</em><br/>Our story.</h1><p>Celebrate Telugu traditions, discover new friendships, and make Utah feel like home.</p><div className="actions"><Link className="cta" href="/events/sankranthi-2027">Explore Sankranthi <ArrowUpRight size={17}/></Link><Link className="cta alt" href="/membership">Become a member <Users size={16}/></Link></div></div>
 <div className="scrollhint">SCROLL TO DISCOVER <ChevronDown size={16}/></div></section>
 <section className="chapter" id="explore-uta"><div className="wrap"><span className="eyebrow">THE CELEBRATION CONTINUES</span><h2>Every gathering<br/><em>begins a new story.</em></h2><p className="desc">One Sankranthi celebration. Four ways to participate. Discover an activity and enter the unified registration journey.</p><div className="activities">{activities.map(({id,name,description,icon:Icon})=><article className="activity" key={id}><Icon size={32} color="#f6c276"/><h3>{name}</h3><p>{description}</p><button onClick={()=>setSelected(selected===id?null:id)} aria-expanded={selected===id}>Discover <ArrowUpRight size={15} style={{display:'inline'}}/></button>{selected===id&&<div><p>See schedule, eligibility and registration details in the Sankranthi event hub.</p><Link href="/events/sankranthi-2027">View activity and register ↗</Link></div>}</article>)}</div></div></section>
 <section className="section-bottom"><span className="eyebrow">UTAH TELUGU ASSOCIATION</span><h2>Come for the celebration.<br/><em>Stay for the connections.</em></h2><div className="actions" style={{justifyContent:'center'}}><Link href="/events" className="cta"><CalendarDays size={17}/> Upcoming events</Link><Link href="/community" className="cta alt">Discover our community</Link></div></section>
 </main>;
}