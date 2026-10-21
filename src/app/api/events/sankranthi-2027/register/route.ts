import { NextResponse } from 'next/server';
/**
 * Registration remains closed until the reviewed transactional registration
 * service, authentic pricing, membership verification, capacity accounting,
 * provider reconciliation and idempotent issuance have been installed.
 *
 * Intentionally NO environment-variable bypass. In particular, flipping
 * EVENT_REGISTRATION_ENABLED cannot reactivate the retired unsafe handlers.
 */
export async function POST(){
  return NextResponse.json({
    success:false,
    code:'REGISTRATION_NOT_OPEN',
    error:'Online registration is not open yet. Please check official UTA announcements for confirmed registration details.'
  },{status:503,headers:{'Cache-Control':'no-store'}});
}
