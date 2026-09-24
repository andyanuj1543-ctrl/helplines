import '../models/helpline.dart';
import '../data/helpline_data.dart';

class SmartNLPService {
  static final Map<String, String> _cityStateMap = {
    "lucknow": "Uttar Pradesh", "kanpur": "Uttar Pradesh", "varanasi": "Uttar Pradesh",
    "noida": "Uttar Pradesh", "ghaziabad": "Uttar Pradesh", "agra": "Uttar Pradesh",
    "delhi": "Delhi", "mumbai": "Maharashtra", "pune": "Maharashtra",
    "bengaluru": "Karnataka", "bangalore": "Karnataka", "chennai": "Tamil Nadu",
    "ahmedabad": "Gujarat", "jaipur": "Rajasthan", "kolkata": "West Bengal",
    "kochi": "Kerala", "bhopal": "Madhya Pradesh", "patna": "Bihar",
    "hyderabad": "Telangana", "chandigarh": "Punjab", "dehradun": "Uttarakhand",
    "shimla": "Himachal Pradesh", "goa": "Goa"
  };

  static final List<Map<String, dynamic>> _rules = [
    {
      "category": "women",
      "label": "Women Safety & Harassment Support",
      "urgency": "CRITICAL",
      "primaryNationalId": "nat-1090",
      "tips": [
        "If in immediate physical danger, stay in a public crowded place or enter a nearby commercial store.",
        "Share your live GPS coordinates with trusted emergency contacts or police via the 1-Tap SOS.",
        "In Uttar Pradesh, Dial UP 1090 (Women Power Line) - counselors initiate active police surveillance."
      ],
      "triggers": [
        "women", "woman", "girl", "lady", "female", "sister", "wife", "mother",
        "mahila", "ladki", "aurat", "behan", "patni", "stalk", "stalking", "harass",
        "harassment", "eve tease", "eve teasing", "molest", "molestation", "domestic violence",
        "marpeet", "abuse", "following me", "chhedkhani", "tang kar raha", "1090", "wpl", "dowry"
      ]
    },
    {
      "category": "fire",
      "label": "Fire & Explosion Emergency",
      "urgency": "CRITICAL",
      "primaryNationalId": "nat-101",
      "tips": [
        "Evacuate immediately! Do NOT use elevators under any circumstances.",
        "Stay low to the ground to avoid inhaling poisonous carbon monoxide smoke.",
        "If gas cylinder is leaking, do NOT turn on or off any electric switches."
      ],
      "triggers": [
        "fire", "aag", "smoke", "dhuan", "flame", "burning", "burn", "cylinder",
        "gas leak", "explosion", "blast", "short circuit", "building fire", "aag lag gayi"
      ]
    },
    {
      "category": "ambulance",
      "label": "Medical Emergency & Ambulance",
      "urgency": "CRITICAL",
      "primaryNationalId": "nat-108",
      "tips": [
        "Keep the patient calm and ensure fresh airflow around them.",
        "If suspected cardiac arrest / unconscious with no pulse, begin CPR (hands-only chest compressions).",
        "If bleeding heavily, apply firm, continuous pressure with a clean cloth."
      ],
      "triggers": [
        "ambulance", "medical", "doctor", "hospital", "heart attack", "chest pain",
        "unconscious", "fainted", "collapsed", "bleeding", "blood", "accident", "injured",
        "chot", "khoon", "stroke", "paralysis", "breathing issue", "breathless", "asthma",
        "fracture", "head injury", "pregnant", "delivery", "labor pain", "labour", "poisoning",
        "snake bite", "seizure", "oxygen", "mar raha hai", "bachao"
      ]
    },
    {
      "category": "police",
      "label": "Police & Crime Emergency",
      "urgency": "CRITICAL",
      "primaryNationalId": "nat-112",
      "tips": [
        "Move to a safe, secure, well-lit location away from the attackers or crime scene.",
        "Do not disturb any evidence or items at the scene of crime.",
        "Note down vehicle registration numbers, physical descriptions, and escape direction."
      ],
      "triggers": [
        "police", "thana", "theft", "stolen", "robbery", "robbed", "burglar", "chor",
        "chori", "loot", "fight", "laddai", "marpeet", "attack", "assault", "knife",
        "gun", "shooting", "threat", "blackmail", "gunda", "kidnap", "extortion", "dhamki"
      ]
    },
    {
      "category": "cyber",
      "label": "Cyber Crime & Financial Fraud",
      "urgency": "HIGH",
      "primaryNationalId": "nat-1930",
      "tips": [
        "Golden Hour Rule: Report within 2 hours to freeze fraudulent money transfers before cash-out.",
        "Immediately block your debit/credit card or netbanking via your bank's hotline.",
        "Never share OTP or PIN with anyone claiming to be bank or police officials."
      ],
      "triggers": [
        "cyber", "online fraud", "scam", "bank fraud", "upi", "google pay", "phonepe",
        "paytm fraud", "otp", "hacked", "hack", "phishing", "credit card fraud",
        "debit card fraud", "atm fraud", "lottery scam", "telegram scam", "fake call",
        "loan app", "sextortion", "paise kat gaye", "account hacked", "1930"
      ]
    },
    {
      "category": "mental_health",
      "label": "Mental Health & Crisis Intervention",
      "urgency": "HIGH",
      "primaryNationalId": "nat-14416",
      "tips": [
        "You are not alone. Free, confidential counselors are available 24x7.",
        "Take slow, deep breaths: 4 seconds in, hold 4 seconds, exhale 4 seconds.",
        "Reach out immediately to Tele-MANAS (14416) or KIRAN (1800-599-0019)."
      ],
      "triggers": [
        "suicide", "suicidal", "kill myself", "want to die", "end my life", "depression",
        "depressed", "anxiety", "panic attack", "hopeless", "crying", "stress", "can't live",
        "marne ka mann", "alone", "counselling", "therapy", "tele-manas", "kiran"
      ]
    },
    {
      "category": "child",
      "label": "Child Safety & Protection",
      "urgency": "HIGH",
      "primaryNationalId": "nat-1098",
      "tips": [
        "Dial 1098 (Childline India) for free, 24-hour national emergency child protection.",
        "Ensure the child is comforted, safe from harm, and provided water/basic care."
      ],
      "triggers": [
        "child", "kid", "minor", "baby", "infant", "bachha", "lost child", "missing child",
        "child abuse", "child labour", "orphan", "trafficking", "pocso", "abandoned baby"
      ]
    },
    {
      "category": "road",
      "label": "Highway Breakdown & Road Incident",
      "urgency": "HIGH",
      "primaryNationalId": "nat-1033",
      "tips": [
        "Turn on vehicle hazard lights immediately and move to the shoulder.",
        "Place emergency warning triangle 50 meters behind the vehicle.",
        "Dial 1033 for National Highway patrol ambulance, towing crane, or fuel delivery."
      ],
      "triggers": [
        "highway", "expressway", "toll", "car breakdown", "bike breakdown", "puncture",
        "flat tyre", "towing", "crane", "car stalled", "nhai", "gaadi kharab", "stranded on road"
      ]
    },
  ];

  static EmergencyMatchResult matchQuery(String query, String activeState) {
    final q = query.toLowerCase().trim();

    // 1. Detect state in query
    String? detectedState;
    for (final entry in _cityStateMap.entries) {
      if (q.contains(entry.key)) {
        detectedState = entry.value;
        break;
      }
    }

    final effectiveState = detectedState ?? activeState;
    final stateInfo = kIndiaStates[effectiveState] ?? kIndiaStates["Uttar Pradesh"]!;

    // 2. Score category rules
    Map<String, dynamic>? bestRule;
    int maxScore = 0;

    for (final rule in _rules) {
      int score = 0;
      final List<String> triggers = rule["triggers"];
      for (final trigger in triggers) {
        if (q.contains(trigger)) {
          score += trigger.length > 5 ? 5 : 2;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestRule = rule;
      }
    }

    if (bestRule == null || maxScore == 0) {
      final nat112 = kNationalHelplines.firstWhere((h) => h.id == "nat-112");
      return EmergencyMatchResult(
        matched: false,
        confidence: "LOW",
        category: "unified",
        categoryLabel: "General Emergency (ERSS 112)",
        urgency: "CRITICAL",
        effectiveState: effectiveState,
        detectedState: detectedState,
        primaryHelpline: nat112,
        alternativeHelplines: kNationalHelplines.take(3).toList(),
        actionTips: [
          "When in doubt, immediately dial 112 for Police, Fire, or Medical assistance.",
          "Keep calm and state your location clearly with prominent landmarks.",
          "Share your GPS coordinates using the 1-Tap SOS button below."
        ],
        querySummary: "Could not identify a specific sub-category. Routed to 112 ERSS.",
      );
    }

    // 3. Resolve State-specific vs National line
    final category = bestRule["category"] as String;
    Helpline? stateMatch;
    for (final sh in stateInfo.helplines) {
      if (sh.category == category || (category == "police" && sh.category == "unified")) {
        stateMatch = sh;
        break;
      }
    }

    Helpline primaryHelpline;
    if (stateMatch != null && stateMatch.isStateSpecial) {
      primaryHelpline = stateMatch;
    } else {
      primaryHelpline = kNationalHelplines.firstWhere(
        (h) => h.id == bestRule!["primaryNationalId"],
        orElse: () => kNationalHelplines.first,
      );
    }

    // Secondary lines
    final List<Helpline> alts = [];
    final nat112 = kNationalHelplines.firstWhere((h) => h.id == "nat-112");
    if (primaryHelpline.number != "112") {
      alts.add(nat112);
    }
    for (final sh in stateInfo.helplines) {
      if (sh.id != primaryHelpline.id && !alts.any((a) => a.number == sh.number)) {
        alts.add(sh);
      }
    }

    return EmergencyMatchResult(
      matched: true,
      confidence: maxScore >= 5 ? "HIGH" : "MEDIUM",
      category: category,
      categoryLabel: bestRule["label"],
      urgency: bestRule["urgency"],
      effectiveState: effectiveState,
      detectedState: detectedState,
      primaryHelpline: primaryHelpline,
      alternativeHelplines: alts.take(3).toList(),
      actionTips: List<String>.from(bestRule["tips"]),
      querySummary: "Identified need: ${bestRule["label"]} in $effectiveState.",
    );
  }
}
