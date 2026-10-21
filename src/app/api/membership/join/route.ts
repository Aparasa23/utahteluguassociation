import { NextResponse } from 'next/server';
/** Membership enrollment will reopen only after verified identity, a durable
 * pending-order transaction and independent settlement confirmation. */
export async function POST() {
 return NextResponse.json({success:false,code:'MEMBERSHIP_NOT_OPEN',error:'Online membership enrollment is temporarily unavailable. No payment has been taken or membership activated.'},{status:503,headers:{'Cache-Control':'no-store'}});
}
