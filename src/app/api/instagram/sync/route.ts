import {NextResponse} from 'next/server';
/** Public Instagram content cannot be authenticated by importing stock images.
 * Disable legacy seeding and untrusted uploads until verified Meta Graph API
 * auth, provenance, token rotation, moderation and sync scheduling exist. */
const unavailable=()=>NextResponse.json({success:false,error:'Instagram synchronization is not configured. Please view the official Instagram profile directly.'},{status:503,headers:{'Cache-Control':'no-store'}});
export async function GET(){return unavailable()}
export async function POST(){return unavailable()}
