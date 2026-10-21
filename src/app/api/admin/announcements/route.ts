import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';
import crypto from 'node:crypto';

export const runtime='nodejs';
export const dynamic='force-dynamic';

async function authorized(action:'read'|'create'|'update'|'delete'){
 const session=await getSession();
 if(!session)return {error:NextResponse.json({error:'Sign in required'},{status:401})};
 // A cookie's claimed privileges alone are insufficient for mutation.
 // Always check current roles in the database, so revocation is effective.
 const user=await prisma.user.findUnique({
   where:{id:session.user.id},
   select:{isActive:true,userRoles:{select:{role:{select:{name:true}}}}}
 });
 if(!user?.isActive)return {error:NextResponse.json({error:'Access denied'},{status:403})};
 const roles=user.userRoles.map(r=>r.role.name).filter(Boolean) as import('@/lib/rbac').AppRole[];
 if(!hasPermission(roles,'content',action))return {error:NextResponse.json({error:'Insufficient permissions'},{status:403})};
 return {session};
}

export async function GET(){
 try{
  const auth=await authorized('read');
  if(auth.error)return auth.error;
  const announcements=await prisma.announcement.findMany({orderBy:[{isUrgent:'desc'},{createdAt:'desc'}],take:100});
  return NextResponse.json({announcements},{headers:{'Cache-Control':'no-store'}});
 }catch{ return NextResponse.json({error:'Unable to load announcements'},{status:503})}
}
export async function POST(request:Request){
 try{
  const auth=await authorized('create');
  if(auth.error)return auth.error;
  const body=await request.json().catch(()=>null);
  if(!body||typeof body.title!=='string'||typeof body.content!=='string')return NextResponse.json({error:'Title and content required'},{status:400});
  const title=body.title.trim(),content=body.content.trim();
  if(title.length<5||title.length>160||content.length<10||content.length>8000)
   return NextResponse.json({error:'Title must be 5–160 characters and content 10–8000 characters.'},{status:400});
  if(typeof body.isUrgent!=='boolean'||typeof body.isPublished!=='boolean')
   return NextResponse.json({error:'Invalid publication settings'},{status:400});
  let expiresAt:Date|null=null;
  if(body.expiresAt){
   if(typeof body.expiresAt!=='string')return NextResponse.json({error:'Invalid expiry date'},{status:400});
   expiresAt=new Date(body.expiresAt);
   if(Number.isNaN(expiresAt.valueOf())||expiresAt<=new Date())return NextResponse.json({error:'Expiry must be a future date'},{status:400});
  }
  const record=await prisma.$transaction(async tx=>{
   const created=await tx.announcement.create({data:{title,content,isUrgent:body.isUrgent,isPublished:body.isPublished,expiresAt}});
   await tx.auditLog.create({data:{userId:auth.session!.user.id,actorEmail:auth.session!.user.email,action:'ANNOUNCEMENT_CREATE',targetType:'Announcement',targetId:created.id,details:JSON.stringify({isPublished:created.isPublished,isUrgent:created.isUrgent})}});
   return created;
  });
  return NextResponse.json({announcement:record},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch{ return NextResponse.json({error:'Unable to save announcement'},{status:503})}
}
export async function PATCH(request:Request){
 try{
  const auth=await authorized('update');
  if(auth.error)return auth.error;
  const body=await request.json().catch(()=>null);
  if(!body||typeof body.id!=='string'||body.id.length>100)return NextResponse.json({error:'Valid announcement ID required'},{status:400});
  const changes:{title?:string;content?:string;isUrgent?:boolean;isPublished?:boolean;expiresAt?:Date|null}={};
  if(body.title!==undefined){if(typeof body.title!=='string'||body.title.trim().length<5||body.title.trim().length>160)return NextResponse.json({error:'Invalid title'},{status:400});changes.title=body.title.trim()}
  if(body.content!==undefined){if(typeof body.content!=='string'||body.content.trim().length<10||body.content.trim().length>8000)return NextResponse.json({error:'Invalid content'},{status:400});changes.content=body.content.trim()}
  if(body.isUrgent!==undefined){if(typeof body.isUrgent!=='boolean')return NextResponse.json({error:'Invalid urgency'},{status:400});changes.isUrgent=body.isUrgent}
  if(body.isPublished!==undefined){if(typeof body.isPublished!=='boolean')return NextResponse.json({error:'Invalid publication status'},{status:400});changes.isPublished=body.isPublished}
  if(body.expiresAt!==undefined){if(body.expiresAt===null||body.expiresAt==='')changes.expiresAt=null;else{const d=new Date(body.expiresAt);if(typeof body.expiresAt!=='string'||Number.isNaN(d.valueOf()))return NextResponse.json({error:'Invalid expiration'},{status:400});changes.expiresAt=d}}
  if(!Object.keys(changes).length)return NextResponse.json({error:'No changes submitted'},{status:400});
  const result=await prisma.$transaction(async tx=>{
   const existing=await tx.announcement.findUnique({where:{id:body.id}});
   if(!existing)return null;
   const updated=await tx.announcement.update({where:{id:body.id},data:changes});
   await tx.auditLog.create({data:{userId:auth.session!.user.id,actorEmail:auth.session!.user.email,action:'ANNOUNCEMENT_UPDATE',targetType:'Announcement',targetId:updated.id,details:JSON.stringify({fields:Object.keys(changes)})}});
   return updated;
  });
  if(!result)return NextResponse.json({error:'Announcement not found'},{status:404});
  return NextResponse.json({announcement:result},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Unable to update announcement'},{status:503})}
}
