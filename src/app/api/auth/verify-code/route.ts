import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { createSessionToken, SESSION_COOKIE_OPTIONS } from '@/lib/auth';
import type { AppRole } from '@/lib/rbac';
export const runtime='nodejs';
export async function POST(req:Request){
 try{
 const body=await req.json();const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
 const code=typeof body.code==='string'?body.code.trim():'';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!/^\d{6}$/.test(code))return NextResponse.json({error:'Email and six-digit code required'},{status:400});
 const secret=process.env.NEXTAUTH_SECRET||process.env.SESSION_SECRET;
 if(!secret||secret.length<32)return NextResponse.json({error:'Sign-in unavailable'},{status:503});
 const cookieHeader=req.headers.get('cookie')||'';
 const raw=cookieHeader.split(';').map(v=>v.trim()).find(v=>v.startsWith('uta_auth_challenge='))?.slice('uta_auth_challenge='.length);
 if(!raw)return NextResponse.json({error:'Expired or invalid verification code'},{status:401});
 const [payload,signature]=decodeURIComponent(raw).split('.');
 if(!payload||!signature)return NextResponse.json({error:'Invalid code'},{status:401});
 const expected=crypto.createHmac('sha256',secret).update(payload).digest('base64url');
 const equal=(a:string,b:string)=>{const ab=Buffer.from(a),bb=Buffer.from(b);return ab.length===bb.length&&crypto.timingSafeEqual(ab,bb)};
 if(!equal(signature,expected))return NextResponse.json({error:'Invalid code'},{status:401});
 const challenge=JSON.parse(Buffer.from(payload,'base64url').toString('utf8'));
 if(challenge.email!==email||typeof challenge.exp!=='number'||challenge.exp<=Date.now())return NextResponse.json({error:'Expired or invalid code'},{status:401});
 const actual=crypto.createHmac('sha256',secret).update(email+':'+code+':'+challenge.exp).digest('hex');
 if(!equal(actual,challenge.codeHash))return NextResponse.json({error:'Invalid code'},{status:401});
 let user=await prisma.user.findUnique({where:{email},include:{userRoles:{include:{role:true}},memberProfile:true}});
 if(!user){user=await prisma.user.create({data:{email,name:email.split('@')[0],emailVerified:new Date()},include:{userRoles:{include:{role:true}},memberProfile:true}})}
 const roles:AppRole[]=user.userRoles.map(ur=>ur.role.name as AppRole);
 const safeRoles=roles.length?roles:['GUEST' as AppRole];
 const token=createSessionToken({id:user.id,email:user.email,name:user.name,roles:safeRoles,membershipStatus:user.memberProfile?.membershipStatus,membershipNumber:user.memberProfile?.membershipNumber});
 const res=NextResponse.json({success:true,user:{id:user.id,email:user.email,name:user.name,roles:safeRoles,membershipStatus:user.memberProfile?.membershipStatus}});
 res.cookies.set(SESSION_COOKIE_OPTIONS.name,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:SESSION_COOKIE_OPTIONS.maxAge});
 res.cookies.delete('uta_auth_challenge');
 return res;
 }catch(e){console.error('Authentication verification error');return NextResponse.json({error:'Sign-in could not be completed'},{status:500})}
}
