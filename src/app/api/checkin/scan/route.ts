import {NextResponse} from 'next/server';
/** The previous handler allowed anonymous check-ins and racing duplicate
 * admissions. It is retired pending role-scoped, atomic staff validation. */
export async function POST(){
 return NextResponse.json({success:false,code:'CHECKIN_NOT_OPEN',error:'Digital check-in is not enabled. Please see authorized UTA event staff.'},{status:503,headers:{'Cache-Control':'no-store'}});
}
