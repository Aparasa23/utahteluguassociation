import {NextResponse} from 'next/server';
import {z} from 'zod';
export const runtime='nodejs';
const schema=z.object({name:z.string().trim().min(2).max(120),email:z.string().email().max(254),subject:z.enum(['MEMBERSHIP','EVENTS','PERFORMANCES','SPORTS','SPONSORSHIP','TELUGU_BADI','OTHER']),message:z.string().trim().min(10).max(5000),website:z.string().max(0).optional()}).strict();
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(!origin||new URL(origin).host!==new URL(request.url).host)return NextResponse.json({error:'Invalid request origin'},{status:403});
 const raw=await request.json().catch(()=>null);
 const parsed=schema.safeParse(raw);
 if(!parsed.success)return NextResponse.json({error:'Please check your details and try again.'},{status:400});
 const {name,email,subject,message}=parsed.data;
 const apiKey=process.env.RESEND_API_KEY,from=process.env.CONTACT_FROM_EMAIL||process.env.AUTH_FROM_EMAIL,to=process.env.CONTACT_TO_EMAIL;
 if(!apiKey||!from||!to)return NextResponse.json({error:'The inquiry service is not configured. Please use the official UTA contact email instead.'},{status:503});
 try{
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:email,subject:'UTA website inquiry: '+subject,text:'From: '+name+'\nEmail: '+email+'\nTopic: '+subject+'\n\n'+message}),cache:'no-store'});
 if(!response.ok)return NextResponse.json({error:'Your message could not be delivered. Please email UTA directly.'},{status:502});
 return NextResponse.json({success:true,message:'Your inquiry was sent to the UTA contact inbox.'},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Delivery is temporarily unavailable. Please email UTA directly.'},{status:502})}
}
