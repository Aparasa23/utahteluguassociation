'use client';
import React,{useEffect,useRef,useState} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {ArrowDown,ArrowRight,ArrowUpRight,CalendarDays,Flower2,HeartHandshake,Menu,Music2,Trophy,Users,X} from 'lucide-react';

const World=dynamic(()=>import('./UTACinematicScene'),{ssr:false,loading:()=>null});
type Notice={id:string;title:string;content:string;isUrgent:boolean;createdAt:string};
const chapters=[
 {n:'01',eyebrow:'THE ART OF BELONGING',title:'Our traditions,',accent:'reimagined.',telugu:'మన సంస్కృతి • మన సంబరాలు',description:'The warmth of a Sankranthi morning. The intricate lines of a muggu. A thousand little moments that make somewhere feel like home.',cta:'Discover our celebrations',href:'/events',tone:'harvest'},
 {n:'02',eyebrow:'THE SPIRIT OF PLAY',title:'More than',accent:'a game.',telugu:'కలిసి ఆడుదాం • కలిసి గెలుద్దాం',description:'A first serve, a last-ball finish, a teammate cheering from the sidelines. Together, we build a community that keeps moving.',cta:'Explore UTA sports',href:'/sports',tone:'play'},
 {n:'03',eyebrow:'ROOTS MEET THE FUTURE',title:'A place for',accent:'every story.',telugu:'మన ఊరు • మన కుటుంబం',description:'Across generations and across Utah, we carry the language, laughter and kindness of home into everything we do.',cta:'Meet our community',href:'/community',tone:'together'}
] as const;
const journeys=[
 {tag:'01 / CREATE',name:'Muggu & Rangoli',telugu:'ముగ్గుల పోటీలు',icon:Flower2,detail:'A canvas of color, culture and imagination.'},
 {tag:'02 / PLAY',name:'Pickleball',telugu:'పికిల్‌బాల్',icon:Trophy,detail:'Every rally makes room for another friendship.'},
 {tag:'03 / COMPETE',name:'Volleyball',telugu:'వాలీబాల్',icon:Trophy,detail:'The court is where our team spirit comes alive.'},
 {tag:'04 / CELEBRATE',name:'Cultural Festival',telugu:'సంక్రాంతి వేడుకలు',icon:Music2,detail:'Music, stories and the joy of being together.'}
];
function clamp(n:number){return Math.max(0,Math.min(1,n))}
export default function ImmersiveHome({announcements}:{announcements:Notice[]}){
 const scrolly=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0),[reduced,setReduced]=useState(true),[open,setOpen]=useState(false);
 useEffect(()=>{
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateMotion=()=>setReduced(motion.matches);
  updateMotion();motion.addEventListener?.('change',updateMotion);
  let raf=0;const update=()=>{
   if(raf)return;
   raf=requestAnimationFrame(()=>{
    raf=0;const target=scrolly.current;if(!target)return;
    const r=target.getBoundingClientRect();
    setProgress(clamp(-r.top/Math.max(1,r.height-window.innerHeight)));
   });
  };
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
  update();
  return()=>{removeEventListener('scroll',update);removeEventListener('resize',update);motion.removeEventListener?.('change',updateMotion);if(raf)cancelAnimationFrame(raf)};
 },[]);
 const index=progress>=.6667?2:progress>=.3333?1:0;
 const chapter=chapters[index];
 const visit=(i:number)=>{const r=scrolly.current;if(!r)return;const start=window.scrollY+r.getBoundingClientRect().top;const amount=Math.max(0,r.offsetHeight-window.innerHeight);window.scrollTo({top:start+amount*(i+.08)/3,behavior:reduced?'auto':'smooth'})};
 return <div className="uta-v2">
 <style jsx global>{`
 .uta-v2{--gold:#efc888;--cream:#f6eddc;--ink:#111712;background:#101b1c;color:var(--cream);overflow:clip;isolation:isolate;font-family:'DM Sans',Arial,sans-serif}
 .uta-v2 *{box-sizing:border-box}.uta-v2 a{text-decoration:none}.uta-v2 button{cursor:pointer}.uta-v2 a:focus-visible,.uta-v2 button:focus-visible{outline:3px solid #fff2ce;outline-offset:4px}
 .uta-v2 .eyebrow{font:700 11px/1.6 'DM Sans',sans-serif;letter-spacing:.24em;color:var(--gold);text-transform:uppercase}
 .uta-v2 .serif{font-family:'Playfair Display',Georgia,serif;letter-spacing:-.058em;font-weight:400}
 .uta-v2 .gold{color:var(--gold);font-style:italic}
 .uta-v2 .quiet{color:#d7d8d0;line-height:1.8;font-size:clamp(15px,1.3vw,18px)}
 .uta-v2 .act{display:inline-flex;align-items:center;justify-content:center;gap:15px;border-radius:100px;padding:16px 23px;background:#f5d6a0;color:#20211b;font-size:12px;letter-spacing:.06em;font-weight:800;transition:transform .25s,background .25s}
 .uta-v2 .act:hover{transform:translateY(-4px);background:#fff0cf}
 .uta-v2 .act.outline{background:#ffffff12;color:#fff4df;border:1px solid #ffffff70}.uta-v2 .act.outline:hover{background:#ffffff24}
 .uta-v2 .notice{background:#dcb77e;color:#221d17;padding:10px clamp(20px,6vw,110px);font-size:12px;display:flex;justify-content:center;gap:20px;align-items:center;flex-wrap:wrap;position:relative;z-index:5}
 .uta-v2 .notice a{color:#221d17;font-weight:800;text-decoration:underline;text-underline-offset:3px}
 .uta-v2 .hero{position:relative;min-height:760px;height:calc(100svh - 55px);max-height:1200px;isolation:isolate;background:radial-gradient(ellipse at 70% 58%,#c58b607a,#503733 45%,#141b20 92%);overflow:hidden}
 .uta-v2 .hero .scene{position:absolute;inset:0;z-index:0}
 .uta-v2 .hero:after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,#101716f5 0,#101716cb 27%,#10171665 52%,transparent 95%),linear-gradient(0deg,#0b111bd9 0,transparent 24%,transparent 79%,#18201e5c 100%)}
 .uta-v2 .hero-grain,.uta-v2 .chapter-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.16;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' opacity='.3' filter='url(%23n)'/%3E%3C/svg%3E")}
 .uta-v2 .hero-copy{position:absolute;z-index:3;left:clamp(22px,7.5vw,145px);top:50%;transform:translateY(-53%);width:min(745px,86vw)}
 .uta-v2 .hero h1{font-size:clamp(65px,8.6vw,148px);line-height:.92;margin:24px 0 25px;text-wrap:balance}
 .uta-v2 .hero .lead{max-width:445px;color:#e9e0d5;line-height:1.8;font-size:clamp(15px,1.4vw,18px)}
 .uta-v2 .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
 .uta-v2 .hero-bottom{position:absolute;z-index:4;bottom:36px;left:clamp(22px,7.5vw,145px);right:clamp(22px,7.5vw,145px);display:flex;align-items:flex-end;justify-content:space-between;gap:20px}
 .uta-v2 .scroll-cue{display:flex;gap:14px;align-items:center;letter-spacing:.2em;text-transform:uppercase;font-size:10px;color:#f2d8ae}
 .uta-v2 .scroll-cue svg{animation:uta-bob 2.5s ease-in-out infinite}
 .uta-v2 .hero-utility{display:flex;gap:8px}.uta-v2 .hero-utility a{border:1px solid #f4d8ac70;border-radius:99px;padding:11px 17px;color:#fff0d4;font-size:11px;background:#111b1a74;backdrop-filter:blur(12px)}
 .uta-v2 .hero-utility a:hover{background:#f4d8ac33}
 .uta-v2 .intro{padding:clamp(90px,12vw,190px) 22px;text-align:center;background:#f4eddf;color:#25332b;position:relative}
 .uta-v2 .intro:before,.uta-v2 .intro:after{content:'✦';position:absolute;font-size:clamp(50px,9vw,150px);color:#ddcaaa66;top:18%;left:8%}.uta-v2 .intro:after{left:auto;right:8%;top:auto;bottom:12%}
 .uta-v2 .intro .eyebrow{color:#94704b}.uta-v2 .intro h2{font-size:clamp(48px,7.5vw,108px);line-height:1.03;max-width:1060px;margin:30px auto}
 .uta-v2 .intro p{max-width:600px;margin:0 auto;color:#5a6056;font-size:17px;line-height:1.9}
 .uta-v2 .chapters{height:340svh;min-height:1900px;position:relative;background:#162021}
 .uta-v2 .sticky{position:sticky;top:0;height:100svh;min-height:620px;overflow:hidden;isolation:isolate}
 .uta-v2 .chapter-back{position:absolute;inset:0;z-index:-2;transition:background 900ms ease;background:radial-gradient(circle at 74% 55%,#c08752c0 0,transparent 37%),linear-gradient(120deg,#251a1c 0,#614136 54%,#1e2629 100%)}
 .uta-v2 .chapter-back.play{background:radial-gradient(ellipse at 75% 58%,#81979e86,transparent 38%),linear-gradient(115deg,#101d27,#29434c 58%,#55645e)}
 .uta-v2 .chapter-back.together{background:radial-gradient(ellipse at 74% 53%,#c77d7191,transparent 37%),linear-gradient(115deg,#251b27,#5d405b 58%,#2b4149)}
 .uta-v2 .chapter-back:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#101719f5 0,#101719c8 41%,#1017193b 85%)}
 .uta-v2 .orbit{position:absolute;right:-13vw;top:8%;height:80vw;max-height:980px;width:80vw;max-width:980px;border:1px solid #f2d69a6b;border-radius:50%;box-shadow:0 0 0 44px #eedca112,0 0 0 110px #eedca00b;transform:rotateX(58deg) rotate(20deg)}
 .uta-v2 .mandala{position:absolute;z-index:-1;right:8%;top:50%;transform:translateY(-50%) rotate(var(--rotation));width:min(49vw,710px);aspect-ratio:1;filter:drop-shadow(0 30px 80px #070d0d80);opacity:.85;transition:transform .8s}
 .uta-v2 .mandala svg{width:100%;height:100%;animation:uta-rotate 90s linear infinite}
 .uta-v2 .chapter-content{position:relative;z-index:2;display:flex;align-items:center;height:100%;padding:7vh clamp(24px,8vw,150px)}
 .uta-v2 .chapter-copy{max-width:700px;animation:uta-appear .65s ease both}
 .uta-v2 .chapter-copy h2{font-size:clamp(66px,8.2vw,140px);line-height:.94;margin:25px 0 22px}
 .uta-v2 .chapter-copy .telugu{font-family:'Noto Sans Telugu',sans-serif;color:#f5ce8b;font-size:clamp(15px,1.9vw,22px);line-height:1.75}
 .uta-v2 .chapter-copy .quiet{max-width:460px;margin-top:16px}
 .uta-v2 .chapter-controls{position:absolute;bottom:45px;left:clamp(24px,8vw,150px);right:clamp(24px,8vw,150px);z-index:3;display:flex;align-items:end;justify-content:space-between;gap:30px}
 .uta-v2 .chapter-tabs{display:flex;gap:8px;align-items:center}.uta-v2 .chapter-tabs button{border:1px solid #ffe4bd64;background:#ffffff12;color:#fff3dc;border-radius:99px;min-width:45px;min-height:45px;padding:0 14px;font-size:11px;letter-spacing:.08em}
 .uta-v2 .chapter-tabs button[aria-current='step']{background:#efc888;color:#142021;border-color:#efc888}
 .uta-v2 .chapter-meter{width:175px;height:2px;background:#ffffff4b;margin-bottom:7px}.uta-v2 .chapter-meter div{height:100%;background:#efc888;transition:width .15s}
 .uta-v2 .chapter-index{font-size:11px;letter-spacing:.16em;color:#fff0d8}
 .uta-v2 .festival{padding:clamp(95px,11vw,170px) clamp(22px,7.5vw,145px);background:#f4eddf;color:#202e27}
 .uta-v2 .festival-head{max-width:1220px;margin:auto;display:flex;justify-content:space-between;gap:60px;align-items:end}
 .uta-v2 .festival-head h2{font-size:clamp(54px,7vw,98px);line-height:1.03;margin:18px 0}
 .uta-v2 .festival-head .eyebrow{color:#a3774b}.uta-v2 .festival-head>p{max-width:345px;line-height:1.8;font-size:15px;color:#657066}
 .uta-v2 .cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:55px auto 37px;max-width:1220px}
 .uta-v2 .card{position:relative;display:flex;flex-direction:column;overflow:hidden;background:#fffdf7;border:1px solid #decfb9;border-radius:22px;min-height:355px;padding:29px 25px;transition:transform .35s cubic-bezier(.2,.75,.2,1),box-shadow .35s}
 .uta-v2 .card:hover{transform:translateY(-10px);box-shadow:0 26px 55px #5b412329}
 .uta-v2 .card:before{content:'';position:absolute;right:-40px;top:-40px;width:145px;height:145px;border-radius:50%;border:28px solid #ecb97125}
 .uta-v2 .card-icon{height:60px;width:60px;border-radius:50%;display:grid;place-items:center;background:#eee2cd;color:#845b34}
 .uta-v2 .card-tag{font-size:10px;letter-spacing:.2em;color:#9d7a4c;margin-top:25px}
 .uta-v2 .card h3{font:400 clamp(23px,2vw,32px)/1.1 'Playfair Display',Georgia,serif;letter-spacing:-.035em;margin:9px 0}
 .uta-v2 .card .telugu{font-family:'Noto Sans Telugu',sans-serif;font-size:12px;color:#97643b;margin:0 0 18px}
 .uta-v2 .card p{font-size:13px;line-height:1.75;color:#657066}
 .uta-v2 .card a{display:flex;align-items:center;justify-content:space-between;color:#633d22;font-size:12px;font-weight:800;margin-top:auto;padding-top:20px}
 .uta-v2 .festival-bottom{max-width:1220px;margin:auto;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}.uta-v2 .festival-bottom .act{background:#23392d;color:#fff6e1}
 .uta-v2 .finale{background:radial-gradient(ellipse at 50% 105%,#62513c,#1e3030 54%,#0b191a);padding:140px 25px 155px;text-align:center;position:relative;overflow:hidden}
 .uta-v2 .finale:before{content:'✺';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:min(90vw,850px);color:#f8d4a00b;line-height:1;pointer-events:none}
 .uta-v2 .finale>*{position:relative}.uta-v2 .finale h2{font-size:clamp(62px,8vw,113px);margin:22px auto 30px;max-width:1080px;line-height:1.05}
 .uta-v2 .finale .quiet{max-width:540px;margin:0 auto}.uta-v2 .finale .links{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:35px}
 @keyframes uta-bob{50%{transform:translateY(8px)}}@keyframes uta-appear{from{opacity:0;transform:translateY(17px)}to{opacity:1;transform:translateY(0)}}@keyframes uta-rotate{to{transform:rotate(360deg)}}
 @media(max-width:1050px){.uta-v2 .cards{grid-template-columns:repeat(2,minmax(0,1fr))}.uta-v2 .festival-head{align-items:start;display:block}.uta-v2 .hero:after{background:linear-gradient(90deg,#101716ed,#10171683 60%,#10171614)}}
 @media(max-width:680px){.uta-v2 .hero{height:92svh;min-height:690px}.uta-v2 .hero-copy{left:7%;width:86%;top:44%}.uta-v2 .hero h1{font-size:clamp(62px,14vw,94px)}.uta-v2 .hero .lead{font-size:14px;max-width:320px}.uta-v2 .hero:after{background:linear-gradient(0deg,#111b1bf0,#111b1b6b 75%),linear-gradient(90deg,#111b1b9c,#111b1b20)}.uta-v2 .hero-bottom{left:7%;right:7%;bottom:24px}.uta-v2 .hero-utility a{padding:9px 11px;font-size:10px}.uta-v2 .scroll-cue{font-size:0;gap:0}.uta-v2 .intro{padding:100px 25px}.uta-v2 .intro h2{font-size:clamp(50px,12vw,77px)}.uta-v2 .chapters{min-height:1850px;height:320svh}.uta-v2 .sticky{min-height:570px}.uta-v2 .orbit{width:110vw;height:110vw;right:-55vw;top:25%}.uta-v2 .mandala{width:82vw;right:-35%;top:36%;opacity:.42}.uta-v2 .chapter-content{padding:4vh 7%;align-items:center}.uta-v2 .chapter-copy h2{font-size:clamp(57px,14vw,86px)}.uta-v2 .chapter-copy .quiet{font-size:14px;max-width:360px}.uta-v2 .chapter-controls{left:7%;right:7%;bottom:28px}.uta-v2 .chapter-meter{width:90px}.uta-v2 .festival{padding:95px 6%}.uta-v2 .cards{grid-template-columns:1fr;margin:35px auto}.uta-v2 .card{min-height:275px}.uta-v2 .festival-head h2{font-size:clamp(56px,12vw,78px)}.uta-v2 .finale{padding:105px 24px}.uta-v2 .finale h2{font-size:clamp(57px,13vw,85px)}}
 @media(prefers-reduced-motion:reduce){.uta-v2 *,.uta-v2 *:before,.uta-v2 *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.uta-v2 .scene canvas{display:none!important}}
 `}</style>
 {announcements.length>0&&<aside className="notice"><span className="eyebrow" style={{color:'#463021'}}>UTA UPDATE</span><strong>{announcements[0].title}</strong><Link href="/news">Read updates ↗</Link></aside>}
 <section className="hero" aria-label="Discover Utah Telugu Association"><div className="scene" aria-hidden="true">{!reduced&&<World/>}</div><div className="hero-grain"/>
  <div className="hero-copy"><span className="eyebrow">UTAH TELUGU ASSOCIATION  /  ESTABLISHED IN COMMUNITY</span>
  <h1 className="serif">Far from home.<br/><span className="gold">Close to</span><br/>our roots.</h1>
  <p className="lead">A living celebration of Telugu culture, friendship and possibility — here in the heart of Utah.</p>
  <div className="hero-actions"><Link className="act" href="/events/sankranthi-2027">Explore Sankranthi <ArrowUpRight size={17}/></Link><Link className="act outline" href="/about">Our story <ArrowRight size={17}/></Link></div></div>
  <div className="hero-bottom"><span className="scroll-cue">SCROLL TO ENTER THE STORY <ArrowDown size={19}/></span><nav aria-label="Explore UTA" className="hero-utility"><Link href="/events">Events</Link><Link href="/sports">Sports</Link><Link href="/membership">Membership</Link></nav></div>
 </section>
 <section className="intro"><span className="eyebrow">ONE HERITAGE · MANY STORIES · ONE COMMUNITY</span><h2 className="serif">Some places live<br/>in your <span className="gold" style={{color:'#b2864b'}}>heart forever.</span></h2><p>From the first notes of a familiar song to the friends you haven’t met yet, our community turns everyday gatherings into memories that last generations.</p></section>
 <section ref={scrolly} className="chapters" aria-label="Explore three chapters of UTA"><div className="sticky">
 <div className={'chapter-back '+(index===1?'play':index===2?'together':'harvest')}/><div className="chapter-grain"/><div className="orbit" aria-hidden="true"/>
 <div className="mandala" aria-hidden="true" style={{'--rotation':(progress*50)+'deg'} as React.CSSProperties}><svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="250" cy="250" r="210" stroke="#f4d8a2" strokeOpacity=".55"/><circle cx="250" cy="250" r="170" stroke="#f4d8a2" strokeOpacity=".65"/><circle cx="250" cy="250" r="115" stroke="#f4d8a2" strokeOpacity=".65"/><circle cx="250" cy="250" r="38" fill="#d5ac68" fillOpacity=".7"/>{Array.from({length:16},(_,i)=><g key={i} transform={'rotate('+(i*22.5)+' 250 250)'}><ellipse cx="250" cy="130" rx="26" ry="94" stroke="#f9dba8" strokeOpacity=".85" strokeWidth="2" fill="#c48b65" fillOpacity=".15"/><path d="M250 30 Q280 75 250 115 Q220 75 250 30Z" fill="#f4d8a2" fillOpacity=".3"/></g>)}</svg></div>
 <div className="chapter-content"><div className="chapter-copy" key={index}><span className="eyebrow">CHAPTER {chapter.n} / {chapter.eyebrow}</span><h2 className="serif">{chapter.title}<br/><span className="gold">{chapter.accent}</span></h2><p className="telugu" lang="te">{chapter.telugu}</p><p className="quiet">{chapter.description}</p><div style={{marginTop:32}}><Link className="act" href={chapter.href}>{chapter.cta} <ArrowUpRight size={17}/></Link></div></div></div>
 <div className="chapter-controls"><div><div className="chapter-meter" aria-hidden="true"><div style={{width:(progress*100)+'%'}}/></div><span className="chapter-index">{chapter.n} / 03</span></div><nav className="chapter-tabs" aria-label="Jump to a chapter">{chapters.map((c,i)=><button key={c.n} aria-label={'Go to chapter '+c.n} aria-current={index===i?'step':undefined} onClick={()=>visit(i)}>{c.n}</button>)}</nav></div>
 </div></section>
 <section className="festival"><div className="festival-head"><div><span className="eyebrow">THE SANKRANTHI COLLECTION</span><h2 className="serif">Four ways to<br/><span className="gold" style={{color:'#ac7c46'}}>come together.</span></h2></div><p>One celebration, countless memories. Explore the activities and bring your whole family into the story.</p></div>
 <div className="cards">{journeys.map(({tag,name,telugu,icon:Icon,detail})=><article key={tag} className="card"><div className="card-icon"><Icon size={29} strokeWidth={1.5}/></div><span className="card-tag">{tag}</span><h3>{name}</h3><p className="telugu" lang="te">{telugu}</p><p>{detail}</p><Link href="/events/sankranthi-2027">Explore activity <ArrowUpRight size={17}/></Link></article>)}</div>
 <div className="festival-bottom"><span style={{fontSize:13,color:'#657066'}}>The planner is available for exploration. Official registration is not yet open.</span><Link className="act" href="/events/sankranthi-2027">Plan your family celebration <ArrowRight size={17}/></Link></div></section>
 <section className="finale"><HeartHandshake size={38} color="#e8c693" aria-hidden="true"/><p className="eyebrow" style={{marginTop:25}}>WELCOME TO THE UTA FAMILY</p><h2 className="serif">Where you belong<br/><span className="gold">is where we begin.</span></h2><p className="quiet">A community shaped by its people. A story made richer by every family that joins.</p><div className="links"><Link className="act" href="/membership">Explore membership <Users size={16}/></Link><Link className="act outline" href="/events">See upcoming events <CalendarDays size={16}/></Link></div></section>
 </div>;
}
