import {NextResponse} from 'next/server';
import {z} from 'zod';
import {prisma} from '@/lib/prisma';
import {getSession} from '@/lib/auth';

export const dynamic='force-dynamic';
export const runtime='nodejs';

const entry=z.object({
  eventSlug:z.enum(['sankranthi-2027-rangoli','sankranthi-2027-pickleball','sankranthi-2027-volleyball','sankranthi-sambaralu-2027']),
  ticketTypeId:z.string().uuid(),
  quantity:z.number().int().min(1).max(20)
}).strict();
const payload=z.object({
  items:z.array(entry).min(1).max(12)
}).strict();

const responseHeaders={'Cache-Control':'no-store'};

// This endpoint computes indicative amounts only from database ticket types.
// It NEVER creates registrations, decrements capacity, initiates checkout,
// returns a confirmation or establishes member pricing from submitted IDs.
export async function POST(req:Request){
 try{
  const origin=req.headers.get('origin');
  if(!origin||new URL(origin).host!==new URL(req.url).host)
   return NextResponse.json({error:'Invalid request origin'},{status:403,headers:responseHeaders});
  if(process.env.UTA_EVENT_CATALOG_APPROVED!=='true')
   return NextResponse.json({error:'Event pricing has not been approved for publication.'},{status:503,headers:responseHeaders});

  const raw=await req.json().catch(()=>null);
  const parsed=payload.safeParse(raw);
  if(!parsed.success)return NextResponse.json({error:'Invalid ticket selection',issues:parsed.error.flatten()},{status:400,headers:responseHeaders});
  const items=parsed.data.items;
  const unique=new Set(items.map(x=>x.eventSlug+':'+x.ticketTypeId));
  if(unique.size!==items.length)return NextResponse.json({error:'Duplicate ticket selections are not allowed'},{status:400,headers:responseHeaders});
  if(items.reduce((sum,item)=>sum+item.quantity,0)>30)
   return NextResponse.json({error:'Maximum 30 tickets per estimate'},{status:400,headers:responseHeaders});

  const slugs=[...new Set(items.map(x=>x.eventSlug))];
  const events=await prisma.event.findMany({
   where:{slug:{in:slugs},isPublished:true},
   select:{id:true,slug:true,title:true,registrationOpenDate:true,registrationCloseDate:true,startDateTime:true,
    ticketTypes:{select:{id:true,name:true,price:true,isMembersOnly:true,maxTicketsPerOrder:true,remainingQuantity:true}}}
  });
  if(events.length!==slugs.length)
   return NextResponse.json({error:'A selected event is not available for estimates.'},{status:409,headers:responseHeaders});

  // Never use a user-submitted membership identifier as entitlement proof.
  // Verify against the authenticated member's own active database membership.
  const session=await getSession();
  let memberEligible=false;
  if(session){
   const profile=await prisma.memberProfile.findUnique({
    where:{userId:session.user.id},
    include:{user:{select:{isActive:true}},memberships:{orderBy:{endDate:'desc'},take:1}}
   });
   const membership=profile?.memberships[0];
   memberEligible=Boolean(profile?.user.isActive&&profile.membershipStatus==='ACTIVE'&&membership?.status==='ACTIVE'&&membership.startDate<=new Date()&&membership.endDate>new Date());
  }
  const lines=[] as Array<{eventSlug:string;eventTitle:string;ticketTypeId:string;ticketName:string;quantity:number;unitAmountCents:number;lineAmountCents:number;capacitySnapshot:number}>;
  let totalAmountCents=0;
  for(const item of items){
   const event=events.find(e=>e.slug===item.eventSlug)!;
   const tier=event.ticketTypes.find(t=>t.id===item.ticketTypeId);
   if(!tier)return NextResponse.json({error:'An invalid ticket tier was selected.'},{status:400,headers:responseHeaders});
   if(tier.isMembersOnly&&!memberEligible)return NextResponse.json({error:'This ticket tier requires your own verified, active membership.'},{status:403,headers:responseHeaders});
   if(item.quantity>tier.maxTicketsPerOrder)return NextResponse.json({error:'Ticket quantity exceeds the per-order limit.'},{status:400,headers:responseHeaders});
   if(item.quantity>tier.remainingQuantity)return NextResponse.json({error:'A selected ticket tier has insufficient remaining capacity.'},{status:409,headers:responseHeaders});
   if(!Number.isFinite(tier.price)||tier.price<0||Math.round(tier.price*100)/100!==tier.price)
    return NextResponse.json({error:'A ticket price is invalid; contact UTA.'},{status:503,headers:responseHeaders});
   const cents=Math.round(tier.price*100);
   const lineCents=cents*item.quantity;
   totalAmountCents+=lineCents;
   lines.push({eventSlug:item.eventSlug,eventTitle:event.title,ticketTypeId:tier.id,ticketName:tier.name,quantity:item.quantity,unitAmountCents:cents,lineAmountCents:lineCents,capacitySnapshot:tier.remainingQuantity});
  }
  return NextResponse.json({
   kind:'ESTIMATE_ONLY',
   acceptingPayment:false,registrationCreated:false,capacityReserved:false,
   memberEligibilityCheckedAgainstSession:true,
   currency:'USD',totalAmountCents,lines,calculatedAt:new Date().toISOString(),
   message:'This is a price estimate only. No payment, registration, reservation or ticket has been created.'
  },{headers:responseHeaders});
 }catch(error){console.error('Unable to calculate event estimate',error);
  return NextResponse.json({error:'The event estimate service is unavailable.'},{status:503,headers:responseHeaders})}
}
