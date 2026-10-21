import {NextResponse} from 'next/server';
import crypto from 'node:crypto';
import {prisma} from '@/lib/prisma';
import {createSessionToken,SESSION_COOKIE_OPTIONS} from '@/lib/auth';
import type {AppRole} from '@/lib/rbac';

export const runtime='nodejs';
const noStore={'Cache-Control':'no-store'};
const response=(payload:object,status=200)=>NextResponse.json(payload,{status,headers:noStore});
const safeEqual=(a:string,b:string)=>{
 const ab=Buffer.from(a),bb=Buffer.from(b);
 return ab.length===bb.length&&crypto.timingSafeEqual(ab,bb);
};

export async function POST(req:Request){
 const origin=req.headers.get('origin');
 if(!origin||new URL(origin).host!==new URL(req.url).host)return response({error:'Invalid request origin'},403);
 const body=await req.json().catch(()=>null);
 const email=typeof body?.email==='string'?body.email.trim().toLowerCase():'';
 const code=typeof body?.code==='string'?body.code.trim():'';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!/^\d{6}$/.test(code))return response({error:'Valid email and six-digit code required'},400);
 const secret=process.env.NEXTAUTH_SECRET||process.env.SESSION_SECRET;
 if(!secret||secret.length<32)return response({error:'Sign-in is unavailable'},503);
 try{
  const raw=req.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith('uta_auth_challenge='))?.slice('uta_auth_challenge='.length);
  if(!raw)return response({error:'Expired or invalid verification code'},401);
  const [id,sig]=decodeURIComponent(raw).split('.');
  if(!id||!sig||id.length>128)return response({error:'Invalid verification code'},401);
  const expected=crypto.createHmac('sha256',secret).update(id).digest('base64url');
  if(!safeEqual(sig,expected))return response({error:'Invalid verification code'},401);
  const challenge=await prisma.loginChallenge.findUnique({where:{id}});
  if(!challenge||challenge.email!==email||challenge.usedAt||challenge.expiresAt<=new Date()||challenge.attempts>=5)return response({error:'Expired or invalid verification code'},401);
  // Account for failures atomically before verifying the supplied code.
  const counted=await prisma.loginChallenge.updateMany({where:{id,usedAt:null,attempts:{lt:5},expiresAt:{gt:new Date()}},data:{attempts:{increment:1}}});
  if(counted.count!==1)return response({error:'Verification code has expired or was used'},401);
  const hash=crypto.createHmac('sha256',secret).update(email+':'+code).digest('hex');
  if(!safeEqual(hash,challenge.codeHash))return response({error:'Invalid verification code'},401);
  const claimed=await prisma.loginChallenge.updateMany({where:{id,usedAt:null},data:{usedAt:new Date()}});
  if(claimed.count!==1)return response({error:'Code already used'},401);
  let user=await prisma.user.findUnique({where:{email},include:{userRoles:{include:{role:true}},memberProfile:true}});
  if(!user)user=await prisma.user.create({data:{email,name:email.split('@')[0],emailVerified:new Date()},include:{userRoles:{include:{role:true}},memberProfile:true}});
  if(!user.isActive)return response({error:'Account is not available'},403);
  const roles:AppRole[]=user.userRoles.map(x=>x.role.name as AppRole);
  const activeRoles=roles.length?roles:['GUEST' as AppRole];
  const token=createSessionToken({id:user.id,email:user.email,name:user.name,roles:activeRoles,membershipStatus:user.memberProfile?.membershipStatus,membershipNumber:user.memberProfile?.membershipNumber});
  const res=response({success:true,user:{id:user.id,email:user.email,name:user.name,roles:activeRoles}});
  res.cookies.set(SESSION_COOKIE_OPTIONS.name,token,SESSION_COOKIE_OPTIONS);
  res.cookies.delete('uta_auth_challenge');
  return res;
 }catch(error){console.error('Email verification unavailable');return response({error:'Unable to complete sign-in'},503)}
}
