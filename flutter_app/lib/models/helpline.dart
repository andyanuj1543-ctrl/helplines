// Helpline and Emergency Data Models

class Helpline {
  final String id;
  final String name;
  final String shortName;
  final String number;
  final String? altNumber;
  final String category; // unified, police, fire, ambulance, women, cyber, mental_health, child, road, disaster, senior, poison, railway
  final String categoryLabel;
  final String description;
  final bool isStateSpecial;
  final String? tag;
  final bool available24x7;
  final List<String> keywords;

  const Helpline({
    required this.id,
    required this.name,
    this.shortName = '',
    required this.number,
    this.altNumber,
    required this.category,
    this.categoryLabel = '',
    this.description = '',
    this.isStateSpecial = false,
    this.tag,
    this.available24x7 = true,
    this.keywords = const [],
  });
}

class StateInfo {
  final String name;
  final String code;
  final String capital;
  final double lat;
  final double lng;
  final String specialNotes;
  final List<Helpline> helplines;

  const StateInfo({
    required this.name,
    required this.code,
    required this.capital,
    required this.lat,
    required this.lng,
    this.specialNotes = '',
    this.helplines = const [],
  });
}

class EmergencyMatchResult {
  final bool matched;
  final String confidence; // HIGH, MEDIUM, LOW
  final String category;
  final String categoryLabel;
  final String urgency; // CRITICAL, HIGH, MEDIUM
  final String effectiveState;
  final String? detectedState;
  final Helpline primaryHelpline;
  final List<Helpline> alternativeHelplines;
  final List<String> actionTips;
  final String querySummary;

  EmergencyMatchResult({
    required this.matched,
    required this.confidence,
    required this.category,
    required this.categoryLabel,
    required this.urgency,
    required this.effectiveState,
    this.detectedState,
    required this.primaryHelpline,
    this.alternativeHelplines = const [],
    this.actionTips = const [],
    required this.querySummary,
  });
}
