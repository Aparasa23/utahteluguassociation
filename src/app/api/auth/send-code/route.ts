import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import crypto from 'node:crypto';

export const runtime='nodejs';
const COOKIE='uta_auth_challenge';
const RATE_WINDOW_MS=60*60*1000;
const MAX_EMAIL_REQUESTS=6;
const ttl=10*60*1000;
const noStore={'Cache-Control':'no-store'};
const response=(payload:object,status=200)=>NextResponse.json(payload,{status,headers:noStore});

export async function POST(req:Request){
 const origin=req.headers.get('origin');
 if(!origin||new URL(origin).host!==new URL(req.url).host)return response({error:'Invalid request origin'},403);
 const body=await req.json().catch(()=>null);
 const email=typeof body?.email==='string'?body.email.trim().toLowerCase():'';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return response({error:'A valid email is required'},400);
 const secret=process.env.NEXTAUTH_SECRET||process.env.SESSION_SECRET;
 const apiKey=process.env.RESEND_API_KEY,from=process.env.AUTH_FROM_EMAIL;
 if(!secret||secret.length<32||!apiKey||!from)return response({error:'Email sign-in is unavailable'},503);
 try{
  const requestCount=await prisma.loginChallenge.count({where:{email,createdAt:{gte:new Date(Date.now()-RATE_WINDOW_MS)}}});
  if(requestCount>=MAX_EMAIL_REQUESTS)return response({error:'Too many code requests. Try again later.'},429);
  const code=crypto.randomInt(100000,1000000).toString();
  const expiresAt=new Date(Date.now()+ttl);
  const hash=crypto.createHmac('sha256',secret).update(email+':'+code).digest('hex');
  const challenge=await prisma.loginChallenge.create({data:{email,codeHash:hash,expiresAt}});
  const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],subject:'Your UTA verification code',text:'Your Utah Telugu Association sign-in code: '+code+'. Valid for 10 minutes.'}),cache:'no-store'}).catch(()=>null);
  if(!sent?.ok){await prisma.loginChallenge.delete({where:{id:challenge.id}}).catch(()=>{});return response({error:'Unable to deliver the verification email'},502)}
  const signature=crypto.createHmac('sha256',secret).update(challenge.id).digest('base64url');
  const res=response({success:true,message:'A verification code was sent to the email address.'});
  res.cookies.set(COOKIE,challenge.id+'.'+signature,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:600,path:'/'});
  return res;
 }catch(error){console.error('Email challenge unavailable');return response({error:'Sign-in is temporarily unavailable'},503)}
}
