import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
export const runtime = 'nodejs';
const COOKIE='uta_auth_challenge';
export async function POST(req:Request){
 try {
 const body=await req.json();const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return NextResponse.json({error:'Valid email required'},{status:400});
 const secret=process.env.NEXTAUTH_SECRET||process.env.SESSION_SECRET;
 const apiKey=process.env.RESEND_API_KEY;const from=process.env.AUTH_FROM_EMAIL;
 if(!secret||secret.length<32||!apiKey||!from)return NextResponse.json({error:'Email sign-in is not configured yet.'},{status:503});
 const code=crypto.randomInt(100000,1000000).toString();
 const exp=Date.now()+10*60*1000;
 const codeHash=crypto.createHmac('sha256',secret).update(email+':'+code+':'+exp).digest('hex');
 const payload=Buffer.from(JSON.stringify({email,codeHash,exp})).toString('base64url');
 const sig=crypto.createHmac('sha256',secret).update(payload).digest('base64url');
 const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],subject:'UTA verification code',text:'Your Utah Telugu Association sign-in code is '+code+'. It expires in 10 minutes. If you did not request this code, ignore this email.'}),cache:'no-store'});
 if(!sent.ok){console.error('Email provider rejected verification request',sent.status);return NextResponse.json({error:'Unable to send verification code'},{status:502})}
 const res=NextResponse.json({success:true,message:'A verification code has been sent.'});
 res.cookies.set(COOKIE,payload+'.'+sig,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:600,path:'/'});
 return res;
 }catch{return NextResponse.json({error:'Unable to process request'},{status:500})}
}
