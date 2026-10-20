import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Meta / Instagram Webhook Handler
 * Documentation: https://developers.facebook.com/docs/graph-api/webhooks/
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'uta_instagram_verify_token_2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Instagram Webhook Verified Successfully');
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('📥 Instagram Webhook Event Received:', JSON.stringify(payload));

    if (payload.object === 'instagram' && Array.isArray(payload.entry)) {
      for (const entry of payload.entry) {
        if (Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            if (change.field === 'media' && change.value) {
              const media = change.value;
              const postId = media.id || `insta_${Date.now()}`;
              
              await prisma.instagramPost.upsert({
                where: { id: postId },
                update: {
                  caption: media.caption || 'New post from @utahteluguassociation',
                  mediaType: media.media_type || 'IMAGE',
                  mediaUrl: media.media_url || media.permalink,
                  permalink: media.permalink || 'https://www.instagram.com/utahteluguassociation/',
                  timestamp: media.timestamp ? new Date(media.timestamp) : new Date(),
                  rawJson: JSON.stringify(media),
                  syncedAt: new Date(),
                },
                create: {
                  id: postId,
                  caption: media.caption || 'New post from @utahteluguassociation',
                  mediaType: media.media_type || 'IMAGE',
                  mediaUrl: media.media_url || media.permalink,
                  permalink: media.permalink || 'https://www.instagram.com/utahteluguassociation/',
                  timestamp: media.timestamp ? new Date(media.timestamp) : new Date(),
                  rawJson: JSON.stringify(media),
                  syncedAt: new Date(),
                },
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing Instagram webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
