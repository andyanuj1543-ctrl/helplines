// Smart Emergency Natural Language Need Matcher
// Analyzes free-form user distress queries (English, Hindi, Hinglish)
// Resolves: Intent, Urgency, Category, State-specific overrides, and immediate action advice.

import { NATIONAL_HELPLINES, INDIA_STATES_DATA } from './data.js';

const CITY_STATE_MAP = {
  // UP
  "lucknow": "Uttar Pradesh", "kanpur": "Uttar Pradesh", "varanasi": "Uttar Pradesh",
  "noida": "Uttar Pradesh", "greater noida": "Uttar Pradesh", "ghaziabad": "Uttar Pradesh",
  "agra": "Uttar Pradesh", "prayagraj": "Uttar Pradesh", "allahabad": "Uttar Pradesh",
  "meerut": "Uttar Pradesh", "bareilly": "Uttar Pradesh", "aligarh": "Uttar Pradesh",
  "moradabad": "Uttar Pradesh", "gorakhpur": "Uttar Pradesh", "up": "Uttar Pradesh",
  "uttar pradesh": "Uttar Pradesh", "purvanchal": "Uttar Pradesh",

  // Delhi
  "delhi": "Delhi", "new delhi": "Delhi", "ncr": "Delhi", "dwarka": "Delhi",
  "rohini": "Delhi", "saket": "Delhi", "connaught place": "Delhi", "cp": "Delhi",

  // Maharashtra
  "mumbai": "Maharashtra", "pune": "Maharashtra", "nagpur": "Maharashtra",
  "thane": "Maharashtra", "nashik": "Maharashtra", "aurangabad": "Maharashtra",
  "navi mumbai": "Maharashtra", "maharashtra": "Maharashtra",

  // Karnataka
  "bengaluru": "Karnataka", "bangalore": "Karnataka", "mysuru": "Karnataka",
  "mysore": "Karnataka", "mangalore": "Karnataka", "hubli": "Karnataka",
  "karnataka": "Karnataka",

  // Tamil Nadu
  "chennai": "Tamil Nadu", "coimbatore": "Tamil Nadu", "madurai": "Tamil Nadu",
  "tamil nadu": "Tamil Nadu", "tn": "Tamil Nadu",

  // Gujarat
  "ahmedabad": "Gujarat", "surat": "Gujarat", "vadodara": "Gujarat",
  "rajkot": "Gujarat", "gandhinagar": "Gujarat", "gujarat": "Gujarat",

  // Rajasthan
  "jaipur": "Rajasthan", "jodhpur": "Rajasthan", "udaipur": "Rajasthan",
  "kota": "Rajasthan", "rajasthan": "Rajasthan",

  // West Bengal
  "kolkata": "West Bengal", "howrah": "West Bengal", "siliguri": "West Bengal",
  "west bengal": "West Bengal", "bengal": "West Bengal",

  // Kerala
  "kochi": "Kerala", "thiruvananthapuram": "Kerala", "trivandrum": "Kerala",
  "kozhikode": "Kerala", "calicut": "Kerala", "kerala": "Kerala",

  // Madhya Pradesh
  "bhopal": "Madhya Pradesh", "indore": "Madhya Pradesh", "gwalior": "Madhya Pradesh",
  "jabalpur": "Madhya Pradesh", "madhya pradesh": "Madhya Pradesh", "mp": "Madhya Pradesh",

  // Bihar
  "patna": "Bihar", "gaya": "Bihar", "muzaffarpur": "Bihar", "bhagalpur": "Bihar",
  "bihar": "Bihar",

  // Telangana & AP
  "hyderabad": "Telangana", "secunderabad": "Telangana", "warangal": "Telangana",
  "telangana": "Telangana", "visakhapatnam": "Andhra Pradesh", "vizag": "Andhra Pradesh",
  "vijayawada": "Andhra Pradesh", "andhra": "Andhra Pradesh",

  // Punjab & Haryana
  "chandigarh": "Punjab", "ludhiana": "Punjab", "amritsar": "Punjab",
  "punjab": "Punjab", "gurgaon": "Haryana", "gurugram": "Haryana",
  "faridabad": "Haryana", "haryana": "Haryana",

  // J&K, UK, HP, Goa
  "srinagar": "Jammu and Kashmir", "jammu": "Jammu and Kashmir",
  "dehradun": "Uttarakhand", "haridwar": "Uttarakhand", "rishikesh": "Uttarakhand", "uttarakhand": "Uttarakhand",
  "shimla": "Himachal Pradesh", "manali": "Himachal Pradesh", "himachal": "Himachal Pradesh",
  "goa": "Goa", "panaji": "Goa", "margao": "Goa"
};

const CATEGORY_RULES = [
  {
    category: "women",
    label: "Women Safety & Harassment Support",
    urgency: "CRITICAL",
    primaryNationalId: "nat-1090", // 1091/181
    icon: "shield-alert",
    actionTips: [
      "If in immediate physical danger, stay in a public crowded place or enter a nearby commercial store.",
      "Share your live GPS coordinates with trusted emergency contacts or police via the 1-Tap SOS below.",
      "In Uttar Pradesh, Dial UP 1090 (Women Power Line) - counselors initiate active police surveillance against harassers."
    ],
    triggers: [
      "women", "woman", "girl", "lady", "female", "sister", "wife", "mother", "daughter",
      "mahila", "ladki", "aurat", "behan", "patni", "biwi", "maa", "bhabhi",
      "stalk", "stalking", "stalker", "harass", "harassment", "eve tease", "eve teasing",
      "molest", "molestation", "rape", "domestic violence", "marpeet", "abuse", "assaulted me",
      "following me", "chhedkhani", "tang kar raha", "pareshan kar raha", "threat to girl",
      "obscene call", "vulgar call", "1090", "wpl", "she teams", "dowry", "mar pit", "forced"
    ]
  },
  {
    category: "fire",
    label: "Fire & Explosion Emergency",
    urgency: "CRITICAL",
    primaryNationalId: "nat-101",
    icon: "flame",
    actionTips: [
      "Evacuate immediately! Do NOT use elevators under any circumstances.",
      "Stay low to the ground to avoid inhaling poisonous carbon monoxide smoke.",
      "If gas cylinder is leaking, do NOT turn on or off any electric switches."
    ],
    triggers: [
      "fire", "aag", "smoke", "dhuan", "flame", "burning", "burn", "cylinder", "gas leak",
      "explosion", "blast", "short circuit", "building fire", "spark", "trapped in fire",
      "house fire", "kitchen fire", "factory fire", "aag lag gayi", "dhuwan", "patakha"
    ]
  },
  {
    category: "ambulance",
    label: "Medical Emergency & Ambulance",
    urgency: "CRITICAL",
    primaryNationalId: "nat-108",
    icon: "ambulance",
    actionTips: [
      "Keep the patient calm and do not crowd around them. Ensure fresh airflow.",
      "If suspected cardiac arrest / unconscious with no pulse, begin CPR (hands-only chest compressions).",
      "If bleeding heavily, apply firm, continuous pressure with a clean cloth."
    ],
    triggers: [
      "ambulance", "medical", "doctor", "hospital", "heart attack", "chest pain",
      "unconscious", "fainted", "collapsed", "bleeding", "blood", "accident", "injured",
      "chot", "khoon", "stroke", "paralysis", "breathing issue", "breathless", "asthma attack",
      "fracture", "head injury", "pregnant", "delivery", "labor pain", "labour", "poisoning",
      "snake bite", "choking", "seizure", "fit", "dora", "oxygen", "emergency patient", "mar raha hai", "bachao"
    ]
  },
  {
    category: "police",
    label: "Police & Crime Emergency",
    urgency: "CRITICAL",
    primaryNationalId: "nat-112",
    icon: "shield",
    actionTips: [
      "Move to a safe, secure, well-lit location away from the attackers or crime scene.",
      "Do not disturb any evidence, fingerprints, or items at the scene of crime.",
      "Note down vehicle registration numbers, physical descriptions, and escape direction."
    ],
    triggers: [
      "police", "thana", "theft", "stolen", "robbery", "robbed", "dacoit", "burglar", "burglary",
      "chor", "chori", "loot", "fight", "laddai", "marpeet", "attack", "assault", "weapon", "knife",
      "gun", "shooting", "threat", "blackmail", "gunda", "goons", "kidnap", "kidnapped", "extortion",
      "hostage", "trespass", "kabza", "police help", "crime", "fir", "chalan", "dhamki"
    ]
  },
  {
    category: "cyber",
    label: "Cyber Crime & Financial Fraud",
    urgency: "HIGH",
    primaryNationalId: "nat-1930",
    icon: "laptop",
    actionTips: [
      "Golden Hour Rule: Report within 2 hours to freeze fraudulent money transfers before cash-out.",
      "Immediately block your debit/credit card or netbanking via your bank's mobile app or hotline.",
      "Never share OTP or PIN with anyone claiming to be bank or police officials."
    ],
    triggers: [
      "cyber", "online fraud", "scam", "scammed", "bank fraud", "upi fraud", "upi", "google pay",
      "phonepe", "paytm fraud", "otp", "hacked", "hack", "phishing", "credit card fraud",
      "debit card fraud", "atm fraud", "atm skim", "lottery scam", "part time job scam",
      "telegram scam", "fake call", "loan app", "sextortion", "nude video call", "deepfake",
      "money deducted", "paise kat gaye", "account hacked", "identity theft", "1930"
    ]
  },
  {
    category: "mental_health",
    label: "Mental Health & Crisis Intervention",
    urgency: "HIGH",
    primaryNationalId: "nat-14416",
    icon: "brain",
    actionTips: [
      "You are not alone. Free, confidential, compassionate counselors are waiting to speak with you 24x7.",
      "Take slow, deep breaths: 4 seconds in, hold for 4 seconds, exhale for 4 seconds.",
      "Reach out immediately to Tele-MANAS (14416) or KIRAN (1800-599-0019)."
    ],
    triggers: [
      "suicide", "suicidal", "kill myself", "want to die", "end my life", "depression", "depressed",
      "anxiety", "panic attack", "hopeless", "crying", "stress", "mental breakdown", "cant take it",
      "can't live", "give up", "alone", "marne ka mann", "jeena nahi chahta", "zehar kha",
      "cut wrists", "self harm", "counselling", "therapy", "tele-manas", "kiran", "emotional pain"
    ]
  },
  {
    category: "child",
    label: "Child Safety & Protection",
    urgency: "HIGH",
    primaryNationalId: "nat-1098",
    icon: "baby",
    actionTips: [
      "Dial 1098 (Childline India) for free, 24-hour national emergency child protection.",
      "Ensure the child is comforted, safe from harm, and provided water/basic care.",
      "Never leave an abandoned infant or young child unsupervised."
    ],
    triggers: [
      "child", "kid", "minor", "baby", "infant", "bachha", "bachi", "lost child", "missing child",
      "child abuse", "child labour", "child begging", "orphan", "trafficking", "school bullying",
      "pocso", "abandoned baby", "child beaten", "child marriage"
    ]
  },
  {
    category: "road",
    label: "Highway Breakdown & Road Incident",
    urgency: "HIGH",
    primaryNationalId: "nat-1033",
    icon: "car",
    actionTips: [
      "Turn on vehicle hazard lights immediately and move off the active carriageway to the shoulder.",
      "Place emergency warning triangle 50 meters behind the vehicle.",
      "Dial 1033 for National Highway patrol ambulance, towing crane, or fuel delivery."
    ],
    triggers: [
      "highway", "expressway", "toll", "car breakdown", "bike breakdown", "puncture", "flat tyre",
      "towing", "crane", "car stalled", "engine smoke", "nhai", "expressway accident",
      "purvanchal expressway", "yamuna expressway", "gaadi kharab", "highway help", "stranded on road"
    ]
  },
  {
    category: "disaster",
    label: "Natural Disaster & Structural Collapse",
    urgency: "CRITICAL",
    primaryNationalId: "nat-1078",
    icon: "cloud-lightning",
    actionTips: [
      "During earthquake: Drop, Cover, and Hold on under sturdy furniture; stay away from windows.",
      "During flood: Move immediately to higher elevation; never attempt to walk or drive in moving floodwater.",
      "Turn off the main electrical breaker and gas valve if safe to do so."
    ],
    triggers: [
      "disaster", "flood", "earthquake", "cyclone", "tsunami", "landslide", "cloudburst",
      "building collapse", "bridge collapse", "baarh", "bhukamp", "toofan", "ndrf", "relief camp",
      "drowning in flood", "trapped under debris"
    ]
  },
  {
    category: "senior",
    label: "Senior Citizen Support & Elder Care",
    urgency: "MEDIUM",
    primaryNationalId: "nat-14567",
    icon: "user-check",
    actionTips: [
      "Dial 14567 (Elder Line) for nationwide legal guidance, emotional companionship, and rescue from abuse.",
      "In Delhi, contact Delhi Police Senior Citizen Cell (1291) for designated beat officer visits."
    ],
    triggers: [
      "senior citizen", "elderly", "old age", "bujurg", "old parents", "elder abuse",
      "pension", "abandoned parents", "dada", "dadi", "old person stranded", "elder line"
    ]
  },
  {
    category: "poison",
    label: "Poisoning & Toxic Exposure",
    urgency: "CRITICAL",
    primaryNationalId: "nat-poison",
    icon: "biohazard",
    actionTips: [
      "Call National Poisons Information Centre (AIIMS) at 1800-116-117 immediately.",
      "Do NOT induce vomiting unless specifically instructed by a poison specialist.",
      "Keep the container, label, or chemical packaging ready to read ingredients to the doctor."
    ],
    triggers: [
      "poison", "zehar", "toxic", "chemical swallowed", "acid ingestion", "consumed bleach",
      "swallowed pesticide", "rat poison", "snake bite", "saanp kaat liya", "medicine overdose"
    ]
  },
  {
    category: "railway",
    label: "Railway Security & Journey Emergency",
    urgency: "HIGH",
    primaryNationalId: "nat-139",
    icon: "train",
    actionTips: [
      "Dial 139 (RailMadad) or pull the emergency alarm chain in life-threatening distress.",
      "Provide Train Number, Coach Number (e.g. B2, S4), and Berth Number for RPF boarding at the next station."
    ],
    triggers: [
      "railway", "train", "station", "coach", "berth", "rail", "railmadad", "rpf", "irctc",
      "theft in train", "harassment on train", "train medical emergency", "passenger dispute"
    ]
  }
];

export class SmartNLPService {
  /**
   * Matches user input text to best emergency helplines taking state/location into account
   * @param {string} rawQuery User typed query
   * @param {string} activeState Current selected or detected Indian State/UT (e.g. "Uttar Pradesh")
   */
  static matchNeed(rawQuery, activeState = "Uttar Pradesh") {
    if (!rawQuery || rawQuery.trim().length === 0) {
      return null;
    }

    const query = rawQuery.toLowerCase().trim();

    // 1. Detect if the user explicitly mentioned a city or state in their query
    let detectedState = null;
    let queryWithoutState = query;

    for (const [locationKey, stateName] of Object.entries(CITY_STATE_MAP)) {
      const regex = new RegExp(`\\b${locationKey}\\b`, 'i');
      if (regex.test(query)) {
        detectedState = stateName;
        break;
      }
    }

    const effectiveState = detectedState || activeState;
    const stateData = INDIA_STATES_DATA[effectiveState] || INDIA_STATES_DATA["Uttar Pradesh"];

    // 2. Score each category based on keyword matches, phrase occurrences, and weights
    let bestRule = null;
    let maxScore = 0;

    for (const rule of CATEGORY_RULES) {
      let score = 0;

      for (const trigger of rule.triggers) {
        if (query.includes(trigger)) {
          // Exact word match vs substring
          const isExactWord = new RegExp(`\\b${trigger}\\b`, 'i').test(query);
          score += isExactWord ? (trigger.length > 5 ? 5 : 3) : 2;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestRule = rule;
      }
    }

    // Default to ERSS unified emergency 112 if no specific pattern is found or score is very low
    if (!bestRule || maxScore === 0) {
      const nat112 = NATIONAL_HELPLINES.find(h => h.id === "nat-112");
      return {
        matched: false,
        confidence: "LOW",
        category: "unified",
        categoryLabel: "General Emergency (ERSS 112)",
        urgency: "CRITICAL",
        effectiveState,
        detectedState,
        primaryHelpline: nat112,
        stateSpecificHelplines: (stateData.helplines || []).slice(0, 2),
        alternativeHelplines: [NATIONAL_HELPLINES.find(h => h.id === "nat-100"), NATIONAL_HELPLINES.find(h => h.id === "nat-108")].filter(Boolean),
        actionTips: [
          "When in doubt, immediately dial 112 for Police, Fire, or Medical assistance across India.",
          "Keep calm and state your location clearly with prominent nearby landmarks.",
          "Use the 1-Tap SOS button to share your real-time GPS coordinates."
        ],
        querySummary: `Could not identify a specific sub-category for "${rawQuery}". Routed to National Emergency 112.`
      };
    }

    // 3. Find primary and alternative helplines
    // Check if the state has a specialized line for this category!
    // Example: If in UP and category is "women", UP has 1090 (Women Power Line)!
    // If in Delhi and category is "women", Delhi has 181 (DCW) and 1091!
    // If in Gujarat and category is "women", Gujarat has 181 (Abhayam)!
    const stateHelplines = stateData.helplines || [];
    const stateMatch = stateHelplines.find(h => h.category === bestRule.category || (bestRule.category === "police" && h.category === "unified"));

    let primaryHelpline = null;
    let specialNote = null;

    if (stateMatch && stateMatch.isStateSpecial) {
      primaryHelpline = stateMatch;
      specialNote = `Recommended for ${effectiveState}: ${stateMatch.name} (${stateMatch.tag || 'Special State Emergency Line'})`;
    } else {
      primaryHelpline = NATIONAL_HELPLINES.find(h => h.id === bestRule.primaryNationalId) || NATIONAL_HELPLINES[0];
    }

    // Secondary / Alternative Helplines
    const alternativeHelplines = [];

    // Always include 112 if 112 is not already the primary
    const nat112 = NATIONAL_HELPLINES.find(h => h.id === "nat-112");
    if (primaryHelpline.number !== "112" && nat112) {
      alternativeHelplines.push(nat112);
    }

    // Add state lines if available
    for (const sh of stateHelplines) {
      if (sh.id !== primaryHelpline.id && !alternativeHelplines.some(a => a.number === sh.number)) {
        if (sh.category === bestRule.category || sh.category === "unified") {
          alternativeHelplines.push(sh);
        }
      }
    }

    // Add remaining national lines in same category
    for (const nh of NATIONAL_HELPLINES) {
      if (nh.id !== primaryHelpline.id && nh.category === bestRule.category && !alternativeHelplines.some(a => a.number === nh.number)) {
        alternativeHelplines.push(nh);
      }
    }

    return {
      matched: true,
      confidence: maxScore >= 5 ? "HIGH" : "MEDIUM",
      score: maxScore,
      category: bestRule.category,
      categoryLabel: bestRule.label,
      urgency: bestRule.urgency,
      effectiveState,
      detectedState,
      specialNote,
      primaryHelpline,
      alternativeHelplines: alternativeHelplines.slice(0, 3),
      actionTips: bestRule.actionTips,
      querySummary: `Identified need: ${bestRule.label} in ${effectiveState}.`
    };
  }
}
