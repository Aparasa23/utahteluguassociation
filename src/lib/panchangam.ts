/**
 * Utah Telugu Association — Vedic Temple Calendar & Panchangam Engine
 * Specialized for Salt Lake Valley / Utah Mountain Time (MDT/MST)
 * Coordinates: 40.7608° N, 111.8910° W
 */

export interface PanchangamDay {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  teluguDay: string;
  tithi: string;
  tithiTelugu: string;
  paksha: 'Shukla' | 'Krishna';
  nakshatra: string;
  nakshatraTelugu: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  rahuKalam: string;
  yamagandam: string;
  gulikaKalam: string;
  abhijitMuhurtham: string;
  durmuhurtham: string;
  festival?: string;
  festivalTelugu?: string;
  vratamType?: 'EKADASHI' | 'PURNIMA' | 'AMAVASYA' | 'PRADOSHAM' | 'SANKASHTI' | 'FESTIVAL';
  templeEvent?: {
    templeName: string;
    city: string;
    eventTitle: string;
    timing: string;
  };
}

export const TELUGU_MONTHS = [
  { name: 'Chaitram', telugu: 'చైత్ర మాసము', season: 'Vasantha Ruthuvu (Spring)' },
  { name: 'Vaishakham', telugu: 'వైశాఖ మాసము', season: 'Vasantha Ruthuvu (Spring)' },
  { name: 'Jyeshtham', telugu: 'జ్యేష్ఠ మాసము', season: 'Greeshma Ruthuvu (Summer)' },
  { name: 'Ashadham', telugu: 'ఆషాఢ మాసము', season: 'Greeshma Ruthuvu (Summer)' },
  { name: 'Shravanam', telugu: 'శ్రావణ మాసము', season: 'Varsha Ruthuvu (Monsoon)' },
  { name: 'Bhadrapadam', telugu: 'భాద్రపద మాసము', season: 'Varsha Ruthuvu (Monsoon)' },
  { name: 'Ashwayujam', telugu: 'ఆశ్వయుజ మాసము', season: 'Sharad Ruthuvu (Autumn)' },
  { name: 'Karthikam', telugu: 'కార్తీక మాసము', season: 'Sharad Ruthuvu (Autumn)' },
  { name: 'Margashirsham', telugu: 'మార్గశిర మాసము', season: 'Hemantha Ruthuvu (Winter)' },
  { name: 'Pushyam', telugu: 'పుష్య మాసము', season: 'Hemantha Ruthuvu (Winter)' },
  { name: 'Magham', telugu: 'మాఘ మాసము', season: 'Shishira Ruthuvu (Late Winter)' },
  { name: 'Phalgunam', telugu: 'ఫాల్గుణ మాసము', season: 'Shishira Ruthuvu (Late Winter)' },
];

export const UTAH_TEMPLES = [
  {
    name: 'Sri Ganesha Hindu Temple of Utah',
    teluguName: 'శ్రీ గణేశ హిందూ దేవాలయం',
    address: '114th South, South Jordan, Utah 84095',
    phone: '(801) 254-4322',
    website: 'https://utahganeshatemple.org',
    deity: 'Lord Ganesha, Sri Venkateswara Swamy, Goddess Lakshmi',
    events: [
      'Every Sankatahara Chaturthi Ganesha Abhishekam at 6:30 PM',
      'Every Saturday Sri Venkateswara Swamy Suprabhatam & Archana',
      'Ekadashi Vishnu Sahasranama Stotram & Prasadam',
    ],
  },
  {
    name: 'Sri Sri Radha Krishna Temple (Salt Lake City & Spanish Fork)',
    teluguName: 'శ్రీ శ్రీ రాధా కృష్ణ మందిరం',
    address: '965 E 3370 S, Salt Lake City, UT 84106',
    phone: '(801) 487-4005',
    website: 'https://utahkrishnas.org',
    deity: 'Sri Sri Radha Krishna, Lord Chaitanya',
    events: [
      'Sunday Love Feast & Aarti at 5:00 PM',
      'Janmashtami Grand Abhishek & Cultural Performances',
      'Govardhana Pooja and Annakut Mahotsav',
    ],
  },
];

// Curated 2026-2027 Utah Mountain Time Panchangam Calendar Matrix
export const TEMPLE_CALENDAR_EVENTS: PanchangamDay[] = [
  {
    date: '2026-10-20',
    dayOfWeek: 'Tuesday',
    teluguDay: 'మంగళవారం (భౌమ వాసరం)',
    tithi: 'Shukla Dashami / Vijayadashami Followup',
    tithiTelugu: 'శుక్ల దశమి',
    paksha: 'Shukla',
    nakshatra: 'Shravana (శ్రవణ నక్షత్రం)',
    nakshatraTelugu: 'శ్రవణా నక్షత్రం',
    yoga: 'Sadhya (సాధ్య)',
    karana: 'Garija (గరిజ)',
    sunrise: '7:42 AM MDT',
    sunset: '6:38 PM MDT',
    rahuKalam: '3:00 PM – 4:30 PM',
    yamagandam: '9:00 AM – 10:30 AM',
    gulikaKalam: '12:00 PM – 1:30 PM',
    abhijitMuhurtham: '11:50 AM – 12:38 PM',
    durmuhurtham: '8:30 AM – 9:15 AM',
    festival: 'Vijayadashami Blessings & Shami Pooja',
    festivalTelugu: 'విజయదశమి శమీ పూజ & అపరాజిత దేవి ఆరాధన',
    vratamType: 'FESTIVAL',
    templeEvent: {
      templeName: 'Sri Ganesha Hindu Temple of Utah',
      city: 'South Jordan, UT',
      eventTitle: 'Sri Shami Vruksha Pooja & Ayudha Pooja Prasadam',
      timing: '6:30 PM MDT',
    },
  },
  {
    date: '2026-10-22',
    dayOfWeek: 'Thursday',
    teluguDay: 'గురువారం (బృహస్పతి వాసరం)',
    tithi: 'Shukla Ekadashi (Papankusha Ekadashi)',
    tithiTelugu: 'పాపాంకుశ ఏకాదశి',
    paksha: 'Shukla',
    nakshatra: 'Shatabhisha (శతభిషం)',
    nakshatraTelugu: 'శతభిష నక్షత్రం',
    yoga: 'Shubha (శుభ)',
    karana: 'Vishti (విష్టి)',
    sunrise: '7:44 AM MDT',
    sunset: '6:35 PM MDT',
    rahuKalam: '1:30 PM – 3:00 PM',
    yamagandam: '6:00 AM – 7:30 AM',
    gulikaKalam: '9:00 AM – 10:30 AM',
    abhijitMuhurtham: '11:49 AM – 12:36 PM',
    durmuhurtham: '10:15 AM – 11:00 AM',
    festival: 'Papankusha Ekadashi Vratam',
    festivalTelugu: 'పాపాంకుశ ఏకాదశి వ్రతం — విష్ణు సహస్రనామ పారాయణ',
    vratamType: 'EKADASHI',
    templeEvent: {
      templeName: 'Sri Ganesha Hindu Temple of Utah',
      city: 'South Jordan, UT',
      eventTitle: 'Sri Venkateswara Swamy Sahasranama Archana & Ekadashi Harathi',
      timing: '7:00 PM MDT',
    },
  },
  {
    date: '2026-10-25',
    dayOfWeek: 'Sunday',
    teluguDay: 'ఆదివారం (భాను వాసరం)',
    tithi: 'Shukla Purnima (Sharad Purnima)',
    tithiTelugu: 'శరత్ పూర్ణిమ / రాస పూర్ణిమ',
    paksha: 'Shukla',
    nakshatra: 'Ashwini (అశ్విని)',
    nakshatraTelugu: 'అశ్వినీ నక్షత్రం',
    yoga: 'Vajra (వజ్ర)',
    karana: 'Bava (బవ)',
    sunrise: '7:48 AM MDT',
    sunset: '6:31 PM MDT',
    rahuKalam: '4:30 PM – 6:00 PM',
    yamagandam: '12:00 PM – 1:30 PM',
    gulikaKalam: '3:00 PM – 4:30 PM',
    abhijitMuhurtham: '11:48 AM – 12:35 PM',
    durmuhurtham: '4:15 PM – 5:00 PM',
    festival: 'Sharad Purnima & Sri Satyanarayana Swamy Vratam',
    festivalTelugu: 'శరత్ పూర్ణిమ — శ్రీ సత్యనారాయణ స్వామి సామూహిక వ్రతం',
    vratamType: 'PURNIMA',
    templeEvent: {
      templeName: 'Sri Ganesha Hindu Temple of Utah',
      city: 'South Jordan, UT',
      eventTitle: 'Community Sri Satyanarayana Swamy Vratam & Chandrodaya Pooja',
      timing: '5:30 PM MDT',
    },
  },
  {
    date: '2026-10-29',
    dayOfWeek: 'Thursday',
    teluguDay: 'గురువారం (బృహస్పతి వాసరం)',
    tithi: 'Krishna Chaturthi (Sankashti Hara Chaturthi)',
    tithiTelugu: 'సంకష్టహర చతుర్థి',
    paksha: 'Krishna',
    nakshatra: 'Rohini (రోహిణి)',
    nakshatraTelugu: 'రోహిణీ నక్షత్రం',
    yoga: 'Siddha (సిద్ధ)',
    karana: 'Kaulava (కౌలవ)',
    sunrise: '7:52 AM MDT',
    sunset: '6:26 PM MDT',
    rahuKalam: '1:30 PM – 3:00 PM',
    yamagandam: '6:00 AM – 7:30 AM',
    gulikaKalam: '9:00 AM – 10:30 AM',
    abhijitMuhurtham: '11:47 AM – 12:34 PM',
    durmuhurtham: '10:14 AM – 10:59 AM',
    festival: 'Sankashti Hara Chaturthi Ganesha Pooja',
    festivalTelugu: 'సంకష్టహర చతుర్థి గణపతి అభిషేకం & చంద్ర దర్శనం',
    vratamType: 'SANKASHTI',
    templeEvent: {
      templeName: 'Sri Ganesha Hindu Temple of Utah',
      city: 'South Jordan, UT',
      eventTitle: 'Maha Ganapathi Abhishekam, Modaka Naivedyam & Moonrise Harathi',
      timing: '6:30 PM MDT',
    },
  },
  {
    date: '2026-11-08',
    dayOfWeek: 'Sunday',
    teluguDay: 'ఆదివారం (భాను వాసరం)',
    tithi: 'Krishna Amavasya (Deepavali Lakshmi Pooja)',
    tithiTelugu: 'దీపావళి లక్ష్మీ పూజ / అమావాస్య',
    paksha: 'Krishna',
    nakshatra: 'Swati (స్వాతి)',
    nakshatraTelugu: 'స్వాతి నక్షత్రం',
    yoga: 'Ayushman (ఆయుష్మాన్)',
    karana: 'Chatushpada (చతుష్పాద)',
    sunrise: '7:05 AM MST',
    sunset: '5:15 PM MST',
    rahuKalam: '4:00 PM – 5:15 PM',
    yamagandam: '12:00 PM – 1:15 PM',
    gulikaKalam: '2:45 PM – 4:00 PM',
    abhijitMuhurtham: '11:46 AM – 12:30 PM',
    durmuhurtham: '3:45 PM – 4:30 PM',
    festival: 'Deepavali Mahotsavam & Sri Maha Lakshmi Pooja',
    festivalTelugu: 'దీపావళి మహోత్సవం — శ్రీ మహాలక్ష్మి అష్టలక్ష్మి పూజ & దీప ప్రజ్వలన',
    vratamType: 'FESTIVAL',
    templeEvent: {
      templeName: 'Sri Ganesha Hindu Temple of Utah',
      city: 'South Jordan, UT',
      eventTitle: 'Grand Ashta Lakshmi Pooja, Diya Lighting & Community Sparkler Zone',
      timing: '6:00 PM MST',
    },
  },
  {
    date: '2026-11-20',
    dayOfWeek: 'Friday',
    teluguDay: 'శుక్రవారం (భృగు వాసరం)',
    tithi: 'Shukla Ekadashi (Utthana / Prabodhini Ekadashi)',
    tithiTelugu: 'ఉత్థాన ఏకాదశి / కార్తీక శుద్ధ ఏకాదశి',
    paksha: 'Shukla',
    nakshatra: 'Uttara Bhadrapada (ఉత్తరాభాద్ర)',
    nakshatraTelugu: 'ఉత్తరాభాద్రా నక్షత్రం',
    yoga: 'Vajra (వజ్ర)',
    karana: 'Bava (బవ)',
    sunrise: '7:18 AM MST',
    sunset: '5:05 PM MST',
    rahuKalam: '10:30 AM – 11:45 AM',
    yamagandam: '2:45 PM – 4:00 PM',
    gulikaKalam: '7:45 AM – 9:00 AM',
    abhijitMuhurtham: '11:45 AM – 12:28 PM',
    durmuhurtham: '8:45 AM – 9:28 AM',
    festival: 'Karthika Ekadashi & Tulasi Kalyanam Commencement',
    festivalTelugu: 'కార్తీక ఏకాదశి — తులసి దామోదర కళ్యాణం & దీపోత్సవం',
    vratamType: 'EKADASHI',
    templeEvent: {
      templeName: 'Sri Sri Radha Krishna Temple',
      city: 'Salt Lake City, UT',
      eventTitle: 'Sri Tulasi Vivah & 1,008 Karthika Deepam Mahotsav',
      timing: '6:30 PM MST',
    },
  },
  {
    date: '2027-01-14',
    dayOfWeek: 'Thursday',
    teluguDay: 'గురువారం (బృహస్పతి వాసరం)',
    tithi: 'Makara Sankranthi / Surya Uttarayana Punya Kalam',
    tithiTelugu: 'మకర సంక్రాంతి సూర్య పుణ్యకాలం',
    paksha: 'Shukla',
    nakshatra: 'Uttara Ashadha (ఉత్తరాషాఢ)',
    nakshatraTelugu: 'ఉత్తరాషాఢా నక్షత్రం',
    yoga: 'Shiva (శివ)',
    karana: 'Balava (బాలవ)',
    sunrise: '7:49 AM MST',
    sunset: '5:22 PM MST',
    rahuKalam: '1:30 PM – 2:45 PM',
    yamagandam: '6:30 AM – 7:45 AM',
    gulikaKalam: '9:00 AM – 10:15 AM',
    abhijitMuhurtham: '11:56 AM – 12:38 PM',
    durmuhurtham: '10:20 AM – 11:02 AM',
    festival: 'Makara Sankranthi & Pongali Samarpanam',
    festivalTelugu: 'మకర సంక్రాంతి — సూర్య నమస్కారాలు & నైవేద్య సమర్పణ',
    vratamType: 'FESTIVAL',
    templeEvent: {
      templeName: 'Utah Telugu Association & Temple Pavilion',
      city: 'Mid-Valley PAC, UT',
      eventTitle: 'Sankranthi Sambaralu 2027 Flagship Community Festival',
      timing: '10:00 AM – 8:00 PM MST',
    },
  },
];

export function getTodayPanchangam(): PanchangamDay {
  const todayStr = '2026-10-20'; // Current simulation baseline
  const found = TEMPLE_CALENDAR_EVENTS.find((e) => e.date === todayStr);
  return found || TEMPLE_CALENDAR_EVENTS[0];
}
