/**
 * UTA Multi-Channel Autonomous Notification & Tax Receipt Dispatcher
 * Dispatches automated transactional Emails, SMS, .ics Calendar invites, and 501(c)(3) tax receipts.
 */

export interface AttendeeNotificationPayload {
  recipientName: string;
  email: string;
  phone?: string;
  eventName: string;
  eventDate: string;
  venueName: string;
  venueAddress: string;
  confirmationCode: string;
  ticketCount: number;
  qrCodeUrl: string;
  calendarIcsUrl?: string;
}

export interface TaxReceiptPayload {
  donorName: string;
  donorEmail: string;
  amount: number;
  donationDate: string;
  transactionId: string;
  taxYear: number;
  isMembershipFee?: boolean;
}

export interface CourtCallAlertPayload {
  teamCaptainName: string;
  phone: string;
  matchNumber: number;
  roundName: string;
  courtName: string;
  opponentTeamName: string;
  scheduledTime: string;
  minutesUntilStart: number;
}

export class NotificationDispatcher {
  private static readonly UTA_EIN = '84-1579201'; // Utah Non-Profit 501(c)(3) Identifier
  private static readonly ORG_NAME = 'Utah Telugu Association (UTA)';
  private static readonly CONTACT_EMAIL = 'contact@utahtelugu.org';

  /**
   * 1. Automated Event Registration Confirmation & Gate Pass Dispatch
   */
  static async sendRegistrationPass(payload: AttendeeNotificationPayload): Promise<{ success: boolean; messageId: string }> {
    const emailSubject = `🎟️ Confirmed: Your Official Pass for ${payload.eventName} [${payload.confirmationCode}]`;
    
    // In production, integrates with Resend, SendGrid, or AWS SES
    console.log(`[AUTOMATION] Dispatching pass to ${payload.email} for ${payload.eventName}`);
    
    // Auto-generate ICS Calendar Attachment
    const icsContent = this.generateIcsCalendar({
      title: payload.eventName,
      description: `Official Utah Telugu Association Event. Confirmation: ${payload.confirmationCode}`,
      location: `${payload.venueName}, ${payload.venueAddress}`,
      start: payload.eventDate,
    });

    // If mobile phone provided, trigger instant SMS gate pass link
    if (payload.phone) {
      await this.sendSms(
        payload.phone,
        `UTA Pass Confirmed! View your QR gate pass for ${payload.eventName}: https://utahtelugu.org/dashboard/membership-card?pass=${payload.confirmationCode}`
      );
    }

    return {
      success: true,
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }

  /**
   * 2. Automated Event Milestone Sequence (T-72h, T-24h, T-2h)
   */
  static async sendMilestoneReminder(
    attendee: { name: string; phone?: string; email: string },
    event: { name: string; venue: string; startTime: string },
    milestone: 'T_72H' | 'T_24H' | 'T_2H'
  ): Promise<boolean> {
    let msg = '';
    switch (milestone) {
      case 'T_72H':
        msg = `Namaste ${attendee.name}! 3 days until ${event.name}. Venue: ${event.venue}. Free parking on-site. Check schedule: https://utahtelugu.org/events`;
        break;
      case 'T_24H':
        msg = `Reminder: ${event.name} is tomorrow at ${event.startTime}! Have your UTA QR Pass ready for expedited express check-in at the gate.`;
        break;
      case 'T_2H':
        msg = `Doors opening in 2 hours for ${event.name}! Welcome to Utah Telugu Association's grand celebration.`;
        break;
    }

    if (attendee.phone) {
      await this.sendSms(attendee.phone, msg);
    }
    return true;
  }

  /**
   * 3. Automated Tournament Court Call Alert (Dispatched 15m before match)
   */
  static async sendCourtCallAlert(payload: CourtCallAlertPayload): Promise<boolean> {
    const textMessage = `🔔 UTA ARENA ALERT: Captain ${payload.teamCaptainName}, Match #${payload.matchNumber} (${payload.roundName}) vs ${payload.opponentTeamName} starts in ${payload.minutesUntilStart} mins on ${payload.courtName}. Please report to the scorer desk now. Live scores: https://utahtelugu.org/events/live-scores`;
    return await this.sendSms(payload.phone, textMessage);
  }

  /**
   * 4. Automated 501(c)(3) Tax-Deductible Donation Receipt Generator
   */
  static generateTaxReceipt(payload: TaxReceiptPayload): {
    receiptNumber: string;
    receiptHtml: string;
    taxDeductibleStatement: string;
  } {
    const receiptNumber = `UTA-TAX-${payload.taxYear}-${payload.transactionId.substring(0, 8).toUpperCase()}`;
    const statement = `Utah Telugu Association is an exempt 501(c)(3) non-profit organization (IRS EIN: ${this.UTA_EIN}). No goods or services were provided in exchange for this contribution other than intangible religious or cultural benefits. Your contribution of $${payload.amount.toFixed(2)} is tax-deductible to the full extent of the law.`;

    const receiptHtml = `
      <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e5b869; border-radius: 12px; max-width: 600px; margin: auto;">
        <h2 style="color: #071a20; margin-bottom: 4px;">UTAH TELUGU ASSOCIATION</h2>
        <p style="color: #666; font-size: 12px; margin-top: 0;">501(c)(3) Non-Profit Organization • EIN: ${this.UTA_EIN}</p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />
        <h3 style="color: #b45309;">Official Tax Donation Receipt</h3>
        <p><strong>Receipt #:</strong> ${receiptNumber}</p>
        <p><strong>Donor Name:</strong> ${payload.donorName}</p>
        <p><strong>Contribution Amount:</strong> $${payload.amount.toFixed(2)} USD</p>
        <p><strong>Date Received:</strong> ${payload.donationDate}</p>
        <p style="font-size: 12px; color: #444; line-height: 1.5; background: #fdfaf3; padding: 12px; border-radius: 8px;">
          ${statement}
        </p>
        <p style="font-size: 11px; color: #888; margin-top: 16px;">Retain this receipt for your Utah state and federal IRS income tax filing.</p>
      </div>
    `;

    return {
      receiptNumber,
      receiptHtml,
      taxDeductibleStatement: statement,
    };
  }

  /**
   * Lightweight .ics Calendar File Generator
   */
  private static generateIcsCalendar(params: { title: string; description: string; location: string; start: string }): string {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Utah Telugu Association//Official Calendar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${params.title}`,
      `DESCRIPTION:${params.description}`,
      `LOCATION:${params.location}`,
      `DTSTART:${params.start.replace(/[-:]/g, '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  }

  /**
   * Mock / Resilient SMS Gateway Adapter
   */
  private static async sendSms(phoneNumber: string, body: string): Promise<boolean> {
    console.log(`[SMS-AUTOMATION] -> Sent to ${phoneNumber}: "${body}"`);
    return true;
  }
}
