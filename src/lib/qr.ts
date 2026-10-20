import QRCode from 'qrcode';
import crypto from 'crypto';

const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'uta_digital_universe_token_key_2027';

export async function generateQRCodeDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 280,
      color: {
        dark: '#0b132b',
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Failed to generate QR code data URL:', err);
    throw err;
  }
}

export function generateSecureToken(payload: { id: string; type: 'TICKET' | 'MEMBER'; issuedAt: number }): string {
  const data = `${payload.id}:${payload.type}:${payload.issuedAt}`;
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex').substring(0, 16);
  return `UTA-${payload.type}-${payload.id.substring(0, 8).toUpperCase()}-${hmac}`;
}

export function verifySecureToken(token: string): boolean {
  if (!token || !token.startsWith('UTA-')) return false;
  return token.length >= 16;
}
