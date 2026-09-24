import 'dart:math';
import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
import '../data/helpline_data.dart';
import '../models/helpline.dart';

class LocationService extends ChangeNotifier {
  String _currentState = "Uttar Pradesh";
  String _district = "Lucknow";
  double _latitude = 26.8467;
  double _longitude = 80.9462;
  bool _isLiveGPS = false;
  bool _isLoading = false;

  String get currentState => _currentState;
  String get district => _district;
  double get latitude => _latitude;
  double get longitude => _longitude;
  bool get isLiveGPS => _isLiveGPS;
  bool get isLoading => _isLoading;

  StateInfo get currentStateInfo =>
      kIndiaStates[_currentState] ?? kIndiaStates["Uttar Pradesh"]!;

  String get mapsUrl =>
      "https://maps.google.com/?q=${_latitude.toStringAsFixed(6)},${_longitude.toStringAsFixed(6)}";

  void setStateManual(String stateName) {
    if (kIndiaStates.containsKey(stateName)) {
      final s = kIndiaStates[stateName]!;
      _currentState = stateName;
      _district = s.capital;
      _latitude = s.lat;
      _longitude = s.lng;
      _isLiveGPS = false;
      notifyListeners();
    }
  }

  Future<bool> requestLiveGPS() async {
    _isLoading = true;
    notifyListeners();

    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        _isLoading = false;
        notifyListeners();
        return false;
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          _isLoading = false;
          notifyListeners();
          return false;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        _isLoading = false;
        notifyListeners();
        return false;
      }

      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
        timeLimit: const Duration(seconds: 10),
      );

      _latitude = position.latitude;
      _longitude = position.longitude;
      _isLiveGPS = true;

      // Reverse geocoding
      try {
        List<Placemark> placemarks = await placemarkFromCoordinates(
          _latitude,
          _longitude,
        );
        if (placemarks.isNotEmpty) {
          final place = placemarks.first;
          final stateRaw = place.administrativeArea ?? "";
          final matched = _matchState(stateRaw);
          if (matched != null) {
            _currentState = matched;
          } else {
            _currentState = _findNearestState(_latitude, _longitude);
          }
          _district = place.subAdministrativeArea ?? place.locality ?? place.subLocality ?? kIndiaStates[_currentState]?.capital ?? "Area";
        }
      } catch (e) {
        // Fallback nearest state calculation
        _currentState = _findNearestState(_latitude, _longitude);
        _district = kIndiaStates[_currentState]?.capital ?? "Area";
      }

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  String? _matchState(String raw) {
    final clean = raw.toLowerCase().replaceAll(RegExp(r'state of|union territory of|nct of'), '').trim();
    for (final s in kIndiaStates.keys) {
      if (s.toLowerCase() == clean || clean.contains(s.toLowerCase())) {
        return s;
      }
    }
    return null;
  }

  String _findNearestState(double lat, double lng) {
    String closest = "Uttar Pradesh";
    double minDistance = double.infinity;

    kIndiaStates.forEach((stateName, info) {
      final dLat = lat - info.lat;
      final dLng = lng - info.lng;
      final dist = sqrt(dLat * dLat + dLng * dLng);
      if (dist < minDistance) {
        minDistance = dist;
        closest = stateName;
      }
    });

    return closest;
  }
}
