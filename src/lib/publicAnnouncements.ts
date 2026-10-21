import { prisma } from '@/lib/prisma';
/** Important notices first, then most recently published. */
export async function getPublicAnnouncements(limit?:number){
 const now=new Date();
 return prisma.announcement.findMany({
  where:{isPublished:true,OR:[{expiresAt:null},{expiresAt:{gt:now}}]},
  orderBy:[{isUrgent:'desc'},{createdAt:'desc'},{id:'desc'}],
  ...(limit?{take:limit}:{})
 }).catch((error)=>{console.error('Unable to load announcements',error);return []});
}
