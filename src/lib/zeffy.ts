/**
 * Payment adapter (fail-closed).
 *
 * An official hosted payment URL is only a destination, never proof of
 * payment. No receipt, settlement or paid status may be inferred from a
 * redirect, URL query parameter or transaction-ID format.
 *
 * Until a verified provider integration exists, the checkout stays pending
 * and all automated reconciliation attempts return unverified.
 */
export interface PaymentInitiationRequest {
  registrationId:string;
  referenceType:'MEMBERSHIP'|'EVENT_TICKET'|'TOURNAMENT_FEE'|'DONATION'|'SPONSORSHIP';
  amount:number;
  contactEmail:string;
  contactName:string;
  campaignSlug?:string;
}
export interface PaymentInitiationResult {
  provider:'ZEFFY'|'MANUAL_CHECK'|'CASH';
  checkoutUrl?:string;
  referenceId:string;
  status:'PENDING'|'COMPLETED'|'MANUAL_VERIFICATION_REQUIRED';
}
export class PaymentGateway {
  static createCheckoutSession(request:PaymentInitiationRequest):PaymentInitiationResult {
    if(!request.registrationId || !Number.isFinite(request.amount) || request.amount<0)
      throw new Error('Invalid payment initiation request');
    // This is an offline tracking reference, NOT a provider payment session.
    // Never fabricate a checkout link from a slug.
    return {
      provider:'ZEFFY',
      referenceId:'UTA-PENDING-'+request.registrationId,
      status:'MANUAL_VERIFICATION_REQUIRED',
    };
  }

  static verifyPaymentReconciliation(
    providedTransactionId:string,
    expectedAmount:number,
    adminVerifiedBy?:string
  ):{isVerified:boolean;reason:string}{
    // The previous prefix-based acceptance and unchecked "adminVerifiedBy"
    // value were both unsafe. A secure reconciliation requires server-side
    // authenticated officer approval with audit evidence or cryptographically
    // validated, replay-safe provider events.
    void providedTransactionId;
    void expectedAmount;
    void adminVerifiedBy;
    return {
      isVerified:false,
      reason:'Awaiting verified payment settlement or authorized audited reconciliation.',
    };
  }
}
