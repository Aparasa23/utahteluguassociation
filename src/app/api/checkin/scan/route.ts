import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {requirePermission} from '@/lib/auth';
import {z} from 'zod';
export const runtime='nodejs';
const input=z.object({tokenOrTicketNumber:z.string().trim().min(8).max(512)}).strict();
const noStore={'Cache-Control':'no-store'};
export async function POST(req:Request){
 if(process.env.UTA_CHECKIN_APPROVED!=='true')
  return NextResponse.json({success:false,code:'CHECKIN_NOT_OPEN',error:'Digital check-in has not been approved for use.'},{status:503,headers:noStore});
 const origin=req.headers.get('origin');
 if(!origin||new URL(origin).host!==new URL(req.url).host)
  return NextResponse.json({error:'Invalid origin'},{status:403,headers:noStore});
 const session=await requirePermission('check_in','checkin').catch(()=>null);
 if(!session)return NextResponse.json({error:'Authorized event staff sign-in required'},{status:403,headers:noStore});
 const parsed=input.safeParse(await req.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:'Valid QR token or ticket reference required'},{status:400,headers:noStore});
 try{
 const ticket=await prisma.eventTicket.findFirst({
  where:{OR:[{qrToken:parsed.data.tokenOrTicketNumber},{ticketNumber:parsed.data.tokenOrTicketNumber}]},
  select:{id:true,ticketNumber:true,attendeeName:true,isCheckedIn:true,
   ticketType:{select:{name:true}},registration:{select:{status:true,paymentStatus:true,event:{select:{title:true}}}}
  }
 });
 if(!ticket)return NextResponse.json({status:'INVALID',error:'Ticket not found'},{status:404,headers:noStore});
 if(ticket.registration.status!=='CONFIRMED'||!['FREE','COMPLETED','PAID'].includes(ticket.registration.paymentStatus))
  return NextResponse.json({status:'NOT_VALID',error:'Admission not confirmed by a verified registration'},{status:409,headers:noStore});
 const result=await prisma.$transaction(async tx=>{
  // Guard the write itself so parallel scans cannot both become admission.
  const updated=await tx.eventTicket.updateMany({
   where:{id:ticket.id,isCheckedIn:false},
   data:{isCheckedIn:true,checkInCount:1}
  });
  await tx.checkIn.create({data:{
   ticketId:ticket.id,
   scannedByStaff:session.user.email,
   isDuplicate:updated.count===0
  }});
  return updated.count===1;
 });
 if(!result)return NextResponse.json({success:false,status:'DUPLICATE',error:'Ticket was already checked in'},{status:409,headers:noStore});
 return NextResponse.json({success:true,status:'VERIFIED',ticketNumber:ticket.ticketNumber,
  attendeeName:ticket.attendeeName,eventName:ticket.registration.event.title,
  ticketType:ticket.ticketType.name,checkedInAt:new Date().toISOString()
 },{headers:noStore});
 }catch(error){console.error('Check-in transaction failed');return NextResponse.json({error:'Unable to verify check-in'},{status:503,headers:noStore})}
}
