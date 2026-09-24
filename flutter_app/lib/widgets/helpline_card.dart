import 'package:flutter/material.dart';
import '../models/helpline.dart';
import '../services/sos_service.dart';

class HelplineCard extends StatelessWidget {
  final Helpline helpline;
  final String activeState;

  const HelplineCard({
    super.key,
    required this.helpline,
    required this.activeState,
  });

  @override
  Widget build(BuildContext context) {
    final isSpecial = helpline.isStateSpecial;

    return Card(
      elevation: isSpecial ? 2 : 0.5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(
          color: isSpecial ? const Color(0xFF2563EB) : const Color(0xFFE2E8F0),
          width: isSpecial ? 1.5 : 1,
        ),
      ),
      color: isSpecial ? const Color(0xFFF8FAFF) : Colors.white,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    helpline.categoryLabel.isNotEmpty
                        ? helpline.categoryLabel.toUpperCase()
                        : helpline.category.toUpperCase(),
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF475569),
                    ),
                  ),
                ),
                if (isSpecial)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: const Color(0xFFDBEAFE),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      "📍 ${helpline.tag ?? activeState}",
                      style: const TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: Color(0xFF1D4ED8),
                      ),
                    ),
                  )
                else
                  const Row(
                    children: [
                      Icon(Icons.circle, size: 7, color: Color(0xFF10B981)),
                      SizedBox(width: 4),
                      Text(
                        "24x7 Active",
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF10B981),
                        ),
                      ),
                    ],
                  ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              helpline.name,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: Color(0xFF0F172A),
              ),
            ),
            if (helpline.description.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(
                helpline.description,
                style: const TextStyle(
                  fontSize: 13,
                  color: Color(0xFF64748B),
                  height: 1.3,
                ),
              ),
            ],
            const SizedBox(height: 14),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  helpline.number,
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFFDC2626),
                    letterSpacing: 0.5,
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () => SOSService.call(helpline.number),
                  icon: const Icon(Icons.phone, size: 16),
                  label: const Text(
                    "CALL",
                    style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFDC2626),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    elevation: 0,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
