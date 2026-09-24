// Comprehensive Emergency Helpline Database for India
// Covers National Pan-India Lines + All 28 States & 8 Union Territories

export const NATIONAL_HELPLINES = [
  {
    id: "nat-112",
    name: "ERSS (All-in-One Emergency)",
    shortName: "National Emergency (112)",
    number: "112",
    category: "unified",
    categoryLabel: "All Emergencies",
    icon: "shield-alert",
    description: "Unified Emergency Response Support System (ERSS) for Police, Fire, and Ambulance across all of India.",
    priority: 1,
    available24x7: true,
    keywords: ["emergency", "police", "fire", "ambulance", "danger", "urgent", "help", "save", "accident", "attack", "madad"]
  },
  {
    id: "nat-100",
    name: "Police Emergency",
    shortName: "Police (100)",
    number: "100",
    category: "police",
    categoryLabel: "Police",
    icon: "shield",
    description: "National police control room for crime, public order, threats, and physical safety.",
    priority: 2,
    available24x7: true,
    keywords: ["police", "thana", "theft", "robbery", "fight", "assault", "kidnap", "threat", "gunda", "chor", "chori", "marpeet"]
  },
  {
    id: "nat-101",
    name: "Fire & Rescue Service",
    shortName: "Fire (101)",
    number: "101",
    category: "fire",
    categoryLabel: "Fire & Rescue",
    icon: "flame",
    description: "Fire control room for building fires, cylinder leaks, explosions, and disaster entrapment.",
    priority: 2,
    available24x7: true,
    keywords: ["fire", "aag", "smoke", "dhuan", "burn", "explosion", "blast", "cylinder", "gas leak", "burning", "short circuit"]
  },
  {
    id: "nat-108",
    name: "Emergency Medical & Ambulance",
    shortName: "Ambulance (108 / 102)",
    number: "108",
    altNumber: "102",
    category: "ambulance",
    categoryLabel: "Ambulance & Medical",
    icon: "ambulance",
    description: "GVK EMRI / National Health Mission 24x7 Emergency Medical Response & Advanced Life Support Ambulance.",
    priority: 2,
    available24x7: true,
    keywords: ["ambulance", "medical", "hospital", "heart attack", "chest pain", "unconscious", "stroke", "bleeding", "accident", "patient", "doctor", "injured", "delivery", "pregnant", "khoon"]
  },
  {
    id: "nat-1090",
    name: "Women Helpline (General)",
    shortName: "Women in Distress (1091 / 181)",
    number: "1091",
    altNumber: "181",
    category: "women",
    categoryLabel: "Women Safety",
    icon: "heart-handshake",
    description: "Dedicated assistance for women facing violence, stalking, harassment, or domestic abuse.",
    priority: 2,
    available24x7: true,
    keywords: ["women", "girl", "lady", "sister", "wife", "female", "mahila", "stalking", "harassment", "molestation", "domestic violence", "abuse", "rape", "eve teasing", "ladki", "patni"]
  },
  {
    id: "nat-ncw",
    name: "National Commission for Women (NCW)",
    shortName: "NCW 24x7 Helpline",
    number: "7827170170",
    category: "women",
    categoryLabel: "Women Safety",
    icon: "heart-handshake",
    description: "NCW 24x7 helpline for women in distress, domestic violence, and sexual harassment support.",
    priority: 3,
    available24x7: true,
    keywords: ["ncw", "women rights", "domestic abuse", "legal aid women", "dowry", "sexual harassment"]
  },
  {
    id: "nat-1098",
    name: "Childline India",
    shortName: "Child Helpline (1098)",
    number: "1098",
    category: "child",
    categoryLabel: "Child Welfare",
    icon: "baby",
    description: "24-hour free emergency phone service for children in need of care and protection.",
    priority: 2,
    available24x7: true,
    keywords: ["child", "kid", "minor", "bachha", "baby", "lost child", "child abuse", "child labour", "orphan", "trafficking", "school bullying", "pocso"]
  },
  {
    id: "nat-1930",
    name: "Cyber Crime Reporting Helpline",
    shortName: "Cyber Crime (1930)",
    number: "1930",
    altNumber: "155260",
    category: "cyber",
    categoryLabel: "Cyber Crime & Fraud",
    icon: "laptop",
    description: "National Cyber Crime reporting & immediate financial freeze helpline (Ministry of Home Affairs).",
    priority: 2,
    available24x7: true,
    keywords: ["cyber", "online fraud", "scam", "bank fraud", "upi", "hacked", "phishing", "otp", "credit card", "atm fraud", "money stolen online", "sextortion", "blackmail", "paise kat gaye"]
  },
  {
    id: "nat-14416",
    name: "Tele-MANAS Mental Health",
    shortName: "Tele-MANAS (14416)",
    number: "14416",
    altNumber: "1800-891-4416",
    category: "mental_health",
    categoryLabel: "Mental Health",
    icon: "brain",
    description: "Government of India 24x7 toll-free mental health psychological counselling & suicide prevention.",
    priority: 2,
    available24x7: true,
    keywords: ["mental health", "suicide", "depression", "depressed", "anxiety", "panic", "stress", "crying", "hopeless", "sad", "kill myself", "marne ka mann", "alone", "counselling", "therapy"]
  },
  {
    id: "nat-kiran",
    name: "KIRAN Mental Health Rehabilitation",
    shortName: "Kiran Helpline (1800-599-0019)",
    number: "18005990019",
    category: "mental_health",
    categoryLabel: "Mental Health",
    icon: "brain",
    description: "24/7 National mental health helpline providing first-line psychological support, crisis management.",
    priority: 3,
    available24x7: true,
    keywords: ["kiran", "mental distress", "trauma", "breakdown", "rehabilitation", "psychiatrist"]
  },
  {
    id: "nat-14567",
    name: "Elder Line (Senior Citizens)",
    shortName: "Senior Citizen (14567)",
    number: "14567",
    category: "senior",
    categoryLabel: "Senior Citizens",
    icon: "user-check",
    description: "National toll-free helpline for elder care, abuse intervention, emotional support, and rescue.",
    priority: 3,
    available24x7: true,
    keywords: ["elderly", "senior citizen", "old age", "bujurg", "pension", "old parents", "elder abuse", "dada", "dadi"]
  },
  {
    id: "nat-1078",
    name: "NDMA Disaster Management",
    shortName: "Disaster (1078 / 1070)",
    number: "1078",
    altNumber: "1070",
    category: "disaster",
    categoryLabel: "Disaster & Rescue",
    icon: "cloud-lightning",
    description: "National Disaster Management Authority (NDMA) & NDRF for floods, earthquakes, cyclones, and landslides.",
    priority: 2,
    available24x7: true,
    keywords: ["disaster", "flood", "earthquake", "cyclone", "tsunami", "landslide", "toofan", "baarh", "bhukamp", "building collapse", "ndrf", "relief"]
  },
  {
    id: "nat-1033",
    name: "National Highway Emergency (NHAI)",
    shortName: "Highway Helpline (1033)",
    number: "1033",
    altNumber: "1073",
    category: "road",
    categoryLabel: "Highway & Road Safety",
    icon: "car",
    description: "National Highways Authority of India 24x7 road incident management, crane towing, ambulance on NH.",
    priority: 3,
    available24x7: true,
    keywords: ["highway", "expressway", "toll", "road accident", "car breakdown", "puncture", "flat tyre", "towing", "nhai", "road safety", "gaadi kharab"]
  },
  {
    id: "nat-139",
    name: "RailMadad (Indian Railways)",
    shortName: "RailMadad (139)",
    number: "139",
    category: "railway",
    categoryLabel: "Railways",
    icon: "train",
    description: "Integrated railway helpline for train security, medical emergency, cleanliness, and passenger assistance.",
    priority: 3,
    available24x7: true,
    keywords: ["railway", "train", "station", "coach", "berth", "tt", "irctc", "rail", "rpf", "train theft", "passenger emergency"]
  },
  {
    id: "nat-poison",
    name: "National Poisons Information Centre (AIIMS)",
    shortName: "Poison Control (AIIMS)",
    number: "1800116117",
    altNumber: "01126589391",
    category: "poison",
    categoryLabel: "Poison Control",
    icon: "biohazard",
    description: "24x7 Toxicological emergency guidance by AIIMS New Delhi for snake bites, chemical & drug poisonings.",
    priority: 3,
    available24x7: true,
    keywords: ["poison", "zehar", "snake bite", "chemical swallowed", "acid ingestion", "toxic", "drug overdose", "pesticide"]
  },
  {
    id: "nat-1075",
    name: "National Health Portal (MoHFW)",
    shortName: "Health Helpline (1075)",
    number: "1075",
    category: "ambulance",
    categoryLabel: "Health & Medical",
    icon: "activity",
    description: "Ministry of Health & Family Welfare toll-free health information & disease outbreak helpline.",
    priority: 4,
    available24x7: true,
    keywords: ["health", "disease", "covid", "infection", "vaccine", "swasthya"]
  },
  {
    id: "nat-1910",
    name: "National Blood Bank Helpline",
    shortName: "Blood Bank (1910 / 104)",
    number: "1910",
    altNumber: "104",
    category: "ambulance",
    categoryLabel: "Blood Bank",
    icon: "droplet",
    description: "Blood availability enquiry, rare blood group search, and donation assistance.",
    priority: 4,
    available24x7: true,
    keywords: ["blood", "blood bank", "plasma", "platelets", "khoon chahiye", "rare blood group"]
  },
  {
    id: "nat-18001805522",
    name: "National Anti-Ragging Helpline",
    shortName: "Anti-Ragging (1800-180-5522)",
    number: "18001805522",
    category: "police",
    categoryLabel: "Student Safety",
    icon: "graduation-cap",
    description: "UGC 24x7 toll-free helpline to report ragging, college harassment, and campus violence.",
    priority: 4,
    available24x7: true,
    keywords: ["ragging", "college", "hostel", "bullying", "university", "campus harassment"]
  }
];

export const INDIA_STATES_DATA = {
  "Uttar Pradesh": {
    code: "UP",
    capital: "Lucknow",
    lat: 26.8467,
    lng: 80.9462,
    bounds: { minLat: 23.8, maxLat: 30.5, minLng: 77.0, maxLng: 84.6 },
    specialNotes: "UP operates UP 112 (integrated PRV patrol), 1090 Women Power Line (renowned dedicated safety grid), and 1076 CM Helpline.",
    helplines: [
      {
        id: "up-112",
        name: "UP 112 (Police, Fire & Medical PRV)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "UP Flagship Response",
        description: "Uttar Pradesh 112 rapid police first-response patrol vehicles (PRVs) with average < 10 mins response."
      },
      {
        id: "up-1090",
        name: "UP 1090 - Women Power Line (WPL)",
        number: "1090",
        category: "women",
        isStateSpecial: true,
        tag: "UP Exclusive",
        description: "24x7 specialized women security service to eliminate harassment, stalking, vulgar phone calls & cyber abuse."
      },
      {
        id: "up-1076",
        name: "UP CM Helpline",
        number: "1076",
        category: "government",
        isStateSpecial: true,
        tag: "Chief Minister Grievance",
        description: "Direct citizen grievance redressal system monitored by the Chief Minister's office."
      },
      {
        id: "up-108",
        name: "UP 108 Emergency Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "ALS & BLS",
        description: "Toll-free emergency ambulance fleet across all 75 districts of Uttar Pradesh."
      },
      {
        id: "up-102",
        name: "UP 102 Matri Shishu Ambulance",
        number: "102",
        category: "ambulance",
        isStateSpecial: true,
        tag: "Maternal & Child",
        description: "Dedicated free transport for pregnant women and newborns to hospital."
      },
      {
        id: "up-1073",
        name: "UP Expressways Safety (UPEIDA)",
        number: "18001808777",
        altNumber: "1073",
        category: "road",
        isStateSpecial: true,
        tag: "Expressway Rescue",
        description: "Emergency helpline for Purvanchal, Agra-Lucknow, Bundelkhand, and Yamuna Expressways."
      },
      {
        id: "up-1070",
        name: "UP State Disaster Relief (SDMA)",
        number: "1070",
        category: "disaster",
        isStateSpecial: false,
        tag: "Disaster Control",
        description: "State disaster control room for floods (Ganga/Yamuna), heatwaves, and collapsed structures."
      },
      {
        id: "up-1930",
        name: "UP Cyber Police Helpline",
        number: "1930",
        category: "cyber",
        isStateSpecial: false,
        tag: "Financial Fraud",
        description: "Direct connect to Lucknow & regional Cyber Police stations for freezing looted bank transactions."
      }
    ]
  },

  "Delhi": {
    code: "DL",
    capital: "New Delhi",
    lat: 28.6139,
    lng: 77.2090,
    bounds: { minLat: 28.38, maxLat: 28.88, minLng: 76.84, maxLng: 77.35 },
    specialNotes: "Delhi features DCW 181, Delhi Police Special Cell, 1095 Traffic Emergency, and dedicated Senior Citizen Cell.",
    helplines: [
      {
        id: "dl-112",
        name: "Delhi Police Emergency (ERSS)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "NCT Emergency",
        description: "Centralized Delhi Police Control Room (PCR) for instant dispatch across NCR."
      },
      {
        id: "dl-181",
        name: "Delhi Commission for Women (DCW 181)",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Delhi 181 Rapid Rescue",
        description: "24x7 emergency rescue and crisis intervention helpline managed by DCW."
      },
      {
        id: "dl-1091",
        name: "Delhi Police Women Helpline",
        number: "1091",
        category: "women",
        isStateSpecial: true,
        tag: "Police Women Cell",
        description: "Direct connection to Delhi Police Special Police Unit for Women & Children (SPUWAC)."
      },
      {
        id: "dl-1095",
        name: "Delhi Traffic Police Emergency",
        number: "1095",
        altNumber: "01125844444",
        category: "road",
        isStateSpecial: true,
        tag: "Traffic & Breakdown",
        description: "Traffic jams, road breakdown, towing assistance, and road accident reporting in Delhi."
      },
      {
        id: "dl-1291",
        name: "Delhi Senior Citizen Cell",
        number: "1291",
        category: "senior",
        isStateSpecial: true,
        tag: "Senior Safety",
        description: "Delhi Police dedicated helpline for senior citizens living alone or needing security."
      },
      {
        id: "dl-1096",
        name: "Delhi Anti-Obscene Calls / Anti-Stalking",
        number: "1096",
        category: "women",
        isStateSpecial: true,
        tag: "Anti-Stalking",
        description: "Specialized cell dealing with nuisance calls, vulgar messages, and cyber stalking."
      },
      {
        id: "dl-1077",
        name: "Delhi Disaster Management (DDMA)",
        number: "1077",
        category: "disaster",
        isStateSpecial: false,
        tag: "DDMA Control",
        description: "Delhi disaster control room for seismic alerts, Yamuna flood warnings, and building emergencies."
      },
      {
        id: "dl-cats",
        name: "Delhi CATS Ambulance",
        number: "102",
        altNumber: "108",
        category: "ambulance",
        isStateSpecial: true,
        tag: "CATS Fleet",
        description: "Centralized Accident & Trauma Services (CATS) 24x7 ambulance fleet in Delhi."
      }
    ]
  },

  "Maharashtra": {
    code: "MH",
    capital: "Mumbai",
    lat: 19.0760,
    lng: 72.8777,
    bounds: { minLat: 15.6, maxLat: 22.0, minLng: 72.6, maxLng: 80.9 },
    specialNotes: "Includes Mumbai Police 103 for women/children, 108 MEMS, and Mumbai Police WhatsApp emergency dispatch.",
    helplines: [
      {
        id: "mh-112",
        name: "Maharashtra 112 (ERSS Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Dial 112 MH",
        description: "Unified command center covering Mumbai, Pune, Nagpur, Thane, and all districts."
      },
      {
        id: "mh-103",
        name: "Mumbai Police Women & Child Helpline",
        number: "103",
        category: "women",
        isStateSpecial: true,
        tag: "Mumbai 103",
        description: "Direct women and children safety line in Mumbai, Thane, and Navi Mumbai."
      },
      {
        id: "mh-wa",
        name: "Mumbai Police WhatsApp Helpline",
        number: "8454999999",
        category: "police",
        isStateSpecial: true,
        tag: "WhatsApp Dispatch",
        description: "Send live location, photos, videos or complaints directly to Mumbai Police control room."
      },
      {
        id: "mh-108",
        name: "Maharashtra MEMS Ambulance (108)",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "MEMS 108",
        description: "Emergency Medical Services ambulance with GPS dispatch across Maharashtra."
      },
      {
        id: "mh-181",
        name: "Maharashtra Women Helpline",
        number: "181",
        category: "women",
        isStateSpecial: false,
        tag: "State Women Help",
        description: "Toll-free 24-hour telephone helpline for women in distress."
      },
      {
        id: "mh-1077",
        name: "State Disaster Management Control",
        number: "1077",
        altNumber: "02222027990",
        category: "disaster",
        isStateSpecial: false,
        tag: "Disaster Control",
        description: "Monsoon floods, coastal cyclones, landslides, and building collapse rescue."
      }
    ]
  },

  "Karnataka": {
    code: "KA",
    capital: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    bounds: { minLat: 11.5, maxLat: 18.5, minLng: 74.0, maxLng: 78.6 },
    specialNotes: "Namma 112, Bengaluru City Police, Vanitha Sahayavani, and Arogya Sahayavani 104.",
    helplines: [
      {
        id: "ka-112",
        name: "Namma 112 (Karnataka ERSS)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Namma 112",
        description: "All-in-one emergency patrol response across Bengaluru and Karnataka."
      },
      {
        id: "ka-vanitha",
        name: "Vanitha Sahayavani (Women Distress)",
        number: "1091",
        altNumber: "08022943225",
        category: "women",
        isStateSpecial: true,
        tag: "Vanitha Sahayavani",
        description: "Bengaluru City Police Women Crisis Intervention & Counseling Centre."
      },
      {
        id: "ka-104",
        name: "Arogya Sahayavani (Medical Advice)",
        number: "104",
        category: "ambulance",
        isStateSpecial: true,
        tag: "24x7 Medical Line",
        description: "Toll-free 24x7 health consultation, first aid guidance, and hospital search."
      },
      {
        id: "ka-108",
        name: "Arogya Kavacha Ambulance (108)",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "Arogya Kavacha",
        description: "Comprehensive emergency response ambulance service across Karnataka."
      },
      {
        id: "ka-traffic",
        name: "Bengaluru Traffic Police Helpline",
        number: "103",
        altNumber: "08022942222",
        category: "road",
        isStateSpecial: true,
        tag: "BTP Helpline",
        description: "Bengaluru traffic control, towing assistance, and road accident management."
      }
    ]
  },

  "Tamil Nadu": {
    code: "TN",
    capital: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    bounds: { minLat: 8.0, maxLat: 13.6, minLng: 76.2, maxLng: 80.4 },
    specialNotes: "Tamil Nadu 112, Sneha Suicide Helpline (renowned 24/7 NGO), 181 Women, and 104 Health advice.",
    helplines: [
      {
        id: "tn-112",
        name: "Tamil Nadu 112 ERSS",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "TN 112 Unified",
        description: "Emergency Police, Fire, and Ambulance response across Chennai and all districts."
      },
      {
        id: "tn-sneha",
        name: "Sneha Suicide Prevention Helpline",
        number: "04424640050",
        category: "mental_health",
        isStateSpecial: true,
        tag: "Sneha Suicide Help",
        description: "Renowned 24/7 confidential emotional support & suicide prevention organization."
      },
      {
        id: "tn-181",
        name: "TN Women in Distress (181)",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "TN Women 181",
        description: "Department of Social Welfare 24-hour round-the-clock women protection."
      },
      {
        id: "tn-104",
        name: "TN 104 Health Helpline",
        number: "104",
        category: "ambulance",
        isStateSpecial: true,
        tag: "Medical Info",
        description: "Medical advice, blood availability, organ donation, and hospital inquiries."
      },
      {
        id: "tn-108",
        name: "TN 108 Emergency Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Fleet of emergency ambulances equipped for trauma care and neonates."
      }
    ]
  },

  "Gujarat": {
    code: "GJ",
    capital: "Gandhinagar",
    lat: 23.2156,
    lng: 72.6369,
    bounds: { minLat: 20.1, maxLat: 24.7, minLng: 68.1, maxLng: 74.5 },
    specialNotes: "Gujarat 181 Abhayam (specialized mobile rescue vans for women), 112 Citizen First, and GVK EMRI 108 HQ.",
    helplines: [
      {
        id: "gj-112",
        name: "Gujarat 112 Citizen First",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Citizen First 112",
        description: "Statewide emergency unified response for rapid police, fire, and ambulance."
      },
      {
        id: "gj-181",
        name: "181 Abhayam Women Helpline",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Abhayam Rescue Van",
        description: "24x7 toll-free service with dedicated rescue vans & counselors reaching victims in minutes."
      },
      {
        id: "gj-108",
        name: "Gujarat 108 Emergency Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "GVK EMRI 108",
        description: "World-class 108 emergency ambulance response originating in Gujarat."
      },
      {
        id: "gj-1070",
        name: "Gujarat State Disaster Management (GSDMA)",
        number: "1070",
        altNumber: "1077",
        category: "disaster",
        isStateSpecial: false,
        tag: "GSDMA Control",
        description: "Cyclone, flood, and earthquake emergency operations."
      }
    ]
  },

  "Rajasthan": {
    code: "RJ",
    capital: "Jaipur",
    lat: 26.9124,
    lng: 75.7873,
    bounds: { minLat: 23.0, maxLat: 30.2, minLng: 69.5, maxLng: 78.3 },
    specialNotes: "Abhay 112, Garima 1090 Women Helpline, and Rajasthan Sampark 181.",
    helplines: [
      {
        id: "rj-112",
        name: "Rajasthan Abhay 112",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Abhay Command",
        description: "Integrated Abhay Command & Control Centre for police, fire, and ambulance."
      },
      {
        id: "rj-1090",
        name: "Garima Women Helpline (1090)",
        number: "1090",
        category: "women",
        isStateSpecial: true,
        tag: "Garima Helpline",
        description: "Rajasthan Police special cell against women harassment, domestic violence, and stalking."
      },
      {
        id: "rj-181",
        name: "Rajasthan Sampark (181)",
        number: "181",
        category: "government",
        isStateSpecial: true,
        tag: "Sampark Grievance",
        description: "Citizen helpline for non-emergency public grievances and administrative assistance."
      },
      {
        id: "rj-108",
        name: "Rajasthan 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Toll-free emergency medical and trauma transit service."
      }
    ]
  },

  "West Bengal": {
    code: "WB",
    capital: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    bounds: { minLat: 21.5, maxLat: 27.2, minLng: 85.8, maxLng: 89.9 },
    specialNotes: "Kolkata Police 100/112, Muktir Alo women crisis network, and Kolkata Traffic Emergency.",
    helplines: [
      {
        id: "wb-112",
        name: "West Bengal 112 (ERSS)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "WB 112",
        description: "Integrated police, fire, and ambulance emergency response for West Bengal."
      },
      {
        id: "wb-1091",
        name: "WB Women Helpline (1091 / 181)",
        number: "1091",
        altNumber: "181",
        category: "women",
        isStateSpecial: false,
        tag: "Women Protection",
        description: "West Bengal Police women distress, domestic violence, and anti-trafficking line."
      },
      {
        id: "wb-kol-police",
        name: "Kolkata Police Control Room",
        number: "100",
        altNumber: "03322143024",
        category: "police",
        isStateSpecial: true,
        tag: "Kolkata Police",
        description: "Direct control room for Kolkata city emergency response."
      },
      {
        id: "wb-108",
        name: "Matri Yaan / Emergency Ambulance",
        number: "108",
        altNumber: "102",
        category: "ambulance",
        isStateSpecial: false,
        tag: "Health Fleet",
        description: "Emergency trauma ambulance and pregnant mother transit service."
      }
    ]
  },

  "Kerala": {
    code: "KL",
    capital: "Thiruvananthapuram",
    lat: 8.5241,
    lng: 76.9366,
    bounds: { minLat: 8.2, maxLat: 12.8, minLng: 74.8, maxLng: 77.4 },
    specialNotes: "Kerala 112, Disha 1056 (widely praised tele-health line), Mitra 181, and Pink Police Patrol.",
    helplines: [
      {
        id: "kl-112",
        name: "Kerala 112 (ERSS Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Kerala 112",
        description: "High-speed police and emergency rescue dispatch across all 14 districts."
      },
      {
        id: "kl-1056",
        name: "Disha Health Helpline (1056)",
        number: "1056",
        category: "ambulance",
        isStateSpecial: true,
        tag: "Disha 24x7",
        description: "24-hour round-the-clock physical & mental health guidance, epidemic advice, and counselling."
      },
      {
        id: "kl-181",
        name: "Mitra Women Helpline (181)",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Mitra 181",
        description: "Dedicated welfare, shelter, legal aid, and safety support for women in Kerala."
      },
      {
        id: "kl-pink",
        name: "Kerala Pink Police Patrol",
        number: "1515",
        category: "women",
        isStateSpecial: true,
        tag: "Pink Patrol",
        description: "Specially trained all-women police squad for public spaces, schools, and bus stops."
      },
      {
        id: "kl-108",
        name: "Kaniv 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "Kaniv 108",
        description: "Advanced life support and basic life support ambulance network."
      }
    ]
  },

  "Madhya Pradesh": {
    code: "MP",
    capital: "Bhopal",
    lat: 23.2599,
    lng: 77.4126,
    bounds: { minLat: 21.1, maxLat: 26.9, minLng: 74.0, maxLng: 82.8 },
    specialNotes: "Pioneer of Dial 100 First Response Vehicles, MP 1090, and CM Helpline 181.",
    helplines: [
      {
        id: "mp-112",
        name: "MP Dial 100 / 112 Emergency",
        number: "112",
        altNumber: "100",
        category: "unified",
        isStateSpecial: true,
        tag: "MP Dial 100",
        description: "State-wide GPS-tracked First Response Vehicle (FRV) emergency network."
      },
      {
        id: "mp-1090",
        name: "MP Women Crime Helpline (1090)",
        number: "1090",
        category: "women",
        isStateSpecial: true,
        tag: "Women Safety",
        description: "Dedicated police wing for investigating and preventing crimes against women."
      },
      {
        id: "mp-181",
        name: "MP CM Helpline (181)",
        number: "181",
        category: "government",
        isStateSpecial: true,
        tag: "CM Helpline 181",
        description: "Flagship public grievances redressal portal with escalated government action."
      },
      {
        id: "mp-108",
        name: "Sanjeevani 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "Sanjeevani 108",
        description: "Emergency medical transport across urban and rural Madhya Pradesh."
      }
    ]
  },

  "Bihar": {
    code: "BR",
    capital: "Patna",
    lat: 25.5941,
    lng: 85.1376,
    bounds: { minLat: 24.3, maxLat: 27.5, minLng: 83.3, maxLng: 88.3 },
    specialNotes: "Bihar 112 ERSS with high density of emergency patrol vehicles.",
    helplines: [
      {
        id: "br-112",
        name: "Bihar 112 (ERSS Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Bihar 112 ERSS",
        description: "Statewide high-speed emergency response for police, fire, and medical."
      },
      {
        id: "br-181",
        name: "Bihar Women Helpline (181)",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Women 181 Bihar",
        description: "Crisis intervention, counseling, and legal assistance for women in Bihar."
      },
      {
        id: "br-102",
        name: "Bihar 102 Ambulance",
        number: "102",
        altNumber: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "Ambulance 102",
        description: "Emergency medical transport service operated under State Health Society."
      },
      {
        id: "br-1070",
        name: "Bihar Disaster Management (BSDMA)",
        number: "1070",
        category: "disaster",
        isStateSpecial: false,
        tag: "Flood & Disaster",
        description: "Emergency line for Kosi/Ganga floods, lightning strikes, and disaster relief."
      }
    ]
  },

  "Telangana": {
    code: "TG",
    capital: "Hyderabad",
    lat: 17.3850,
    lng: 78.4867,
    bounds: { minLat: 15.8, maxLat: 19.9, minLng: 77.2, maxLng: 81.8 },
    specialNotes: "Telangana SHE Teams (world-famous anti-harassment force), Hyderabad City Police 100/112.",
    helplines: [
      {
        id: "tg-112",
        name: "Telangana 112 ERSS",
        number: "112",
        altNumber: "100",
        category: "unified",
        isStateSpecial: true,
        tag: "Telangana 112",
        description: "Direct connection to police, fire, and ambulance with advanced GPS dispatch."
      },
      {
        id: "tg-she",
        name: "Telangana SHE Teams",
        number: "9441669988",
        category: "women",
        isStateSpecial: true,
        tag: "SHE Teams (WhatsApp)",
        description: "Pioneering specialized task force tracking and arresting eve-teasers, stalkers & molesters."
      },
      {
        id: "tg-181",
        name: "Telangana Women Helpline (181)",
        number: "181",
        category: "women",
        isStateSpecial: false,
        tag: "Women 181",
        description: "24x7 crisis response center for women in distress."
      },
      {
        id: "tg-108",
        name: "Telangana 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Emergency medical care with advanced life support ambulances."
      }
    ]
  },

  "Andhra Pradesh": {
    code: "AP",
    capital: "Amaravati",
    lat: 16.5062,
    lng: 80.6480,
    bounds: { minLat: 12.6, maxLat: 19.1, minLng: 76.7, maxLng: 84.8 },
    specialNotes: "AP 112, Disha Police App / Helpline for women security, 108 Ambulance.",
    helplines: [
      {
        id: "ap-112",
        name: "Andhra Pradesh 112 ERSS",
        number: "112",
        altNumber: "100",
        category: "unified",
        isStateSpecial: true,
        tag: "AP 112",
        description: "Unified police, fire, and emergency healthcare dispatch."
      },
      {
        id: "ap-disha",
        name: "AP Disha Women Helpline",
        number: "112",
        altNumber: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Disha SOS",
        description: "State emergency initiative for prompt response to crimes against women."
      },
      {
        id: "ap-108",
        name: "AP 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Fleet of state-of-the-art emergency medical response ambulances."
      },
      {
        id: "ap-104",
        name: "AP 104 Mobile Medical Units",
        number: "104",
        category: "ambulance",
        isStateSpecial: true,
        tag: "104 Health",
        description: "Free medical consultation and health advisory service."
      }
    ]
  },

  "Punjab": {
    code: "PB",
    capital: "Chandigarh",
    lat: 31.1471,
    lng: 75.3412,
    bounds: { minLat: 29.5, maxLat: 32.5, minLng: 73.8, maxLng: 76.9 },
    specialNotes: "Punjab 112 ERSS, 181 Sanjh Women Helpline, and anti-drug helpline.",
    helplines: [
      {
        id: "pb-112",
        name: "Punjab 112 (ERSS Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Punjab 112",
        description: "High-speed police and ambulance response across Punjab."
      },
      {
        id: "pb-181",
        name: "Punjab Sanjh Women & Citizen Helpline (181)",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Sanjh 181",
        description: "Punjab Police community service for women in distress, domestic abuse, and elderly."
      },
      {
        id: "pb-drug",
        name: "Punjab Anti-Drug Helpline",
        number: "18001802822",
        category: "mental_health",
        isStateSpecial: true,
        tag: "De-addiction",
        description: "Confidential de-addiction consultation, reporting, and rehabilitation."
      },
      {
        id: "pb-108",
        name: "Punjab 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "24x7 emergency medical transport."
      }
    ]
  },

  "Haryana": {
    code: "HR",
    capital: "Chandigarh",
    lat: 29.0588,
    lng: 76.0856,
    bounds: { minLat: 27.6, maxLat: 30.9, minLng: 74.4, maxLng: 77.6 },
    specialNotes: "Haryana 112 (Dial 112 vehicle fleet covering Gurugram, Faridabad, Panchkula, etc.).",
    helplines: [
      {
        id: "hr-112",
        name: "Haryana 112 (Dial 112 ERSS)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Haryana 112",
        description: "Flagship integrated emergency patrol system with under 15-minute response time."
      },
      {
        id: "hr-1091",
        name: "Haryana Women Police Helpline",
        number: "1091",
        category: "women",
        isStateSpecial: true,
        tag: "Women 1091",
        description: "Prompt action against eve-teasers, stalkers, and domestic violence."
      },
      {
        id: "hr-108",
        name: "Haryana 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Emergency medical response fleet."
      }
    ]
  },

  "Jammu and Kashmir": {
    code: "JK",
    capital: "Srinagar / Jammu",
    lat: 33.7782,
    lng: 76.5762,
    bounds: { minLat: 32.2, maxLat: 37.0, minLng: 73.4, maxLng: 80.3 },
    specialNotes: "J&K 112 ERSS, Women 181, Sukoon Mental Health, and Avalanche/Disaster emergency.",
    helplines: [
      {
        id: "jk-112",
        name: "J&K 112 ERSS",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "J&K 112",
        description: "Integrated emergency response for police, fire, medical, and high-altitude rescue."
      },
      {
        id: "jk-181",
        name: "J&K 181 Women Helpline",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Women 181",
        description: "Crisis support, legal counseling, and emergency rescue for women."
      },
      {
        id: "jk-sukoon",
        name: "Sukoon Mental Health Helpline",
        number: "18001807159",
        category: "mental_health",
        isStateSpecial: true,
        tag: "Sukoon Helpline",
        description: "Mental health and psychosocial support for trauma, stress, and crisis."
      },
      {
        id: "jk-108",
        name: "J&K 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Emergency ambulances equipped with oxygen and heating for cold terrain."
      }
    ]
  },

  "Odisha": {
    code: "OD",
    capital: "Bhubaneswar",
    lat: 20.9517,
    lng: 85.0985,
    bounds: { minLat: 17.8, maxLat: 22.6, minLng: 81.4, maxLng: 87.5 },
    specialNotes: "Odisha 112, OSDMA (pioneer in cyclone disaster management), and 181 Women.",
    helplines: [
      {
        id: "od-112",
        name: "Odisha 112 (ERSS Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Odisha 112",
        description: "Centralized emergency response for police, fire, and ambulance."
      },
      {
        id: "od-1070",
        name: "Odisha State Disaster Management (OSDMA)",
        number: "1070",
        altNumber: "1077",
        category: "disaster",
        isStateSpecial: true,
        tag: "OSDMA Cyclone Control",
        description: "Global benchmark disaster management authority for Bay of Bengal cyclones and floods."
      },
      {
        id: "od-181",
        name: "Odisha Women Helpline (181)",
        number: "181",
        category: "women",
        isStateSpecial: false,
        tag: "Women 181",
        description: "Support for women facing domestic violence, harassment, or human trafficking."
      },
      {
        id: "od-108",
        name: "Odisha 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Round-the-clock emergency medical transit."
      }
    ]
  },

  "Assam": {
    code: "AS",
    capital: "Dispur",
    lat: 26.2006,
    lng: 92.9376,
    bounds: { minLat: 24.1, maxLat: 28.0, minLng: 89.7, maxLng: 96.0 },
    specialNotes: "Assam 112, 108 Mrityunjoy Ambulance, 181 Women, and Brahmaputra Flood Control.",
    helplines: [
      {
        id: "as-112",
        name: "Assam 112 (ERSS Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Assam 112",
        description: "Unified police, fire, and ambulance command in Assam."
      },
      {
        id: "as-108",
        name: "Mrityunjoy 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: true,
        tag: "Mrityunjoy 108",
        description: "Toll-free emergency medical, river-boat, and trauma ambulance service."
      },
      {
        id: "as-181",
        name: "Assam 181 Sakhi Women Helpline",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Sakhi 181",
        description: "Comprehensive support for women in distress, domestic abuse, and legal aid."
      },
      {
        id: "as-1070",
        name: "Assam Disaster Management (ASDMA)",
        number: "1070",
        altNumber: "1077",
        category: "disaster",
        isStateSpecial: false,
        tag: "Flood Control",
        description: "Emergency rescue line for Brahmaputra & Barak river floods and landslides."
      }
    ]
  },

  "Uttarakhand": {
    code: "UK",
    capital: "Dehradun",
    lat: 30.0668,
    lng: 79.0193,
    bounds: { minLat: 28.7, maxLat: 31.5, minLng: 77.5, maxLng: 81.1 },
    specialNotes: "Uttarakhand 112, SDRF Mountain & Landslide Rescue, 108 Ambulance.",
    helplines: [
      {
        id: "uk-112",
        name: "Uttarakhand 112 (ERSS)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "UK 112",
        description: "Unified police, mountain rescue, fire, and ambulance response."
      },
      {
        id: "uk-1070",
        name: "Uttarakhand Disaster & SDRF",
        number: "1070",
        altNumber: "9456596190",
        category: "disaster",
        isStateSpecial: true,
        tag: "SDRF Mountain Rescue",
        description: "Specialized State Disaster Response Force for flash floods, landslides & cloudbursts."
      },
      {
        id: "uk-108",
        name: "Uttarakhand 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Fleet of hill-terrain emergency medical ambulances."
      },
      {
        id: "uk-181",
        name: "Uttarakhand Gaura Shakti Women Help",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Gaura Shakti",
        description: "Women safety and legal aid in mountainous districts."
      }
    ]
  },

  "Himachal Pradesh": {
    code: "HP",
    capital: "Shimla",
    lat: 31.1048,
    lng: 77.1734,
    bounds: { minLat: 30.4, maxLat: 33.2, minLng: 75.6, maxLng: 79.0 },
    specialNotes: "HP 112 (first state in India to launch ERSS 112), 1070 Disaster, 181 Women.",
    helplines: [
      {
        id: "hp-112",
        name: "Himachal 112 (India's 1st ERSS)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "HP 112 Pioneer",
        description: "India's pioneer ERSS 112 state system with snow-terrain patrol dispatch."
      },
      {
        id: "hp-1070",
        name: "HP State Disaster Management",
        number: "1070",
        altNumber: "1077",
        category: "disaster",
        isStateSpecial: true,
        tag: "Snow & Landslide",
        description: "Snowstorm, landslide, and highway blockage emergency response."
      },
      {
        id: "hp-108",
        name: "HP 108 National Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Medical emergency response across high-altitude roads."
      },
      {
        id: "hp-181",
        name: "Himachal Women Helpline (181)",
        number: "181",
        category: "women",
        isStateSpecial: false,
        tag: "Women 181",
        description: "24x7 women support line."
      }
    ]
  },

  "Goa": {
    code: "GA",
    capital: "Panaji",
    lat: 15.2993,
    lng: 74.1240,
    bounds: { minLat: 14.9, maxLat: 15.8, minLng: 73.6, maxLng: 74.4 },
    specialNotes: "Goa 112, Beach Tourist Police, Drishti Marine Lifeguard, 108 Ambulance.",
    helplines: [
      {
        id: "ga-112",
        name: "Goa 112 (ERSS Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Goa 112",
        description: "Integrated police, coastal, and ambulance response."
      },
      {
        id: "ga-beach",
        name: "Goa Beach Safety & Lifeguard (Drishti)",
        number: "08322417777",
        altNumber: "112",
        category: "police",
        isStateSpecial: true,
        tag: "Beach Lifeguard",
        description: "Drowning prevention, rip-current rescue, and beach tourist safety."
      },
      {
        id: "ga-1091",
        name: "Goa Women Helpline (1091)",
        number: "1091",
        category: "women",
        isStateSpecial: true,
        tag: "Women Helpline",
        description: "Police helpline for women residents and tourists in Goa."
      },
      {
        id: "ga-108",
        name: "Goa 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Emergency medical transit."
      }
    ]
  },

  "Chhattisgarh": {
    code: "CG",
    capital: "Raipur",
    lat: 21.2787,
    lng: 81.8661,
    bounds: { minLat: 17.8, maxLat: 24.1, minLng: 80.2, maxLng: 84.4 },
    specialNotes: "CG 112 Dial 112 vehicle fleet, 108 Sanjeevani Ambulance, 181 Women.",
    helplines: [
      {
        id: "cg-112",
        name: "Chhattisgarh 112 (Dial 112)",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "CG 112",
        description: "GPS-enabled police, fire, and ambulance response across all districts."
      },
      {
        id: "cg-181",
        name: "Chhattisgarh 181 Women Helpline",
        number: "181",
        category: "women",
        isStateSpecial: true,
        tag: "Women 181",
        description: "Support for domestic violence, distress, and shelter."
      },
      {
        id: "cg-108",
        name: "Sanjeevani 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Emergency medical care."
      }
    ]
  },

  "Jharkhand": {
    code: "JH",
    capital: "Ranchi",
    lat: 23.6102,
    lng: 85.2799,
    bounds: { minLat: 21.9, maxLat: 25.3, minLng: 83.3, maxLng: 87.9 },
    specialNotes: "Jharkhand 112, 108 Ambulance, 181 Women in distress.",
    helplines: [
      {
        id: "jh-112",
        name: "Jharkhand 112 ERSS",
        number: "112",
        category: "unified",
        isStateSpecial: true,
        tag: "Jharkhand 112",
        description: "Unified police, fire, and ambulance dispatch."
      },
      {
        id: "jh-181",
        name: "Jharkhand Women Helpline (181)",
        number: "181",
        category: "women",
        isStateSpecial: false,
        tag: "Women 181",
        description: "Helpline for women safety and protection."
      },
      {
        id: "jh-108",
        name: "Jharkhand 108 Ambulance",
        number: "108",
        category: "ambulance",
        isStateSpecial: false,
        tag: "108 Ambulance",
        description: "Emergency medical transport service."
      }
    ]
  },

  "Arunachal Pradesh": { code: "AR", capital: "Itanagar", lat: 27.0844, lng: 93.6053, bounds: { minLat: 26.6, maxLat: 29.5, minLng: 91.5, maxLng: 97.4 }, helplines: [] },
  "Chandigarh": { code: "CH", capital: "Chandigarh", lat: 30.7333, lng: 76.7794, bounds: { minLat: 30.68, maxLat: 30.79, minLng: 76.70, maxLng: 76.84 }, helplines: [] },
  "Dadra and Nagar Haveli and Daman and Diu": { code: "DNHDD", capital: "Daman", lat: 20.4283, lng: 72.8397, bounds: { minLat: 20.1, maxLat: 20.9, minLng: 72.8, maxLng: 73.2 }, helplines: [] },
  "Ladakh": { code: "LA", capital: "Leh", lat: 34.1526, lng: 77.5771, bounds: { minLat: 32.5, maxLat: 36.0, minLng: 75.5, maxLng: 80.5 }, helplines: [] },
  "Lakshadweep": { code: "LD", capital: "Kavaratti", lat: 10.5667, lng: 72.6417, bounds: { minLat: 8.0, maxLat: 12.5, minLng: 71.5, maxLng: 74.0 }, helplines: [] },
  "Manipur": { code: "MN", capital: "Imphal", lat: 24.8170, lng: 93.9368, bounds: { minLat: 23.8, maxLat: 25.7, minLng: 93.0, maxLng: 94.8 }, helplines: [] },
  "Meghalaya": { code: "ML", capital: "Shillong", lat: 25.5788, lng: 91.8933, bounds: { minLat: 25.0, maxLat: 26.1, minLng: 89.8, maxLng: 92.8 }, helplines: [] },
  "Mizoram": { code: "MZ", capital: "Aizawl", lat: 23.1645, lng: 92.9376, bounds: { minLat: 21.9, maxLat: 24.5, minLng: 92.2, maxLng: 93.4 }, helplines: [] },
  "Nagaland": { code: "NL", capital: "Kohima", lat: 25.6751, lng: 94.1086, bounds: { minLat: 25.2, maxLat: 27.0, minLng: 93.3, maxLng: 95.2 }, helplines: [] },
  "Puducherry": { code: "PY", capital: "Pondicherry", lat: 11.9416, lng: 79.8083, bounds: { minLat: 11.7, maxLat: 12.1, minLng: 79.6, maxLng: 80.0 }, helplines: [] },
  "Sikkim": { code: "SK", capital: "Gangtok", lat: 27.3389, lng: 88.6065, bounds: { minLat: 27.0, maxLat: 28.1, minLng: 88.0, maxLng: 88.9 }, helplines: [] },
  "Tripura": { code: "TR", capital: "Agartala", lat: 23.8315, lng: 91.2868, bounds: { minLat: 22.9, maxLat: 24.5, minLng: 91.1, maxLng: 92.3 }, helplines: [] },
  "Andaman and Nicobar Islands": { code: "AN", capital: "Port Blair", lat: 11.6234, lng: 92.7265, bounds: { minLat: 6.7, maxLat: 13.7, minLng: 92.2, maxLng: 94.0 }, helplines: [] }
};
