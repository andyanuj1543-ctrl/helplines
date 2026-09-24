import 'package:flutter_phone_direct_caller/flutter_phone_direct_caller.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:share_plus/share_plus.dart';

class SOSService {
  /// Directly calls the emergency number
  static Future<void> call(String number) async {
    final clean = number.replaceAll(RegExp(r'[^0-9]'), '');
    try {
      bool? res = await FlutterPhoneDirectCaller.callNumber(clean);
      if (res != true) {
        final uri = Uri.parse("tel:$clean");
        if (await canLaunchUrl(uri)) {
          await launchUrl(uri);
        }
      }
    } catch (e) {
      final uri = Uri.parse("tel:$clean");
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri);
      }
    }
  }

  /// Generates the standard SOS distress message
  static String formatEmergencyMessage({
    required String state,
    required String district,
    required double lat,
    required double lng,
  }) {
    final mapsLink = "https://maps.google.com/?q=${lat.toStringAsFixed(6)},${lng.toStringAsFixed(6)}";
    final time = DateTime.now().toLocal().toString().split('.')[0];
    return "🚨 EMERGENCY SOS! 🚨\n"
        "I need immediate emergency help!\n"
        "Location: $district, $state\n"
        "Live GPS Map: $mapsLink\n"
        "Time: $time\n"
        "Please dispatch police / ambulance immediately!";
  }

  /// Sends emergency dispatch via WhatsApp
  static Future<void> sendWhatsAppSOS({
    required String state,
    required String district,
    required double lat,
    required double lng,
  }) async {
    final text = formatEmergencyMessage(state: state, district: district, lat: lat, lng: lng);
    final url = Uri.parse("https://api.whatsapp.com/send?text=${Uri.encodeComponent(text)}");
    if (await canLaunchUrl(url)) {
      await launchUrl(url, mode: LaunchMode.externalApplication);
    } else {
      Share.share(text);
    }
  }

  /// Sends emergency dispatch via SMS
  static Future<void> sendSmsSOS({
    required String state,
    required String district,
    required double lat,
    required double lng,
  }) async {
    final text = formatEmergencyMessage(state: state, district: district, lat: lat, lng: lng);
    final smsUri = Uri.parse("sms:?body=${Uri.encodeComponent(text)}");
    if (await canLaunchUrl(smsUri)) {
      await launchUrl(smsUri);
    } else {
      Share.share(text);
    }
  }

  /// Shares location link via native share sheet
  static Future<void> shareLocation({
    required String state,
    required String district,
    required double lat,
    required double lng,
  }) async {
    final text = formatEmergencyMessage(state: state, district: district, lat: lat, lng: lng);
    await Share.share(text, subject: "🚨 EMERGENCY SOS - Location Coordinates");
  }
}
