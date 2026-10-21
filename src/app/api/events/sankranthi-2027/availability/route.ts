import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export const dynamic='force-dynamic';
export const runtime='nodejs';

// Read-only inventory snapshot. Never equate available capacity with a
// reservation; inventory can change at any time, and online booking is closed.
const SLUGS=['sankranthi-2027-rangoli','sankranthi-2027-pickleball','sankranthi-2027-volleyball','sankranthi-sambaralu-2027'];
export async function GET(){
 if(process.env.UTA_EVENT_CATALOG_APPROVED!=='true'){
  return NextResponse.json({acceptingRegistrations:false,reason:'Official event dates and prices are awaiting UTA approval.',events:[]},{headers:{'Cache-Control':'no-store'}});
 }
 try{
  const rows=await prisma.event.findMany({
   where:{slug:{in:SLUGS},isPublished:true},
   select:{
    slug:true,title:true,startDateTime:true,endDateTime:true,timezone:true,
    registrationOpenDate:true,registrationCloseDate:true,totalCapacity:true,
    ticketTypes:{select:{id:true,name:true,price:true,remainingQuantity:true,totalAvailable:true,isMembersOnly:true}}
   },
   orderBy:{startDateTime:'asc'}
  });
  const now=new Date();
  const events=rows.map(row=>({
   slug:row.slug,title:row.title,
   startsAt:row.startDateTime.toISOString(),endsAt:row.endDateTime.toISOString(),
   timezone:row.timezone,
   isWithinPublishedRegistrationWindow:now>=row.registrationOpenDate&&now<=row.registrationCloseDate,
   registrationOpen:false,
   capacitySnapshot:row.totalCapacity,
   ticketTypes:row.ticketTypes.map(type=>({
    id:type.id,name:type.name,
    listedPriceUSD:type.price,
    remainingSnapshot:Math.max(0,type.remainingQuantity),
    capacity:type.totalAvailable,
    membersOnly:type.isMembersOnly
   }))
  }));
  return NextResponse.json({
   acceptingRegistrations:false,
   reason:'Online registration is not open. No reservation or payment can be made through this preview.',
   events,checkedAt:now.toISOString()
  },{headers:{'Cache-Control':'no-store'}});
 }catch{
  return NextResponse.json({
   acceptingRegistrations:false,
   reason:'Official event information is temporarily unavailable.',
   events:[]
  },{status:503,headers:{'Cache-Control':'no-store'}});
 }
}
