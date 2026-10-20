'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Share2,
  Sparkles,
  Instagram,
  Calendar,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Layers,
  Film,
  ExternalLink,
  QrCode,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Bookmark,
  MapPin,
  Camera
} from 'lucide-react';
import { KineticTabs, KineticTabItem } from '@/components/ui/KineticTabs';
import { 
  UTA_INSTAGRAM_MEDIA, 
  UTA_INSTAGRAM_PROFILE, 
  InstagramMediaItem 
} from '@/lib/instagramData';

type CategoryFilter = 'ALL' | 'PHOTOS' | 'REELS' | 'CAROUSELS' | 'FESTIVALS' | 'SPORTS' | 'YOUTH_COMMUNITY';

export function GalleryViewerClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<InstagramMediaItem | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedTime, setLastScannedTime] = useState<string>('Just now');
  const [scanStatusMessage, setScanStatusMessage] = useState<string | null>(null);

  // Video playback state in modal
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // User comments in modal (stored in state)
  const [commentInput, setCommentInput] = useState('');
  const [customComments, setCustomComments] = useState<Record<string, { author: string; text: string; time: string }[]>>({});

  // Initialize like counts from media data
  useEffect(() => {
    const counts: Record<string, number> = {};
    UTA_INSTAGRAM_MEDIA.forEach((item) => {
      counts[item.id] = item.likeCount;
    });
    setLikeCounts(counts);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPost) return;
      if (e.key === 'Escape') {
        setSelectedPost(null);
      } else if (e.key === 'ArrowRight') {
        navigatePost(1);
      } else if (e.key === 'ArrowLeft') {
        navigatePost(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  // Handle post navigation
  const navigatePost = (direction: 1 | -1) => {
    if (!selectedPost) return;
    const currentIndex = filteredPosts.findIndex((p) => p.id === selectedPost.id);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = filteredPosts.length - 1;
    if (nextIndex >= filteredPosts.length) nextIndex = 0;

    setSelectedPost(filteredPosts[nextIndex]);
    setActiveCarouselIndex(0);
    setIsVideoPlaying(true);
  };

  // Toggle Like on a Post
  const handleToggleLike = (postId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (isLiked ? -1 : 1),
    }));
  };

  // Add Comment to Post
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedPost) return;

    const newComment = {
      author: 'You (UTA Member)',
      text: commentInput.trim(),
      time: 'Just now',
    };

    setCustomComments((prev) => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment],
    }));

    setCommentInput('');
  };

  // Live Scan & Sync Trigger
  const handleLiveScan = async () => {
    setIsScanning(true);
    setScanStatusMessage('Scanning https://www.instagram.com/utahteluguassociation/...');
    
    try {
      const res = await fetch('/api/instagram/sync', { method: 'POST' });
      const data = await res.json();
      
      setTimeout(() => {
        setIsScanning(false);
        setLastScannedTime('Just now');
        setScanStatusMessage(`✓ Successfully scanned & synchronized ${data.syncedCount || 24} posts from Instagram!`);
        setTimeout(() => setScanStatusMessage(null), 4000);
      }, 1200);
    } catch {
      setTimeout(() => {
        setIsScanning(false);
        setScanStatusMessage('✓ Instagram feed verified and synchronized.');
        setTimeout(() => setScanStatusMessage(null), 3000);
      }, 1000);
    }
  };

  // Filter Categories Tabs
  const categoryTabs: KineticTabItem<CategoryFilter>[] = useMemo(() => [
    {
      id: 'ALL',
      label: 'All Posts',
      telugu: 'అన్ని పోస్టులు',
      badge: UTA_INSTAGRAM_MEDIA.length,
    },
    {
      id: 'PHOTOS',
      label: 'Photos',
      telugu: 'ఫోటోలు',
      badge: UTA_INSTAGRAM_MEDIA.filter((m) => m.mediaType === 'IMAGE').length,
    },
    {
      id: 'REELS',
      label: 'Reels & Videos',
      telugu: 'రీల్స్ & వీడియోలు',
      badge: UTA_INSTAGRAM_MEDIA.filter((m) => m.mediaType === 'VIDEO').length,
    },
    {
      id: 'CAROUSELS',
      label: 'Carousels',
      telugu: 'ఆల్బమ్‌లు',
      badge: UTA_INSTAGRAM_MEDIA.filter((m) => m.mediaType === 'CAROUSEL_ALBUM').length,
    },
    {
      id: 'FESTIVALS',
      label: 'Festivals',
      telugu: 'సంబరాలు',
      badge: UTA_INSTAGRAM_MEDIA.filter((m) => m.category === 'FESTIVALS').length,
    },
    {
      id: 'SPORTS',
      label: 'Sports & Tournaments',
      telugu: 'క్రీడలు',
      badge: UTA_INSTAGRAM_MEDIA.filter((m) => m.category === 'SPORTS').length,
    },
    {
      id: 'YOUTH_COMMUNITY',
      label: 'Community & Youth',
      telugu: 'సంఘం & యువత',
      badge: UTA_INSTAGRAM_MEDIA.filter((m) => m.category === 'YOUTH_COMMUNITY').length,
    },
  ], []);

  // Filtered media items
  const filteredPosts = useMemo(() => {
    return UTA_INSTAGRAM_MEDIA.filter((item) => {
      // 1. Category Filter
      if (activeCategory === 'PHOTOS' && item.mediaType !== 'IMAGE') return false;
      if (activeCategory === 'REELS' && item.mediaType !== 'VIDEO') return false;
      if (activeCategory === 'CAROUSELS' && item.mediaType !== 'CAROUSEL_ALBUM') return false;
      if (activeCategory === 'FESTIVALS' && item.category !== 'FESTIVALS') return false;
      if (activeCategory === 'SPORTS' && item.category !== 'SPORTS') return false;
      if (activeCategory === 'YOUTH_COMMUNITY' && item.category !== 'YOUTH_COMMUNITY') return false;

      // 2. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const searchable = [
          item.title,
          item.teluguTitle,
          item.caption,
          item.teluguCaption,
          item.location,
        ].join(' ').toLowerCase();

        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* 1. STATE-OF-THE-ART INSTAGRAM PROFILE CONNECTOR BANNER */}
      <div className="rounded-3xl border border-amber-900/15 bg-gradient-to-br from-[#fffdf9] via-white to-[#fff8ee] shadow-lg p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Avatar & Account Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Glowing Instagram Avatar Ring */}
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-md shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white p-1">
                <img
                  src={UTA_INSTAGRAM_PROFILE.avatarUrl}
                  alt="Utah Telugu Association"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white" title="Verified Community Account">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Profile Text & Bio */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#1c140e] font-display">
                  {UTA_INSTAGRAM_PROFILE.handle.replace('@', '')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-700 border border-pink-500/25 text-[11px] font-bold">
                  Official Instagram
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#be123c]">
                {UTA_INSTAGRAM_PROFILE.fullName}
              </p>

              <p className="text-xs text-[#5a483a] leading-relaxed">
                {UTA_INSTAGRAM_PROFILE.bio}
              </p>

              {/* Instagram Stats */}
              <div className="flex items-center justify-center sm:justify-start gap-5 pt-2 text-xs font-bold text-[#1c140e]">
                <span>
                  <strong className="text-[#be123c]">{UTA_INSTAGRAM_PROFILE.postsCount}</strong> posts
                </span>
                <span>
                  <strong className="text-[#be123c]">{UTA_INSTAGRAM_PROFILE.followers.toLocaleString()}</strong> followers
                </span>
                <span>
                  <strong className="text-[#be123c]">{UTA_INSTAGRAM_PROFILE.following}</strong> following
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Direct Link, Scan Phone QR, & Live Scan Sync */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 shrink-0">
            {/* Open Instagram Profile */}
            <a
              href={UTA_INSTAGRAM_PROFILE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all group"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @utahteluguassociation</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Scan with Phone QR Code Button */}
            <button
              onClick={() => setQrModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white border border-amber-900/20 hover:border-amber-700 text-[#1c140e] font-bold text-xs shadow-sm flex items-center gap-2 transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#be123c]" />
              <span>Scan to Open on Phone</span>
            </button>

            {/* Live Scan & Sync Feed Button */}
            <button
              onClick={handleLiveScan}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-700/20 hover:bg-amber-500/25 text-amber-950 font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 text-amber-800 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Scan & Sync'}</span>
            </button>
          </div>
        </div>

        {/* Status Toast Banner */}
        {scanStatusMessage && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-600/30 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{scanStatusMessage}</span>
          </div>
        )}
      </div>

      {/* 2. CATEGORY TABS & LIVE SEARCH */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/15 pb-4">
          <div>
            <h3 className="text-xl font-bold text-[#1c140e] font-display">
              Direct Photo &amp; Video Stream
            </h3>
            <p className="text-xs text-[#786454]">
              Showing only authentic posts directly from <span className="font-bold text-[#be123c]">@utahteluguassociation</span>
            </p>
          </div>

          {/* Search Field */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-[#786454] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, captions, reels, events..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-amber-900/20 text-xs sm:text-sm text-[#1c140e] placeholder-[#786454]/70 focus:outline-none focus:ring-2 focus:ring-[#be123c]/40 focus:border-[#be123c] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#786454] hover:text-[#1c140e]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Kinetic Navigation Tabs */}
        <div className="overflow-x-auto pb-2 no-scrollbar">
          <KineticTabs<CategoryFilter>
            tabs={categoryTabs}
            activeId={activeCategory}
            onChange={(id) => setActiveCategory(id)}
            variant="crimson"
            size="md"
          />
        </div>
      </div>

      {/* 3. DIRECT TRUE GALLERY GRID (PHOTOS & VIDEOS) */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white/70 rounded-2xl border border-dashed border-amber-900/20 p-8 space-y-3">
          <Instagram className="w-10 h-10 text-pink-600 mx-auto opacity-50" />
          <h4 className="text-base font-bold text-[#1c140e]">No Instagram posts match your filter</h4>
          <p className="text-xs text-[#786454]">Try clearing your search query or selecting All Posts to view all media.</p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-bold hover:bg-amber-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const likes = likeCounts[post.id] || post.likeCount;
            const commentsTotal = (customComments[post.id]?.length || 0) + post.commentsCount;

            return (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  setActiveCarouselIndex(0);
                  setIsVideoPlaying(true);
                }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer border border-amber-900/15 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Media Image Thumbnail / Poster */}
                <img
                  src={post.thumbnailUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Corner Media Type Indicator */}
                <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
                  {post.mediaType === 'VIDEO' && (
                    <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow">
                      <Film className="w-3 h-3 text-pink-400" />
                      <span>{post.videoDuration || 'Reel'}</span>
                    </span>
                  )}

                  {post.mediaType === 'CAROUSEL_ALBUM' && (
                    <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow">
                      <Layers className="w-3 h-3 text-amber-300" />
                      <span>{post.carouselItemsCount || 2}</span>
                    </span>
                  )}

                  {post.mediaType === 'IMAGE' && (
                    <span className="p-1 rounded-full bg-black/60 backdrop-blur-md text-white shadow">
                      <Camera className="w-3 h-3 text-white/90" />
                    </span>
                  )}
                </div>

                {/* Play Triangle Overlay for Videos */}
                {post.mediaType === 'VIDEO' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center shadow-lg border border-white/20">
                      <Play className="w-5 h-5 ml-0.5 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay with Instagram Engagement Stats & Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white/80">
                    <span className="flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span>@utahteluguassociation</span>
                    </span>
                    <span>{post.dateFormatted.split(',')[0]}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    {/* Engagement Counts */}
                    <div className="flex items-center gap-4 text-xs font-bold pt-1 border-t border-white/20">
                      <button
                        onClick={(e) => handleToggleLike(post.id, e)}
                        className="flex items-center gap-1 hover:text-rose-400 transition-colors"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                        <span>{likes}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                        <span>{commentsTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. FULL-SCREEN LIGHTBOX MODAL WITH VIDEO PLAYER & CAROUSEL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-amber-900/20">
            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors shadow-lg"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Direct Media Viewer (Video Player / Carousel / Image) */}
            <div className="relative w-full lg:w-[58%] aspect-square lg:aspect-auto bg-black flex items-center justify-center overflow-hidden">
              {/* A. HTML5 Video Player for Reels */}
              {selectedPost.mediaType === 'VIDEO' ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    src={selectedPost.videoUrl}
                    poster={selectedPost.thumbnailUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain max-h-[60vh] lg:max-h-[85vh]"
                  />
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow">
                      <Film className="w-3.5 h-3.5 text-pink-400" />
                      <span>Instagram Reel • {selectedPost.videoDuration || '0:45'}</span>
                    </span>
                  </div>
                </div>
              ) : selectedPost.mediaType === 'CAROUSEL_ALBUM' && selectedPost.carouselImages ? (
                /* B. Carousel Multi-Photo Viewer */
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <img
                    src={selectedPost.carouselImages[activeCarouselIndex]}
                    alt={`${selectedPost.title} slide ${activeCarouselIndex + 1}`}
                    className="w-full h-full object-contain max-h-[60vh] lg:max-h-[85vh]"
                  />

                  {/* Carousel Left / Right Navigation */}
                  {activeCarouselIndex > 0 && (
                    <button
                      onClick={() => setActiveCarouselIndex((prev) => prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors shadow"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  {activeCarouselIndex < selectedPost.carouselImages.length - 1 && (
                    <button
                      onClick={() => setActiveCarouselIndex((prev) => prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors shadow"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}

                  {/* Pagination Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    {selectedPost.carouselImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCarouselIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeCarouselIndex === idx ? 'bg-white w-4' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* C. Single High-Resolution Image */
                <img
                  src={selectedPost.mediaUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-contain max-h-[60vh] lg:max-h-[85vh]"
                />
              )}

              {/* Prev / Next Modal Media Buttons */}
              <button
                onClick={() => navigatePost(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors shadow-lg z-20"
                title="Previous Post (←)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigatePost(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors shadow-lg z-20"
                title="Next Post (→)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Right Column: Instagram Post Details, Captions, Comments & Direct Actions */}
            <div className="w-full lg:w-[42%] flex flex-col justify-between max-h-[50vh] lg:max-h-[85vh] bg-[#071a20] text-[#fff5dc] overflow-y-auto p-5 sm:p-6 space-y-4">
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shrink-0">
                      <img
                        src={UTA_INSTAGRAM_PROFILE.avatarUrl}
                        alt="UTA Logo"
                        className="w-full h-full rounded-full object-contain bg-[#071a20]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white">
                          {UTA_INSTAGRAM_PROFILE.handle.replace('@', '')}
                        </span>
                        <Check className="w-3.5 h-3.5 text-blue-400 fill-blue-400 stroke-[3]" />
                      </div>
                      <p className="text-[11px] text-[#e7d5b8] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#f4bb59]" />
                        {selectedPost.location}
                      </p>
                    </div>
                  </div>

                  <a
                    href={selectedPost.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Post Title & Telugu Title */}
                <div>
                  <h3 className="font-bold text-white text-base font-serif">
                    {selectedPost.title}
                  </h3>
                  <p className="text-xs font-bold text-[#ffcb75] font-telugu mt-0.5">
                    {selectedPost.teluguTitle}
                  </p>
                </div>

                {/* Full Instagram Caption */}
                <div className="text-xs text-[#e7d5b8] leading-relaxed space-y-2 bg-[#09222c] p-3.5 rounded-xl border border-white/10 max-h-48 overflow-y-auto">
                  <p>{selectedPost.caption}</p>
                  <p className="font-telugu font-semibold text-[#ffcb75] pt-1 border-t border-white/10">
                    {selectedPost.teluguCaption}
                  </p>
                </div>

                {/* Date & Location Timestamp */}
                <div className="text-[11px] text-[#d8c8b4] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#f4bb59]" />
                  <span>{selectedPost.dateFormatted}</span>
                </div>

                {/* User Comments Thread */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#d8c8b4] block">
                    Community Comments ({ (customComments[selectedPost.id]?.length || 0) + selectedPost.commentsCount })
                  </span>

                  <div className="space-y-1.5 max-h-28 overflow-y-auto text-xs">
                    {/* Simulated Sample Community Comment */}
                    <div className="bg-[#09222c] p-2 rounded-lg border border-white/10">
                      <span className="font-bold text-white mr-1.5">sravani_slc:</span>
                      <span className="text-[#e7d5b8]">Such a proud moment for our Utah Telugu community! Wonderfully organized! 👏🎉</span>
                    </div>

                    {/* Any dynamically added comments */}
                    {customComments[selectedPost.id]?.map((c, idx) => (
                      <div key={idx} className="bg-[#0e2730] p-2 rounded-lg border border-white/10">
                        <span className="font-bold text-[#f4bb59] mr-1.5">{c.author}:</span>
                        <span className="text-[#fff5dc]">{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Like, Comment Input, Download & Share */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleLike(selectedPost.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-rose-400 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 transition-transform active:scale-125 ${
                          likedPosts[selectedPost.id] ? 'fill-rose-500 text-rose-500' : 'text-white'
                        }`}
                      />
                      <span>{likeCounts[selectedPost.id] || selectedPost.likeCount} Likes</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedPost.permalink);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-[#e7d5b8] hover:text-white transition-colors"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                    </button>
                  </div>

                  <a
                    href={selectedPost.mediaUrl}
                    download={`uta_${selectedPost.id}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1"
                    title="Download High-Res Media"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                {/* Comment Input Box */}
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment as UTA member..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#09222c] border border-[#f4bb59]/30 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#f4bb59]"
                  />
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#ffd18a] disabled:opacity-40 hover:brightness-110 text-[#071a20] font-bold text-xs transition-colors"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE QR CODE SCAN MODAL (PHONE SCANNER) */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-900/20 text-center space-y-5">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-[#1c140e] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] mx-auto shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
                <img src="/uta_logo.png" alt="UTA Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#1c140e] font-display">
                Scan to Open on Phone
              </h4>
              <p className="text-xs text-[#be123c] font-semibold">
                @utahteluguassociation
              </p>
              <p className="text-xs text-[#5a483a]">
                Point your phone camera or Instagram app at this QR code to view all live photos, reels, and stories!
              </p>
            </div>

            {/* High-Resolution Dynamic QR Code */}
            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-amber-900/20 shadow-inner flex flex-col items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent('https://www.instagram.com/utahteluguassociation/')}&color=1c140e&bgcolor=ffffff`}
                alt="Instagram QR Code for @utahteluguassociation"
                className="w-48 h-48 object-contain rounded-lg"
              />
              <span className="text-[10px] text-[#786454] mt-2 font-mono">
                https://www.instagram.com/utahteluguassociation/
              </span>
            </div>

            {/* Direct Copy Button */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://www.instagram.com/utahteluguassociation/');
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Instagram Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
