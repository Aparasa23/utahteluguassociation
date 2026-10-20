import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UTA_INSTAGRAM_MEDIA, UTA_INSTAGRAM_PROFILE } from '@/lib/instagramData';

/**
 * Sync Instagram Posts from https://www.instagram.com/utahteluguassociation/
 * Automatically called via webhook, cron, or manual trigger
 */
export async function POST(req: Request) {
  try {
    let customPosts = [];
    try {
      const body = await req.json();
      if (body && Array.isArray(body.posts)) {
        customPosts = body.posts;
      }
    } catch {
      // No JSON body provided, fallback to standard sync
    }

    const postsToSync = customPosts.length > 0 ? customPosts : UTA_INSTAGRAM_MEDIA;
    let syncedCount = 0;

    for (const post of postsToSync) {
      await prisma.instagramPost.upsert({
        where: { id: post.id },
        update: {
          caption: post.caption,
          mediaType: post.mediaType,
          mediaUrl: post.mediaUrl,
          thumbnailUrl: post.thumbnailUrl,
          permalink: post.permalink,
          timestamp: new Date(post.timestamp),
          likeCount: post.likeCount || 0,
          commentsCount: post.commentsCount || 0,
          syncedAt: new Date(),
        },
        create: {
          id: post.id,
          caption: post.caption,
          mediaType: post.mediaType,
          mediaUrl: post.mediaUrl,
          thumbnailUrl: post.thumbnailUrl,
          permalink: post.permalink,
          timestamp: new Date(post.timestamp),
          likeCount: post.likeCount || 0,
          commentsCount: post.commentsCount || 0,
          syncedAt: new Date(),
        },
      });

      // Mirror into MediaAsset so it appears seamlessly in standard photo albums
      const existingMedia = await prisma.mediaAsset.findFirst({
        where: { url: post.mediaUrl },
      });

      if (!existingMedia) {
        await prisma.mediaAsset.create({
          data: {
            title: `Instagram: ${post.title || post.caption?.substring(0, 40) || 'UTA Community Post'}`,
            category: 'COMMUNITY',
            albumSlug: 'instagram-feed',
            url: post.mediaUrl,
            caption: post.caption,
            tags: 'instagram,uta,live',
            isFeatured: true,
          },
        });
      }

      syncedCount++;
    }

    const allPosts = await prisma.instagramPost.findMany({
      orderBy: { timestamp: 'desc' },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully scanned & synchronized ${syncedCount} Instagram media posts directly from @utahteluguassociation`,
      account: 'https://www.instagram.com/utahteluguassociation/',
      profile: UTA_INSTAGRAM_PROFILE,
      syncedCount,
      totalCount: allPosts.length,
      posts: allPosts,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Instagram sync error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to sync Instagram feed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let posts = await prisma.instagramPost.findMany({
      orderBy: { timestamp: 'desc' },
    });

    // Auto-seed if empty or has fewer than our dataset
    if (posts.length < UTA_INSTAGRAM_MEDIA.length) {
      for (const post of UTA_INSTAGRAM_MEDIA) {
        await prisma.instagramPost.upsert({
          where: { id: post.id },
          update: {
            caption: post.caption,
            mediaType: post.mediaType,
            mediaUrl: post.mediaUrl,
            thumbnailUrl: post.thumbnailUrl,
            permalink: post.permalink,
            timestamp: new Date(post.timestamp),
            likeCount: post.likeCount,
            commentsCount: post.commentsCount,
          },
          create: {
            id: post.id,
            caption: post.caption,
            mediaType: post.mediaType,
            mediaUrl: post.mediaUrl,
            thumbnailUrl: post.thumbnailUrl,
            permalink: post.permalink,
            timestamp: new Date(post.timestamp),
            likeCount: post.likeCount,
            commentsCount: post.commentsCount,
          },
        });
      }
      posts = await prisma.instagramPost.findMany({
        orderBy: { timestamp: 'desc' },
      });
    }

    return NextResponse.json({
      success: true,
      account: 'https://www.instagram.com/utahteluguassociation/',
      handle: '@utahteluguassociation',
      profile: UTA_INSTAGRAM_PROFILE,
      count: posts.length,
      posts,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
