import ImmersiveHome from '@/components/ImmersiveHome';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function HomePage(){
 const now=new Date();
 const announcements=await prisma.announcement.findMany({where:{isPublished:true,OR:[{expiresAt:null},{expiresAt:{gt:now}}]},orderBy:[{isUrgent:'desc'},{createdAt:'desc'}],take:3}).catch(()=>[]);
 return <ImmersiveHome announcements={announcements.map(a=>({id:a.id,title:a.title,content:a.content,isUrgent:a.isUrgent,createdAt:new Date(a.createdAt).toISOString()}))}/>;
}
