# Helplines • Emergency Response Hub

An intelligent, location-aware Emergency Helpline application designed for India's 28 States & 8 Union Territories. It allows any citizen to describe their emergency or distress in natural language (English or Hindi), dynamically detects their location (GPS or manual selection), and delivers the exact primary helpline (including state-specific overrides like UP 1090 Women Power Line, Delhi DCW 181, Gujarat 181 Abhayam, etc.), immediate action safety advice, and a 1-tap SOS trigger with live GPS coordinates.

---

## 🌟 Key Features

1. **⚡ Fast 1-Tap Emergency Calling (Zero Typing Required)**:
   - 4 prominent, tactile quick-dial hero buttons right at the top:
     - 🚨 **112 POLICE & ERSS**: Instant unified police response.
     - 🚑 **108 AMBULANCE & MEDICAL**: Direct trauma & medical transport.
     - 🌸 **WOMEN SAFETY (State Adaptive)**: Routes to **UP 1090 Women Power Line** in Uttar Pradesh, **Delhi 181 DCW** in Delhi, **Gujarat 181 Abhayam** in Gujarat, and **1091 / 181** nationally.
     - 🔥 **101 FIRE BRIGADE**: Direct fire and rescue brigade.

2. **⚡ Panic 3x Click / Triple-Tap Trigger**:
   - **Triple-Tap on Screen**: Tapping rapidly 3 times anywhere on the screen immediately triggers emergency SOS mode.
   - **Keypress Trigger**: Pressing Power / Space / Escape keys 3 times in quick succession triggers instant SOS.
   - **Actions Triggered**: Starts siren audio alarm, vibrates device, and displays the direct 112 emergency dialer with pre-composed GPS location dispatch.

3. **🎙️ Voice Recognition with "HELP" Emergency Hotword**:
   - Tap the microphone button (`🎙️`) to speak in English or Hindi.
   - **Hotword Immediate Trigger**: Simply saying **"HELP"**, **"BACHAO"**, **"EMERGENCY"**, or **"MADAD"** immediately activates 112 Emergency SOS without needing to say anything else!
   - Understands distress queries (e.g., *"someone is following me"*, *"fire in kitchen cylinder"*, *"lost money in UPI fraud"*).

4. **📍 Live Location Pin & GPS Coordinates Dispatch**:
   - Displays real-time street name, district, state, and GPS coordinates (with accuracy radius).
   - 1-Tap **WhatsApp GPS Pin** and **SMS Coordinates** buttons that format a ready-to-dispatch message with a direct Google Maps link (`https://maps.google.com/?q=LAT,LNG`).
   - **Live GPS Access**: Uses device GPS to obtain latitude, longitude, and accuracy.
   - **Reverse Geocoding with Offline Fallback**: Maps GPS coordinates to Indian States/UTs using geographic bounding-boxes and centroids, ensuring location awareness works even offline!
   - **State Selector**: Instant manual switcher covering all 28 States and 8 Union Territories.
   - **State Emergency Specialization**:
     - **Uttar Pradesh**: Highlights UP 112 Patrol (<10 min PRV response), UP 1090 Women Power Line (WPL), 1076 CM Helpline, 102 Matri Shishu Ambulance, and 1800-180-8777 Expressway Rescue.
     - **Delhi**: Highlights Delhi 112, 181 DCW Rapid Rescue, 1091 Women Police Cell, 1095 Traffic Emergency, and 1291 Senior Citizen Cell.
     - **Maharashtra**: Highlights Dial 112 MH, 103 Mumbai Women/Child, 8454999999 Police WhatsApp dispatch, and 108 MEMS.
     - **Karnataka**: Highlights Namma 112, Vanitha Sahayavani 1091, and Arogya Sahayavani 104.
     - **Gujarat**: Highlights Gujarat 112 and 181 Abhayam Women Rescue Vans.
     - **Tamil Nadu**: Highlights TN 112, Sneha Suicide Prevention (044-24640050), and 104 Health advice.
     - **Kerala**: Highlights Kerala 112, Disha 1056 Tele-health, and Pink Police Patrol.
     - Plus Bihar, West Bengal, Rajasthan, Madhya Pradesh, Punjab, Haryana, Telangana, Andhra Pradesh, J&K, Uttarakhand, Odisha, and all other states & UTs!

3. **1-Tap Emergency SOS Bar**:
   - **1-Tap Dial 112**: Rapid national emergency trigger.
   - **Live GPS Sharing**: Instantly generates an emergency distress message with an exact Google Maps coordinate pin (`https://maps.google.com/?q=LAT,LNG`) and dispatches via WhatsApp or SMS.
   - **Synthetic Siren Alarm**: High-pitch European/US police oscillator synthesized in real-time via Web Audio API (works 100% offline without audio files).

---

## 🚀 How to Run the Applications

### Option A: Run the Live Web App (Instant Browser Test)

The project includes a self-contained, responsive web application ready to run right now:

```bash
# 1. Start the zero-dependency local server
node server.js

# 2. Open in your browser:
http://localhost:3000
```

*(You can also test this on your phone by opening `http://<your-mac-ip>:3000` while connected to the same Wi-Fi network!)*

---

### Option B: Run the Flutter Mobile App (iOS / Android)

The full cross-platform Flutter mobile codebase is located in the `flutter_app/` directory:

```bash
cd flutter_app

# 1. Fetch dependencies
flutter pub get

# 2. Run on connected Android / iOS device or Simulator
flutter run
```

#### Native Permissions Configured:
- **Android** (`android/app/src/main/AndroidManifest.xml`):
  - `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`
  - `CALL_PHONE`, `SEND_SMS`, `INTERNET`
  - Intent queries for `tel:`, `sms:`, `whatsapp:`, `https:`
- **iOS** (`ios/Runner/Info.plist`):
  - `NSLocationWhenInUseUsageDescription`
  - `LSApplicationQueriesSchemes` for `tel`, `sms`, `whatsapp`

---

## 📁 Project Architecture

```
Helplines/
├── index.html                   # Modern Emergency Web App interface
├── server.js                    # Zero-dependency local Node static server
├── css/
│   └── styles.css               # Accessible, high-contrast, mobile-first design
├── js/
│   ├── app.js                   # Application lifecycle controller
│   ├── data.js                  # 28 States + 8 UTs + National Helplines Database
│   ├── location_service.js      # GPS, reverse geocoding & offline boundary matcher
│   ├── nlp_matcher.js           # Smart natural language distress query engine
│   └── sos_service.js           # Web Audio siren, WhatsApp/SMS location dispatch
└── flutter_app/                 # Full Flutter Mobile Codebase (iOS & Android)
    ├── pubspec.yaml             # Flutter configuration with geolocator, url_launcher
    ├── android/                 # Android manifest with native permissions
    ├── ios/                     # iOS Info.plist with location descriptions
    └── lib/
        ├── main.dart            # Flutter app entry point with Material 3 theme
        ├── models/              # Helpline, StateInfo & EmergencyMatchResult models
        ├── data/                # Pan-India 36 States/UTs helpline data
        ├── services/            # LocationService, SmartNLPService, SOSService
        ├── widgets/             # Reusable HelplineCard, Category Chips
        └── screens/             # HomeScreen, StateSelectorSheet, SOS Dialog
```
