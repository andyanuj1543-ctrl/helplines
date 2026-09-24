import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../data/helpline_data.dart';
import '../models/helpline.dart';
import '../services/location_service.dart';
import '../services/smart_nlp_service.dart';
import '../services/sos_service.dart';
import '../widgets/helpline_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final LocationService _locationService = LocationService();
  final TextEditingController _searchController = TextEditingController();

  EmergencyMatchResult? _matchResult;
  String _selectedCategory = 'all';
  final List<int> _tapTimestamps = [];

  final List<Map<String, String>> _categories = [
    {"key": "all", "label": "All Helplines"},
    {"key": "unified", "label": "🚨 ERSS 112"},
    {"key": "police", "label": "👮 Police (100)"},
    {"key": "women", "label": "🌸 Women (1090/181)"},
    {"key": "ambulance", "label": "🚑 Ambulance (108)"},
    {"key": "fire", "label": "🔥 Fire (101)"},
    {"key": "cyber", "label": "💻 Cyber (1930)"},
    {"key": "mental_health", "label": "🧠 Mental Health"},
    {"key": "child", "label": "👶 Childline (1098)"},
    {"key": "road", "label": "🛣️ Highway (1033)"},
    {"key": "senior", "label": "👴 Senior (14567)"},
    {"key": "disaster", "label": "🌪️ Disaster (1078)"},
    {"key": "poison", "label": "☠️ Poison (AIIMS)"},
    {"key": "railway", "label": "🚆 Railway (139)"},
  ];

  final List<Map<String, String>> _scenarios = [
    {"icon": "🏃‍♀️", "title": "Stalker / Harassment", "query": "Someone is following me and harassing girl women"},
    {"icon": "💔", "title": "Heart Attack / Fainting", "query": "Heart attack chest pain uncle unconscious collapsed"},
    {"icon": "🩸", "title": "Road Accident / Blood", "query": "Road accident severe bleeding injured on road"},
    {"icon": "🔥", "title": "Fire / Gas Leak", "query": "Fire in kitchen building cylinder blast smoke"},
    {"icon": "💳", "title": "Bank / Cyber Fraud", "query": "Money stolen from bank account online fraud UPI scam"},
    {"icon": "🧠", "title": "Suicide / Mental Help", "query": "Feeling suicidal depressed want to end life help"},
    {"icon": "🚗", "title": "Highway Breakdown", "query": "Highway car breakdown flat tyre towing accident"},
    {"icon": "👶", "title": "Lost Child / Abuse", "query": "Child abuse minor kid lost orphan baby"},
  ];

  @override
  void initState() {
    super.initState();
    _locationService.addListener(() {
      if (mounted) setState(() {});
    });
    _locationService.requestLiveGPS();
  }

  @override
  void dispose() {
    _searchController.dispose();
    _locationService.dispose();
    super.dispose();
  }

  void _onSearchChanged(String val) {
    if (val.trim().isEmpty) {
      setState(() {
        _matchResult = null;
      });
      return;
    }
    final result = SmartNLPService.matchQuery(
      val,
      _locationService.currentState,
    );
    setState(() {
      _matchResult = result;
    });
  }

  void _triggerScenario(String query) {
    _searchController.text = query;
    _onSearchChanged(query);
  }

  void _recordScreenTap() {
    final now = DateTime.now().millisecondsSinceEpoch;
    _tapTimestamps.add(now);
    _tapTimestamps.removeWhere((t) => now - t > 1400);

    if (_tapTimestamps.length >= 3) {
      _tapTimestamps.clear();
      HapticFeedback.heavyImpact();
      _showSosConfirmation();
    }
  }

  void _openVoiceDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Row(
          children: [
            Icon(Icons.mic, color: Color(0xFFDC2626), size: 28),
            SizedBox(width: 8),
            Text("Voice Emergency Input", style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              "Speak or say \"HELP\" (बचाओ) to trigger 112 SOS immediately!",
              style: TextStyle(fontSize: 13, color: Color(0xFF475569)),
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.pop(ctx);
                _showSosConfirmation();
              },
              icon: const Icon(Icons.warning, color: Colors.white),
              label: const Text("I NEED HELP (SOS 112)"),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFDC2626),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text("Close"),
          ),
        ],
      ),
    );
  }

  void _openStateSelector() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        String query = "";
        return StatefulBuilder(
          builder: (context, setModalState) {
            final states = kIndiaStates.keys.where((s) => s.toLowerCase().contains(query.toLowerCase())).toList()..sort();

            return DraggableScrollableSheet(
              initialChildSize: 0.75,
              maxChildSize: 0.9,
              minChildSize: 0.5,
              expand: false,
              builder: (_, scrollController) {
                return Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 16, 20, 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            "Select State / UT",
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                          ),
                          IconButton(
                            icon: const Icon(Icons.close),
                            onPressed: () => Navigator.pop(ctx),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: TextField(
                        decoration: InputDecoration(
                          hintText: "Search 28 States & 8 UTs...",
                          prefixIcon: const Icon(Icons.search),
                          filled: true,
                          fillColor: const Color(0xFFF1F5F9),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 16),
                        ),
                        onChanged: (v) {
                          setModalState(() {
                            query = v;
                          });
                        },
                      ),
                    ),
                    const SizedBox(height: 8),
                    ListTile(
                      leading: const Icon(Icons.my_location, color: Color(0xFF2563EB)),
                      title: const Text(
                        "Auto-detect Live GPS Location",
                        style: TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF2563EB)),
                      ),
                      onTap: () {
                        Navigator.pop(ctx);
                        _locationService.requestLiveGPS();
                      },
                    ),
                    const Divider(height: 1),
                    Expanded(
                      child: ListView.builder(
                        controller: scrollController,
                        itemCount: states.length,
                        itemBuilder: (context, index) {
                          final stateName = states[index];
                          final isCurrent = stateName == _locationService.currentState;
                          final info = kIndiaStates[stateName]!;

                          return ListTile(
                            title: Text(
                              stateName,
                              style: TextStyle(
                                fontWeight: isCurrent ? FontWeight.w800 : FontWeight.w500,
                                color: isCurrent ? const Color(0xFF2563EB) : const Color(0xFF0F172A),
                              ),
                            ),
                            subtitle: Text("Capital: ${info.capital}"),
                            trailing: isCurrent ? const Icon(Icons.check_circle, color: Color(0xFF2563EB)) : null,
                            onTap: () {
                              _locationService.setStateManual(stateName);
                              Navigator.pop(ctx);
                              if (_searchController.text.isNotEmpty) {
                                _onSearchChanged(_searchController.text);
                              }
                            },
                          );
                        },
                      ),
                    ),
                  ],
                );
              },
            );
          },
        );
      },
    );
  }

  List<Helpline> _getFilteredDirectory() {
    final stateHelplines = _locationService.currentStateInfo.helplines;
    final List<Helpline> list = [];

    if (_selectedCategory == 'all') {
      list.addAll(stateHelplines);
      list.addAll(kNationalHelplines);
    } else {
      list.addAll(stateHelplines.where((h) => h.category == _selectedCategory || (_selectedCategory == 'police' && h.category == 'unified')));
      list.addAll(kNationalHelplines.where((h) => h.category == _selectedCategory));
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final currentState = _locationService.currentState;
    final stateInfo = _locationService.currentStateInfo;
    final filteredList = _getFilteredDirectory();

    // Determine state-specific women line
    String womenNumber = "1091";
    String womenTitle = "WOMEN SAFETY";
    if (currentState == "Uttar Pradesh") {
      womenNumber = "1090";
      womenTitle = "UP 1090 WPL";
    } else if (currentState == "Delhi" || currentState == "Gujarat") {
      womenNumber = "181";
      womenTitle = currentState == "Delhi" ? "DELHI 181 DCW" : "GUJARAT 181";
    }

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        title: const Row(
          children: [
            Icon(Icons.shield, color: Color(0xFFDC2626)),
            SizedBox(width: 8),
            Text(
              "Helplines",
              style: TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.w900, fontSize: 18),
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: ActionChip(
              avatar: _locationService.isLoading
                  ? const SizedBox(
                      width: 12,
                      height: 12,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : Icon(
                      Icons.circle,
                      size: 9,
                      color: _locationService.isLiveGPS ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
                    ),
              label: Text(
                "${_locationService.district}, ${_locationService.currentState}",
                style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12),
              ),
              backgroundColor: const Color(0xFFF1F5F9),
              side: const BorderSide(color: Color(0xFFCBD5E1)),
              onPressed: _openStateSelector,
            ),
          ),
        ],
      ),
      body: GestureDetector(
        behavior: HitTestBehavior.translucent,
        onTap: _recordScreenTap,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ⚡ PANIC 3X TRIGGER BANNER
              InkWell(
                onTap: () {
                  HapticFeedback.heavyImpact();
                  _showSosConfirmation();
                },
                child: Container(
                  margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEE2E2),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFEF4444)),
                  ),
                  child: const Row(
                    children: [
                      Text("⚡ PANIC 3X TRIGGER: ", style: TextStyle(color: Color(0xFFDC2626), fontWeight: FontWeight.w900, fontSize: 10)),
                      Expanded(
                        child: Text(
                          "Tap screen 3 times rapidly or say 'HELP' to call 112 SOS!",
                          style: TextStyle(color: Color(0xFF991B1B), fontSize: 11, fontWeight: FontWeight.w600),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // ⚡ FAST ACCESS HERO: 4 Instant Dial Buttons
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 6),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    "⚡ INSTANT 1-TAP EMERGENCY DIAL",
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Color(0xFF0F172A), letterSpacing: 0.5),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEE2E2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Text(
                      "TAP TO CALL NOW",
                      style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Color(0xFFDC2626)),
                    ),
                  ),
                ],
              ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  Row(
                    children: [
                      // 112 Police / Unified
                      Expanded(
                        child: _buildFastButton(
                          title: "POLICE / 112",
                          subtitle: "All-in-One Patrol",
                          number: "112",
                          icon: Icons.local_police,
                          gradient: const [Color(0xFFDC2626), Color(0xFF991B1B)],
                          onTap: () => SOSService.call("112"),
                        ),
                      ),
                      const SizedBox(width: 10),
                      // 108 Ambulance
                      Expanded(
                        child: _buildFastButton(
                          title: "AMBULANCE",
                          subtitle: "Medical & Trauma",
                          number: "108",
                          icon: Icons.medical_services,
                          gradient: const [Color(0xFF059669), Color(0xFF047857)],
                          onTap: () => SOSService.call("108"),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      // Women Safety
                      Expanded(
                        child: _buildFastButton(
                          title: womenTitle,
                          subtitle: "24x7 Women Force",
                          number: womenNumber,
                          icon: Icons.security,
                          gradient: const [Color(0xFF7C3AED), Color(0xFF5B21B6)],
                          onTap: () => SOSService.call(womenNumber),
                        ),
                      ),
                      const SizedBox(width: 10),
                      // 101 Fire
                      Expanded(
                        child: _buildFastButton(
                          title: "FIRE BRIGADE",
                          subtitle: "Fire & Rescue",
                          number: "101",
                          icon: Icons.local_fire_department,
                          gradient: const [Color(0xFFEA580C), Color(0xFFC2410C)],
                          onTap: () => SOSService.call("101"),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // LIVE GPS LOCATION PIN CARD
            Container(
              margin: const EdgeInsets.fromLTRB(16, 14, 16, 6),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 3, offset: Offset(0, 1))],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.location_on, color: Color(0xFF059669), size: 18),
                      SizedBox(width: 6),
                      Text(
                        "YOUR LIVE LOCATION (SHARE WITH POLICE/AMBULANCE):",
                        style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Color(0xFF059669), letterSpacing: 0.5),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    "${_locationService.district}, ${_locationService.currentState}",
                    style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                  ),
                  Text(
                    "GPS: ${_locationService.latitude.toStringAsFixed(5)}° N, ${_locationService.longitude.toStringAsFixed(5)}° E",
                    style: const TextStyle(fontSize: 11, color: Color(0xFF64748B), fontFamily: 'monospace'),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () {
                            SOSService.sendWhatsAppSOS(
                              state: _locationService.currentState,
                              district: _locationService.district,
                              lat: _locationService.latitude,
                              lng: _locationService.longitude,
                            );
                          },
                          icon: const Icon(Icons.share, size: 14),
                          label: const Text("WhatsApp GPS Pin", style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF25D366),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            elevation: 0,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () {
                            SOSService.sendSmsSOS(
                              state: _locationService.currentState,
                              district: _locationService.district,
                              lat: _locationService.latitude,
                              lng: _locationService.longitude,
                            );
                          },
                          icon: const Icon(Icons.sms, size: 14),
                          label: const Text("SMS Coordinates", style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF0284C7),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            elevation: 0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // 1-TAP SCENARIO EMERGENCY BUTTONS
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 6),
              child: const Text(
                "⚡ COMMON SCENARIOS (1-TAP TO RESOLVE):",
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Color(0xFF475569)),
              ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _scenarios.map((sc) {
                  return InkWell(
                    onTap: () => _triggerScenario(sc["query"]!),
                    borderRadius: BorderRadius.circular(8),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: Border.all(color: const Color(0xFFCBD5E1)),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(sc["icon"]!, style: const TextStyle(fontSize: 14)),
                          const SizedBox(width: 6),
                          Text(sc["title"]!, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Color(0xFF1E293B))),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),

            // Search Bar
            Container(
              margin: const EdgeInsets.fromLTRB(16, 14, 16, 8),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Or Describe what help you need:",
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: "Type what happened (English / Hindi)...",
                      prefixIcon: const Icon(Icons.search, color: Color(0xFF64748B)),
                      suffixIcon: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.mic, color: Color(0xFFDC2626)),
                            onPressed: _openVoiceDialog,
                            tooltip: "Voice Emergency Input",
                          ),
                          if (_searchController.text.isNotEmpty)
                            IconButton(
                              icon: const Icon(Icons.clear),
                              onPressed: () {
                                _searchController.clear();
                                _onSearchChanged("");
                              },
                            ),
                        ],
                      ),
                      filled: true,
                      fillColor: const Color(0xFFF8FAFC),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    ),
                    onChanged: _onSearchChanged,
                  ),
                ],
              ),
            ),

            // Smart Search Result Card
            if (_matchResult != null) _buildMatchResultCard(_matchResult!),

            // Category Directory
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    "Emergency Directory",
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                  ),
                  Text(
                    "${filteredList.length} Helplines",
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF64748B)),
                  ),
                ],
              ),
            ),

            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              child: Row(
                children: _categories.map((c) {
                  final isSelected = _selectedCategory == c["key"];
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    child: ChoiceChip(
                      label: Text(
                        c["label"]!,
                        style: TextStyle(
                          color: isSelected ? Colors.white : const Color(0xFF334155),
                          fontWeight: FontWeight.w700,
                          fontSize: 11,
                        ),
                      ),
                      selected: isSelected,
                      selectedColor: const Color(0xFF0F172A),
                      backgroundColor: Colors.white,
                      onSelected: (selected) {
                        if (selected) {
                          setState(() {
                            _selectedCategory = c["key"]!;
                          });
                        }
                      },
                    ),
                  );
                }).toList(),
              ),
            ),

            const SizedBox(height: 8),

            // Helpline Cards
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: filteredList.length,
              itemBuilder: (context, index) {
                return HelplineCard(
                  helpline: filteredList[index],
                  activeState: currentState,
                );
              },
            ),

            const SizedBox(height: 90),
          ],
        ),
        ),
      ),

      // Fixed Bottom Calling Dock
      bottomNavigationBar: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 10, offset: const Offset(0, -2)),
          ],
        ),
        child: SafeArea(
          child: Row(
            children: [
              Expanded(
                flex: 3,
                child: ElevatedButton.icon(
                  onPressed: () => SOSService.call("112"),
                  icon: const Icon(Icons.call, color: Colors.white),
                  label: const Text(
                    "CALL 112 NOW",
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, letterSpacing: 0.5),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFDC2626),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                    elevation: 3,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                flex: 2,
                child: OutlinedButton.icon(
                  onPressed: () {
                    SOSService.sendWhatsAppSOS(
                      state: _locationService.currentState,
                      district: _locationService.district,
                      lat: _locationService.latitude,
                      lng: _locationService.longitude,
                    );
                  },
                  icon: const Icon(Icons.share_location, size: 18),
                  label: const Text(
                    "Share GPS",
                    style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12),
                  ),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF0F172A),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    side: const BorderSide(color: Color(0xFFCBD5E1)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFastButton({
    required String title,
    required String subtitle,
    required String number,
    required IconData icon,
    required List<Color> gradient,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          gradient: LinearGradient(colors: gradient),
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(color: gradient.first.withOpacity(0.3), blurRadius: 6, offset: const Offset(0, 2)),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Icon(icon, color: Colors.white, size: 26),
                const SizedBox(width: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 12)),
                    Text(subtitle, style: const TextStyle(color: Colors.white70, fontSize: 9)),
                  ],
                ),
              ],
            ),
            Row(
              children: [
                Text(number, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 18)),
                const SizedBox(width: 4),
                const Icon(Icons.phone, color: Colors.white, size: 14),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMatchResultCard(EmergencyMatchResult match) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFEF4444), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: const Color(0xFFDC2626),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  "${match.urgency} ACTION",
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 10),
                ),
              ),
              Text(
                match.effectiveState,
                style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 11, color: Color(0xFF2563EB)),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF5F5),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: const Color(0xFFFECACA)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        match.primaryHelpline.name,
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Color(0xFF991B1B)),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        match.primaryHelpline.number,
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Color(0xFFDC2626)),
                      ),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () => SOSService.call(match.primaryHelpline.number),
                  icon: const Icon(Icons.call, size: 16),
                  label: const Text("CALL NOW", style: TextStyle(fontWeight: FontWeight.w900)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFDC2626),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  ),
                ),
              ],
            ),
          ),
          if (match.actionTips.isNotEmpty) ...[
            const SizedBox(height: 8),
            ...match.actionTips.map((tip) => Padding(
                  padding: const EdgeInsets.only(bottom: 2),
                  child: Text("• $tip", style: const TextStyle(fontSize: 11, color: Color(0xFF334155))),
                )),
          ],
        ],
      ),
    );
  }
}
