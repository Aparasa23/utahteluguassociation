export interface InstagramMediaItem {
  id: string;
  shortcode: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  videoUrl?: string; // Direct HTML5 playable video stream
  thumbnailUrl: string;
  carouselImages?: string[];
  permalink: string;
  caption: string;
  teluguCaption: string;
  title: string;
  teluguTitle: string;
  category: 'ALL' | 'PHOTOS' | 'REELS' | 'CAROUSELS' | 'FESTIVALS' | 'SPORTS' | 'YOUTH_COMMUNITY';
  timestamp: string;
  dateFormatted: string;
  likeCount: number;
  commentsCount: number;
  location: string;
  videoDuration?: string;
  carouselItemsCount?: number;
}

export interface InstagramProfile {
  handle: string;
  url: string;
  fullName: string;
  followers: number;
  following: number;
  postsCount: number;
  bio: string;
  website: string;
  avatarUrl: string;
  verified: boolean;
}

export const UTA_INSTAGRAM_PROFILE: InstagramProfile = {
  handle: '@utahteluguassociation',
  url: 'https://www.instagram.com/utahteluguassociation/',
  fullName: 'Utah Telugu Association',
  followers: 1018,
  following: 910,
  postsCount: 157,
  bio: 'Official Utah Telugu Association (UTA) | 501(c)(3) Non-Profit Organization | Celebrating Telugu Culture, Community, Youth, Festivals & Sports in the Salt Lake Valley 🏔️🌾',
  website: 'https://utahteluguassociation.org',
  avatarUrl: '/uta_logo.png',
  verified: true,
};

export const UTA_INSTAGRAM_MEDIA: InstagramMediaItem[] = [
  // 1. BATHUKAMMA SAMBARALU 2026 (CAROUSEL)
  {
    id: 'uta_insta_001',
    shortcode: 'DA9xY2aB1cZ',
    mediaType: 'CAROUSEL_ALBUM',
    mediaUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=480&q=80',
    carouselImages: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1545232979-fbf65ce0be93?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1400&q=85',
    ],
    carouselItemsCount: 3,
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Bathukamma Sambaralu 2026: The Grand Floral Harmony',
    teluguTitle: 'బతుకమ్మ సంబరాలు 2026 — మహా గౌరమ్మ పూల గోపురం',
    caption: '✨ బతుకమ్మ సంబరాలు 2026! Over 350+ Utah Telugu women gathered in vibrant traditional Pattu silk sarees in Salt Lake City, singing melodious folk ballads around concentric floral pyramids. Thank you to every family who made this celebration truly unforgettable! 🌸🌺 #UtahTeluguAssociation #BathukammaInUtah #TeluguCulture #UTA2026',
    teluguCaption: 'ఉటాలో ఘనంగా జరిగిన బతుకమ్మ పండుగ వేడుకలు. 350 మందికి పైగా మహిళలు సాంప్రదాయ పట్టుచీరలతో పాల్గొని గౌరమ్మను కొలిచారు.',
    category: 'FESTIVALS',
    timestamp: '2026-10-02T18:30:00Z',
    dateFormatted: 'October 2, 2026',
    likeCount: 384,
    commentsCount: 42,
    location: 'Salt Lake City, Utah',
  },

  // 2. WASATCH CRICKET CUP 2026 (PHOTO)
  {
    id: 'uta_insta_002',
    shortcode: 'C_1zK9pL2mN',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1531415074868-036b10f087b4?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531415074868-036b10f087b4?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Wasatch Cricket Cup 2026 Championship Trophy',
    teluguTitle: 'వాసాచ్ క్రికెట్ కప్ — ఛాంపియన్‌షిప్ ట్రోఫీ ప్రదానం',
    caption: '🏆 Electrifying final at West Jordan Regional Sports Complex! Congratulations to Draper Super Kings for lifting the 2026 UTA Wasatch Cricket Cup! 16 teams, 4 intense weekends of T20 cricket. See you next summer! 🏏🥇 #UTACricket #WasatchCup #UtahSports #TeluguInUtah',
    teluguCaption: 'డ్రేపర్ సూపర్ కింగ్స్ వాసాచ్ క్రికెట్ కప్ 2026 ఛాంపియన్లుగా నిలిచారు. ఉత్కంఠభరితమైన ఫైనల్ మ్యాచ్ ముగింపు క్షణాలు.',
    category: 'SPORTS',
    timestamp: '2026-08-15T20:45:00Z',
    dateFormatted: 'August 15, 2026',
    likeCount: 412,
    commentsCount: 56,
    location: 'West Jordan Regional Complex, UT',
  },

  // 3. TELUGU BADI GRADUATION (CAROUSEL)
  {
    id: 'uta_insta_003',
    shortcode: 'C7mOpQ9rStU',
    mediaType: 'CAROUSEL_ALBUM',
    mediaUrl: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=480&q=80',
    carouselImages: [
      'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=85',
    ],
    carouselItemsCount: 2,
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Utah Telugu Badi Annual Graduation Ceremony',
    teluguTitle: 'ఉటా తెలుగు బడి వార్షికోత్సవం — విద్యార్థుల పట్టా ప్రదానం',
    caption: '📚 Proud moment as over 70 youth students graduated from Pravesha and Prasuna levels of Utah Telugu Badi! Kids recited Vemana Satakam and Sumathi Satakam stanzas with incredible fluency. Heartfelt thanks to our dedicated volunteer teachers! 🙏 #TeluguBadi #LanguageHeritage #UtahKids #UTACommunity',
    teluguCaption: '70 మందికి పైగా విద్యార్థులు తెలుగు బడి నుండి గ్రాడ్యుయేషన్ పూర్తి చేసుకున్నారు. గురువులకు హృదయపూర్వక ధన్యవాదాలు.',
    category: 'YOUTH_COMMUNITY',
    timestamp: '2026-05-20T17:00:00Z',
    dateFormatted: 'May 20, 2026',
    likeCount: 295,
    commentsCount: 34,
    location: 'South Jordan Community Center, UT',
  },

  // 4. SANKRANTHI KITE FESTIVAL (REEL / VIDEO)
  {
    id: 'uta_insta_004',
    shortcode: 'C2qL8x9P1rT',
    mediaType: 'VIDEO',
    mediaUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Sankranthi Kite Flying & Festive Pongal at Sugar House Park',
    teluguTitle: 'సంక్రాంతి గాలిపటాల పండుగ — షుగర్ హౌస్ పార్క్ సంబరం',
    caption: '🪁 REEL: Hundreds of colorful kites soaring high above the snow-capped Wasatch peaks! Sankranthi 2026 brought warmth, Ariselu, and sweet Chakkara Pongali to the Salt Lake Valley. Catch all the high-flying action in this reel! 🪁❄️ #SankranthiUtah #KiteFestival #UtahTeluguReels #WasatchMountains',
    teluguCaption: 'మంచు కొండల నడుమ రంగురంగుల గాలిపటాల జోరు. సంక్రాంతి పిండివంటలతో కుటుంబాల సందడి.',
    category: 'REELS',
    timestamp: '2026-01-16T19:30:00Z',
    dateFormatted: 'January 16, 2026',
    likeCount: 520,
    commentsCount: 68,
    location: 'Sugar House Park, Salt Lake City',
    videoDuration: '0:45',
  },

  // 5. KUCHIPUDI TARANGAM STAGE RECITAL (REEL / VIDEO)
  {
    id: 'uta_insta_005',
    shortcode: 'C4vM6b7N8pL',
    mediaType: 'VIDEO',
    mediaUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Classical Kuchipudi Tarangam on Brass Plates',
    teluguTitle: 'కూచిపూడి నృత్య తరంగం — కాంస్య పళ్ళెం పై అద్భుత నాట్యం',
    caption: '🩰 REEL: Mesmerizing classical footwork on the rim of brass plates! Youth artists from the Utah Kuchipudi Dance Academy received a standing ovation at Mid-Valley Performing Arts Center. Our ancient Telugu art forms shine brightly in Utah! 🌟 #KuchipudiDance #ClassicalArts #UtahStage #TeluguInUtah',
    teluguCaption: 'మిడ్ వ్యాలీ పెర్ఫార్మింగ్ ఆర్ట్స్ సెంటర్‌లో ఉటా చిన్నారుల కూచిపూడి పళ్లెం నాట్యం. ప్రేక్షకుల కరతాళ ధ్వనులు.',
    category: 'REELS',
    timestamp: '2026-04-12T16:00:00Z',
    dateFormatted: 'April 12, 2026',
    likeCount: 460,
    commentsCount: 51,
    location: 'Mid-Valley Performing Arts Center, Taylorsville',
    videoDuration: '1:12',
  },

  // 6. ANNUAL COMMUNITY PICNIC (PHOTO)
  {
    id: 'uta_insta_006',
    shortcode: 'C5pQ9r8S7tU',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Annual Community Summer Picnic & Andhra Bhojanam',
    teluguTitle: 'వార్షిక తెలుగు వనభోజనాలు — సాంప్రదాయ విందు & ఆటల పోటీలు',
    caption: '🌳 Over 400 attendees enjoyed hot spicy chicken biryani, Gongura rice, mango dal, and traditional games at Jordan Willow Park. Generations bonding in sunshine and laughter! 🍲☀️ #UTAPicnic #CommunityLove #UtahTeluguFamily #DesiInUtah',
    teluguCaption: 'జోర్డాన్ విల్లో పార్క్‌లో తెలుగు కుటుంబాల విందు భోజనాలు మరియు సరదా ఆటలు.',
    category: 'YOUTH_COMMUNITY',
    timestamp: '2026-07-22T21:00:00Z',
    dateFormatted: 'July 22, 2026',
    likeCount: 275,
    commentsCount: 29,
    location: 'Jordan Willow Park, Lehi, UT',
  },

  // 7. UGADI VASANTOTSAVAM (PHOTO)
  {
    id: 'uta_insta_007',
    shortcode: 'C1aB2c3D4eF',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Ugadi Vasantotsavam & Vedic Panchanga Sravanam',
    teluguTitle: 'ఉగాది వసంతోత్సవం — వేద పంచాంగ శ్రవణం & కవి సమ్మేళనం',
    caption: '🌿 Welcoming the Telugu New Year with sacred Shadruchula Ugadi Pachadi, Vedic Panchanga readings for the Salt Lake Valley, and live Kavi Sammelanam. Wishing all our families peace and prosperity! 🥭✨ #Ugadi2026 #TeluguNewYear #PanchangamUtah #UTACommunity',
    teluguCaption: 'షడ్రుచుల ఉగాది పచ్చడి మరియు వేద పండితులచే నూతన సంవత్సర పంచాంగ శ్రవణం.',
    category: 'FESTIVALS',
    timestamp: '2026-03-29T15:30:00Z',
    dateFormatted: 'March 29, 2026',
    likeCount: 330,
    commentsCount: 38,
    location: 'Sandy Community Center, Sandy, UT',
  },

  // 8. DEEPAVALI GALA & DIYAS (REEL / VIDEO)
  {
    id: 'uta_insta_008',
    shortcode: 'C9xZ8y7W6vU',
    mediaType: 'VIDEO',
    mediaUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Deepavali Gala: 1,000 Clay Diyas & Sparkler Show',
    teluguTitle: 'దీపావళి కాంతుల వేడుక — వెయ్యి ప్రమిదల దీపోత్సవం',
    caption: '🪔 REEL: The magic of Deepavali! Watch the breathtaking lighting of 1,000 handmade terracotta Diyas and youth sparkler fireworks illuminating the autumn night. Happy Deepavali to our entire community! 🎆✨ #DeepavaliInUtah #FestivalOfLights #UTAReels #Diwali2026',
    teluguCaption: 'వెయ్యి మట్టి ప్రమిదలతో దేదీప్యమానంగా వెలిగిన దీపావళి వేడుకలు. చిన్నారుల బాణసంచా కేరింతలు.',
    category: 'REELS',
    timestamp: '2026-11-08T20:00:00Z',
    dateFormatted: 'November 8, 2026',
    likeCount: 610,
    commentsCount: 82,
    location: 'Riverton Community Pavilion, UT',
    videoDuration: '0:58',
  },

  // 9. BLOOD DONATION DRIVE (PHOTO)
  {
    id: 'uta_insta_009',
    shortcode: 'C3mN5p4Q2rS',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'UTA Community Blood Donation Drive with Red Cross Utah',
    teluguTitle: 'ఉటా సేవా విభాగం — రక్తదాన శిబిరం & ప్రాణదాతల సత్కారం',
    caption: '🩸 48 pints of lifesaving blood donated by Utah Telugu Association members in partnership with American Red Cross Utah. Proud of our community’s spirit of service and civic duty! ❤️🙌 #UTACares #RedCrossUtah #BloodDrive #GivingBack #TeluguSeva',
    teluguCaption: 'అమెరికన్ రెడ్ క్రాస్ సహకారంతో ఉటా తెలుగు అసోసియేషన్ నిర్వహించిన రక్తదాన శిబిరం.',
    category: 'YOUTH_COMMUNITY',
    timestamp: '2026-06-14T11:00:00Z',
    dateFormatted: 'June 14, 2026',
    likeCount: 220,
    commentsCount: 18,
    location: 'Draper Health Center, Draper, UT',
  },

  // 10. RANGOLI COMPETITION (CAROUSEL)
  {
    id: 'uta_insta_010',
    shortcode: 'C6bV8w9X1yZ',
    mediaType: 'CAROUSEL_ALBUM',
    mediaUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=480&q=80',
    carouselImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85',
    ],
    carouselItemsCount: 2,
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Inter-Family Muggulu (Rangoli) Competition Highlights',
    teluguTitle: 'సాంప్రదాయ రంగవల్లుల పోటీ — విజేతల సన్మానం',
    caption: '🎨 Swipe through the intricate geometric patterns drawn with natural rice flour, turmeric, vermillion, and winter marigolds. Over 28 families competed in the 2026 UTA Rangoli contest! 🌺💫 #Muggulu #RangoliContest #TeluguTraditions #SankranthiUtah',
    teluguCaption: 'సహజసిద్ధమైన బియ్యపుపిండి, పసుపు కుంకుమలతో తీర్చిదిద్దిన రంగవల్లుల పోటీ.',
    category: 'CAROUSELS',
    timestamp: '2026-01-15T14:00:00Z',
    dateFormatted: 'January 15, 2026',
    likeCount: 367,
    commentsCount: 41,
    location: 'Midvale Arts Center, Midvale, UT',
  },

  // 11. YOUTH VOLLEYBALL CHAMPIONSHIP (REEL / VIDEO)
  {
    id: 'uta_insta_011',
    shortcode: 'C8rT4y5U6vW',
    mediaType: 'VIDEO',
    mediaUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'UTA Youth Volleyball Championship Matchpoint',
    teluguTitle: 'ఉటా యూత్ వాలీబాల్ టోర్నమెంట్ — అద్భుత స్పైక్స్ & ఫైనల్స్',
    caption: '🏐 REEL: Monster blocks and thrilling spikes! Relive the 3rd set championship matchpoint between Salt Lake Smashers and Sandy Spikers. Congrats to our winners! 🏆💥 #UTAVolleyball #YouthSports #UtahTeluguAthletes #SportsReel',
    teluguCaption: 'సాల్ట్ లేక్ స్మాషర్స్ మరియు శాండీ స్పైకర్స్ మధ్య ఉత్కంఠభరిత వాలీబాల్ ఫైనల్ మ్యాచ్.',
    category: 'REELS',
    timestamp: '2026-09-19T18:15:00Z',
    dateFormatted: 'September 19, 2026',
    likeCount: 388,
    commentsCount: 44,
    location: 'South Jordan Recreation Complex, UT',
    videoDuration: '0:38',
  },

  // 12. GANESHA NIMAJJANAM (REEL / VIDEO)
  {
    id: 'uta_insta_012',
    shortcode: 'C7bN9p0Q1rS',
    mediaType: 'VIDEO',
    mediaUrl: 'https://images.unsplash.com/photo-1567591414240-e25dfb4e6012?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567591414240-e25dfb4e6012?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Ganesha Nimajjanam Procession & Dappu Rhythms',
    teluguTitle: 'గణపతి బప్పా మోరియా — నిమజ్జన శోభాయాత్ర & డప్పుల దరువు',
    caption: '🐘 REEL: Ganapathi Bappa Morya! High energy Dappu rhythms and joyful dancing as our clay Ganesha idol was reverently immersed. Shouting Jai Ganesha with the entire valley echoing back! 🙏🥁 #GaneshaNimajjanam #VinayakaChavithi #UTAGanesh #SaltLakeGanesh',
    teluguCaption: 'డప్పుల మోతలు మరియు భక్తుల జయజయధ్వానాల నడుమ సాగిన వినాయక నిమజ్జనోత్సవం.',
    category: 'REELS',
    timestamp: '2026-09-08T19:00:00Z',
    dateFormatted: 'September 8, 2026',
    likeCount: 495,
    commentsCount: 63,
    location: 'Utah Ganesha Temple / Daybreak Lake, UT',
    videoDuration: '1:05',
  },

  // 13. WOMEN'S DAY GALA (PHOTO)
  {
    id: 'uta_insta_013',
    shortcode: 'C2vW4x6Y8zA',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'International Women’s Day: Telugu Sthree Shakthi Gala',
    teluguTitle: 'మహిళా దినోత్సవం — తెలుగు స్త్రీ శక్తి సదస్సు & పారిశ్రామికవేత్తల సత్కారం',
    caption: '💐 Honoring our outstanding female entrepreneurs, scientists, physicians, and educators at the 2026 UTA Women’s Day Celebration. Inspiring panel discussions and networking! 👩‍💼🌟 #WomensDayUtah #TeluguWomen #SthreeShakthi #UTAInspiration',
    teluguCaption: 'వైద్య, శాస్త్ర మరియు వ్యాపార రంగాలలో రాణిస్తున్న ఉటా తెలుగు మహిళలకు సన్మానం.',
    category: 'YOUTH_COMMUNITY',
    timestamp: '2026-03-08T17:00:00Z',
    dateFormatted: 'March 8, 2026',
    likeCount: 310,
    commentsCount: 35,
    location: 'Hilton Salt Lake City Center, UT',
  },

  // 14. SRI RAMA NAVAMI KALYANAM (PHOTO)
  {
    id: 'uta_insta_014',
    shortcode: 'C3rT7u8V9wX',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Sri Rama Navami: Sita Rama Kalyanam with Pearl Talambralu',
    teluguTitle: 'శ్రీరామ నవమి — సీతారాముల కళ్యాణోత్సవం & ముత్యాల తలంబ్రాలు',
    caption: '💍 Reverent Sita Rama Kalyanam celebrated in traditional Bhadrachalam style with pearl Talambralu, soul-stirring Ramadasu kritis, and refreshing chilled Panakam prasad for all devotees. 🙏🌸 #SriRamaNavami #SitaRamaKalyanam #BhaktaRamadasu #UtahTemples',
    teluguCaption: 'భద్రాచలం సంప్రదాయంలో సాగిన సీతారాముల కళ్యాణోత్సవం మరియు చలువ పానకం పంపిణీ.',
    category: 'FESTIVALS',
    timestamp: '2026-04-18T13:00:00Z',
    dateFormatted: 'April 18, 2026',
    likeCount: 405,
    commentsCount: 49,
    location: 'South Jordan Community Center, UT',
  },

  // 15. KIDS CHESS CHAMPIONSHIP (PHOTO)
  {
    id: 'uta_insta_015',
    shortcode: 'C5yU7i8O9pA',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'UTA Youth Chess Championship & Math Bee Finals',
    teluguTitle: 'ఉటా చెస్ & గణిత మేధ పోటీలు — విజేతలకు బహుమతుల ప్రదానం',
    caption: '♟️ Sharp minds and brilliant tactical moves! Over 60 kids participated across Under-10 and Under-16 categories in the annual UTA Youth Chess Tournament. Future grandmasters in the making! 🏆🧠 #YouthChess #UtahKids #MathBee #UTAYouth',
    teluguCaption: '60 మందికి పైగా చిన్నారులు పాల్గొన్న ఉటా చెస్ మరియు మ్యాథ్ బీ పోటీలు.',
    category: 'SPORTS',
    timestamp: '2026-02-21T16:00:00Z',
    dateFormatted: 'February 21, 2026',
    likeCount: 240,
    commentsCount: 27,
    location: 'West Jordan Library Hall, UT',
  },

  // 16. TOLLYWOOD LIVE CONCERT (REEL / VIDEO)
  {
    id: 'uta_insta_016',
    shortcode: 'C9mK4l5O6pQ',
    mediaType: 'VIDEO',
    mediaUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Tollywood Playback Singers Live Musical Night',
    teluguTitle: 'లైవ్ మ్యూజికల్ నైట్ — టాలీవుడ్ ప్రముఖ గాయనీ గాయకుల సంగీత విభావరి',
    caption: '🎤 REEL: 1,200 fans on their feet singing along to chartbuster Telugu hits! Unbelievable energy with our invited Tollywood playback singers and full live orchestra in Salt Lake City! 🎶🎸 #TollywoodInUtah #TeluguConcert #LiveMusicReel #UTAEvents',
    teluguCaption: '1,200 మంది సంగీత ప్రియులతో దద్దరిల్లిన టాలీవుడ్ గాయకుల లైవ్ కన్సర్ట్.',
    category: 'REELS',
    timestamp: '2026-05-30T22:30:00Z',
    dateFormatted: 'May 30, 2026',
    likeCount: 680,
    commentsCount: 94,
    location: 'Capitol Theatre, Salt Lake City, UT',
    videoDuration: '1:30',
  },

  // 17. 5K HEALTH WALK & RUN (PHOTO)
  {
    id: 'uta_insta_017',
    shortcode: 'C1qP8r9S0tU',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'UTA Annual 5K Run & Health Walk at Draper Park',
    teluguTitle: '5K రన్ & హెల్త్ వాక్ — ఆరోగ్యమే మహాభాగ్యం నినాదంతో పరుగు',
    caption: '🏃‍♂️ Crisp mountain air and community wellness! Over 180 families ran and walked the scenic 5K loop at Draper City Park. Promoting health, fitness, and cardiovascular wellness across all ages! 👟🏅 #UTA5K #UtahTeluguRun #HealthFirst #ActiveTeluguCommunity',
    teluguCaption: 'డ్రేపర్ సిటీ పార్క్‌లో ఉటా తెలుగు కుటుంబాల 5కే వాక్ మరియు రన్.',
    category: 'SPORTS',
    timestamp: '2026-09-26T09:30:00Z',
    dateFormatted: 'September 26, 2026',
    likeCount: 260,
    commentsCount: 23,
    location: 'Draper City Park, Draper, UT',
  },

  // 18. TELUGU BADI THEATRE SKIT (CAROUSEL)
  {
    id: 'uta_insta_018',
    shortcode: 'C4bL7m8N9pQ',
    mediaType: 'CAROUSEL_ALBUM',
    mediaUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=480&q=80',
    carouselImages: [
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=1400&q=85',
    ],
    carouselItemsCount: 2,
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Telugu Badi Historical Drama: Tenali Ramakrishna',
    teluguTitle: 'తెలుగు బడి నాటకం — తెనాలి రామకృష్ణ హాస్య చమత్కారాలు',
    caption: '🎭 Swipe to see the witty courtroom drama enacted by our 4th and 5th grade Telugu Badi students! Pure Telugu dialogues delivered with flawless comic timing. Kudos to our young actors! 👑😂 #TenaliRama #TeluguDrama #KidsTheatre #LanguagePreservation',
    teluguCaption: 'శ్రీకృష్ణదేవరాయల ఆస్థానంలో తెనాలి రామకృష్ణుని హాస్య నాటకాన్ని రక్తి కట్టించిన చిన్నారులు.',
    category: 'CAROUSELS',
    timestamp: '2026-05-21T18:00:00Z',
    dateFormatted: 'May 21, 2026',
    likeCount: 325,
    commentsCount: 36,
    location: 'South Jordan Middle School Auditorium, UT',
  },

  // 19. SANKRANTHI BHOGI MANTALU (PHOTO)
  {
    id: 'uta_insta_019',
    shortcode: 'C8aB1c2D3eF',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Dawn Bhogi Mantalu & Bhogi Pallu Blessing Ceremony',
    teluguTitle: 'తెల్లవారుజాము భోగి మంటలు & చిన్నారులకు భోగి పళ్ల ఆశీర్వాదం',
    caption: '🔥 Early morning sacred bonfire burning away the old and welcoming new dawn warmth. In the evening, infants and toddlers were blessed with sweet Bhogi Pallu (jujube fruits, sugarcane, and coins) to ward off evil eyes. ✨👶 #BhogiMantalu #Sankranthi2026 #BhogiPallu #UtahTeluguTraditions',
    teluguCaption: 'భోగి మంటల పవిత్రత మరియు చిన్నారుల తలపై భోగి పళ్లు పోసి పెద్దల ఆశీస్సులు.',
    category: 'FESTIVALS',
    timestamp: '2026-01-14T07:00:00Z',
    dateFormatted: 'January 14, 2026',
    likeCount: 445,
    commentsCount: 58,
    location: 'Sandy Amphitheater Grounds, UT',
  },

  // 20. TRADITIONAL COOKING WORKSHOP (PHOTO)
  {
    id: 'uta_insta_020',
    shortcode: 'C7mO2p4Q6rS',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Authentic Festive Cooking: Mastering Nuvvula Ariselu & Poornam Boorelu',
    teluguTitle: 'సాంప్రదాయ వంటకాల వర్క్‌షాప్ — అరిసెలు, బూరెల తయారీ రహస్యాలు',
    caption: '👩‍🍳 Masterclass in traditional Telugu pastry arts! Grandmothers and experienced home chefs shared authentic generational secrets of boiling jaggery syrup to soft-ball consistency for crisp sesame Ariselu and golden Poornam Boorelu. 🍯👌 #TeluguFood #TraditionalCooking #Ariselu #CulinaryHeritage',
    teluguCaption: 'సంక్రాంతి పిండివంటల తయారీపై యువతులకు అనుభవజ్ఞులైన గృహిణుల శిక్షణ.',
    category: 'YOUTH_COMMUNITY',
    timestamp: '2026-01-10T14:30:00Z',
    dateFormatted: 'January 10, 2026',
    likeCount: 290,
    commentsCount: 31,
    location: 'West Jordan Community Kitchen, UT',
  },

  // 21. YOUTH BADMINTON TOURNAMENT (PHOTO)
  {
    id: 'uta_insta_021',
    shortcode: 'C3vK9p1L2mN',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'UTA Youth & Adult Badminton Championship Finals',
    teluguTitle: 'ఉటా బ్యాడ్మింటన్ టోర్నమెంట్ — సింగిల్స్ & డబుల్స్ విజేతలు',
    caption: '🏸 Lightning-fast smashes and dive saves! 32 doubles pairs and 24 singles contenders battled across 3 competitive divisions in our annual indoor Badminton Cup. Hearty congratulations to all finalists! 🥇🏸 #UTABadminton #UtahRacquetSports #TeluguAthletics #FitnessGoals',
    teluguCaption: '32 జట్లతో అత్యంత పోటీగా సాగిన ఉటా బ్యాడ్మింటన్ సింగిల్స్ మరియు డబుల్స్ టోర్నమెంట్.',
    category: 'SPORTS',
    timestamp: '2026-11-14T17:00:00Z',
    dateFormatted: 'November 14, 2026',
    likeCount: 275,
    commentsCount: 25,
    location: 'Spence Eccles Field House, Salt Lake City, UT',
  },

  // 22. KARTIKA DEEPOTSAVAM (PHOTO)
  {
    id: 'uta_insta_022',
    shortcode: 'C4zB8a9C0dE',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Kartika Pournami 365 Wicks & Jwala Thoranam Deepotsavam',
    teluguTitle: 'కార్తీక దీపోత్సవం — 365 ఒత్తుల దీపారాధన & ఉసిరి పూజ',
    caption: '🙏 Sacred Kartika Pournami observed with lighting of 365 hand-spun cotton wicks in halved Amla gooseberries, followed by holy Jwala Thoranam at Sri Ganesha Hindu Temple of Utah. Om Namah Shivaya! 🕉️🕯️ #KartikaMasam #Deepotsavam #SriGaneshaTempleUtah #ShivaDeepam',
    teluguCaption: 'శ్రీ గణేశ దేవాలయంలో 365 ఒత్తుల దీపారాధన మరియు పరమశివునికి రుద్రాభిషేకం.',
    category: 'FESTIVALS',
    timestamp: '2026-11-23T19:30:00Z',
    dateFormatted: 'November 23, 2026',
    likeCount: 390,
    commentsCount: 47,
    location: 'Sri Ganesha Hindu Temple of Utah, South Jordan',
  },

  // 23. UTA VOLUNTEER RECOGNITION (PHOTO)
  {
    id: 'uta_insta_023',
    shortcode: 'C6mO4p2Q1rS',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'UTA Executive Committee & Volunteer Appreciation Night',
    teluguTitle: 'ఉటా కార్యవర్గ & వాలంటీర్ల సన్మాన సభ — నిస్వార్థ సేవకు జోహార్లు',
    caption: '🤝 Recognizing the tireless behind-the-scenes heroes who dedicate hundreds of hours to stage setups, audio engineering, catering logistics, sports ground maintenance, and Telugu Badi instruction. You are the beating heart of UTA! ❤️💐 #UTAVolunteers #CommunityLeadership #SelflessService #TeluguFamily',
    teluguCaption: 'ఉటా కార్యక్రమాల విజయానికి నిరంతరం శ్రమించే వాలంటీర్లకు మరియు నాయకత్వానికి కృతజ్ఞతలు.',
    category: 'YOUTH_COMMUNITY',
    timestamp: '2026-12-12T19:00:00Z',
    dateFormatted: 'December 12, 2026',
    likeCount: 315,
    commentsCount: 40,
    location: 'South Jordan Community Hall, UT',
  },

  // 24. DASARA VIJAYADASHAMI (PHOTO)
  {
    id: 'uta_insta_024',
    shortcode: 'C5pQ1r2S3tU',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1400&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=480&q=80',
    permalink: 'https://www.instagram.com/utahteluguassociation/',
    title: 'Vijayadashami Shami Tree Puja & “Bangaram” Leaf Exchange',
    teluguTitle: 'దసరా మహోత్సవం — జమ్మిచెట్టు పూజ & “బంగారం” పంపకం',
    caption: '🌿 Shami Samayathe Papam! Families gathered for the auspicious Shami tree circumambulation and exchanged Jambi leaves as golden tokens of forgiveness, prosperity, and mutual respect. Subhakankshalu to all! ✨💛 #DasaraUtah #Vijayadashami #ShamiPuja #BangaramPanchadam',
    teluguCaption: 'జమ్మి ఆకులను బంగారంలా భావించి పెద్దల ఆశీస్సులు తీసుకున్న ఉటా తెలుగు ప్రజలు.',
    category: 'FESTIVALS',
    timestamp: '2026-10-10T18:00:00Z',
    dateFormatted: 'October 10, 2026',
    likeCount: 355,
    commentsCount: 39,
    location: 'South Jordan, UT',
  },
];
