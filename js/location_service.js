// Location Service with Native GPS, Reverse Geocoding & Offline State Boundary Matcher
import { INDIA_STATES_DATA } from './data.js';

export class LocationService {
  constructor() {
    this.currentLocation = {
      latitude: 26.8467,
      longitude: 80.9462,
      state: "Uttar Pradesh",
      district: "Lucknow",
      formattedAddress: "Lucknow, Uttar Pradesh, India",
      accuracy: null,
      isLiveGPS: false,
      timestamp: null
    };

    // Load saved state preference if present
    const savedState = localStorage.getItem("helplines_active_state");
    if (savedState && INDIA_STATES_DATA[savedState]) {
      this.currentLocation.state = savedState;
      this.currentLocation.district = INDIA_STATES_DATA[savedState].capital;
      this.currentLocation.latitude = INDIA_STATES_DATA[savedState].lat;
      this.currentLocation.longitude = INDIA_STATES_DATA[savedState].lng;
    }

    this.listeners = [];
  }

  onLocationChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      try {
        listener(this.currentLocation);
      } catch (e) {
        console.error("Error in location listener:", e);
      }
    }
  }

  /**
   * Requests real GPS coordinates from browser Geolocation API
   */
  async requestGPS() {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = Math.round(position.coords.accuracy);

          this.currentLocation.latitude = lat;
          this.currentLocation.longitude = lng;
          this.currentLocation.accuracy = accuracy;
          this.currentLocation.isLiveGPS = true;
          this.currentLocation.timestamp = new Date();

          // Try reverse geocoding to obtain exact State, District, Address
          const geoInfo = await this.resolveCoordinates(lat, lng);
          this.currentLocation.state = geoInfo.state;
          this.currentLocation.district = geoInfo.district;
          this.currentLocation.formattedAddress = geoInfo.formattedAddress;

          localStorage.setItem("helplines_active_state", this.currentLocation.state);
          this.notifyListeners();
          resolve(this.currentLocation);
        },
        (error) => {
          let msg = "Could not access location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              msg = "Location permission was denied. You can select your state manually from the top bar.";
              break;
            case error.POSITION_UNAVAILABLE:
              msg = "Location information is currently unavailable.";
              break;
            case error.TIMEOUT:
              msg = "The request to get user location timed out.";
              break;
          }
          reject(new Error(msg));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }

  /**
   * Resolves coordinates to State and District
   * Uses online API if reachable, falls back to offline nearest-centroid & bounding box
   */
  async resolveCoordinates(lat, lng) {
    // 1. Try online Nominatim Reverse Geocoding
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
        {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const address = data.address || {};
        const stateRaw = address.state || address.province || address.state_district;
        const districtRaw = address.county || address.state_district || address.city || address.town || address.village || "";

        const matchedState = this.matchStateName(stateRaw);
        if (matchedState) {
          return {
            state: matchedState,
            district: districtRaw,
            formattedAddress: data.display_name || `${districtRaw}, ${matchedState}`
          };
        }
      }
    } catch (e) {
      console.warn("Online reverse geocoding skipped or offline, using fallback geometry.", e);
    }

    // 2. Offline Fallback: Check bounding boxes and nearest centroids of all Indian states
    const fallbackState = this.matchCoordinatesOffline(lat, lng);
    const stateInfo = INDIA_STATES_DATA[fallbackState] || INDIA_STATES_DATA["Uttar Pradesh"];

    return {
      state: fallbackState,
      district: stateInfo.capital,
      formattedAddress: `Near ${stateInfo.capital}, ${fallbackState} (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`
    };
  }

  /**
   * Finds matching state by raw string (handles "NCT of Delhi", "State of Uttar Pradesh", etc.)
   */
  matchStateName(rawName) {
    if (!rawName) return null;
    const clean = rawName.toLowerCase().replace(/state of|nct of|union territory of/g, '').trim();

    for (const stateName of Object.keys(INDIA_STATES_DATA)) {
      if (stateName.toLowerCase() === clean || clean.includes(stateName.toLowerCase())) {
        return stateName;
      }
    }
    return null;
  }

  /**
   * Offline Geometric Matcher: calculates Euclidean distance to State centroids and checks bounds
   */
  matchCoordinatesOffline(lat, lng) {
    let closestState = "Uttar Pradesh";
    let minDistance = Infinity;

    for (const [stateName, data] of Object.entries(INDIA_STATES_DATA)) {
      // Check bounding box if provided
      if (data.bounds) {
        if (
          lat >= data.bounds.minLat &&
          lat <= data.bounds.maxLat &&
          lng >= data.bounds.minLng &&
          lng <= data.bounds.maxLng
        ) {
          return stateName;
        }
      }

      // Check distance to centroid
      const dLat = lat - data.lat;
      const dLng = lng - data.lng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < minDistance) {
        minDistance = dist;
        closestState = stateName;
      }
    }

    return closestState;
  }

  /**
   * Manually sets the active state (e.g. from state picker modal)
   */
  setState(stateName) {
    if (INDIA_STATES_DATA[stateName]) {
      const data = INDIA_STATES_DATA[stateName];
      this.currentLocation.state = stateName;
      this.currentLocation.district = data.capital;
      this.currentLocation.latitude = data.lat;
      this.currentLocation.longitude = data.lng;
      this.currentLocation.formattedAddress = `${data.capital}, ${stateName}`;
      this.currentLocation.isLiveGPS = false;

      localStorage.setItem("helplines_active_state", stateName);
      this.notifyListeners();
    }
  }

  /**
   * Generates emergency Google Maps link for the current coordinates
   */
  getMapsLink() {
    return `https://maps.google.com/?q=${this.currentLocation.latitude.toFixed(6)},${this.currentLocation.longitude.toFixed(6)}`;
  }
}
