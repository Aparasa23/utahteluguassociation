export interface FestivalStep {
  title: string;
  teluguTitle: string;
  description: string;
}

export interface FestivalCulinary {
  dishName: string;
  teluguName: string;
  ingredients: string;
  symbolism: string;
}

export interface FestivalCitation {
  source: string;
  authorOrPeriod: string;
  quoteOrContext: string;
}

export interface FestivalBlog {
  id: string;
  slug: string;
  title: string;
  teluguTitle: string;
  subtitle: string;
  teluguSubtitle: string;
  tithiAndMonth: string;
  season: 'WINTER' | 'SPRING' | 'SUMMER' | 'MONSOON' | 'AUTUMN';
  category: 'FLAGSHIP' | 'FORGOTTEN_RARE' | 'AGRICULTURAL' | 'REGIONAL_JATHARA' | 'COMMUNAL_HARMONY' | 'WOMEN_VRATAM';
  categoryLabel: string;
  isForgottenOrRare: boolean;
  geographicRegion: {
    primary: string;
    specificDistricts: string[];
    description: string;
  };
  historicalEra: string;
  significance: string;
  howCelebratedInOldenDays: {
    overview: string;
    steps: FestivalStep[];
    womenCustoms?: string;
    songsOrBallads?: string;
    traditionalAttire?: string;
  };
  whyForgottenOrEndangered?: {
    reasons: string[];
    modernStatus: string;
  };
  modernCelebration?: string;
  culinaryTraditions: FestivalCulinary[];
  citations: FestivalCitation[];
  coverImageUrl: string;
  readingTimeMinutes: number;
  publishedDate: string;
}

export const FESTIVAL_BLOGS: FestivalBlog[] = [
  // 1. ERUVAKA PUNNAMI (FORGOTTEN AGRICULTURAL FESTIVAL)
  {
    id: 'eruvaka-punnami',
    slug: 'eruvaka-punnami',
    title: 'Eruvaka Punnami: The Forgotten Sacred First Furrow of the Telugu Soil',
    teluguTitle: 'ఏరువాక పున్నమి — ప్రాచీన తెలుగు వ్యవసాయ చైతన్యం',
    subtitle: 'Before tractors and synthetic fertilizers, Telugu villages welcomed the monsoon by garlanding bullocks and performing Vedic Bhumi Puja.',
    teluguSubtitle: 'ఎడ్లకొమ్ములకు రంగులు పూసి, నాగటిసాళ్లకు నమస్కరించి మొదలుపెట్టే తొలి వ్యవసాయ వేడుక',
    tithiAndMonth: 'Jyeshtha Purnima (May / June)',
    season: 'MONSOON',
    category: 'FORGOTTEN_RARE',
    categoryLabel: 'Forgotten & Endangered (మరుగున పడిన పండుగ)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'Coastal Andhra (Krishna, Guntur, Godavari) & Rayalaseema (Anantapur, Kurnool)',
      specificDistricts: ['Krishna', 'Guntur', 'West Godavari', 'Anantapur', 'Kurnool', 'Prakasam'],
      description: 'Historically universal across rural Andhra and Rayalaseema agrarian villages situated along irrigation canals and river basins.',
    },
    historicalEra: 'Satavahana to Kakatiya Periods (3rd c. BCE – 14th c. CE)',
    significance: 'Eruvaka marks the official cosmic commencement of the agricultural season (Kharif ploughing) on the full moon day of Jyeshtha. It is an ecological festival of reverence honoring Mother Earth (Bhudevi), the working bullocks (Govulu/Ettulu), and rural artisans.',
    howCelebratedInOldenDays: {
      overview: 'In olden Telugu villages, Eruvaka Punnami began long before dawn with the rhythmic sound of conches and temple bells. The entire village was swept, and village artisans were honored first.',
      steps: [
        {
          title: 'Ablutions of Working Cattle (ఎడ్ల స్నానాలు & కొమ్ముల అలంకరణ)',
          teluguTitle: 'గోవుల, ఎద్దుల అలంకరణ',
          description: 'Bullocks were taken to village tanks and streams, scrubbed with soap-nut powder (Kunkudukai), and their horns were shaved and painted in radiant vermillion and turmeric. Brass bell anklets (Muvvalu) and colorful woolen cords (Kuchelu) were tied to their horns.',
        },
        {
          title: 'Sanctification of the Wooden Plough (ఏరువాక సాగారో... నాగలి పూజ)',
          teluguTitle: 'నాగలి & మేడి పూజ',
          description: 'The traditional teakwood plough (Nangali) and yoke (Kaadi) were washed with sacred holy water, smeared with sandalwood and kumkuma. Farmers tied mango leaf streamers and dried coconut shells filled with sacred grain to the ploughshare.',
        },
        {
          title: 'The Sacred First Furrow (తొలి దుక్కి & విత్తనాలు చల్లడం)',
          teluguTitle: 'తొలి దుక్కి మహోత్సవం',
          description: 'At the astrologically determined auspicious Muhurtham, farmers walked barefoot behind the decorated pair of bullocks into the eastern side of the field. The farmer ploughed three sacred circular furrows while the village priest chanted the Bhumi Suktam. Navadhanyalu (nine sacred grains) soaked in milk were sprinkled into the furrow.',
        },
        {
          title: 'Community Honor to Village Artisans (ఆయాలు & గ్రామ సేవకులు)',
          teluguTitle: 'గ్రామ సేవకులకు సత్కారం',
          description: 'Farmers carried hot sweet Payasam and seasoned lentils to the village blacksmith, carpenter, and washerman, offering fresh grain measures (Ayaalu) in gratitude for crafting and repairing their agricultural tools.',
        },
      ],
      womenCustoms: 'Women gathered at village wells to draw fresh water, cooked Payasam in brand-new earthen pots anointed with turmeric swastikas, and sang ancient Eruvaka ballads celebrating rainfall and bumper harvest.',
      songsOrBallads: '“ఏరువాక సాగారో రన్నో చిన్నన్నా... బంగారు పంటలే పండాలీ... ఏరువాక సాగారో రన్నో చిన్నన్నా!”',
      traditionalAttire: 'Men wore fresh coarse cotton Pancha (Dhoti) tucked tight at the waist (Kashta kattadam) with red head-cloths (Thalapaaga). Women wore pure Mangalagiri or Venkatagiri handloom cotton sarees with turmeric-tinted feet.',
    },
    whyForgottenOrEndangered: {
      reasons: [
        'Rapid mechanization: Introduction of diesel tractors, power tillers, and harvesters made working bullocks obsolete in many areas.',
        'Urban drift: Youth migrating from farming villages to IT and service sectors in cities.',
        'Loss of community village tank and common grazing pasture ecosystems.',
      ],
      modernStatus: 'Presently observed only in pockets of rural Palnadu, Konaseema interior hamlets, and tribal belts in the Eastern Ghats. Mostly absent from urban Telugu memory.',
    },
    culinaryTraditions: [
      {
        dishName: 'Chaddi Annam with Raw Mango & Gongura',
        teluguName: 'చద్దన్నం, పచ్చి మామిడికాయ & గోంగూర',
        ingredients: 'Overnight fermented cooked rice, country cow curd, cold spring water, raw mango pickle, and Gongura.',
        symbolism: 'Provides electrolyte hydration and probiotic gut stamina for farmers ploughing under the summer sun.',
      },
      {
        dishName: 'Jaggery & Moong Dal Payasam',
        teluguName: 'బెల్లం పాయసం',
        ingredients: 'Freshly harvested country rice, organic golden jaggery, roasted green gram, cardamom, and pure cow ghee.',
        symbolism: 'Offered to Bhudevi and cattle as a symbol of life sweetness and fertility.',
      },
    ],
    citations: [
      {
        source: 'Haravilasa (హరవిలాసము)',
        authorOrPeriod: 'Kavi Sarvabhowma Srinatha (14th Century CE)',
        quoteOrContext: 'Describes the jubilant agricultural festivities of Eruvaka in the fertile delta of the Godavari river, noting the decoration of bullocks with natural mineral pigments.',
      },
      {
        source: 'Panditaradhya Charitra (పండితారాధ్య చరిత్రము)',
        authorOrPeriod: 'Palkuriki Somanatha (13th Century CE)',
        quoteOrContext: 'Records folk rituals, songs, and bullock dances enacted on Jyeshtha Purnima across Telugu Saivite peasant settlements.',
      },
      {
        source: 'Madras District Gazetteers: Godavari & Kistna',
        authorOrPeriod: 'W. Francis, ICS (1907)',
        quoteOrContext: '“On the day of Eruvaka, the ryots wash their cattle, paint their horns with bright colours, and drive them in a joyous procession to the open fields where the first ceremonial furrow is drawn with solemn vows.”',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-10-18',
  },

  // 2. ATLA TADDE (ENDANGERED TRADITION FOR MATRIMONIAL HARMONY)
  {
    id: 'atla-tadde',
    slug: 'atla-tadde',
    title: 'Atla Tadde: The Ancient Pre-Dawn Feast, Banyan Swings & 11 Sacred Dosas',
    teluguTitle: 'అట్ల తద్దె — తెల్లవారుజామున చద్దన్నం, గోరింటాకు & ఉయ్యాల వేడుక',
    subtitle: 'Celebrated exclusively by Telugu girls and women, featuring 4:00 AM fermented rice feasts, swinging on banyan branches, and 11 dosas offered to Gauri.',
    teluguSubtitle: 'కన్యలు, ముత్తైదువులు సంపూర్ణ ఆరోగ్యానికి, దాంపత్య సౌభాగ్యానికి జరుపుకునే ప్రాచీన పర్వదినం',
    tithiAndMonth: 'Ashwayuja Bahula Tadiya (October / November)',
    season: 'AUTUMN',
    category: 'FORGOTTEN_RARE',
    categoryLabel: 'Forgotten & Endangered (మరుగున పడిన పండుగ)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'Coastal Andhra (East Godavari, West Godavari, Krishna, Guntur)',
      specificDistricts: ['East Godavari', 'West Godavari', 'Konaseema', 'Krishna', 'Guntur'],
      description: 'Once celebrated across all Telugu households; now preserved predominantly by traditional families in the Godavari delta and Krishna canal regions.',
    },
    historicalEra: 'Early Medieval Era (Recorded in Bhavishyottara Purana & Telugu Prabandhas)',
    significance: 'Atla Tadde is the Telugu counterpart of Karwa Chauth, but focused on health, physical vitality, gynecological well-being, and marital joy. The ritual consumption of cold fermented rice before sunrise followed by swinging stimulates reproductive vitality and neuromuscular balance.',
    howCelebratedInOldenDays: {
      overview: 'Women and young maidens woke at 3:30 AM before the morning star rose. They feasted on nutritious fermented rice with Gongura pachadi before observing an austere nirjala fast throughout the daylight hours.',
      steps: [
        {
          title: 'Pre-Dawn Udayam Chaddannam (తెల్లవారుజాము చద్దన్నం ఆరగించడం)',
          teluguTitle: 'చద్దన్నం భోజనం',
          description: 'Before dawn broke, girls gathered in courtyard verandas in warm lamplight to consume cold rice soaked overnight in curd and water with green chilies and tangy Gongura chutney. Once the morning sky showed the first golden streak, no further food or water was touched.',
        },
        {
          title: 'Intricate Gorintaku Patterns (చేతులకు గోరింటాకు అలంకరణ)',
          teluguTitle: 'గోరింటాకు సంబరం',
          description: 'Hands and feet were adorned with hand-ground henna paste blended with betel leaves and katuka (lamp black). The deeper the red tint, the deeper the affection of the spouse according to folk belief.',
        },
        {
          title: 'Swinging on Grand Banyan Ropes (మర్రిచెట్ల ఉయ్యాలలూగడం)',
          teluguTitle: 'తోటల్లో ఉయ్యాలలు',
          description: 'In the afternoon, girls visited mango orchards and village banyan groves where heavy coir ropes and wooden planks were tied to high branches. They swung high into the autumn air while singing folk ballads praising Goddess Gauri.',
        },
        {
          title: 'Bhavani Vratam & Offering of 11 Atlu (11 అట్ల వాయనం సమర్పణ)',
          teluguTitle: 'అట్ల వాయనం',
          description: 'In the evening, after sighting the waxing moon or stars, 11 thick black-gram dosas (Atlu) cooked in pure sesame oil were prepared. Ten were distributed to elderly married women (Mutthaiduvulu) along with betel nuts and turmeric, while the eleventh was consumed to break the fast.',
        },
      ],
      womenCustoms: 'Women prayed for their husbands’ longevity and health, while unmarried maidens prayed for benevolent and noble life partners.',
      songsOrBallads: '“అట్లతద్దోయ్ ఆరట్లోయ్... ముద్దపప్పోయ్ మూడట్లోయ్... కొమ్మలమీద కోకిలమ్మ కూత వింటే కోరినవరుడొస్తాడోయ్!”',
      traditionalAttire: 'Young girls wore traditional Langa-Voni (half-sarees) woven from bright yellow and magenta Gadwal cotton; married women wore vibrant red and yellow silk sarees.',
    },
    whyForgottenOrEndangered: {
      reasons: [
        'Shift to modern urban nuclear apartments without courtyards, trees, or swings.',
        'Influence of Bollywood/Hindi media prioritizing Karwa Chauth over native Telugu Atla Tadde.',
        'Fast-paced corporate and school schedules making 4:00 AM family assemblies difficult.',
      ],
      modernStatus: 'Rare in modern Hyderabad, Vizag, and diaspora communities; selectively maintained by elders in Konaseema, Tenali, and Machilipatnam.',
    },
    culinaryTraditions: [
      {
        dishName: 'Authentic Crispy Minapa Atlu',
        teluguName: 'నువ్వుల నూనె మినప అట్లు',
        ingredients: 'Whole black gram (Minappappu) fermented for 12 hours, coarsely ground rice rava, cumin seeds, and cold-pressed sesame oil.',
        symbolism: 'Black gram is rich in calcium, iron, and phytoestrogens that strengthen female pelvic bone density and reproductive organs.',
      },
      {
        dishName: 'Gongura Pachi Mirapa Pachadi',
        teluguName: 'పచ్చి మిరపకాయల గోంగూర పచ్చడి',
        ingredients: 'Sorrel leaves (Gongura), roasted green chilies, garlic cloves, coriander seeds, and sesame oil.',
        symbolism: 'Iron-rich antioxidant chutney providing morning vitality.',
      },
    ],
    citations: [
      {
        source: 'Bhavishyottara Purana (భవిష్యోత్తర పురాణము)',
        authorOrPeriod: 'Veda Vyasa (Ancient Sanskrit text translated into Telugu)',
        quoteOrContext: 'Describes the Gauri Vrata undertaken by Goddess Parvati to obtain Lord Shiva as her consort on the third day of the dark fortnight of Ashvina.',
      },
      {
        source: 'Dictionary of Telugu Proverbs & Idioms',
        authorOrPeriod: 'Charles Philip (C.P.) Brown (1852)',
        quoteOrContext: 'Annotates the cultural idiom “Atla Tadde naadu atlu pettakapothe ammavaru aagrahamu chesenu”, recording the communal distribution of 11 pancakes across Madras Presidency Telugu districts.',
      },
      {
        source: 'Andhrula Sanghika Charitra',
        authorOrPeriod: 'Suravaram Pratapareddy (1949)',
        quoteOrContext: 'Documents the pre-dawn feast of fermented rice and village swing assemblies as integral components of 16th-century Vijayanagara domestic life.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-15',
  },

  // 3. POLI SWARGAM (FORGOTTEN RIVER-RAFT LAMP RITUAL)
  {
    id: 'poli-swargam',
    slug: 'poli-swargam',
    title: 'Poli Swargam: The Forgotten Pre-Dawn Banana-Stem River Flotilla of Kartika Amavasya',
    teluguTitle: 'పోలి స్వర్గం — కార్తీక అమావాస్య తెల్లవారుజామున అరటిదొప్ప దీపాల వేడుక',
    subtitle: 'The heartbreaking and triumphant tale of Poli, a mistreated daughter-in-law who floated wicks secretly to attain Vaikuntha.',
    teluguSubtitle: 'అరటిదొప్పలో 31 ఒత్తుల దీపాలు వెలిగించి నదుల్లో, కాలువల్లో సాగనంపే అద్భుత ఆధ్యాత్మిక ఘట్టం',
    tithiAndMonth: 'Kartika Bahula Amavasya (November / December)',
    season: 'AUTUMN',
    category: 'FORGOTTEN_RARE',
    categoryLabel: 'Forgotten & Endangered (మరుగున పడిన పండుగ)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'Godavari & Krishna River Basins (Rajahmundry, Vijayawada, Narsapur, Kotipalli)',
      specificDistricts: ['East Godavari', 'West Godavari', 'Dr. B.R. Ambedkar Konaseema', 'Krishna', 'Bapatla'],
      description: 'Historically observed along every river ghat, canal head, and temple pushkarini in the Andhra coastline.',
    },
    historicalEra: 'Skanda Purana Era & Medieval Andhra Folk Tradition',
    significance: 'Poli Swargam is the poetic finale to the month-long sacred Kartika Masam. It commemorates Poli, a humble daughter-in-law denied ghee and wicks by her oppressive mother-in-law, who fashioned lamps from cotton threads extracted from hemp stalks and floated them on water before dawn.',
    howCelebratedInOldenDays: {
      overview: 'Families woke up at 3:00 AM on the final dark moon night of Kartika. By 4:30 AM, river ghats at Rajahmundry, Draksharamam, and Kotipalli sparkled with thousands of tiny flickering flames sailing on the dark waters.',
      steps: [
        {
          title: 'Harvesting the Banana Stem Float (అరటిదొప్ప సేకరణ & దీపాల అమరిక)',
          teluguTitle: 'అరటిదొప్ప తెప్ప తయారీ',
          description: 'A fresh, sturdy section of plantain tree trunk (Arati Doppa) was cut into a boat-like shape. In the center, thirty-one hand-spun cotton wicks (symbolizing the 30 days of Kartika plus one extra for atonement) were soaked in pure cow ghee or cold-pressed sesame oil.',
        },
        {
          title: 'The Silent Pre-Dawn River Walk (చీకట్లో ఘాట్ల వైపు ప్రయాణం)',
          teluguTitle: 'నదీ తీరానికి యాత్ర',
          description: 'Devotees walked silently through chilled misty morning streets carrying their lighted floats in brass trays covered with yellow cloth, chanting the divine names of Hari and Hara.',
        },
        {
          title: 'The Sacred Flotilla Launch (పోలీ... స్వర్గానికి పోవే తల్లీ!)',
          teluguTitle: 'దీప విసర్జన & సాగనంపడం',
          description: 'Kneeling at the water’s edge, women whispered their prayers into the flame, placed a sprig of sacred tulasi and a yellow flower on the raft, and gently nudged it into the river current while calling out: “Poli Poli Vaikunthaniki Po!”',
        },
        {
          title: 'Listening to the Poli Katha (పోలి కథా శ్రవణం)',
          teluguTitle: 'పోలి వ్రత కథ',
          description: 'Sitting on the granite steps of the river ghat as dawn broke, families gathered around the elder matriarch who narrated the sacred story of Poli’s unwavering devotion and divine celestial chariot.',
        },
      ],
      womenCustoms: 'Daughters-in-law were blessed by mothers-in-law with gifts of new cotton sarees and silver toe rings to expiate any domestic misunderstandings of the past year.',
      songsOrBallads: '“పోలీ పోలీ స్వర్గానికి పోవే... పుణ్యాల రాశివై వైకుంఠం చేరుకోవే... మా ఇంట ఆయురారోగ్యాలు నింపవే!”',
      traditionalAttire: 'Wet holy clothes after river immersion, followed by dry yellow and orange cotton sarees.',
    },
    whyForgottenOrEndangered: {
      reasons: [
        'Urbanization away from natural rivers, canals, and village step-wells.',
        'Municipal water pollution restrictions preventing open floating of materials in water bodies.',
        'Loss of oral narrative storytelling among young nuclear families.',
      ],
      modernStatus: 'Still enacted by traditional devotees along the Godavari River Ghats in Rajahmundry and Kotipalli, but vanishing in Hyderabad, Bangalore, and overseas Telugu communities.',
    },
    culinaryTraditions: [
      {
        dishName: 'Chalividi & Vadapappu with Fresh Coconut',
        teluguName: 'చలిమిడి & నానబెట్టిన వడపప్పు',
        ingredients: 'Raw rice flour ground fresh, organic crushed jaggery, grated tender coconut, and cardamom seeds, paired with split yellow moong dal soaked in water.',
        symbolism: 'Cold unheated foods to cool the digestive system after month-long fasting and early river baths.',
      },
    ],
    citations: [
      {
        source: 'Kartika Purana Mahatmyam (కార్తీక పురాణము)',
        authorOrPeriod: 'Skanda Purana Translation (15th Century Telugu Recension)',
        quoteOrContext: 'Verses in the 30th Chapter explain the unmatched virtue of lighting 31 wicks on Kartika Amavasya, promising liberation from ancestral debts.',
      },
      {
        source: 'The Godavari District Manual',
        authorOrPeriod: 'Henry Morris, Madras Civil Service (1878)',
        quoteOrContext: '“At the close of the month of Kartika, thousands of women assemble before sunrise upon the banks of the Godavery at Rajahmundry to float small lighted lamps in the river in honour of Poli.”',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-10-12',
  },

  // 4. KOTAPPAKONDA PRABHALU (SPECTACULAR PALNADU TRADITION)
  {
    id: 'kotappakonda-prabhalu',
    slug: 'kotappakonda-prabhalu',
    title: 'Kotappakonda Prabhalu: The 100-Foot Illuminated Bamboo Chariots of Palnadu',
    teluguTitle: 'కోటప్పకొండ ప్రభల తిరునాళ్లు — పల్నాటి వీర వైభవం & 100 అడుగుల విద్యుత్ ప్రభలు',
    subtitle: 'On Maha Shivaratri, villages in Guntur and Palnadu compete to carry mammoth 100-foot decorated bamboo towers on bullock carts to the sacred hill of Trikuta.',
    teluguSubtitle: 'ఎడ్లబండ్లపై ఆకాశాన్నంటే వెదురు ప్రభలు... తప్పెటగుళ్ల మోతలు... పల్నాటి ప్రాచీన శివ తాండవం',
    tithiAndMonth: 'Magha Bahula Chaturdashi (February / March)',
    season: 'WINTER',
    category: 'REGIONAL_JATHARA',
    categoryLabel: 'Regional Monumental Rites (ప్రాంతీయ మహోత్సవం)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Palnadu & Guntur Districts (Narasaraopet, Chilakaluripet, Vinukonda, Gurazala)',
      specificDistricts: ['Palnadu', 'Guntur', 'Bapatla', 'Prakasam'],
      description: 'Exclusive to the Palnadu plateau surrounding the sacred Trikutaparvatham (Kotappakonda hill). Not practiced in North Andhra or Telangana.',
    },
    historicalEra: '12th Century CE (Kakatiya & Palnadu Chola Era)',
    significance: 'Kotappakonda Prabhalu is an awe-inspiring architectural and acoustic spectacle of Saivite devotion. Villages build mammoth spire-like structures out of thousands of bamboo poles, decorate them with colored fabrics, grass, and electric illuminations, and haul them up the rugged hill terrain.',
    howCelebratedInOldenDays: {
      overview: 'Months before Shivaratri, master carpenters and youth in villages like Kavuru, Kammavaripalem, and Purushothapatnam began cutting straight bamboo shafts. Entire villages contributed grain, bullocks, and labor.',
      steps: [
        {
          title: 'Erection of the Bamboo Prabha (వెదురు ప్రభల నిర్మాణం)',
          teluguTitle: 'వెదురు ప్రభల అమరిక',
          description: 'Villagers tied interlocking bamboo stalks using strong hemp cords, reaching heights of 60 to 100 feet. The structure was wrapped in crimson and ochre handloom fabric, with portraits of Lord Trikoteswara Swamy and Dakshinamurthy.',
        },
        {
          title: 'The Majestic Bullock Procession (మేలుజాతి ఒంగోలు గిత్తల రథయాత్ర)',
          teluguTitle: 'ఒంగోలు గిత్తల ఊరేగింపు',
          description: 'Six to eight pairs of champion Ongole breed white bullocks with curved horns decorated in brass caps and silk bells were yoked to an iron axle cart bearing the monumental structure.',
        },
        {
          title: 'The Frenzied Hill Climb (కొండ దారుల్లో సాహసోపేత ప్రయాణం)',
          teluguTitle: 'కొండపైకి ప్రయాణం',
          description: 'Hundreds of village men held stabilizing guy ropes on all four sides as the heavy tower moved along winding unpaved dirt trails. Any tipping of the Prabha was deemed a grave ill-omen, demanding supreme physical coordination and courage.',
        },
        {
          title: 'Dappu & Urumulu Rhythm Battle (తప్పెటగుళ్లు, ఉరుములు & కోలాటం)',
          teluguTitle: 'జానపద వాయిద్యాల హోరు',
          description: 'As twilight fell, traditional percussionists played thunderous rhythms on flat drums (Dappu) and brass horns (Kommu), accompanied by folk dancers performing the martial stick dance (Kolatam).',
        },
      ],
      songsOrBallads: '“కోటప్ప కొండలో వెలసిన స్వామి... త్రికోటేశ్వరునికి దండాలయ్యో! పల్నాటి గడ్డపై ప్రభల జాతర... కన్నులారా చూడరయ్యో!”',
      traditionalAttire: 'White dhotis, red silk head turbans, and sacred Vibhuti smeared across foreheads.',
    },
    culinaryTraditions: [
      {
        dishName: 'Jaggery Pongal & Sesame Laddu',
        teluguName: 'బెల్లం పొంగలి & నువ్వుల ఉండలు',
        ingredients: 'Broken raw rice, country jaggery, cardamom, sesame seeds, and ghee.',
        symbolism: 'Sustained energy and heat for pilgrims climbing the steep hill.',
      },
    ],
    citations: [
      {
        source: 'Palnadu Veerula Charitra (పల్నాటి వీర చరిత్ర)',
        authorOrPeriod: 'Kavi Sarvabhowma Srinatha (15th Century CE)',
        quoteOrContext: 'Mentions the heroic warrior Brahma Naidu and general Balachandrudu offering obeisance to Kotappakonda Trikoteswara before departing for the battle of Karempudi.',
      },
      {
        source: 'Mackenzie Manuscripts (మ్యాకెంజీ రికార్డులు)',
        authorOrPeriod: 'Colin Mackenzie, Surveyor General of India (1810)',
        quoteOrContext: 'Documents the height, construction methods, and inter-village rivalries surrounding the massive bamboo structures brought to Kotappakonda on the night of Shivaratri.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-10-08',
  },

  // 5. PEDDULA PANDUGA (SACRED ANCESTRAL ROOFTOP FEAST)
  {
    id: 'peddula-panduga',
    slug: 'peddula-panduga',
    title: 'Peddula Panduga: The Ancient Rooftop Ancestral Feast of Telangana and Rayalaseema',
    teluguTitle: 'పెద్దుల పండుగ (పితృ అమావాస్య) — మిద్దెలపై పితృదేవతల విందు & స్మరణ',
    subtitle: 'Before Bathukamma begins, Telugu families cook their ancestors’ favorite seasonal dishes, lay them on terrace parapets, and await the sacred raven’s blessing.',
    teluguSubtitle: 'తాతముత్తాతల పేరిట నూతన వస్త్రాలు పెట్టి, పూర్వీకులను తలచుకునే ఉద్వేగభరిత పవిత్ర సంప్రదాయం',
    tithiAndMonth: 'Bhadrapada Bahula Amavasya / Mahalaya Amavasya (September / October)',
    season: 'AUTUMN',
    category: 'FORGOTTEN_RARE',
    categoryLabel: 'Forgotten & Endangered (మరుగున పడిన పండుగ)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'Telangana (Warangal, Karimnagar, Nalgonda) & Rayalaseema (Kurnool, Kadapa)',
      specificDistricts: ['Warangal', 'Karimnagar', 'Nalgonda', 'Khammam', 'Kurnool', 'YSR Kadapa'],
      description: 'Widely observed throughout rural Telangana and the Rayalaseema hinterlands; rarely practiced in its full ancient form in modern multi-story city apartments.',
    },
    historicalEra: 'Vedic to Kakatiya Periods',
    significance: 'Peddula Panduga (literally "The Festival of the Elders") is the deeply emotional culmination of Pitru Paksha. It honours departed forebears not through distant rituals, but by treating them as living honored guests, serving their favorite foods on fresh plantain leaves upon the house terrace.',
    howCelebratedInOldenDays: {
      overview: 'The entire household underwent sacred purification. Old earthen pots were replaced, house walls whitewashed with lime, and the eldest son fasted until the ancestors were fed.',
      steps: [
        {
          title: 'Sanctifying the Terrace Shrine (మిద్దెపై పీఠం అమరిక)',
          teluguTitle: 'మిద్దెపై వేదిక',
          description: 'A raised platform on the flat mud-terrace (Midde) was smeared with cow dung and adorned with white rice flour muggulu. Five, seven, or nine fresh banana leaves were laid facing south toward Yamaloka.',
        },
        {
          title: 'Serving the Ancestors’ Favorite Banquet (పెద్దలకు ఇష్టమైన వంటకాల సమర్పణ)',
          teluguTitle: 'పితృ భోజనం',
          description: 'Every dish that the departed grandfathers and grandmothers loved in life—country chicken or mutton curry, Ariselu, Garelu, sweet puran polis, fresh country liquor or buttermilk—was lovingly served in generous heaps.',
        },
        {
          title: 'The Offering of New Clothes (పెద్దల బట్టల పూజ)',
          teluguTitle: 'నూతన వస్త్ర సమర్పణ',
          description: 'Fresh cotton dhotis, towels, and handloom cotton sarees were placed beside the leaves, anointed with sandalwood paste and scented flowers.',
        },
        {
          title: 'Awaiting the Sacred Messenger (కాకుల కోసం ఎదురుచూడటం)',
          teluguTitle: 'కాకుల రాక & ఆశీర్వాదం',
          description: 'The entire family stood silently in prayer while clapping hands and calling “Kaa... Kaa...”. When a black raven (regarded as the direct envoy of Yama and ancestors) descended and partook of the food, tears of gratitude flowed, signaling that the elders accepted the offering.',
        },
      ],
      songsOrBallads: '“తాతా ఓ ముత్తాతా... మీరిచ్చిన భూమిలో పండిన పంటను మీకే అర్పిస్తున్నాం! మా పిల్లపాపలను చల్లగా కాపాడండయ్యా!”',
      traditionalAttire: 'Traditional white unstitched dhoti with Angavastram for men; handloom cotton sarees without synthetic fibers for women.',
    },
    whyForgottenOrEndangered: {
      reasons: [
        'Urban high-rise apartment living with inaccessible flat terraces and absence of open bird habitats.',
        'Skepticism among younger educated generations toward ancestral ritual feasts.',
        'Commercialization of death and ancestral rites into short temple rituals.',
      ],
      modernStatus: 'Maintained faithfully in rural villages of Northern Telangana and Rayalaseema; largely reduced to symbolic dakshina in urban Hyderabad and diaspora.',
    },
    culinaryTraditions: [
      {
        dishName: 'Telangana Naatu Kodi Curry with Garelu',
        teluguName: 'నాటుకోడి కూర & మినప గారెలు',
        ingredients: 'Free-range country chicken cooked in cold-pressed sesame oil with roasted coriander, black pepper, and garlic, paired with crispy fermented black-gram fritters.',
        symbolism: 'Ancestral preference for robust, protein-rich farming nourishment.',
      },
      {
        dishName: 'Jaggery Polelu / Bobbatlu',
        teluguName: 'బెల్లం బొబ్బట్లు',
        ingredients: 'Chana dal, golden jaggery, wheat flour, and pure cow ghee.',
        symbolism: 'Honoring sweet memories of departed ancestors.',
      },
    ],
    citations: [
      {
        source: 'Rigvedic Pitru Suktam (ఋగ్వేద పితృ సూక్తము)',
        authorOrPeriod: 'Ancient Vedic Canon (Book X, Hymn 15)',
        quoteOrContext: 'Invocations entreating the noble ancestors (Pitara) who dwell in celestial spheres to partake of the offerings and bestow bountiful progeny and health.',
      },
      {
        source: 'Castes and Tribes of Southern India',
        authorOrPeriod: 'Edgar Thurston (1909, Vol. III)',
        quoteOrContext: 'Documents the specific Telugu domestic rite of laying out whole roasted grams, country spirits, and plantain leaf feasts on house roofs during Mahalaya Amavasya.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-04',
  },

  // 6. SIRIMANOTSAVAM (THE AERIAL TREE TRUNK PRIEST OF VIZIANAGARAM)
  {
    id: 'sirimanotsavam',
    slug: 'sirimanotsavam',
    title: 'Sirimanotsavam: The 60-Foot Rotating Sacred Tree Priest of Vizianagaram',
    teluguTitle: 'సిరిమానోత్సవం — విజయనగర పైడితల్లి అమ్మవారి ఆకాశ రథయాత్ర',
    subtitle: 'A thrilling Northern Andhra folk spectacle where the temple priest is harnessed to the tip of a 60-foot neem tree pole mounted on a bullock chariot.',
    teluguSubtitle: '60 అడుగుల సిరిమానుపై ప్రధాన పూజారి ఆశీర్వాదం... ఉత్తరాంధ్రుల అత్యంత విశిష్ట జాతర',
    tithiAndMonth: 'Ashwayuja Sukla Dashami (Tuesday following Vijayadashami)',
    season: 'AUTUMN',
    category: 'REGIONAL_JATHARA',
    categoryLabel: 'Regional Monumental Rites (ప్రాంతీయ మహోత్సవం)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'North Coastal Andhra (Uttarandhra — Vizianagaram, Srikakulam, Visakhapatnam)',
      specificDistricts: ['Vizianagaram', 'Srikakulam', 'Visakhapatnam', 'Parvathipuram Manyam'],
      description: 'Centered exclusively at the Sri Pydithalli Ammavari Temple in the historic fort town of Vizianagaram. Entirely unique to this royal North Andhra region.',
    },
    historicalEra: '1757 CE (Post-Battle of Bobbili Era)',
    significance: 'Sirimanotsavam honors Goddess Pydithalli, sister of King Pasupati Vijayarama Gajapathi Raju of Vizianagaram. Following the tragic Battle of Bobbili, she merged into the sacred Pedda Cheruvu lake. The festival celebrates her divine manifestation through an aerial neem tree trunk called Sirimanu.',
    howCelebratedInOldenDays: {
      overview: 'The goddess reveals the exact location of the sacred neem tree in a dream to the head priest. The tree is reverently felled with golden-handled axes and prepared by royal carpenters.',
      steps: [
        {
          title: 'The Dream Search for the Sacred Neem Trunk (సిరిమాను అన్వేషణ)',
          teluguTitle: 'సిరిమాను వృక్ష దర్శనం',
          description: 'Weeks prior, the chief priest receives a divine revelation indicating a specific neem tree in surrounding rural villages. The tree owner happily gifts it to the goddess without accepting a single rupee.',
        },
        {
          title: 'Rigging the 60-Foot Aerial Lever (సిరిమాను రథం సిద్ధం చేయడం)',
          teluguTitle: 'సిరిమాను రథ అమరిక',
          description: 'The trunk is shaved smooth and mounted on a massive wooden cart using a pivot mechanism resembling a colossal seesaw. A wicker chair adorned with silk pillows is bolted to the very tip.',
        },
        {
          title: 'The Aerial Procession Around the Royal Fort (కోట చుట్టూ ఆకాశ యాత్ర)',
          teluguTitle: 'కోట బురుజుల చుట్టూ ప్రదక్షిణ',
          description: 'Dressed in a yellow silk saree, holding sacred peacock feathers and an umbrella, the priest is strapped into the chair 60 feet above the ground. The cart makes three ceremonial rounds between the temple and the Vizianagaram palace.',
        },
        {
          title: 'Showering of Blessed Plantains & Jaggery (పూజారి ఆశీస్సులు & అరటిపండ్ల వర్షం)',
          teluguTitle: 'ప్రజలపై ప్రసాదాల వర్షం',
          description: 'As the massive beam swings through the sky, the priest throws yellow cloth bundles, sanctified bananas, and jaggery into the surging crowd. Catching a fallen fruit is believed to cure disease and bestow pregnancy.',
        },
      ],
      songsOrBallads: '“పైడితల్లి అమ్మా... మా ఇలవేల్పువమ్మా! కోట బురుజులపైనుండి చల్లని చూపులు చూడవమ్మా!”',
      traditionalAttire: 'Chief priest wears a yellow saree anointed with turmeric; Vizianagaram royal family members appear in traditional sherwanis and Gajapathi turbans.',
    },
    culinaryTraditions: [
      {
        dishName: 'Chilimidi & Bellam Chalimidi',
        teluguName: 'బియ్యపుపిండి చలిమిడి & పానకం',
        ingredients: 'Raw rice flour kneaded with pure sugarcane syrup, black pepper, and cardamom.',
        symbolism: 'Offered to cool down the fiery protective energy of the warrior goddess.',
      },
    ],
    citations: [
      {
        source: 'Vizagapatam District Gazetteer',
        authorOrPeriod: 'W. Francis, ICS (1907)',
        quoteOrContext: '“At Vizianagram is celebrated the festival of Sirimanu, in which the priest of Pydithalli is hoisted into the air at the end of a long pole fixed upon a cart and drawn three times around the Raja’s palace.”',
      },
      {
        source: 'Archaeological Survey of India Cultural Reports (Andhra Circle)',
        authorOrPeriod: 'Superintending Archaeologist Archives (1962)',
        quoteOrContext: 'Documents the oral history of the Pasupati royal family following the 1757 conflict at Bobbili and the establishment of the annual Pydithalli temple aerial rites.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-09-30',
  },

  // 7. JWALA THORANAM (THE BLAZING PORTAL OF SHIVA TEMPLES)
  {
    id: 'jwala-thoranam',
    slug: 'jwala-thoranam',
    title: 'Jwala Thoranam: The Blazing Straw Archway of Kartika Purnima',
    teluguTitle: 'జ్వాలాతోరణం — కార్తీక పౌర్ణమి వేళ పరమశివుని ఆలయాల్లో అగ్ని తోరణ మహోత్సవం',
    subtitle: 'Passing palanquins of Shiva and Parvati beneath an arch of crackling paddy straw fire to ward off ecological and physical afflictions.',
    teluguSubtitle: 'ఎండుగడ్డితో చేసిన తోరణాన్ని వెలిగించి, దాని కిందనుండి స్వామివారిని దాటించే పురాతన రక్షణ క్రతువు',
    tithiAndMonth: 'Kartika Sukla Purnima (November)',
    season: 'AUTUMN',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Temple Rite (మహోత్సవం)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'Telangana (Vemulawada, Kaleshwaram) & Andhra Pradesh (Srisailam, Draksharamam, Mahanandi)',
      specificDistricts: ['Karimnagar', 'Jayashankar Bhupalpally', 'Nandyal', 'Konaseema', 'Guntur'],
      description: 'Practiced exclusively in ancient Shiva temples across Andhra and Telangana on the evening of Kartika Purnima.',
    },
    historicalEra: 'Kakatiya & Chalukya Periods (11th – 14th Centuries CE)',
    significance: 'Jwala Thoranam represents the triumph of Lord Shiva as Tripurantaka over the three demon cities of bronze, silver, and gold. The blazing portal is believed to incinerate karmic impurities and eradicate seasonal airborne pests and insects following the monsoon.',
    howCelebratedInOldenDays: {
      overview: 'In olden temple courtyards, two massive upright wooden poles were planted outside the Rajagopuram, connected by a thick rope woven from newly harvested paddy straw (Varigaddi) and hemp.',
      steps: [
        {
          title: 'Weaving the Sacred Straw Festoon (వరిగడ్డి తోరణం అల్లడం)',
          teluguTitle: 'తోరణం తయారీ',
          description: 'Villagers braided golden sun-dried paddy straw tightly around a core of dried grass and medicinal herbs, stringing it ten feet above the temple flagpost (Dhwajasthambham).',
        },
        {
          title: 'Ignition of the Blazing Arch (అగ్ని ప్రతిష్ఠ & జ్వాల ప్రజ్వలన)',
          teluguTitle: 'అగ్ని వెలిగించడం',
          description: 'As the full moon crested the horizon, sacred camphor and ghee were poured upon the rope, igniting a dramatic cascade of amber flame crackling across the night sky.',
        },
        {
          title: 'The Swift Chariot Dash (జ్వాల కిందనుండి స్వామివారి పల్లకీ సేవ)',
          teluguTitle: 'పల్లకీ ప్రదక్షిణ',
          description: 'Temple priests and bearers lifted the silver palanquin bearing the Utsava deities of Lord Shiva and Parvati, running swiftly beneath the blazing straw arch three times amid deafening shouts of “Hara Hara Mahadeva!”.',
        },
        {
          title: 'Gathering the Miraculous Ash (పవిత్ర రక్షా భస్మం సేకరణ)',
          teluguTitle: 'రక్షా భస్మం ధారణ',
          description: 'Once the straw burned down, devotees scrambled to collect the falling embers and warm ash. Smeared upon the forehead, the ash was believed to ward off evil eyes, night terrors in children, and chronic respiratory illnesses.',
        },
      ],
      songsOrBallads: '“హర హర మహాదేవ శంభో శంకర... త్రిపురాంతకా జ్వాలా తోరణ రక్షకా!”',
      traditionalAttire: 'Rudraksha beads, pure white cotton dhotis, and wet sacred silk angavastrams.',
    },
    whyForgottenOrEndangered: {
      reasons: [
        'Fire safety regulations prohibiting open straw bonfires near crowded concrete temple complexes.',
        'Shortage of natural hand-threshed paddy straw due to mechanical combine harvesters chopping straw into fine mulch.',
        'Loss of hereditary temple service roles (Kaaryakarta) dedicated to crafting the straw ropes.',
      ],
      modernStatus: 'Maintained at major pilgrim shrines like Srisailam, Vemulawada, and Kotappakonda, but vanished from 90% of neighborhood village Shiva temples.',
    },
    culinaryTraditions: [
      {
        dishName: 'Chaddannam & Amla (Usirikaya) Pachadi',
        teluguName: 'ఉసిరికాయ పచ్చడి & వనభోజనం ప్రసాదం',
        ingredients: 'Fresh Indian gooseberries (Amla), roasted sesame, green chilies, mustard seeds, and warm rice.',
        symbolism: 'Rich in Vitamin C, strengthening immunity against winter colds and respiratory ailments.',
      },
    ],
    citations: [
      {
        source: 'Hemadri Chaturvarga Chintamani (హేమాద్రి చతుర్వర్గ చింతామణి)',
        authorOrPeriod: 'Hemadri Pandit (13th Century CE Vedic Scholar)',
        quoteOrContext: 'Details the ritual prescription for Jwala Thorana Nirman, specifying the dimensions of the wooden posts and the purification attained by walking beneath the straw fire.',
      },
      {
        source: 'Srisaila Devasthanam Temple Epigraphs',
        authorOrPeriod: 'Vijayanagara Imperial Inscriptions (1485 CE)',
        quoteOrContext: 'Records endowments made by King Saluva Narasimha Deva Raya for providing clarified butter and paddy straw for the annual Jwala Thorana Deepotsavam.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 6,
    publishedDate: '2026-09-24',
  },

  // 8. PEERLA PANDUGA (RAYALASEEMA & TELANGANA COMMUNAL HARMONY)
  {
    id: 'peerla-panduga',
    slug: 'peerla-panduga',
    title: 'Peerla Panduga: The Ancient Muharram Fire-Walking and Communal Brotherhood of Rayalaseema & Telangana',
    teluguTitle: 'పీర్ల పండుగ — హిందూ-ముస్లింల ఐక్యతా వేదిక & నిప్పుల గుండం తొక్కడం',
    subtitle: 'Where Hindu villagers carry sacred metal standards (Alams/Peers), chant Telugu mourning ballads, and run barefoot through roaring fire trenches (Alawa).',
    teluguSubtitle: 'మతసామరస్యానికి ప్రతీకగా రాయలసీమ, తెలంగాణ పల్లెల్లో శతాబ్దాలుగా వర్ధిల్లుతున్న విశిష్ట పర్వం',
    tithiAndMonth: 'Month of Muharram (Varies on Islamic Hijri Calendar)',
    season: 'MONSOON',
    category: 'COMMUNAL_HARMONY',
    categoryLabel: 'Communal Harmony & Folk Heritage (మత సామరస్య పర్వం)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'Rayalaseema (Kurnool, Anantapur, Kadapa) & Southern Telangana (Mahbubnagar, Nalgonda)',
      specificDistricts: ['Kurnool', 'Anantapur', 'Nandyal', 'YSR Kadapa', 'Mahbubnagar', 'Wanaparthy'],
      description: 'Centuries old rural tradition celebrated jointly by Telugu Hindu farmers and Muslim community members in Rayalaseema and Telangana villages.',
    },
    historicalEra: 'Qutb Shahi & Bahmani Sultanate Eras (16th – 18th Centuries CE)',
    significance: 'Peerla Panduga demonstrates the profound syncretic culture of the Deccan. Commemorating the martyrdom of Imam Hussain at Karbala, Hindu families adopt the sacred metal standards (called "Peers") as ancestral protectors of village borders, fulfilling vows for rain and childbirth.',
    howCelebratedInOldenDays: {
      overview: 'Ten days before the event, an earthen pit (Alawa) was dug in the village center. Hindu and Muslim villagers brought cartloads of tamarind wood logs to feed the glowing embers.',
      steps: [
        {
          title: 'Cleaning the Peerla Chavadi (పీర్ల చావిడి అలంకరణ)',
          teluguTitle: 'పీర్ల చావిడి శుద్ధి',
          description: 'The ancient village hall (Chavadi) was whitewashed. The sacred copper and brass battle standards (representing Hazrat Abbas and Imam Hussain) were retrieved from wooden chests and scrubbed with tamarind.',
        },
        {
          title: 'Singing of Telugu Jangama & Mourning Ballads (దర్బారు పాటలు & శోక గీతాలు)',
          teluguTitle: 'శోక గేయాలు',
          description: 'Telugu folk singers sang emotional metered poems recounting the bravery and thirst of Hussain in the desert of Karbala, accompanied by the hypnotic thrum of Dappu drums.',
        },
        {
          title: 'The Great Fire-Trench Run (అగ్ని గుండం ప్రవేశం — అలావా తొక్కడం)',
          teluguTitle: 'నిప్పుల గుండం తొక్కడం',
          description: 'On the tenth night (Ashura), the logs collapsed into a five-foot deep trench of searing white-hot coals. Devotees of both faiths, barefoot and anointed with sandalwood, sprinted across the coals holding the gleaming standards overhead without suffering a single blister.',
        },
        {
          title: 'Distribution of Sacred Sharbat & Maleeda (మలీదా & తీపి పానకం పంపిణీ)',
          teluguTitle: 'మలీదా ప్రసాదం',
          description: 'Earthen vessels filled with chilled sweetened water (Sharbat) scented with rose essence and fennel seeds were poured freely into pilgrims’ hands.',
        },
      ],
      songsOrBallads: '“యా హుస్సేన్... యా అలీ! పీర్ల సామి దండాలయ్యో... మా పంట చేలను కాపాడవయ్యా!”',
      traditionalAttire: 'Green silk waistbands over white dhotis; sacred peacock feather bundles held by participants.',
    },
    whyForgottenOrEndangered: {
      reasons: [
        'Religious polarization and orthodox fundamentalism on both sides discouraging joint folk syncretism.',
        'Modern youth viewing the intense fire-walking and mourning traditions as outdated.',
        'Migration of hereditary Muslim and Hindu artisan families to large urban centers.',
      ],
      modernStatus: 'Continues with fierce devotion in rural Rayalaseema villages like Guntakal, Alur, and parts of Mahbubnagar, though reduced significantly compared to the early 20th century.',
    },
    culinaryTraditions: [
      {
        dishName: 'Sacred Maleeda (రొట్టెలు, నెయ్యి & బెల్లం పిండి)',
        teluguName: 'మలీదా ప్రసాదం',
        ingredients: 'Whole wheat flatbreads (Rotis) crushed by hand while steaming hot, mixed with pure jaggery, cardamom, dry coconut, and warm cow ghee.',
        symbolism: 'Hearty nourishment symbolizing shared brotherhood and sacrifice.',
      },
      {
        dishName: 'Gulab Sharbat with Sabja Seeds',
        teluguName: 'గులాబీ సబ్జా షర్బత్',
        ingredients: 'Spring water, organic unrefined sugar, distilled damask rose water, and cooling basil seeds.',
        symbolism: 'Quenching spiritual and physical thirst in memory of the parched martyrs of Karbala.',
      },
    ],
    citations: [
      {
        source: 'Cuddapah District Gazetteer',
        authorOrPeriod: 'C.F. Brackenbury, ICS (1915)',
        quoteOrContext: '“The Mohurrum festival in this district is remarkable for the extent to which Hindus take part in it. In many villages the standards are maintained entirely by Hindus, who walk through the fire pits with utmost faith.”',
      },
      {
        source: 'Castes and Tribes of Southern India',
        authorOrPeriod: 'Edgar Thurston (1909, Vol. II)',
        quoteOrContext: 'Describes the Dudekula and Pinjari Telugu-speaking communities and their hereditary role in conducting the Peerla fire-trench ceremonies alongside Kapu and Boya farmers.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-09-22',
  },

  // 9. POLERAMMA JATHARA (ANCIENT BOUNDARY GODDESS RITE)
  {
    id: 'poleramma-jathara',
    slug: 'poleramma-jathara',
    title: 'Poleramma Jathara: The Ancient Village Boundary Goddess & The Great Kumbham Rice Mound',
    teluguTitle: 'పోలేరమ్మ జాతర — గ్రామ పొలిమేరల దేవత & మహా కుంభం వేడుక',
    subtitle: 'Venkatagiri and Nellore’s archaic folk festival honoring the boundary mother who shields rural communities from contagion, famine, and drought.',
    teluguSubtitle: 'నెల్లూరు, వెంకటగిరి నేలల్లో తోలుబొమ్మలాటలు, ఆసాది పాటలు & పచ్చిపసుపు కుంభం',
    tithiAndMonth: 'Bhadrapada or Ashada Masam (Varies locally)',
    season: 'MONSOON',
    category: 'REGIONAL_JATHARA',
    categoryLabel: 'Regional Folk Jathara (ప్రాంతీయ జాతర)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'South Coastal Andhra (Nellore, Tirupati, Prakasam)',
      specificDistricts: ['Sri Potti Sriramulu Nellore', 'Tirupati', 'Prakasam', 'Bapatla'],
      description: 'Centered primarily around Venkatagiri, Gudur, and rural Nellore settlements. Rarely celebrated in Northern Andhra or Western Telangana.',
    },
    historicalEra: 'Pre-Vedic Dravidian Folk Era (Continuously documented since 17th Century)',
    significance: 'Poleramma (from "Polimera" meaning territorial boundary) is the protective guardian of rural settlements. Her festival invokes ecological balance, drives away smallpox, cholera, and livestock disease, and unites every community in the village around a common altar.',
    howCelebratedInOldenDays: {
      overview: 'For seven days, no outsider was permitted to enter the village boundary, and no inhabitant traveled outside. The entire settlement functioned as an inviolable sanctuary.',
      steps: [
        {
          title: 'Marking the Polimera Boundary (పొలిమేర రక్షా బంధనం)',
          teluguTitle: 'పొలిమేర రక్ష',
          description: 'Elders walked the geographic boundary of the village sprinkling neem-infused turmeric water and chanting ancient protection formulas (Grama Bandhanam).',
        },
        {
          title: 'Sculpting the Ephemeral Clay Goddess (మట్టి విగ్రహ ప్రతిష్ఠ)',
          teluguTitle: 'మట్టి ప్రతిమ తయారీ',
          description: 'Hereditary potters harvested clean clay from the dry bed of the village tank. The goddess was sculpted with fierce compassionate eyes, adorned with neem garlands and fresh turmeric.',
        },
        {
          title: 'The Monumental Kumbham Rice Mound (మహా కుంభం అన్నం సమర్పణ)',
          teluguTitle: 'మహా కుంభం',
          description: 'Every household contributed a pot of freshly boiled rice. A mountain of rice 10 feet high was piled before the goddess, soaked in turmeric water, curd, and neem leaves, topped with a burning oil lamp (Akhanda Deepam).',
        },
        {
          title: 'All-Night Tolu Bommalata & Asadi Ballads (తోలుబొమ్మలాట & ఆసాది కథలు)',
          teluguTitle: 'తోలుబొమ్మలాట & జానపద కళలు',
          description: 'All night long, master leather puppeteers performed stories from the Mahabharata and local heroic folk tales on white cloth screens illuminated by castor oil lamps, keeping the village vigilant and awake.',
        },
      ],
      traditionalAttire: 'Women wore yellow sarees anointed with neem leaf crowns; men carried brass Ghatams balanced on their heads.',
    },
    culinaryTraditions: [
      {
        dishName: 'Kumbham Curd Rice with Neem Buds',
        teluguName: 'వేపపూత పెరుగన్నం',
        ingredients: 'Country boiled rice, thick unpasteurized buffalo curd, fresh bitter neem flower buds, and sea salt.',
        symbolism: 'Bitter neem and cooling curd purify blood and prevent seasonal summer epidemics.',
      },
    ],
    citations: [
      {
        source: 'The Village Gods of South India',
        authorOrPeriod: 'Bishop Henry Whitehead (1921)',
        quoteOrContext: '“In the Telugu country, the primary goddess is Poleramma, the goddess of smallpox and the boundary. Her shrine is usually placed outside the village, and her worship is a communal affair in which every caste has an assigned ritual duty.”',
      },
      {
        source: 'Castes and Tribes of Southern India',
        authorOrPeriod: 'Edgar Thurston (1909)',
        quoteOrContext: 'Documents the sacred role of the Asadi singers and Madiga drummers who chant the genealogies of the goddess during the Kumbham offering.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1545232979-fbf65ce0be93?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 6,
    publishedDate: '2026-09-20',
  },

  // 10. MAKARA SANKRANTHI (THE SUPREME 4-DAY HARVEST FESTIVAL)
  {
    id: 'makara-sankranthi',
    slug: 'makara-sankranthi',
    title: 'Makara Sankranthi: The Four-Day Harvest Symphony of Sun, Soil, and Song',
    teluguTitle: 'మకర సంక్రాంతి సంబరాలు (పెద్ద పండుగ) — భోగి, సంక్రాంతి, కనుమ & ముక్కనుమల అపూర్వ సంబరం',
    subtitle: 'From dawn Bhogi fires and Haridasu chants to Gangireddu dances and golden Ariselu, the grandest agrarian festival of the Telugu universe.',
    teluguSubtitle: 'హరిదాసు కీర్తనలు, గంగిరెద్దుల విన్యాసాలు, గొబ్బెమ్మలు & నువ్వుల అరిసెల మాధుర్యం',
    tithiAndMonth: 'Solar Transit into Capricorn (January 13–16)',
    season: 'WINTER',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu (Coastal Andhra, Rayalaseema, Telangana, & Worldwide Diaspora)',
      specificDistricts: ['All 26 Districts of AP', 'All 33 Districts of Telangana', 'Utah Diaspora'],
      description: 'Universally celebrated by all Telugu people worldwide; known as "Pedda Panduga" (The Great Festival).',
    },
    historicalEra: 'Vedic Antiquity to Vijayanagara Golden Age',
    significance: 'Sankranthi marks the celestial northward transit (Uttarayanam) of Surya Bhagavan into Makara Rashi. Symbolizing the reward of grueling months of farming toil, granaries are bursting with freshly threshed paddy, sugarcane is mature, and winter winds are cool and invigorating.',
    howCelebratedInOldenDays: {
      overview: 'Celebrated across four distinctive days: Day 1 Bhogi (shedding the old in fire), Day 2 Makara Sankranthi (Sun transit & rice payasam), Day 3 Kanuma (cattle worship), Day 4 Mukkanuma (community feast & folk games).',
      steps: [
        {
          title: 'Dawn Bhogi Mantalu & Bhogi Pallu (భోగి మంటలు & భోగి పళ్లు)',
          teluguTitle: 'భోగి మంటల పవిత్రత',
          description: 'At 4:30 AM, dry logs, cow-dung cakes (Pidakalu), and obsolete wooden articles were cast into roaring bonfires at every street junction, purifying the body from winter chill and burning away psychic lethargy. In the evening, small children were showered with jujube berries (Regu Pallu), coins, and sugarcane bits to ward off evil eyes.',
        },
        {
          title: 'The Haridasu Morning Awakening (హరిలో రంగ హరి... హరిదాసుల రాక)',
          teluguTitle: 'హరిదాసు కీర్తనలు',
          description: 'Wearing copper vessels (Akshaya Patra) balanced steadily on their heads without touching by hand, carrying Chipla cymbals and tambura, Haridasus walked down village lanes singing saint Thyagaraja and Annamacharya kritis, never turning back or speaking, accepting freshly harvested raw rice directly into their crown vessels.',
        },
        {
          title: 'Gangireddu Melam & Shehnai Rhythms (డూడూ బసవన్న... గంగిరెద్దుల విన్యాసాలు)',
          teluguTitle: 'గంగిరెద్దుల ఆటలు',
          description: 'Decorated bulls draped in kaleidoscopic patchwork quilts (Gudise) and brass ankle bells bowed before households, dancing to the poignant reed notes of the Nadaswaram while their handlers recited rhythmic rhyming blessings.',
        },
        {
          title: 'Intricate Muggulu & Gobbemmalu (ముంగిళ్లలో రంగుల ముగ్గులు & గొబ్బెమ్మలు)',
          teluguTitle: 'ముగ్గులు & గొబ్బెమ్మల పూజ',
          description: 'Courtyards were washed with cow-dung water. Women drew vast geometric pulla muggulu using finely powdered rice flour (not synthetic marble powder, ensuring ants and birds were fed). Spherical cow-dung Gobbemmalu crowned with pumpkin and marigold flowers were placed in the patterns and sung around.',
        },
        {
          title: 'Kanuma Pasu Puja (కనుమ నాటి పశువుల పండుగ)',
          teluguTitle: 'పశువుల పూజ',
          description: 'On the third day, farmers bathed their plough cattle, anointed their horns with oil and colors, draped flower garlands around their necks, and fed them hot sweet Pongal. In the evening, cattle were driven in joyful races across harvested stubble fields.',
        },
      ],
      womenCustoms: 'Arranging "Bommala Koluvu" (elaborate stepped display of clay and wooden Kondapalli dolls), making sweet sesame Ariselu over wood-fired hearths, and welcoming daughters and sons-in-law home.',
      songsOrBallads: '“హరిలో రంగ హరీ... అంబ పలికింది మేలుకో... గొబ్బియల్లో గొబ్బియల్లో... చందమామ గొబ్బియల్లో!”',
      traditionalAttire: 'Men wore fresh cream Pattu Pancha with gold zari borders; women wore rich Uppada, Venkatagiri, or Dharmavaram silk sarees; children flew vibrant kites in Pattu Pavadas.',
    },
    modernCelebration: 'Observed with immense passion across Utah by UTA, featuring auditorium Rangoli contests, kite-flying at regional parks, Bhogi Pallu ceremonies for infants, and traditional multi-course festive banquets.',
    culinaryTraditions: [
      {
        dishName: 'Traditional Nuvvula Ariselu',
        teluguName: 'నువ్వుల నెయ్యి అరిసెలు',
        ingredients: 'Freshly harvested soaked raw rice ground fine, deep-red country jaggery syrup cooked to soft-ball consistency, white sesame seeds, and pure cow ghee.',
        symbolism: 'Rich in iron, calcium, and essential fatty acids, providing thermogenic warmth during the cold winter transit.',
      },
      {
        dishName: 'Chakkara Pongali & Pulagam',
        teluguName: 'చక్కెర పొంగలి & పులగం',
        ingredients: 'New harvest rice, yellow moong dal, crushed jaggery, cashew nuts, raisins, and aromatic cardamom in ghee.',
        symbolism: 'Offered directly to Surya Bhagavan as gratitude for agricultural abundance.',
      },
    ],
    citations: [
      {
        source: 'Kasikhandam (కాశీఖండము)',
        authorOrPeriod: 'Kavi Sarvabhowma Srinatha (15th Century CE)',
        quoteOrContext: 'Vividly portrays the joy of Telugu country folk preparing fresh sugarcane jaggery, grinding rice for Ariselu, and greeting Haridasu wandering minstrels on the banks of Krishna.',
      },
      {
        source: 'Amuktamalyada (ఆముక్తమాల్యద)',
        authorOrPeriod: 'Sri Krishnadevaraya, Emperor of Vijayanagara (1519 CE)',
        quoteOrContext: 'Describes royal kitchens boiling new rice in milk on Sankranthi day, noting how courtiers and citizens wore new silk garments and distributed sugarcane to village herdsmen.',
      },
      {
        source: 'Castes and Tribes of Southern India',
        authorOrPeriod: 'Edgar Thurston (1909, Vol. II)',
        quoteOrContext: 'Documents the sociological details of the Gangireddu itinerant musicians and Haridasu mendicants during the three-day Pongal festivities in Telugu districts.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 9,
    publishedDate: '2026-10-18',
  },

  // 11. UGADI (TELUGU NEW YEAR)
  {
    id: 'ugadi',
    slug: 'ugadi',
    title: 'Ugadi: The Dawn of Cosmic Time and the Philosophy of the Six Flavors',
    teluguTitle: 'ఉగాది వసంతోత్సవం — బ్రహ్మ సృష్టి ప్రారంభ దినం & షడ్రుచుల జీవిత తత్త్వం',
    subtitle: 'From the sacred mixture of six flavors (Shadruchulu) to Vedic astronomical readings and poetry assemblies, celebrating the dawn of the spring equinox.',
    teluguSubtitle: 'చేదు, తీపి, పులుపు, కారం, ఉప్పు, వగరుల సమాహారం... పంచాంగ శ్రవణం & వసంతాగమనం',
    tithiAndMonth: 'Chaitra Sukla Padyami (March / April)',
    season: 'SPRING',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & Deccan Plateau (Andhra, Telangana, Karnataka)',
      specificDistricts: ['All AP Districts', 'All Telangana Districts', 'Global Telugu Diaspora'],
      description: 'The premier astrological and civil New Year of the Telugu people, tracing the Salivahana Saka calendar era.',
    },
    historicalEra: 'Satavahana Dynasty (Salivahana Saka beginning 78 CE)',
    significance: 'Ugadi (derived from "Yuga-Adi", meaning the beginning of an epoch) commemorates the moment Lord Brahma commenced the cosmic cycle of creation. Astronomically, it heralds the arrival of Vasantam (spring), when mango trees bloom, neem flowers release delicate fragrance, and the cuckoo (Koil) begins its melodic call.',
    howCelebratedInOldenDays: {
      overview: 'Days before Ugadi, homes were cleaned, whitewashed, and decorated with fresh mango leaves (Thoranalu). On festival dawn, the entire family took sacred oil baths and tasted the consecrated Ugadi Pachadi before breaking fast.',
      steps: [
        {
          title: 'Abhyangana Snanam & New Garments (తైలాభ్యంగన స్నానం & నూతన వస్త్ర ధారణ)',
          teluguTitle: 'అభ్యంగన స్నానం',
          description: 'Before sunrise, family members anointed hair and limbs with cold-pressed sesame oil infused with sandalwood powder, bathed in warm water scented with herbs, and donned brand-new handloom clothes.',
        },
        {
          title: 'Preparation of Sacred Ugadi Pachadi (షడ్రుచుల ఉగాది పచ్చడి సమర్పణ)',
          teluguTitle: 'ఉగాది పచ్చడి ప్రాశస్త్యం',
          description: 'Prepared in a new earthen pot with six essential seasonal ingredients: bitter neem flowers (sadness), sweet fresh jaggery (joy), sour raw mango (surprise), pungent green chili (anger), salty sea salt (fear/taste), and astringent raw tamarind/banana (disgust). Consumed reverently as a philosophical reminder that life is a balanced blend of all experiences.',
        },
        {
          title: 'Vedic Panchanga Sravanam (గ్రామ పంచాంగ శ్రవణం)',
          teluguTitle: 'పంచాంగ శ్రవణం',
          description: 'In the afternoon, the entire village congregated under the shade of the village temple peepal tree. The village scholar unfurled the new palm-leaf astrological almanac (Panchangam), forecasting seasonal rainfall, agricultural yields, commodity prices, solar and lunar eclipses, and individual planetary fortunes.',
        },
        {
          title: 'Kavi Sammelanam & Literary Assemblies (కవి సమ్మేళనం & పద్య పఠనం)',
          teluguTitle: 'సాహిత్య సదస్సులు',
          description: 'Poets gathered to compose and recite impromptu Telugu metered verses (Padyalu, Avadhanams) celebrating the beauty of the Telugu language, seasonal nature, and moral duty.',
        },
      ],
      womenCustoms: 'Stringing green mango leaf festoons (Thoranalu) along door frames to absorb impurities and invite Goddess Lakshmi; grinding fresh sandalwood paste.',
      songsOrBallads: '“శతాయుర్వజ్రదేహాయ సర్వసంపత్కరాయ చ... సర్వారిష్టవినాశాయ నింబకందళభక్షణం!”',
      traditionalAttire: 'Men in fine silk or cotton Pancha with golden zari; women in vibrant green or yellow pattu sarees symbolizing spring regrowth.',
    },
    culinaryTraditions: [
      {
        dishName: 'Authentic Shadruchula Ugadi Pachadi',
        teluguName: 'షడ్రుచుల ఉగాది పచ్చడి',
        ingredients: 'Fresh white neem blossoms, grated new season raw mango, organic crushed golden jaggery, fresh green chili bits, rock salt, and tender tamarind pulp.',
        symbolism: 'Botanical and philosophical balance; neem flowers purify intestinal parasites after winter.',
      },
      {
        dishName: 'Hot Ghee-Laden Bobbatlu / Bhakshalu',
        teluguName: 'నెయ్యి బొబ్బట్లు / పోలెలు',
        ingredients: 'Cooked Bengal gram paste (Poornam) sweetened with cardamom-infused jaggery, folded into thin maida dough and griddled on cast iron with pure ghee.',
        symbolism: 'Symbolizes sweetness, fulfillment, and festive prosperity.',
      },
    ],
    citations: [
      {
        source: 'Varaha Purana (వరాహ పురాణము)',
        authorOrPeriod: 'Classical Sanskrit Purana translated into Telugu (14th Century)',
        quoteOrContext: 'Prescribes the consumption of neem blossoms and jaggery on Chaitra Sukla Padyami to secure physical vitality and longevity for the ensuing solar cycle.',
      },
      {
        source: 'Epigraphia Carnatica & South Indian Inscriptions',
        authorOrPeriod: 'Salivahana Saka Records (11th Century CE)',
        quoteOrContext: 'Documents gifts of land and grain granted to temple astrologers for publicly reading the Ugadi Panchanga Sravanam across Deccan villages.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-18',
  },

  // 12. BATHUKAMMA (THE 9-DAY FLORAL CELEBRATION OF TELANGANA)
  {
    id: 'bathukamma',
    slug: 'bathukamma',
    title: 'Bathukamma: The Conical Floral Pyramids and Sacred Motherhood of Telangana',
    teluguTitle: 'బతుకమ్మ పండుగ — తెలంగాణ పూల జాతర & సద్దుల బతుకమ్మ వైభవం',
    subtitle: 'Nine days of concentric floral architecture, ancient folk melodies, and ecological harmony honoring Goddess Gauri across the Deccan.',
    teluguSubtitle: 'గునుగు, తంగేడు, బంతి, చామంతి పూల గోపురాలు... చప్పట్ల లయలతో సాగే స్త్రీల లోకోత్సవం',
    tithiAndMonth: 'Bhadrapada Amavasya to Ashwayuja Ashtami/Navami (September / October)',
    season: 'AUTUMN',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Telangana & Frontier Deccan Belts',
      specificDistricts: ['Warangal', 'Karimnagar', 'Nalgonda', 'Hyderabad', 'Nizamabad', 'Medak', 'Adilabad'],
      description: 'The defining socio-cultural festival and state festival of Telangana, celebrated globally by the Telangana diaspora.',
    },
    historicalEra: 'Kakatiya Dynasty (12th – 14th Centuries CE)',
    significance: 'Bathukamma (meaning "Come Alive, Oh Mother Goddess") is a breathtaking ecological celebration of womanhood, wild floral biodiversity, and water conservation. It honors Goddess Gauri in the form of wild seasonal medicinal flowers arranged in conical tiers on wide brass plates (Tambalam).',
    howCelebratedInOldenDays: {
      overview: 'Celebrated across nine consecutive days beginning on Mahalaya Amavasya (Engili Pula Bathukamma) and concluding on Saddula Bathukamma. Men and children ventured into rocky scrub jungles and canal bunds to harvest wild blooms.',
      steps: [
        {
          title: 'Harvesting Wild Medicinal Blooms (అడవి పూల సేకరణ)',
          teluguTitle: 'పూల సేకరణ',
          description: 'Boys and men walked into wild meadows to gather Gunugu (Celosia), Tangedu (Cassia auriculata - state flower of Telangana), Banthi (Marigold), Chamanti (Chrysanthemum), Katla, and Gummadi (Pumpkin) blossoms.',
        },
        {
          title: 'Architecting the Conical Floral Temple (బతుకమ్మ అమరిక కళ)',
          teluguTitle: 'బతుకమ్మ పేర్చడం',
          description: 'On a circular brass plate (Tambalam), women laid broad pumpkin leaves, followed by concentric circular layers of multicolored flowers narrowing gradually into a conical spire. At the summit, a small lump of turmeric representing Goddess Gauramma was enthroned, anointed with kumkum.',
        },
        {
          title: 'The Concentric Folk Dance (వలయాకార నృత్యం & చప్పట్ల లయ)',
          teluguTitle: 'ఆటపాటల సంబరం',
          description: 'At sunset, women dressed in resplendent silk sarees placed hundreds of Bathukammas in the open village square. Forming concentric circles, they rotated rhythmically, clapping hands in unison and singing oral folk ballads chronicling local heroines, sisterhood, and mythological epics.',
        },
        {
          title: 'Nimajjanam & Saddula Distribution (చెరువుల్లో నిమజ్జనం & సద్దుల ప్రసాదం)',
          teluguTitle: 'నిమజ్జనం & సద్దులు',
          description: 'At dusk, carrying the flower pyramids on their heads, women processed to village lakes and tanks. Bathukammas were gently floated upon the water, releasing natural medicinal flavonoids that purified community drinking water reservoirs after the rains. Women shared five traditional types of rice (Saddulu).',
        },
      ],
      womenCustoms: 'Exclusively led by women and girls; exchanging Mali-Dabbalu (turmeric-kumkum blessings); singing ancient songs handed down orally over ten centuries.',
      songsOrBallads: '“బతుకమ్మ బతుకమ్మ ఉయ్యాలో... బంగారు బతుకమ్మ ఉయ్యాలో! శ్రీ గౌరి దేవివి ఉయ్యాలో... సిరులన్ని కురిపించు ఉయ్యాలో!”',
      traditionalAttire: 'Pochampally Ikat, Gadwal, and Narayanpet handloom silk sarees adorned with fresh jasmine garlands in braided hair.',
    },
    culinaryTraditions: [
      {
        dishName: 'Saddula Pancha Naivedyam (ఐదు రకాల సద్దులు)',
        teluguName: 'సద్దుల ప్రసాదాలు',
        ingredients: 'Perugu Saddi (Curd rice), Chinthapandu Pulihora (Tamarind rice), Nuvvula Saddi (Sesame rice), Avala Saddi (Mustard rice), and Makka Gudaalu (Boiled sweet corn with green chilies).',
        symbolism: 'Rich in probiotic culture, electrolytes, and healthy fats suited for autumn digestive balance.',
      },
    ],
    citations: [
      {
        source: 'Kakatiya Inscriptions at Warangal Fort & Thousand Pillar Temple',
        authorOrPeriod: '13th Century CE Epigraphs',
        quoteOrContext: 'References the royal patronage of community women’s floral gatherings in honor of Goddess Ambika during the Ashwayuja Navaratri celebrations.',
      },
      {
        source: 'The Folk Epics of Telangana',
        authorOrPeriod: 'Telangana Sahitya Akademi Archives',
        quoteOrContext: 'Documents oral song stanzas describing the grief and revival of the Kakatiya princesses, preserved in the musical verses of Bathukamma songs.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 9,
    publishedDate: '2026-10-18',
  },

  // 13. BONALU (ASHADA MAHAKALI JATARA OF TELANGANA)
  {
    id: 'bonalu',
    slug: 'bonalu',
    title: 'Bonalu: The Thundering Drums, Neem Pot Offerings, and Trance Oracle of Mahakali',
    teluguTitle: 'బోనాలు మహోత్సవం — ఆషాఢ మాసపు మహాకాళి ఆరాధన, పోతురాజు విన్యాసాలు & రంగం భవిష్యవాణి',
    subtitle: 'Carrying decorated earthen pots with blazing lamps, dancing to martial dappu rhythms, and consulting the oracle goddess across Hyderabad and Secunderabad.',
    teluguSubtitle: 'వేపమండలు, పసుపు కుంకుమలు, కొరడా ఝళిపించే పోతురాజు & సిగమూగే అమ్మల భక్తి ప్రవాహం',
    tithiAndMonth: 'Ashada Masam (July / August)',
    season: 'MONSOON',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Hyderabad, Secunderabad, and Surrounding Telangana Districts',
      specificDistricts: ['Hyderabad', 'Secunderabad', 'Rangareddy', 'Medchal-Malkajgiri', 'Nizamabad', 'Karimnagar'],
      description: 'Historically initiated at Golconda Fort, expanding across Ujjaini Mahakali Temple in Secunderabad and Old City Lal Darwaza.',
    },
    historicalEra: '1813 CE (With ancient Kakatiya antecedents in rural Grama Devata worship)',
    significance: 'Bonalu (derived from "Bhojanalu", meaning a sacred feast) is a thanksgiving festival to Goddess Mahakali for protecting the populace from devastating epidemics like plague and cholera. It welcomes the Mother Goddess returning home as a married daughter for the month of Ashada.',
    howCelebratedInOldenDays: {
      overview: 'Commencing at the hill shrine of Jagadambika atop Golconda Fort, the festival cascades through Secunderabad’s Ujjaini Mahakali temple and the historical alleys of Hyderabad over successive Sundays.',
      steps: [
        {
          title: 'Preparing the Sacred Bonam Earthen Pot (బోనం కుండ అలంకరణ)',
          teluguTitle: 'బోనం తయారీ',
          description: 'A brand-new terracotta pot was washed, smeared with yellow turmeric paste and sacred vermillion dots. Inside, rice was cooked in unpasteurized milk and golden jaggery. Neem twigs were tied around the neck, and an oil lamp placed in an earthen lid was lit on top.',
        },
        {
          title: 'The Procession with Balanced Pots (బోనం నెత్తిన మోసే భక్తుల నడక)',
          teluguTitle: 'బోనాల ఊరేగింపు',
          description: 'Women dressed in rich traditional silk sarees balanced the flaming pots effortlessly on their heads, walking miles without supporting them by hand, entering an ecstatic state of divine possession (Shigam oogadam).',
        },
        {
          title: 'The Fierce Dance of Pothuraju (కొరడాతో పోతురాజు వీర నాట్యం)',
          teluguTitle: 'పోతురాజు విన్యాసాలు',
          description: 'Pothuraju, the fierce brother and protector of the goddess, danced barefoot before the procession. Bare-chested, anointed with vermillion and turmeric, wearing bells on his ankles and a red dhoti, he whipped himself with thick hemp ropes while leading the retinue.',
        },
        {
          title: 'The Sacred Rangam Oracle (రంగం భవిష్యవాణి)',
          teluguTitle: 'రంగం భవిష్యవాణి',
          description: 'The morning following the main procession, an unmarried maiden stood barefoot atop an unbaked wet clay pot before the sanctum. Possessed by the spirit of the Mother Goddess, she answered community queries regarding rainfall, crop health, epidemics, and societal welfare.',
        },
      ],
      songsOrBallads: '“అమ్మా మహంకాళీ... చల్లంగా చూడవమ్మా! మా పల్లెలను రోగాల బారినుండి రక్షించవమ్మా!”',
      traditionalAttire: 'Traditional Telangana Pattu sarees, neem leaf sprigs in hair, turmeric paste on throat and feet.',
    },
    culinaryTraditions: [
      {
        dishName: 'Sweet Milk & Jaggery Bonam Rice',
        teluguName: 'బెల్లం పాలు బోనం అన్నం',
        ingredients: 'Raw unpolished country rice, rich buffalo milk, pure dark jaggery, and crushed green cardamom.',
        symbolism: 'Offered hot directly from the hearth to pacify and nourish the fierce protective mother goddess.',
      },
    ],
    citations: [
      {
        source: 'Nizam State Archival Records (Hyderabad Residency Documents)',
        authorOrPeriod: '1813 CE Plague Chronicles',
        quoteOrContext: 'Documents the official state permission and police escorts granted by the Nizam’s government for the public Bonalu procession following the cessation of the cholera outbreak.',
      },
      {
        source: 'The Folklore of Telangana',
        authorOrPeriod: 'Dr. Biruduraju Ramaraju (1975)',
        quoteOrContext: 'Examines the ancient pre-Islamic roots of the Pothuraju whip dances and the ritual balancing of terracotta hearth-pots in Deccan rural theology.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1545232979-fbf65ce0be93?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-18',
  },

  // 14. VINAYAKA CHAVITHI (21-LEAF BOTANICAL WORSHIP & CLAY IDOLS)
  {
    id: 'vinayaka-chavithi',
    slug: 'vinayaka-chavithi',
    title: 'Vinayaka Chavithi: The Ancient Botanical Wisdom of the 21 Sacred Leaves and Dissolving Clay Idols',
    teluguTitle: 'వినాయక చవితి — ఏకవింశతి పత్ర పూజ, పవిత్ర మట్టి విగ్రహం & ఉండ్రాళ్ల నైవేద్యం',
    subtitle: 'Long before plaster-of-paris and commercial sound systems, Telugu households gathered 21 medicinal leaves and hand-sculpted river clay Ganeshas.',
    teluguSubtitle: '21 రకాల ఔషధ పత్రాలతో అర్చన... నదులు, చెరువులను సుసంపన్నం చేసే ప్రాచీన పర్యావరణ వేడుక',
    tithiAndMonth: 'Bhadrapada Sukla Chavithi (August / September)',
    season: 'MONSOON',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & Worldwide Diaspora',
      specificDistricts: ['All 26 Districts of AP', 'All 33 Districts of Telangana', 'Salt Lake Valley'],
      description: 'Celebrated across every single Telugu home, apartment community, and town pavilion.',
    },
    historicalEra: 'Puranic Antiquity to Satavahana & Kakatiya Dynasties',
    significance: 'Vinayaka Chavithi celebrates the manifestation of Lord Ganesha, remover of obstacles and patron of sciences and arts. In olden Telugu culture, it was fundamentally an environmental festival: children molded Ganeshas out of fertile agricultural soil, worshiped them with 21 medicinal herbs, and immersed them into irrigation wells to enrich mineral sedimentation.',
    howCelebratedInOldenDays: {
      overview: 'A week prior, family members gathered fresh clay from the bed of the local stream. Children sculpted the elephant-headed deity by hand, decorating him with wild seeds and flowers.',
      steps: [
        {
          title: 'Hand-Molding the Unbaked Clay Deity (పుట్టమట్టి వినాయకుని తయారీ)',
          teluguTitle: 'మట్టి గణపతి రూపకల్పన',
          description: 'Fine river silt or anthill clay (Puttamatti) was kneaded with a little turmeric. Eyes were made from black mustard or peppercorns, and the idol was placed upon a wooden plank covered in mango leaves.',
        },
        {
          title: 'The Botanical 21 Sacred Leaf Worship (ఏకవింశతి పత్ర పూజ)',
          teluguTitle: '21 పత్రాల అర్చన',
          description: 'Each of the 21 sacred leaves—including Machi (Artemisia), Bruhati (Indian nightshade), Bilva (Bael), Durva (Bermuda grass), Dhatura (Thorn apple), Badari (Jujube), Apamarga (Chaff-flower), and Tulasi—was offered with a specific name of Ganesha, recognizing their anti-microbial and respiratory therapeutic values during the humid monsoon season.',
        },
        {
          title: 'Preparation of Modakams & Undrallu (కుడుములు & ఉండ్రాళ్ల సమర్పణ)',
          teluguTitle: 'ఉండ్రాళ్లు, కుడుముల నైవేద్యం',
          description: 'Steamed rice dumplings stuffed with freshly grated coconut and melted jaggery (Kudumulu) and savory rice rava spheres spiced with cumin and chana dal (Undrallu) were prepared in counts of 21 and offered as divine prasad.',
        },
        {
          title: 'Listening to the Syamantakopakhyanam (శమంతకోపాఖ్యానం & కథా శ్రవణం)',
          teluguTitle: 'వినాయక వ్రత కథ',
          description: 'In the evening, all family members sat together with sacred Akshintas in their hands. The elder narrated the story of Lord Krishna, the jewel Syamantaka, and the curse of looking at the moon on Chavithi night, concluding with blessing each person’s head with consecrated rice.',
        },
      ],
      songsOrBallads: '“శుక్లాంబరధరం విష్ణుం శశివర్ణం చతుర్భుజం... ప్రసన్నవదనం ధ్యాయేత్ సర్వవిఘ్నోపశాంతయే!”',
      traditionalAttire: 'Fresh silk and handloom dhotis for boys and men; festive silk pattu langas for young girls.',
    },
    culinaryTraditions: [
      {
        dishName: 'Authentic Steamed Undrallu',
        teluguName: 'ఆవిరి ఉండ్రాళ్లు',
        ingredients: 'Broken raw rice rava, split chana dal, cumin seeds, pure cow ghee, and spring water.',
        symbolism: 'Easily digestible steamed food balancing monsoon digestive sluggishness.',
      },
      {
        dishName: 'Bellam Kudumulu (Steamed Sweet Dumplings)',
        teluguName: 'బెల్లం కొబ్బరి కుడుములు',
        ingredients: 'Fine rice flour, organic dark jaggery, grated fresh coconut, and cardamom seeds.',
        symbolism: 'Lord Ganesha’s supreme favorite offering, denoting intellectual fulfillment.',
      },
    ],
    citations: [
      {
        source: 'Mudgala Purana & Ganesha Purana (ముద్గల పురాణము)',
        authorOrPeriod: 'Ancient Sanskrit Canon (Telugu commentary editions)',
        quoteOrContext: 'Details the exact botanical taxonomy of the 21 medicinal leaves (Eka Vimshathi Patra) and their cosmic correspondence to the human sensory organs.',
      },
      {
        source: 'Kakatiya Architecture and Cultural Epigraphs',
        authorOrPeriod: 'Ramappa & Warangal Temple Complex Inscriptions (1213 CE)',
        quoteOrContext: 'Depicts monolithic dancing Ganesha stone reliefs holding bowls of Modakam and Undrallu surrounded by royal attendants.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1567591414240-e25dfb4e6012?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-18',
  },

  // 15. MAHA SHIVARATRI (THE MIDNIGHT LINGODBHAVA & ALL-NIGHT JAGARAM)
  {
    id: 'maha-shivaratri',
    slug: 'maha-shivaratri',
    title: 'Maha Shivaratri: The Midnight Pillar of Cosmic Light, Bilva Leaves, and the Great Vigil',
    teluguTitle: 'మహా శివరాత్రి — అర్ధరాత్రి లింగోద్భవ కాలం, బిల్వార్చన & కన్నుమూయని జాగరణ',
    subtitle: 'From sacred fasts and continuous Rudrabhishekam to all-night temple Jagaram and Vedic chants echoing through Srisailam and Draksharamam.',
    teluguSubtitle: 'ఓం నమశ్శివాయ నామస్మరణ... త్రికోటేశ్వరుని సన్నిధిలో లక్షలాది భక్తుల శివ తాండవం',
    tithiAndMonth: 'Magha Bahula Chaturdashi (February / March)',
    season: 'WINTER',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & Jyotirlinga / Pancharama Shrines',
      specificDistricts: ['Nandyal (Srisailam)', 'Konaseema (Draksharamam)', 'Guntur (Amaravathi)', 'Tirupati (Kalahasti)', 'Karimnagar (Vemulawada)'],
      description: 'Universally observed with immense ascetic fervor across all Shiva temples and homes in Andhra and Telangana.',
    },
    historicalEra: 'Puranic Antiquity through Chalukya, Kakatiya, and Reddi Dynasties',
    significance: 'Maha Shivaratri marks the auspicious cosmic moment when Lord Shiva manifested as the infinite pillar of radiant fire (Lingodbhava) to humble the pride of Brahma and Vishnu. It also marks the celestial wedding night of Lord Shiva and Goddess Parvati.',
    howCelebratedInOldenDays: {
      overview: 'Devotees maintained an absolute waterless or fruit-only fast (Nirjala Upavasam) from sunrise. The night was divided into four distinct four-hour watches (Yamas), each featuring elaborate abhishekam.',
      steps: [
        {
          title: 'Sacred Bilva Patra Gathering & Archana (త్రిదళం త్రిగుణాకారం... మారేడు దళాల పూజ)',
          teluguTitle: 'బిల్వ పత్రాల పూజ',
          description: 'Devotees walked to dry forest edges to gather fresh trifoliate Bael leaves (Bilvapatram). Offering a single Bilva leaf on this sacred night was considered equivalent to a hundred sacrificial rites.',
        },
        {
          title: 'The Four-Yama Abhishekam Symphony (చతుర్యామ అభిషేకాలు)',
          teluguTitle: 'చతుర్యామ అభిషేకం',
          description: 'Through the night, the Shiva Lingam was bathed continuously with sacred substances: First Yama with milk, Second Yama with curd, Third Yama with pure cow ghee, and Fourth Yama with wild forest honey and sugarcane juice.',
        },
        {
          title: 'The Midnight Lingodbhava Darshanam (అర్ధరాత్రి 12 గంటల లింగోద్భవం)',
          teluguTitle: 'లింగోద్భవ సమయం',
          description: 'Precisely at midnight (Nisheetha Kala), temple bells rang in tempestuous unison. Camphor lamps blazed as the Lingam was adorned in dazzling white flowers and bilva, while priests chanted the Sri Rudram and Chamakam.',
        },
        {
          title: 'The Community All-Night Jagaram (రాత్రంతా శివగానాలు & హరికథలు)',
          teluguTitle: 'నిద్రలేని జాగరణ',
          description: 'To conquer sleep and mental darkness, congregations remained awake until dawn in temple courtyards, watching classical Yakshagana dance-dramas, Harikathas, and chanting "Om Namah Shivaya".',
        },
      ],
      songsOrBallads: '“ఓం నమశ్శివాయ సిద్ధం... త్రిదళం త్రిగుణాకారం త్రినేత్రం చ త్రియాయుషం! త్రిజన్మ పాపసంహారం ఏకబిల్వం శివార్పణం!”',
      traditionalAttire: 'Unstitched white or saffron cotton dhotis; sacred Vibhuti (holy ash) smeared in three horizontal lines (Tripundra) across the forehead.',
    },
    culinaryTraditions: [
      {
        dishName: 'Chilimidi & Sesame Ladoos (Breaking the Fast)',
        teluguName: 'నువ్వుల ఉండలు & చలిమిడి',
        ingredients: 'Roasted white sesame seeds, organic crushed jaggery, cardamom, and a little cow ghee.',
        symbolism: 'Replenishes blood glucose and provides sustained warmth after 24 hours of rigorous fasting.',
      },
    ],
    citations: [
      {
        source: 'Bhimeswara Puranam (భీమేశ్వర పురాణము)',
        authorOrPeriod: 'Kavi Sarvabhowma Srinatha (14th Century CE)',
        quoteOrContext: 'Celebrates the divine presence of Lord Bhimeswara at Draksharamam on Shivaratri, describing how pilgrims from the Himalayas to Cape Comorin assembled for the midnight Lingodbhava.',
      },
      {
        source: 'Sivarahasya Purana (శివరహస్య పురాణము)',
        authorOrPeriod: 'Ancient Saivite Sanskrit Canon',
        quoteOrContext: 'Explains the spiritual potency of staying awake on Magha Chaturdashi, declaring that even birds and wild beasts in the forest of Srisailam achieve higher births by involuntarily staying awake.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-18',
  },

  // 16. SRI RAMA NAVAMI (SITA RAMA KALYANAM & SWEET PANAKAM)
  {
    id: 'sri-rama-navami',
    slug: 'sri-rama-navami',
    title: 'Sri Rama Navami: The Celestial Wedding of Bhadrachalam and the Nectar of Panakam',
    teluguTitle: 'శ్రీరామ నవమి — భద్రాచల సీతారాముల కళ్యాణోత్సవం, ముత్యాల తలంబ్రాలు & పానక ప్రసాదం',
    subtitle: 'Celebrating the birth and wedding of Maryada Purushottama Lord Rama, where millions partake in refreshing jaggery Panakam and Vadapappu.',
    teluguSubtitle: 'రాములోరి పెళ్లి వేడుక... ఎండ వేడిమిని తగ్గించే చలువ పానకం, వడపప్పు & వసంతోత్సవం',
    tithiAndMonth: 'Chaitra Sukla Navami (April)',
    season: 'SPRING',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & Bhadradri Kothagudem District',
      specificDistricts: ['Bhadradri Kothagudem', 'All Districts of AP & Telangana', 'Utah Temples'],
      description: 'Centuries of devotion centered at the historic hill shrine of Bhadrachalam built by saint Bhakta Ramadasu.',
    },
    historicalEra: 'Treta Yuga (Purana) & 17th Century Qutb Shahi Era (Bhakta Ramadasu)',
    significance: 'Sri Rama Navami celebrates both the divine birth of Lord Sri Rama in Ayodhya and His celestial marriage to Mother Sita Devi. In Telugu culture, Sri Rama is venerated as the ideal son, brother, king, and husband, symbolizing unwavering adherence to truth and righteousness (Dharma).',
    howCelebratedInOldenDays: {
      overview: 'Village squares erected large thatched palm leaf pavilions (Pandalulu) decorated with mango leaves and plantain stems. The divine wedding was celebrated as a personal domestic event in every community.',
      steps: [
        {
          title: 'Erecting the Wedding Pandal (కళ్యాణ పందిరి నిర్మాణం)',
          teluguTitle: 'కళ్యాణ వేదిక',
          description: 'Villagers tied fresh green mango leaves and whole plantain trees loaded with fruit bunches to four bamboo pillars, creating a cool shaded sanctuary against the climbing April sun.',
        },
        {
          title: 'The Talambralu Pearl Shower (ముత్యాల తలంబ్రాలు సమర్పణ)',
          teluguTitle: 'ముత్యాల తలంబ్రాలు',
          description: 'Devotees brought raw rice mixed with golden turmeric paste, pure cow ghee, and natural river pearls. During the wedding climax, the bridegroom and bride idols showered each other with the golden grains amid joyous singing of Mangala Harathis.',
        },
        {
          title: 'Distribution of the Cool Panakam Nectar (చలువ పానకం & వడపప్పు పంపిణీ)',
          teluguTitle: 'పానక ప్రసాదం',
          description: 'Giant terracotta urns wrapped in wet jute cloth kept spring water chilled. Jaggery, black pepper, dry ginger, and cardamom were blended, creating a sacred cooling elixir served to every passerby regardless of social background.',
        },
        {
          title: 'The Chariot Procession (రాములవారి రథోత్సవం)',
          teluguTitle: 'రథయాత్ర',
          description: 'In the evening, the newlywed divine couple were seated on a majestic wooden chariot carved with epic scenes from the Ramayana, pulled through village lanes by hundreds of chanting devotees.',
        },
      ],
      songsOrBallads: '“శ్రీరామ చంద్రుల కళ్యాణ రమణీయ మహోత్సవము... రారండోయ్ చూడండీ మన సీతమ్మ తల్లి వైభవము!”',
      traditionalAttire: 'Yellow and white handloom cotton sarees and dhotis with sacred Rama Tilakam on foreheads.',
    },
    culinaryTraditions: [
      {
        dishName: 'Sacred Temple Panakam',
        teluguName: 'మిరియాల పానకం',
        ingredients: 'Cold spring water, organic jaggery, finely crushed black pepper, sun-dried ginger powder (Sonthi), green cardamom, and a pinch of edible camphor.',
        symbolism: 'Rich in potassium and electrolytes; black pepper and ginger soothe throats parched by high summer heat and dust.',
      },
      {
        dishName: 'Chalimidi & Vadapappu',
        teluguName: 'నానబెట్టిన వడపప్పు & చలిమిడి',
        ingredients: 'Uncooked yellow moong dal soaked in cold water for two hours, tossed with grated coconut, green chilies, and salt.',
        symbolism: 'Raw soaked protein that digests effortlessly without producing metabolic body heat.',
      },
    ],
    citations: [
      {
        source: 'Dasarathi Satakam (దాశరథీ శతకము)',
        authorOrPeriod: 'Kancharla Gopanna / Bhakta Ramadasu (17th Century CE)',
        quoteOrContext: 'Soul-stirring Telugu devotional poems composed while imprisoned in Golconda Fort, praising the mercy of Lord Rama of Bhadrachalam.',
      },
      {
        source: 'Tani Shah Firman Archives (Hyderabad State Archives)',
        authorOrPeriod: 'Abul Hasan Qutb Shah (1680 CE)',
        quoteOrContext: 'Royal decree confirming the state tradition of sending pearls from the royal treasury for the annual Sita Rama Kalyanam at Bhadrachalam, maintained by subsequent governments.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1545232979-fbf65ce0be93?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-10-18',
  },

  // 17. DEEPAVALI & NARAKA CHATURDASI (THE FESTIVAL OF LIGHTS)
  {
    id: 'deepavali-naraka-chaturdasi',
    slug: 'deepavali-naraka-chaturdasi',
    title: 'Deepavali: The 4 AM Ganga Snanam, Clay Diyas, and the Triumph of Light',
    teluguTitle: 'దీపావళి & నరక చతుర్దశి — తెల్లవారుజాము గంగాస్నానం, మట్టి ప్రమిదలు & ఉల్కా దానం',
    subtitle: 'From dawn oil baths and bursting native crackers to evening rows of flickering clay lamps and Lakshmi Kubera worship.',
    teluguSubtitle: 'సత్యభామ వీరత్వం, నరకాసుర వధ... అమావాస్య చీకట్లను పారద్రోలే దివ్య దీపోత్సవం',
    tithiAndMonth: 'Ashwayuja Bahula Chaturdashi & Amavasya (October / November)',
    season: 'AUTUMN',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & Worldwide Diaspora',
      specificDistricts: ['All 26 Districts of AP', 'All 33 Districts of Telangana', 'Global Telugu Community'],
      description: 'Universally celebrated with boundless light, fireworks, and family feasts.',
    },
    historicalEra: 'Puranic Antiquity (Padma Purana & Bhavishya Purana)',
    significance: 'Celebrates the triumph of righteousness over tyrannical darkness when Queen Satyabhama and Lord Sri Krishna vanquished the demon king Narakasura. In Telugu tradition, the day begins with the belief that Goddess Ganga resides in all water and Goddess Lakshmi in sesame oil during the dawn hour.',
    howCelebratedInOldenDays: {
      overview: 'Celebrated across two consecutive days: Naraka Chaturdasi (early dawn oil bath and victory crackers) and Deepavali Amavasya (evening rows of oil lamps, Lakshmi Puja, and Kedareswara Vratam).',
      steps: [
        {
          title: 'The Pre-Dawn Ganga Snanam (తెల్లవారుజాము 4 గంటలకు గంగాస్నానం)',
          teluguTitle: 'అభ్యంగన గంగాస్నానం',
          description: 'At 4:00 AM on Naraka Chaturdasi, mother and sisters anointed brothers and children with warm sesame oil infused with Nalugu flour (chickpea and turmeric paste). Bathing in warm water at this specific hour was held to wipe away fear of untimely death.',
        },
        {
          title: 'The Traditional Native Fireworks (దేశీ బాణసంచా & కాకరపువ్వొత్తులు)',
          teluguTitle: 'బాణసంచా వేడుక',
          description: 'Children burst home-crafted crackers, hand-held sparklers (Kakarapuvvothulu), whistling wheels (Bhoochakralu), and flowerpots (Tharajuvalu) crafted from bamboo tubes packed with sulfur and charcoal.',
        },
        {
          title: 'Lighting Rows of Terracotta Diyas (మట్టి ప్రమిదలలో దీపారాధన)',
          teluguTitle: 'దీపాల తోరణం',
          description: 'On Amavasya evening, hundreds of hand-spun cotton wicks were placed into terracotta clay lamps (Pramadalu) filled with fresh cold-pressed sesame oil. Lamps were set along every parapet, doorstep, well rim, and cow-pen.',
        },
        {
          title: 'Ulka Danam & Ancestral Guidance (గోరింటాకు & ఉల్కా దానం)',
          teluguTitle: 'ఉల్కా దానం',
          description: 'Elders lit bundles of dried jute stalks (Dibba Gaddi), holding them aloft into the dark night sky while chanting verses to illuminate the path for departed ancestral souls journeying back to the southern celestial realm.',
        },
      ],
      songsOrBallads: '“దీపావళి దీప కాంతి... ఇంటింటా వెలిగెను శాంతి! నరకాసుర సంహార సత్యభామా జయహో!”',
      traditionalAttire: 'Brand-new festive silk pattu sarees and dhotis, anointed with fragrant attar and sandalwood.',
    },
    culinaryTraditions: [
      {
        dishName: 'Authentic Crispy Murukulu & Chekkalu',
        teluguName: 'మురుకులు & పప్పు చెక్కలు',
        ingredients: 'Freshly ground rice flour, roasted gram flour, sesame seeds, carom seeds (Vamu), pure cow butter, and oil.',
        symbolism: 'Sustained crunchiness and warmth suitable for late-night family gatherings.',
      },
      {
        dishName: 'Mysore Pak & Bellam Laddu',
        teluguName: 'నోరూరించే మైసూరుపాక్ & నువ్వుల లడ్డు',
        ingredients: 'Besan, rich melted ghee, unrefined sugar, and green cardamom.',
        symbolism: 'Joyous celebration of spiritual victory and mutual sweetness.',
      },
    ],
    citations: [
      {
        source: 'Bhavishya Purana (భవిష్య పురాణము)',
        authorOrPeriod: 'Vedic Sanskrit Canon',
        quoteOrContext: 'Declares that those who take oil baths at dawn on Naraka Chaturdasi never suffer poverty or distress during the ensuing winter months.',
      },
      {
        source: 'Padma Purana - Uttara Khanda',
        authorOrPeriod: 'Ancient Puranic Text',
        quoteOrContext: 'Explains the spiritual significance of Ulka Danam (torches held to the night sky) on Ashwayuja Amavasya to guide ancestral spirits.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-18',
  },

  // 18. KARTIKA POURNAMI & VANA BHOJANALU (THE 365 WICKS & AMLA FEASTS)
  {
    id: 'kartika-pournami',
    slug: 'kartika-pournami',
    title: 'Kartika Pournami & Vana Bhojanalu: The 365-Wick River Lamps and Amla Forest Feasts',
    teluguTitle: 'కార్తీక పౌర్ణమి & వనభోజనాలు — 365 ఒత్తుల దీపారాధన & ఉసిరి చెట్టు నీడన విందు',
    subtitle: 'From lighting 365 cotton wicks in Shiva temples to community picnics under medicinal gooseberry trees, the holiest month of the Telugu year.',
    teluguSubtitle: 'శివకేశవ భేదం లేని పవిత్ర మాసం... ఉసిరి చెట్టు పూజ & కుటుంబ సమేత వనభోజన సంబరం',
    tithiAndMonth: 'Kartika Sukla Pournami (November)',
    season: 'AUTUMN',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & River Ghats',
      specificDistricts: ['Rajahmundry', 'Vijayawada', 'Srisailam', 'Vemulawada', 'All Telugu Towns'],
      description: 'Universally observed with morning river baths and community grove picnics across all of Andhra and Telangana.',
    },
    historicalEra: 'Skanda Purana Era to Kakatiya and Vijayanagara Empires',
    significance: 'Kartika Pournami is the glorious apex of Kartika Masam. It unites worshippers of both Shiva and Vishnu (Hari-Hara Aikyam). Lighting 365 wicks soaked in cow ghee atones for missed daily prayers over the entire preceding year.',
    howCelebratedInOldenDays: {
      overview: 'Devotees woke up before dawn for cold river dips. The day featured lighting 365 wicks, followed over ensuing weekends by Vana Bhojanalu—community picnics under the shade of Amla (gooseberry) groves.',
      steps: [
        {
          title: 'The 365-Wick Deeparadhana (365 ఒత్తుల పవిత్ర దీపారాధన)',
          teluguTitle: '365 ఒత్తుల దీపం',
          description: 'Devotees rolled 365 micro-thin hand-spun cotton threads into a single thick wick, placed it inside a halved Indian gooseberry (Usiri) or coconut shell filled with cow ghee, and lit it before Lord Shiva’s sanctum.',
        },
        {
          title: 'Ksheerabdhi Dwadashi & Tulasi Kalyanam (తులసీ కళ్యాణం & చిలుక ద్వాదశి)',
          teluguTitle: 'తులసీ కళ్యాణం',
          description: 'Three days prior on Dwadashi, women celebrated the celestial marriage of the sacred Tulasi plant and an Indian gooseberry branch (representing Lord Vishnu), decorating the courtyard with lamps.',
        },
        {
          title: 'Vana Bhojanalu in Amla Groves (ఉసిరి చెట్ల నీడన వనభోజనాలు)',
          teluguTitle: 'వనభోజనాలు',
          description: 'Entire extended families and neighborhoods journeyed to mango and gooseberry orchards. After performing puja to the sacred Amla tree, they cooked food in the open breeze and feasted together sitting on carpets on the grass.',
        },
      ],
      songsOrBallads: '“హరిహర భేదం లేదని చాటే కార్తీక దీపారాధన... ఉసిరి వృక్షపు నీడన విరిసెను కోటి జన్మల పుణ్యధన!”',
      traditionalAttire: 'Traditional handloom cotton clothing suitable for outdoor garden assemblies.',
    },
    culinaryTraditions: [
      {
        dishName: 'Amla (Usiri) Rice with Sesame & Coriander',
        teluguName: 'ఉసిరికాయ అన్నం & గోంగూర పచ్చడి',
        ingredients: 'Grated fresh sour gooseberries, steamed country rice, green chilies, mustard seeds, curry leaves, and roasted peanuts.',
        symbolism: 'Potent source of Vitamin C providing respiratory immunity during the changing season.',
      },
    ],
    citations: [
      {
        source: 'Kartika Purana (కార్తీక పురాణము)',
        authorOrPeriod: 'Skanda Purana Translation',
        quoteOrContext: 'Celebrates the spiritual merit of eating under a gooseberry tree on Kartika weekends, proclaiming that Lord Vishnu and Goddess Lakshmi personally reside beneath its branches.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-10-18',
  },

  // 19. NAGULA CHAVITHI (SACRED ANTHILL WORSHIP & BROTHER-SISTER BOND)
  {
    id: 'nagula-chavithi',
    slug: 'nagula-chavithi',
    title: 'Nagula Chavithi: The Sacred Anthill, Pouring of Cow Milk, and Prayers for Brothers',
    teluguTitle: 'నాగుల చవితి — పుట్టలో పాలు, చలిమిడి, వడపప్పు & సోదరుల ఆయురారోగ్య రక్ష',
    subtitle: 'Where Telugu women and children worship natural snake mounds with fresh raw cow milk, flowers, and sweet sesame balls to protect their brothers.',
    teluguSubtitle: 'నాగేంద్రునికి పాలు పోసి, కంటికి కాటుక దిద్ది, తమ్ముళ్లు-అన్నల శ్రేయస్సు కోరే మాతృమూర్తులు',
    tithiAndMonth: 'Kartika Sukla Chavithi (October / November)',
    season: 'AUTUMN',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu (Andhra & Telangana)',
      specificDistricts: ['All Districts of AP & Telangana'],
      description: 'Celebrated across rural farmlands, temple anthills, and suburban communities by women and young girls.',
    },
    historicalEra: 'Ancient Dravidian Serpent Worship & Epic Mahabharata Era',
    significance: 'Nagula Chavithi honors Lord Subramanya and the serpent deities (Nagas) who safeguard agricultural crops from rodents. It is profoundly linked to the bond of affection between sisters and brothers, with women praying that their brothers be shielded from all venomous perils and diseases.',
    howCelebratedInOldenDays: {
      overview: 'Women fasted from morning. In the afternoon, dressed in fine sarees, they carried brass trays bearing raw milk, flowers, and Chalimidi to sacred natural anthills located in fields or temple courtyards.',
      steps: [
        {
          title: 'The Anthill Circumambulation (పుట్ట ప్రదక్షిణ & పసుపు కుంకుమల పూజ)',
          teluguTitle: 'పుట్ట పూజ',
          description: 'Women walked around the natural earthen mound three times, winding raw yellow cotton thread around its circumference, offering yellow flowers and sweet fragrance.',
        },
        {
          title: 'Pouring of Fresh Cow Milk (పుట్టలో స్వచ్ఛమైన ఆవుపాలు పోయడం)',
          teluguTitle: 'పుట్టలో పాలు',
          description: 'Unboiled fresh cow milk was gently poured into the snake hole along with tiny bits of unbroken raw eggs, soaked lentils, and flowers.',
        },
        {
          title: 'The Sacred Earth Tilakam (పుట్టమట్టి నుదుట ధారణ & కంటికి కాటుక)',
          teluguTitle: 'పుట్టమట్టి తిలకం',
          description: 'A tiny pinch of moist clay from the anthill was reverently collected and applied as a protective tilakam on the foreheads of brothers and children, believed to cure skin conditions and eye defects.',
        },
      ],
      songsOrBallads: '“నాగేంద్రా... నారాయణా! నా తమ్మునికి ఆయురారోగ్యాలు ఇవ్వవయ్యా... మా కుటుంబాలను కంటికి రెప్పలా కాపాడవయ్యా!”',
      traditionalAttire: 'Traditional yellow or green silk sarees; young girls in vibrant pattu pavadas.',
    },
    culinaryTraditions: [
      {
        dishName: 'Chalimidi & Roasted Nuvvula Undalu',
        teluguName: 'చలిమిడి & నువ్వుల చిమ్మిలి',
        ingredients: 'Freshly pounded raw rice flour kneaded with golden jaggery syrup, paired with sesame seeds ground with jaggery without cooking.',
        symbolism: 'Cold raw sweets that preserve natural nutrients and pacify internal heat.',
      },
    ],
    citations: [
      {
        source: 'Mayamata & Manasara Architectural Treatises',
        authorOrPeriod: 'Ancient Vastu Shastra Texts',
        quoteOrContext: 'Details the sacred ecological sanctity of the snake anthill (Valmika) and its role in subterranean water detection and soil health.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-10-18',
  },

  // 20. VARALAKSHMI VRATAM (THE SACRED SRAVANA FRIDAY OF PROSPERITY)
  {
    id: 'varalakshmi-vratam',
    slug: 'varalakshmi-vratam',
    title: 'Varalakshmi Vratam: The Golden Kalasha, Nine-Knot Thoram, and Sravana Grace',
    teluguTitle: 'వరలక్ష్మీ వ్రతం — శ్రావణ శుక్రవారపు కలశ స్థాపన, నవగ్రంథి తోరం & ముత్తైదువుల పూజ',
    subtitle: 'Celebrated by married Telugu women on the Friday preceding the full moon of Sravana, invoking Goddess Lakshmi for family health and prosperity.',
    teluguSubtitle: 'కలశానికి పట్టుచీర అలంకరణ, తొమ్మిది ముడుల పవిత్ర తోరం & పిండివంటల నైవేద్యం',
    tithiAndMonth: 'Sravana Sukla Paksha Friday before Purnima (July / August)',
    season: 'MONSOON',
    category: 'WOMEN_VRATAM',
    categoryLabel: 'Women’s Sacred Vratam (స్త్రీల వ్రతం)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & South India',
      specificDistricts: ['All AP Districts', 'All Telangana Districts', 'Utah Households'],
      description: 'Celebrated in every Telugu Hindu household by women, followed by evening house-to-house thamboolam exchanges.',
    },
    historicalEra: 'Skanda Purana (Sanatkumara Samhita)',
    significance: 'Varalakshmi Vratam is one of the most auspicious domestic rituals of South India. Propitiated by Goddess Parvati as instructed by Lord Shiva, this vratam is believed to bestow the combined boons of the Ashta Lakshmis (wealth, courage, wisdom, grain, children, glory, victory, and royalty).',
    howCelebratedInOldenDays: {
      overview: 'Women swept courtyards, decorated the prayer room with floral arches, and assembled the sacred silver or brass Kalasha containing raw rice, dried fruits, and gold coins, draped like a bride in a miniature silk saree.',
      steps: [
        {
          title: 'The Kalasha Sthapana & Saree Draping (కలశ స్థాపన & అమ్మవారి అలంకరణ)',
          teluguTitle: 'కలశ పూజ',
          description: 'A brass or silver pot filled with sacred water or raw rice was crowned with five mango leaves and a whole turmeric-anointed coconut. An artistic silver or clay face of Goddess Lakshmi was affixed, and a tiny silk saree was draped around the vessel.',
        },
        {
          title: 'Tying the Nine-Knot Sacred Thoram (నవగ్రంథి తోరం కట్టుకోవడం)',
          teluguTitle: 'తోర బంధనం',
          description: 'A sacred yellow thread consecrated with nine knots (representing the nine forms of cosmic energy) and floral sprigs was tied around the right wrist of the woman performing the vratam.',
        },
        {
          title: 'The Nine Naivedyam Offerings (తొమ్మిది రకాల పిండివంటల సమర్పణ)',
          teluguTitle: 'నవవిధ నైవేద్యాలు',
          description: 'Nine traditional dishes—including Pulihora, Garelu, Boorelu, Chakkara Pongali, Kudumulu, and Payasam—were prepared in fresh ghee and served before the deity.',
        },
        {
          title: 'Mutthaiduvu Thamboolam Exchange (ముత్తైదువులకు తాంబూలాల సమర్పణ)',
          teluguTitle: 'తాంబూలాల వాయనం',
          description: 'In the evening, married neighbor women were invited. They were offered turmeric, vermillion, betel leaves, fresh fruits, and sweet prasad, fostering deep community solidarity.',
        },
      ],
      songsOrBallads: '“భాగ్యద లక్ష్మీ బారమ్మ... నమ్మమ్మ నీ సౌభాగ్యద లక్ష్మీ బారమ్మ!”',
      traditionalAttire: 'Rich Kanchipuram, Gadwal, or Dharmavaram silk pattu sarees with gold jewelry and jasmine hair wreaths.',
    },
    culinaryTraditions: [
      {
        dishName: 'Authentic Poornam Boorelu',
        teluguName: 'పూర్ణం బూరెలు',
        ingredients: 'Sweetened cooked chana dal and jaggery balls dipped in fermented rice-urad batter and golden fried in pure oil.',
        symbolism: 'Symbolizes spiritual inner sweetness encapsulated in outer fortitude.',
      },
    ],
    citations: [
      {
        source: 'Skanda Purana (స్కంద పురాణము - సనత్కుమార సంహిత)',
        authorOrPeriod: 'Ancient Sanskrit Canon',
        quoteOrContext: 'Narrates the story of Charumathi, an exemplary pious householder who conducted the Varalakshmi Vrata as instructed in a dream, receiving celestial abundance.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedDate: '2026-10-18',
  },

  // 21. DASARA & VIJAYADASHAMI (SHAMI TREE WORSHIP & AYUDHA PUJA)
  {
    id: 'dasara-vijayadashami',
    slug: 'dasara-vijayadashami',
    title: 'Dasara & Vijayadashami: The Shami Tree Gold Exchange, Ayudha Puja, and Royal Victory',
    teluguTitle: 'దసరా & విజయదశమి — జమ్మిచెట్టు పూజ, “బంగారం” పంపకం, ఆయుధ పూజ & దేవీ నవరాత్రులు',
    subtitle: 'From nine nights of Alankaras to Shami tree circumambulations and gifting Jambi leaves as golden tokens of mutual forgiveness and success.',
    teluguSubtitle: 'శమీ శమయతే పాపం... కనకదుర్గమ్మ, జోగులాంబ క్షేత్రాల్లో దేవీ వైభవం & కార్మికుల ఆయుధార్చన',
    tithiAndMonth: 'Ashwayuja Sukla Dashami (September / October)',
    season: 'AUTUMN',
    category: 'FLAGSHIP',
    categoryLabel: 'Major Flagship Festival (ప్రధాన పండుగ)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Pan-Telugu & Shakti Peethas',
      specificDistricts: ['Vijayawada (Kanaka Durga)', 'Jogulamba Gadwal', 'Warangal (Bhadrakali)', 'All Districts'],
      description: 'Universally celebrated with imperial and martial grandeur across all Telugu regions.',
    },
    historicalEra: 'Mahabharata Era to Kakatiya, Vijayanagara, and Asaf Jahi Dynasties',
    significance: 'Vijayadashami commemorates Goddess Durga’s triumph over the buffalo demon Mahishasura after nine fierce battles. It also marks the day Arjuna retrieved his Gandiva bow from the branches of the sacred Shami (Jambi) tree to defeat the Kauravas in the Virata Parva.',
    howCelebratedInOldenDays: {
      overview: 'Followed nine nights of Devi Navaratri. The tenth day was dedicated to sanctifying tools of livelihood (Ayudha Puja), followed by evening procession to the sacred Shami tree at the town boundary.',
      steps: [
        {
          title: 'Ayudha Puja for Tools & Crafts (ఆయుధ పూజ & పనిముట్ల అర్చన)',
          teluguTitle: 'ఆయుధ పూజ',
          description: 'Every artisan, farmer, driver, writer, and teacher cleaned their instruments of trade—from plows, chisels, and weaving looms to pens, books, and modern vehicles—anointing them with sandalwood and vermillion in gratitude for their sustenance.',
        },
        {
          title: 'The Royal Shami Tree Procession (జమ్మిచెట్టు వైపు యాత్ర)',
          teluguTitle: 'శమీ వృక్ష ప్రదక్షిణ',
          description: 'At twilight, the entire town walked together to the ancient Shami tree located outside the settlement. The tree was circumambulated while chanting the sacred Sanskrit prayer invoking the tree to destroy enmity and poverty.',
        },
        {
          title: 'The Sacred Exchange of “Bangaram” (జమ్మి ఆకులను “బంగారం”గా ఇచ్చిపుచ్చుకోవడం)',
          teluguTitle: 'బంగారం పంచడం',
          description: 'Plucking the leaves of the Jambi tree, elders, youth, and neighbors embraced one another, handing over the green leaves declaring “Bangaram theesuko... bangaramga undu” (Accept this gold, live like gold), erasing all interpersonal enmities of the past year.',
        },
      ],
      songsOrBallads: '“శమీ శమయతే పాపం శమీ శత్రువినాశినీ... అర్జునస్య ధనుర్ధారీ రామస్య ప్రియదర్శినీ!”',
      traditionalAttire: 'Grand traditional silk attire; warriors and rulers wore ceremonial turbans and gold-embroidered shawls.',
    },
    culinaryTraditions: [
      {
        dishName: 'Sweet Bellam Garelu & Pulihora',
        teluguName: 'బెల్లం గారెలు & చింతపండు పులిహోర',
        ingredients: 'Black gram soaked and whipped into fluffy fritters dipped in warm jaggery syrup, paired with tart tamarind rice tempered with mustard and roasted groundnuts.',
        symbolism: 'Balance of tartness and sweet victory.',
      },
    ],
    citations: [
      {
        source: 'Mahabharata - Virata Parva (మహాభారతము - విరాట పర్వము)',
        authorOrPeriod: 'Kavithrayam (Nannaya, Tikkana, Errana)',
        quoteOrContext: 'Describes the Pandavas retrieving their divine weapons hidden within the hollow branches of the Shami tree before marching out to conquer their foes on Vijayadashami.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-10-18',
  },

  // 22. KANDI PANDUGA (FORGOTTEN RED GRAM HARVEST OF TELANGANA AGENCY)
  {
    id: 'kandi-panduga',
    slug: 'kandi-panduga',
    title: 'Kandi Panduga: The Forgotten Red Gram Harvest Festival of Northern Telangana & Agency Forests',
    teluguTitle: 'కంది పండుగ — అడవి బిడ్డల తొలి కందికాయల వేడుక & గ్రామ దేవతల నైవేద్యం',
    subtitle: 'Before eating newly ripened red gram pulses, farming and tribal communities cooked the fresh pods collectively to honor the forest deities.',
    teluguSubtitle: 'పంట చేలలో నిప్పు రాజేసి, తాజా కందికాయలను కాల్చి పంచుకునే విస్మృత ఆదివాసీ-రైతు సంబరం',
    tithiAndMonth: 'Pushya / Magha Masam (January / February)',
    season: 'WINTER',
    category: 'FORGOTTEN_RARE',
    categoryLabel: 'Forgotten & Endangered (మరుగున పడిన పండుగ)',
    isForgottenOrRare: true,
    geographicRegion: {
      primary: 'Northern Telangana (Adilabad, Asifabad, Bhupalpally, Mulugu) & Agency Belts',
      specificDistricts: ['Adilabad', 'Komaram Bheem Asifabad', 'Mulugu', 'Jayashankar Bhupalpally'],
      description: 'Historically preserved by Gond, Koya, and Naikpod communities alongside rural farming households in the forested Godavari basin.',
    },
    historicalEra: 'Ancient Indigenous / Forest Tribal Antiquity',
    significance: 'Kandi Panduga is an ancient agrarian first-fruits ceremony. In traditional ethics, no family plucked or consumed fresh red gram (Kandi) from their fields until the very first harvest was offered to Mother Earth, the village protector goddess (Pochamma), and forest spirits.',
    howCelebratedInOldenDays: {
      overview: 'Farmers assembled in the red gram field on a chosen auspicious morning. A fire was built right in the middle of the field using dry twigs.',
      steps: [
        {
          title: 'Plucking the First Green Pods (తొలి పచ్చని కందికాయల కోత)',
          teluguTitle: 'కాయల సేకరణ',
          description: 'The eldest farmer in the family picked the first mature cluster of plump green red-gram pods, kissing them and offering them to the sun.',
        },
        {
          title: 'Roasting Pods on Open Ember Bonfires (చేలలోనే కందికాయల కాల్పు)',
          teluguTitle: 'కందికాయలు కాల్చడం',
          description: 'The green pods were tossed directly onto glowing wood embers. Once the outer fuzzy husks were blistered and charred, the sweet, tender, smoky green seeds inside were peeled out by hand.',
        },
        {
          title: 'Community Sharing in the Field (రైతులు & పిల్లల సామూహిక విందు)',
          teluguTitle: 'సామూహిక విందు',
          description: 'The warm roasted pulses were mixed with sea salt and crushed garlic, distributed to all children and passing travelers before any harvest was transported to storage bins.',
        },
      ],
      songsOrBallads: '“పంట చేలలో కంది పండింది... పొలాల తల్లికి జోతలూ! మన పిల్లజెల్లల కడుపు నింపే కంది తల్లికి జై!”',
      traditionalAttire: 'Simple coarse hand-spun cotton cloths worn by forest farmers.',
    },
    whyForgottenOrEndangered: {
      reasons: [
        'Commercial cash-crop farming and hybrid pulse varieties harvested solely for wholesale market sale.',
        'Loss of tribal indigenous knowledge and ritual collective feasts in agrarian villages.',
      ],
      modernStatus: 'Confined to isolated Koya and Gond hamlets in the Adilabad-Mulugu forest tracts; virtually unknown in urban coastal or Rayalaseema districts.',
    },
    culinaryTraditions: [
      {
        dishName: 'Smoky Roasted Fresh Green Kandi Seeds',
        teluguName: 'కాల్చిన పచ్చి కందికాయలు',
        ingredients: 'Freshly harvested green pigeon pea pods, sea salt, roasted green chilies, and cold water.',
        symbolism: 'Pure organic protein rich in iron, eaten directly from nature’s bounty.',
      },
    ],
    citations: [
      {
        source: 'The Raj Gonds of Adilabad: Peasant Culture and Forest Rituals',
        authorOrPeriod: 'Christoph von Fürer-Haimendorf (1948)',
        quoteOrContext: 'Documents the ceremonial first-eating rites (Nowon) of the Gond and Kolam peoples, detailing the sacred offering of newly plucked pulses before community consumption.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 6,
    publishedDate: '2026-09-18',
  },

  // 23. NAGOBA JATARA (ANCIENT SERPENT PILGRIMAGE OF KESLAPUR)
  {
    id: 'nagoba-jatara',
    slug: 'nagoba-jatara',
    title: 'Nagoba Jatara: The Sacred Serpent Pilgrimage and River Pot Cleansing of Keslapur',
    teluguTitle: 'నాగోబా జాతర — కేస్లాపూర్ మెస్రం వంశీయుల పవిత్ర సర్ప పూజ & గంగాజల సంప్రదాయం',
    subtitle: 'The second largest tribal gathering in India, where Mesram Gond clan members walk 80 kilometers with holy brass pots to bathe the serpent god.',
    teluguSubtitle: 'గోదావరి జలాలతో కుండల శుద్ధి, మర్రిచెట్ల నీడన ప్రజా దర్బార్ & పురాతన ఆదివాసీ న్యాయ వ్యవస్థ',
    tithiAndMonth: 'Pushya Bahula Amavasya (January / February)',
    season: 'WINTER',
    category: 'REGIONAL_JATHARA',
    categoryLabel: 'Regional Monumental Rites (ప్రాంతీయ మహోత్సవం)',
    isForgottenOrRare: false,
    geographicRegion: {
      primary: 'Northern Telangana (Adilabad District — Keslapur Village)',
      specificDistricts: ['Adilabad', 'Kumuram Bheem Asifabad', 'Mancherial', 'Nirmal'],
      description: 'Exclusive to the Mesram clan of the Raj Gond and Pardhan communities centered at Keslapur in Indervelly mandal of Adilabad.',
    },
    historicalEra: 'Immense Tribal Antiquity (Centuries preceding medieval Gond kingdoms)',
    significance: 'Nagoba Jatara is the second largest tribal pilgrimage in India after Medaram Sammakka Sarakka. It venerates Nagoba (Shesha Naga), the divine serpent forefather of the Mesram clan, embodying deep clan solidarity, pristine ecological veneration, and the historic Gond Praja Darbar.',
    howCelebratedInOldenDays: {
      overview: 'Weeks before the event, 22 elder men of the Mesram clan walked barefoot 80 km to the Godavari river at Kalamadugu to fetch holy water in 1,400-year-old hereditary brass pots (Jharia).',
      steps: [
        {
          title: 'The 80-Kilometer Barefoot River Trek (గోదావరి గంగాజల సేకరణ యాత్ర)',
          teluguTitle: 'గంగాజల యాత్ర',
          description: 'Walking through dense teak forests without footwear, the pilgrims fetched holy water from a sacred swirl in the Godavari, carrying it without resting the pots on the ground.',
        },
        {
          title: 'The Sacred Anthill Sanctification (నాగోబా ఆలయ శుద్ధి & పుట్ట పూజ)',
          teluguTitle: 'ఆలయ అభిషేకం',
          description: 'At midnight on Pushya Amavasya, the sanctum was plastered with white clay and washed with the holy Godavari water. The snake idol was anointed with pure cow milk and illuminated with handmade cotton wicks.',
        },
        {
          title: 'The Gond Praja Darbar (మర్రిచెట్ల నీడన గోండ్ల ప్రజా దర్బార్)',
          teluguTitle: 'ప్రజా దర్బార్',
          description: 'Under the ancient banyan trees of Keslapur, clan chiefs, district collectors, and tribal elders sat together to address land rights, education, health, and forest welfare in a direct participatory democracy.',
        },
      ],
      songsOrBallads: '“నాగోబా దేవుడా... మెస్రం వంశ దాతా! మా అడవి బిడ్డలను చల్లగా కాపాడవయ్యా!”',
      traditionalAttire: 'Traditional white Gond dhotis, colorful head turbans, and silver neck ornaments worn by women.',
    },
    culinaryTraditions: [
      {
        dishName: 'Jowar (Jonnalu) Ghatka & Wild Forest Honey',
        teluguName: 'జొన్న గటక & తేనె',
        ingredients: 'Coarsely ground sorghum grain (Jonna rava) cooked into a dense porridge, served with cold country curd or wild rock honey.',
        symbolism: 'Staple nutrition of the dry Deccan plateau.',
      },
    ],
    citations: [
      {
        source: 'The Gonds of Andhra Pradesh: Tradition and Change in an Indian Tribe',
        authorOrPeriod: 'Christoph von Fürer-Haimendorf & Elizabeth von Fürer-Haimendorf (1979)',
        quoteOrContext: 'Provides an exhaustive anthropological study of the Keslapur Nagoba Jatara, the clan genealogies of the Pardhan bards, and the historical continuity of the Gond court.',
      },
    ],
    coverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 8,
    publishedDate: '2026-09-15',
  },
];

// Helper functions for easy querying
export function getAllFestivalBlogs(): FestivalBlog[] {
  return FESTIVAL_BLOGS;
}

export function getFestivalBlogBySlug(slug: string): FestivalBlog | undefined {
  return FESTIVAL_BLOGS.find((f) => f.slug.toLowerCase() === slug.toLowerCase() || f.id.toLowerCase() === slug.toLowerCase());
}

export function getForgottenFestivals(): FestivalBlog[] {
  return FESTIVAL_BLOGS.filter((f) => f.isForgottenOrRare);
}

export function getMajorFestivals(): FestivalBlog[] {
  return FESTIVAL_BLOGS.filter((f) => !f.isForgottenOrRare);
}

export function getFestivalsByCategory(category: string): FestivalBlog[] {
  if (category === 'ALL') return FESTIVAL_BLOGS;
  if (category === 'FORGOTTEN') return FESTIVAL_BLOGS.filter((f) => f.isForgottenOrRare);
  if (category === 'FLAGSHIP') return FESTIVAL_BLOGS.filter((f) => f.category === 'FLAGSHIP');
  if (category === 'AGRICULTURAL') return FESTIVAL_BLOGS.filter((f) => f.category === 'AGRICULTURAL' || f.id === 'eruvaka-punnami' || f.id === 'kandi-panduga' || f.id === 'makara-sankranthi');
  if (category === 'REGIONAL_JATHARA') return FESTIVAL_BLOGS.filter((f) => f.category === 'REGIONAL_JATHARA');
  if (category === 'WOMEN_VRATAM') return FESTIVAL_BLOGS.filter((f) => f.category === 'WOMEN_VRATAM' || f.id === 'atla-tadde' || f.id === 'bathukamma' || f.id === 'varalakshmi-vratam' || f.id === 'nagula-chavithi');
  return FESTIVAL_BLOGS;
}

export function getRelatedFestivals(currentSlug: string, count: number = 3): FestivalBlog[] {
  const current = getFestivalBlogBySlug(currentSlug);
  if (!current) return FESTIVAL_BLOGS.slice(0, count);
  
  return FESTIVAL_BLOGS
    .filter((f) => f.slug !== current.slug)
    .sort((a, b) => {
      // Prioritize same category or same forgotten status
      if (a.isForgottenOrRare === current.isForgottenOrRare && b.isForgottenOrRare !== current.isForgottenOrRare) return -1;
      if (a.category === current.category && b.category !== current.category) return -1;
      return 0;
    })
    .slice(0, count);
}
