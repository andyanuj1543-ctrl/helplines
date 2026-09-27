// Global Safety Net & Error Boundary (Reveals direct emergency fallback if JS crashes)
window.addEventListener('error', (event) => {
  console.error('Helplines runtime error caught:', event.error || event.message);
  const fallback = document.getElementById('criticalEmergencyFallback');
  if (fallback) fallback.style.display = 'flex';
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Helplines unhandled rejection caught:', event.reason);
  const fallback = document.getElementById('criticalEmergencyFallback');
  if (fallback) fallback.style.display = 'flex';
});

// Main Application Controller with High-Speed Emergency Facility
import { NATIONAL_HELPLINES, INDIA_STATES_DATA } from './data.js';
import { SmartNLPService } from './nlp_matcher.js';
import { LocationService } from './location_service.js';
import { SOSService } from './sos_service.js';
import { GuardianService } from './guardian_service.js';
import { I18N_STRINGS } from './i18n.js';

class HelplinesApp {
  constructor() {
    this.locationService = new LocationService();
    this.sosService = new SOSService();
    this.guardianService = new GuardianService();
    this.activeCategory = 'all';
    this.currentLang = localStorage.getItem('helplines_lang') || 'en';

    this.initDOMElements();
    this.bindEvents();
    this.applyLanguage(this.currentLang);
    this.renderDirectory();
    this.renderStateModalList();
    this.updateLocationUI(this.locationService.currentLocation);
    this.initGuardianFeatures();
    this.checkIncomingSosUrl();

    // Auto-detect GPS on startup
    this.detectGPS(false);
  }

  initDOMElements() {
    // Header & Location
    this.locationPillBtn = document.getElementById('locationPillBtn');
    this.gpsDot = document.getElementById('gpsDot');
    this.locationText = document.getElementById('locationText');
    this.regionBanner = document.getElementById('regionBanner');
    this.regionBannerTitle = document.getElementById('regionBannerTitle');
    this.regionBannerText = document.getElementById('regionBannerText');

    this.topSosTriggerBtn = document.getElementById('topSosTriggerBtn');
    this.searchMatchModal = document.getElementById('searchMatchModal');
    this.closeSearchMatchModal = document.getElementById('closeSearchMatchModal');
    this.reflexUrgencyBadge = document.getElementById('reflexUrgencyBadge');
    this.reflexCategoryBadge = document.getElementById('reflexCategoryBadge');
    this.reflexName = document.getElementById('reflexName');
    this.reflexDesc = document.getElementById('reflexDesc');
    this.reflexNumber = document.getElementById('reflexNumber');
    this.reflexCallBtn = document.getElementById('reflexCallBtn');
    this.reflexCallBtnText = document.getElementById('reflexCallBtnText');
    this.reflexAltNumbersWrap = document.getElementById('reflexAltNumbersWrap');
    this.reflexAltNumbersGrid = document.getElementById('reflexAltNumbersGrid');
    this.reflexActionTipsBox = document.getElementById('reflexActionTipsBox');
    this.reflexActionTipsList = document.getElementById('reflexActionTipsList');
    this.reflexShareWhatsapp = document.getElementById('reflexShareWhatsapp');
    this.reflexShareSms = document.getElementById('reflexShareSms');

    // Fast Dial Buttons
    this.fast112Btn = document.getElementById('fast112Btn');
    this.fastAmbulanceBtn = document.getElementById('fastAmbulanceBtn');
    this.fastWomenBtn = document.getElementById('fastWomenBtn');
    this.fastWomenName = document.getElementById('fastWomenName');
    this.fastWomenSub = document.getElementById('fastWomenSub');
    this.fastWomenNum = document.getElementById('fastWomenNum');
    this.fastFireBtn = document.getElementById('fastFireBtn');

    // Live GPS Card
    this.exactAddressText = document.getElementById('exactAddressText');
    this.exactCoordsText = document.getElementById('exactCoordsText');
    this.quickWhatsappShare = document.getElementById('quickWhatsappShare');
    this.quickSmsShare = document.getElementById('quickSmsShare');

    // Scenario buttons
    this.scenarioBtns = document.querySelectorAll('.scenario-btn, .scenario-chip');

    // Search & Need Input
    this.needInput = document.getElementById('needInput');
    this.searchResultsSection = document.getElementById('searchResultsSection');
    this.matchUrgencyBadge = document.getElementById('matchUrgencyBadge');
    this.matchCategoryBadge = document.getElementById('matchCategoryBadge');
    this.matchStateBadge = document.getElementById('matchStateBadge');
    this.matchTag = document.getElementById('matchTag');
    this.matchName = document.getElementById('matchName');
    this.matchDesc = document.getElementById('matchDesc');
    this.matchNumber = document.getElementById('matchNumber');
    this.primaryCallBtn = document.getElementById('primaryCallBtn');
    this.altNumbersWrap = document.getElementById('altNumbersWrap');
    this.altNumbersGrid = document.getElementById('altNumbersGrid');
    this.actionTipsBox = document.getElementById('actionTipsBox');
    this.actionTipsList = document.getElementById('actionTipsList');
    this.shareWhatsappBtn = document.getElementById('shareWhatsappBtn');
    this.shareSmsBtn = document.getElementById('shareSmsBtn');

    // Directory & Filters
    this.directoryGrid = document.getElementById('directoryGrid');
    this.directoryCount = document.getElementById('directoryCount');
    this.categoryChips = document.querySelectorAll('.cat-chip');

    // Floating Bottom Dock
    this.dockSirenBtn = document.getElementById('dockSirenBtn');
    this.sirenLabel = document.getElementById('sirenLabel');
    this.dockGpsBtn = document.getElementById('dockGpsBtn');
    this.dockStateBtn = document.getElementById('dockStateBtn');

    // Modals & Overlays
    this.stateModal = document.getElementById('stateModal');
    this.closeStateModal = document.getElementById('closeStateModal');
    this.stateSearchInput = document.getElementById('stateSearchInput');
    this.triggerGpsModalBtn = document.getElementById('triggerGpsModalBtn');
    this.stateListGrid = document.getElementById('stateListGrid');
    this.sosOverlay = document.getElementById('sosOverlay');
    this.dismissSosBtn = document.getElementById('dismissSosBtn');
    this.sosOverlayWhatsapp = document.getElementById('sosOverlayWhatsapp');
    this.sosOverlaySms = document.getElementById('sosOverlaySms');
    this.sosOverlaySiren = document.getElementById('sosOverlaySiren');
    this.sosDirectCallLink = document.getElementById('sosDirectCallLink');
    this.emergencyAutoDialLink = document.getElementById('emergencyAutoDialLink');

    // Language Switcher
    this.langToggleBtn = document.getElementById('langToggleBtn');

    // Emergency Shortcuts & Visual Overlays
    this.silentEmergencyToast = document.getElementById('silentEmergencyToast');

    // Direct Emergency SOS & Guardians (Zero OTP)
    this.guardianCountBadge = document.getElementById('guardianCountBadge');
    this.alertGuardiansBtn = document.getElementById('alertGuardiansBtn');
    this.manageGuardiansBtn = document.getElementById('manageGuardiansBtn');
    this.manageGuardiansText = document.getElementById('manageGuardiansText');
    this.guardianBtnCount = document.getElementById('guardianBtnCount');
    this.directSosPhoneInput = document.getElementById('directSosPhoneInput');
    this.directSosRelationSelect = document.getElementById('directSosRelationSelect');
    this.quickSaveGuardianBtn = document.getElementById('quickSaveGuardianBtn');

    this.guardiansModal = document.getElementById('guardiansModal');
    this.closeGuardiansModal = document.getElementById('closeGuardiansModal');
    this.guardianMainView = document.getElementById('guardianMainView');
    this.guardiansList = document.getElementById('guardiansList');
    this.guardianListCount = document.getElementById('guardianListCount');
    this.addGuardianForm = document.getElementById('addGuardianForm');
    this.guardianNameInput = document.getElementById('guardianNameInput');
    this.guardianPhoneInput = document.getElementById('guardianPhoneInput');
    this.guardianRelationSelect = document.getElementById('guardianRelationSelect');

    this.showQrBtn = document.getElementById('showQrBtn');
    this.qrContainer = document.getElementById('qrContainer');
    this.qrCodeTarget = document.getElementById('qrCodeTarget');

    this.incomingSosBanner = document.getElementById('incomingSosBanner');
    this.sosSenderName = document.getElementById('sosSenderName');
    this.sosLocationDesc = document.getElementById('sosLocationDesc');
    this.sosGoogleMapsBtn = document.getElementById('sosGoogleMapsBtn');
    this.dismissIncomingSos = document.getElementById('dismissIncomingSos');

    this.initEmergencyShortcuts();
  }

  /**
   * Initializes emergency silent shortcuts:
   * 1. Shake Phone vigorously 3 times (Accelerometer)
   * 2. Volume Up + Down combo (Hardware buttons)
   */
  initEmergencyShortcuts() {
    this.initShakeTrigger();
    this.initVolumeEmergencyTrigger();
  }

  /**
   * 2. ⚡ Shake to Call 112: Detects 3 vigorous shakes using Accelerometer
   */
  initShakeTrigger() {
    let lastShakeTime = 0;
    let shakeCount = 0;
    let lastX = null, lastY = null, lastZ = null;

    window.addEventListener('devicemotion', (e) => {
      const acc = e.accelerationIncludingGravity || e.acceleration;
      if (!acc || acc.x === null) return;

      const now = Date.now();
      if (lastX !== null) {
        const delta = Math.abs(acc.x - lastX) + Math.abs(acc.y - lastY) + Math.abs(acc.z - lastZ);
        if (delta > 28) {
          if (now - lastShakeTime < 1000) {
            shakeCount++;
            if (shakeCount >= 3) {
              shakeCount = 0;
              this.triggerSilentEmergencyCall("Phone Shake Motion");
            }
          } else {
            shakeCount = 1;
          }
          lastShakeTime = now;
        }
      }
      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    }, { passive: true });
  }

  /**
   * 3. ⚡ Hardware Volume Buttons (for desktop keyboards / supported devices)
   */
  initVolumeEmergencyTrigger() {
    let volUpActive = false;
    let volDownActive = false;
    let lastVolUpTime = 0;
    let lastVolDownTime = 0;
    let lastTriggerTime = 0;

    const checkSimultaneousTrigger = (sourceKey = "") => {
      const now = Date.now();
      if (now - lastTriggerTime < 6000) return;

      const isSimultaneous = (volUpActive && volDownActive) ||
        (Math.abs(lastVolUpTime - lastVolDownTime) < 550 && lastVolUpTime > 0 && lastVolDownTime > 0);

      if (isSimultaneous) {
        lastTriggerTime = now;
        volUpActive = false;
        volDownActive = false;
        lastVolUpTime = 0;
        lastVolDownTime = 0;
        this.triggerSilentEmergencyCall(`Simultaneous Volume Up + Down (${sourceKey})`);
      }
    };

    window.addEventListener('keydown', (e) => {
      const k = e.key || e.code || "";
      const isUp = k === "AudioVolumeUp" || k === "VolumeUp" || (k === "ArrowUp" && (e.altKey || e.ctrlKey));
      const isDown = k === "AudioVolumeDown" || k === "VolumeDown" || (k === "ArrowDown" && (e.altKey || e.ctrlKey));

      if (isUp) {
        volUpActive = true;
        lastVolUpTime = Date.now();
        checkSimultaneousTrigger(k);
      } else if (isDown) {
        volDownActive = true;
        lastVolDownTime = Date.now();
        checkSimultaneousTrigger(k);
      }
    }, { passive: true });

    window.addEventListener('keyup', (e) => {
      const k = e.key || e.code || "";
      const isUp = k === "AudioVolumeUp" || k === "VolumeUp" || (k === "ArrowUp" && (e.altKey || e.ctrlKey));
      const isDown = k === "AudioVolumeDown" || k === "VolumeDown" || (k === "ArrowDown" && (e.altKey || e.ctrlKey));

      if (isUp) {
        setTimeout(() => { volUpActive = false; }, 400);
      }
      if (isDown) {
        setTimeout(() => { volDownActive = false; }, 400);
      }
    }, { passive: true });
  }

  /**
   * Silently triggers emergency response and automatically dials 112 without sirens
   */
  triggerSilentEmergencyCall(triggerSource = "Emergency Shortcut") {
    // 1. Guarantee absolutely NO siren sound is playing
    if (this.sosService && this.sosService.isSirenPlaying) {
      this.sosService.stopSiren();
    }

    // 2. Subtle confirmation vibration (2 short pulses)
    if ('vibrate' in navigator) {
      try { navigator.vibrate([150, 80, 150]); } catch(e) {}
    }

    // 3. Show top toast notification
    this.showSilentEmergencyToast();

    console.warn(`🚨 SILENT EMERGENCY TRIGGERED via: ${triggerSource}. Initiating direct dial to 112 (No sirens)...`);

    // 4. Automatically trigger phone dialer to 112
    try {
      if (this.emergencyAutoDialLink) {
        this.emergencyAutoDialLink.click();
      } else {
        window.location.href = "tel:112";
      }
    } catch (err) {
      console.warn("Auto-dial fallback:", err);
      window.location.href = "tel:112";
    }
  }

  /**
   * Displays non-intrusive toast indicating silent 112 dial is underway
   */
  showSilentEmergencyToast() {
    if (!this.silentEmergencyToast) return;
    this.silentEmergencyToast.classList.add('active');
    setTimeout(() => {
      if (this.silentEmergencyToast) {
        this.silentEmergencyToast.classList.remove('active');
      }
    }, 4500);
  }

  bindEvents() {
    // Location change listener
    this.locationService.onLocationChange((loc) => {
      this.updateLocationUI(loc);
      this.updateFastDialWomenButton(loc.state);
      this.renderDirectory();
      if (this.needInput.value.trim().length > 0) {
        this.handleSearch(this.needInput.value.trim());
      }
    });

    // 1-Tap Scenario Buttons
    this.scenarioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        this.needInput.value = query;
        this.handleSearch(query);
        this.scrollToSearchResults();
      });
    });

    // Top SOS Button Trigger
    if (this.topSosTriggerBtn) {
      this.topSosTriggerBtn.addEventListener('click', () => {
        if ('vibrate' in navigator) {
          try { navigator.vibrate([100, 50, 100]); } catch(e) {}
        }
        if (this.sosOverlay) {
          this.sosOverlay.classList.add('active');
        }
      });
    }

    // Close Search Match Reflex Modal
    if (this.closeSearchMatchModal) {
      this.closeSearchMatchModal.addEventListener('click', () => {
        if (this.searchMatchModal) this.searchMatchModal.style.display = 'none';
      });
    }

    if (this.searchMatchModal) {
      this.searchMatchModal.addEventListener('click', (e) => {
        if (e.target === this.searchMatchModal) {
          this.searchMatchModal.style.display = 'none';
        }
      });
    }

    if (this.reflexShareWhatsapp) {
      this.reflexShareWhatsapp.addEventListener('click', () => {
        this.sosService.sendWhatsAppSOS(this.locationService.currentLocation);
      });
    }

    if (this.reflexShareSms) {
      this.reflexShareSms.addEventListener('click', () => {
        this.sosService.sendSmsSOS(this.locationService.currentLocation);
      });
    }

    // Quick GPS location card shares
    this.quickWhatsappShare.addEventListener('click', () => {
      this.sosService.sendWhatsAppSOS(this.locationService.currentLocation);
    });

    this.quickSmsShare.addEventListener('click', () => {
      this.sosService.sendSmsSOS(this.locationService.currentLocation);
    });

    // Search Input with debouncing
    let debounceTimer;
    this.needInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const val = e.target.value;
      if (val.trim().length === 0) {
        this.searchResultsSection.style.display = 'none';
      }

      debounceTimer = setTimeout(() => {
        this.handleSearch(val.trim());
      }, 120);
    });

    // Category Filter Chips
    this.categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeCategory = chip.getAttribute('data-category');
        this.renderDirectory();
      });
    });

    // State Picker Modal
    this.locationPillBtn.addEventListener('click', () => this.openStateModal());
    this.dockStateBtn.addEventListener('click', () => this.openStateModal());
    this.closeStateModal.addEventListener('click', () => this.closeStateModalBox());
    this.stateModal.addEventListener('click', (e) => {
      if (e.target === this.stateModal) this.closeStateModalBox();
    });

    this.stateSearchInput.addEventListener('input', (e) => {
      this.filterStateList(e.target.value.toLowerCase().trim());
    });

    this.triggerGpsModalBtn.addEventListener('click', () => {
      this.detectGPS(true);
      this.closeStateModalBox();
    });

    // Bottom Dock Actions
    this.dockGpsBtn.addEventListener('click', () => {
      this.detectGPS(true);
    });

    this.dockSirenBtn.addEventListener('click', () => {
      const isPlaying = this.sosService.toggleSiren();
      if (isPlaying) {
        this.dockSirenBtn.classList.add('siren-active');
        this.sirenLabel.textContent = 'STOP';
        if (this.sosOverlaySiren) this.sosOverlaySiren.textContent = '🛑 Stop Siren';
      } else {
        this.dockSirenBtn.classList.remove('siren-active');
        this.sirenLabel.textContent = 'Siren';
        if (this.sosOverlaySiren) this.sosOverlaySiren.textContent = '📢 Play Siren';
      }
    });

    if (this.sosOverlaySiren) {
      this.sosOverlaySiren.addEventListener('click', () => {
        const isPlaying = this.sosService.toggleSiren();
        if (isPlaying) {
          this.sosOverlaySiren.textContent = '🛑 Stop Siren';
          this.dockSirenBtn.classList.add('siren-active');
          this.sirenLabel.textContent = 'STOP';
        } else {
          this.sosOverlaySiren.textContent = '📢 Play Siren';
          this.dockSirenBtn.classList.remove('siren-active');
          this.sirenLabel.textContent = 'Siren';
        }
      });
    }

    this.dismissSosBtn.addEventListener('click', () => {
      this.sosOverlay.classList.remove('active');
      if (this.sosService.isSirenPlaying) {
        this.sosService.stopSiren();
        this.dockSirenBtn.classList.remove('siren-active');
        this.sirenLabel.textContent = 'Siren';
        if (this.sosOverlaySiren) this.sosOverlaySiren.textContent = '📢 Play Siren';
      }
    });

    // SOS Location Dispatch Buttons
    this.shareWhatsappBtn.addEventListener('click', () => {
      this.sosService.sendWhatsAppSOS(this.locationService.currentLocation);
    });

    this.shareSmsBtn.addEventListener('click', () => {
      this.sosService.sendSmsSOS(this.locationService.currentLocation);
    });

    this.sosOverlayWhatsapp.addEventListener('click', () => {
      this.sosService.sendWhatsAppSOS(this.locationService.currentLocation);
    });

    this.sosOverlaySms.addEventListener('click', () => {
      this.sosService.sendSmsSOS(this.locationService.currentLocation);
    });

    // Language Toggle Click
    if (this.langToggleBtn) {
      this.langToggleBtn.addEventListener('click', () => {
        this.currentLang = this.currentLang === 'en' ? 'hi' : 'en';
        localStorage.setItem('helplines_lang', this.currentLang);
        this.applyLanguage(this.currentLang);
      });
    }

    // PWA App Installation Handler
    this.initPWAInstallation();
  }

  /**
   * Applies selected language strings across the entire user interface
   * using declarative [data-i18n], [data-i18n-html], and [data-i18n-placeholder] attributes.
   */
  applyLanguage(lang = 'en') {
    const s = I18N_STRINGS[lang] || I18N_STRINGS.en;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (s[key]) el.textContent = s[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (s[key]) el.innerHTML = s[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (s[key]) el.placeholder = s[key];
    });

    if (this.manageGuardiansText) {
      this.manageGuardiansText.textContent = `${s.manageGuardiansText || 'Contacts'} (${this.guardianService.getGuardians().length})`;
    }

    // Update state-specific women line with proper language
    this.updateFastDialWomenButton(this.locationService.currentLocation.state);
  }

  initPWAInstallation() {
    this.pwaInstallBtn = document.getElementById('pwaInstallBtn');
    let deferredPrompt = null;

    // Register Service Worker for offline emergency support
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((reg) => {
          console.log('⚡ Helplines Service Worker active (offline ready):', reg.scope);
        }).catch((err) => {
          console.warn('Service Worker registration note:', err);
        });
      });
    }

    // Capture install prompt for Android/Chrome
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (this.pwaInstallBtn) {
        this.pwaInstallBtn.style.display = 'inline-flex';
      }
    });

    // Handle user tapping the Install App button
    if (this.pwaInstallBtn) {
      this.pwaInstallBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to install: ${outcome}`);
          deferredPrompt = null;
          this.pwaInstallBtn.style.display = 'none';
        } else {
          // If already installed or on iOS Safari
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          if (isIOS) {
            alert('📲 To install on iPhone/iPad: Tap the Share button (square with arrow) at the bottom, then tap "Add to Home Screen".');
          } else {
            alert('📲 To install Helplines as an app: Open browser settings menu (⋮) and tap "Install app" or "Add to Home Screen".');
          }
        }
      });
    }

    // If app installed
    window.addEventListener('appinstalled', () => {
      console.log('✅ Helplines app successfully installed on device!');
      if (this.pwaInstallBtn) {
        this.pwaInstallBtn.style.display = 'none';
      }
    });
  }

  scrollToSearchResults() {
    if (this.searchResultsSection) {
      this.searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async detectGPS(alertOnError = false) {
    this.locationText.textContent = "Locating via GPS...";
    try {
      const loc = await this.locationService.requestGPS();
      this.updateLocationUI(loc);
      this.updateFastDialWomenButton(loc.state);
    } catch (err) {
      console.warn("GPS request notice:", err.message);
      this.updateLocationUI(this.locationService.currentLocation);
      this.updateFastDialWomenButton(this.locationService.currentLocation.state);
      if (alertOnError) {
        alert(err.message);
      }
    }
  }

  updateLocationUI(loc) {
    const isLive = loc.isLiveGPS;
    this.gpsDot.className = isLive ? "gps-dot" : "gps-dot manual";
    this.locationText.textContent = `${loc.district ? loc.district + ', ' : ''}${loc.state}`;
    this.locationText.title = isLive ? "Real-time GPS Active" : "Manually selected state";

    // Update Live GPS Location Card
    this.exactAddressText.textContent = loc.formattedAddress || `${loc.district}, ${loc.state}`;
    this.exactCoordsText.textContent = `GPS: ${loc.latitude.toFixed(5)}° N, ${loc.longitude.toFixed(5)}° E ${loc.accuracy ? ' (Accuracy: ±' + loc.accuracy + 'm)' : ''}`;

    // Update Region Banner
    const stateData = INDIA_STATES_DATA[loc.state];
    if (stateData && stateData.specialNotes) {
      this.regionBanner.style.display = 'flex';
      this.regionBannerTitle.textContent = `${loc.state} Emergency Grid Active`;
      this.regionBannerText.textContent = stateData.specialNotes;
    } else {
      this.regionBanner.style.display = 'none';
    }
  }

  /**
   * Adapts the 3rd hero button to the active state's best women safety line
   * e.g. UP 1090 vs Delhi DCW 181 vs Gujarat 181 Abhayam vs General 1091
   */
  updateFastDialWomenButton(stateName) {
    const isHi = this.currentLang === 'hi';
    if (stateName === "Uttar Pradesh") {
      this.fastWomenName.textContent = isHi ? "यूपी महिला 1090" : "UP WOMEN 1090";
      this.fastWomenSub.textContent = isHi ? "पावर लाइन व सुरक्षा" : "Power Line & Anti-Harassment";
      this.fastWomenNum.textContent = "1090";
      this.fastWomenBtn.href = "tel:1090";
    } else if (stateName === "Delhi") {
      this.fastWomenName.textContent = isHi ? "दिल्ली 181 DCW" : "DELHI DCW 181";
      this.fastWomenSub.textContent = isHi ? "महिला हेल्पलाइन व रेस्क्यू" : "Women Rescue & Dispatch";
      this.fastWomenNum.textContent = "181";
      this.fastWomenBtn.href = "tel:181";
    } else if (stateName === "Gujarat") {
      this.fastWomenName.textContent = isHi ? "गुजरात 181" : "GUJARAT 181";
      this.fastWomenSub.textContent = isHi ? "अभयम रेस्क्यू वैन" : "Abhayam Rescue Van";
      this.fastWomenNum.textContent = "181";
      this.fastWomenBtn.href = "tel:181";
    } else if (stateName === "Maharashtra") {
      this.fastWomenName.textContent = isHi ? "मुंबई महिला 103" : "MUMBAI WOMEN 103";
      this.fastWomenSub.textContent = isHi ? "पुलिस महिला हेल्पलाइन" : "Police Women Helpline";
      this.fastWomenNum.textContent = "103";
      this.fastWomenBtn.href = "tel:103";
    } else {
      this.fastWomenName.textContent = isHi ? "महिला सुरक्षा" : "WOMEN SAFETY";
      this.fastWomenSub.textContent = isHi ? "राष्ट्रीय हेल्पलाइन (1091)" : "National Distress (1091)";
      this.fastWomenNum.textContent = "1091";
      this.fastWomenBtn.href = "tel:1091";
    }
  }

  handleSearch(query) {
    if (!query || query.length === 0) {
      this.searchResultsSection.style.display = 'none';
      return;
    }

    const match = SmartNLPService.matchNeed(query, this.locationService.currentLocation.state);
    if (!match) {
      this.searchResultsSection.style.display = 'none';
      return;
    }

    this.searchResultsSection.style.display = 'block';

    // Update match card contents
    this.matchUrgencyBadge.textContent = `${match.urgency} ACTION`;
    this.matchUrgencyBadge.style.background = match.urgency === 'CRITICAL' ? '#dc2626' : (match.urgency === 'HIGH' ? '#ea580c' : '#2563eb');
    this.matchCategoryBadge.textContent = match.categoryLabel;
    this.matchStateBadge.textContent = match.effectiveState + (match.detectedState ? ' (from query)' : '');

    const p = match.primaryHelpline;
    this.matchTag.textContent = p.tag || (p.isStateSpecial ? `${match.effectiveState} Special` : 'Primary Response');
    this.matchName.textContent = p.name;
    this.matchDesc.textContent = p.description || match.querySummary;
    this.matchNumber.textContent = p.number;
    this.primaryCallBtn.href = `tel:${p.number}`;

    // Trigger Instant Emergency Search Reflex Pop-up Modal
    if (this.searchMatchModal) {
      this.reflexUrgencyBadge.textContent = `${match.urgency} ACTION`;
      this.reflexUrgencyBadge.style.background = match.urgency === 'CRITICAL' ? '#dc2626' : (match.urgency === 'HIGH' ? '#ea580c' : '#2563eb');
      this.reflexCategoryBadge.textContent = match.categoryLabel;
      this.reflexName.textContent = p.name;
      this.reflexDesc.textContent = p.description || match.querySummary;
      this.reflexNumber.textContent = p.number;
      this.reflexCallBtn.href = `tel:${p.number}`;
      if (this.reflexCallBtnText) {
        this.reflexCallBtnText.textContent = `CALL ${p.number} NOW`;
      }

      // Reflex secondary numbers
      if (this.reflexAltNumbersGrid && this.reflexAltNumbersWrap) {
        this.reflexAltNumbersGrid.innerHTML = '';
        if (match.alternativeHelplines && match.alternativeHelplines.length > 0) {
          this.reflexAltNumbersWrap.style.display = 'block';
          match.alternativeHelplines.forEach(alt => {
            const div = document.createElement('div');
            div.className = 'alt-card';
            div.innerHTML = `
              <div>
                <div class="alt-name">${alt.name}</div>
                <div class="alt-num">${alt.number}</div>
              </div>
              <a href="tel:${alt.number}" class="alt-call-btn">CALL</a>
            `;
            this.reflexAltNumbersGrid.appendChild(div);
          });
        } else {
          this.reflexAltNumbersWrap.style.display = 'none';
        }
      }

      // Reflex action tips
      if (this.reflexActionTipsList && this.reflexActionTipsBox) {
        this.reflexActionTipsList.innerHTML = '';
        if (match.actionTips && match.actionTips.length > 0) {
          match.actionTips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            this.reflexActionTipsList.appendChild(li);
          });
          this.reflexActionTipsBox.style.display = 'block';
        } else {
          this.reflexActionTipsBox.style.display = 'none';
        }
      }

      this.searchMatchModal.style.display = 'flex';
      if ('vibrate' in navigator) {
        try { navigator.vibrate(80); } catch(e) {}
      }
    }

    // Alternative Numbers
    this.altNumbersGrid.innerHTML = '';
    if (match.alternativeHelplines && match.alternativeHelplines.length > 0) {
      this.altNumbersWrap.style.display = 'block';
      match.alternativeHelplines.forEach(alt => {
        const div = document.createElement('div');
        div.className = 'alt-card';
        div.innerHTML = `
          <div>
            <div class="alt-name">${alt.name}</div>
            <div class="alt-num">${alt.number}</div>
          </div>
          <a href="tel:${alt.number}" class="alt-call-btn">CALL</a>
        `;
        this.altNumbersGrid.appendChild(div);
      });
    } else {
      this.altNumbersWrap.style.display = 'none';
    }

    // Action Tips
    this.actionTipsList.innerHTML = '';
    if (match.actionTips && match.actionTips.length > 0) {
      match.actionTips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        this.actionTipsList.appendChild(li);
      });
      this.actionTipsBox.style.display = 'block';
    } else {
      this.actionTipsBox.style.display = 'none';
    }
  }

  renderDirectory() {
    const currentState = this.locationService.currentLocation.state;
    const stateData = INDIA_STATES_DATA[currentState] || INDIA_STATES_DATA["Uttar Pradesh"];
    const stateHelplines = stateData.helplines || [];

    let combined = [];

    // Filter state lines
    const filteredState = stateHelplines.filter(h => {
      if (this.activeCategory === 'all') return true;
      return h.category === this.activeCategory || (this.activeCategory === 'police' && h.category === 'unified');
    });

    // Filter national lines
    const filteredNational = NATIONAL_HELPLINES.filter(h => {
      if (this.activeCategory === 'all') return true;
      return h.category === this.activeCategory;
    });

    combined = [...filteredState, ...filteredNational];

    this.directoryCount.textContent = `${combined.length} Helplines`;
    this.directoryGrid.innerHTML = '';

    combined.forEach(item => {
      const card = document.createElement('div');
      card.className = `helpline-card ${item.isStateSpecial ? 'state-special' : ''}`;

      card.innerHTML = `
        <div class="card-top">
          <div class="card-badge-row">
            <span class="card-cat-tag">${item.categoryLabel || item.category}</span>
            ${item.isStateSpecial ? `<span class="card-special-tag">${item.tag || currentState}</span>` : '<span class="card-status-pill">Active</span>'}
          </div>
          <h4 class="card-name">${item.name}</h4>
          <p class="card-desc">${item.description || ''}</p>
        </div>
        <div class="card-bottom">
          <span class="card-number">${item.number}</span>
          <a href="tel:${item.number}" class="card-call-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>CALL</span>
          </a>
        </div>
      `;

      this.directoryGrid.appendChild(card);
    });
  }

  renderStateModalList() {
    this.stateListGrid.innerHTML = '';
    const states = Object.keys(INDIA_STATES_DATA).sort();
    const currentState = this.locationService.currentLocation.state;

    states.forEach(stateName => {
      const btn = document.createElement('button');
      btn.className = `state-pick-btn ${stateName === currentState ? 'current' : ''}`;
      btn.textContent = stateName;
      btn.setAttribute('data-state', stateName);

      btn.addEventListener('click', () => {
        this.locationService.setState(stateName);
        this.closeStateModalBox();
      });

      this.stateListGrid.appendChild(btn);
    });
  }

  filterStateList(query) {
    const buttons = this.stateListGrid.querySelectorAll('.state-pick-btn');
    buttons.forEach(btn => {
      const stateName = btn.getAttribute('data-state').toLowerCase();
      if (stateName.includes(query)) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    });
  }

  openStateModal() {
    this.stateSearchInput.value = '';
    this.filterStateList('');
    this.renderStateModalList();
    this.stateModal.style.display = 'flex';
    this.stateSearchInput.focus();
  }

  closeStateModalBox() {
    this.stateModal.style.display = 'none';
  }

  // --- Trusted Emergency Guardians & Live SOS Methods (Zero OTP) ---

  initGuardianFeatures() {
    this.updateGuardianUI();

    // Alert Guardians Button (1-Click Direct SOS)
    if (this.alertGuardiansBtn) {
      this.alertGuardiansBtn.addEventListener('click', () => {
        this.handleAlertGuardians();
      });
    }

    // Quick Save Guardian Button on front page card
    if (this.quickSaveGuardianBtn) {
      this.quickSaveGuardianBtn.addEventListener('click', () => {
        this.handleQuickSaveGuardian();
      });
    }

    // Manage Guardians Button
    if (this.manageGuardiansBtn) {
      this.manageGuardiansBtn.addEventListener('click', () => {
        this.openGuardiansModal();
      });
    }

    // Modal Close
    if (this.closeGuardiansModal) {
      this.closeGuardiansModal.addEventListener('click', () => {
        this.closeGuardiansModalBox();
      });
    }

    if (this.guardiansModal) {
      this.guardiansModal.addEventListener('click', (e) => {
        if (e.target === this.guardiansModal) this.closeGuardiansModalBox();
      });
    }

    // Form submit -> Direct Add without OTP
    if (this.addGuardianForm) {
      this.addGuardianForm.addEventListener('submit', (e) => {
        this.handleAddGuardian(e);
      });
    }

    // Show / Hide QR code button
    if (this.showQrBtn) {
      this.showQrBtn.addEventListener('click', () => {
        this.toggleGuardianQr();
      });
    }
  }

  updateGuardianUI() {
    const guardians = this.guardianService.getGuardians();
    const count = guardians.length;

    if (this.guardianCountBadge) {
      this.guardianCountBadge.textContent = this.currentLang === 'hi'
        ? `${count} सुरक्षित`
        : `${count} Saved`;
    }

    if (this.guardianBtnCount) {
      this.guardianBtnCount.textContent = count;
    }

    if (this.guardianListCount) {
      this.guardianListCount.textContent = `${count} / 5`;
    }

    if (!this.guardiansList) return;
    this.guardiansList.innerHTML = '';

    if (count === 0) {
      this.guardiansList.innerHTML = `
        <div style="text-align: center; padding: 18px; color: #94a3b8; font-size: 0.85rem; border: 1px dashed #cbd5e1; border-radius: 8px;">
          ${this.currentLang === 'hi' 
            ? 'कोई भी संपर्क नहीं जुड़ा है। नीचे अपना परिवार या मित्र का नंबर जोड़ें।' 
            : 'No emergency contacts saved yet. Add your family or trusted friends below.'}
        </div>
      `;
      return;
    }

    guardians.forEach(g => {
      const item = document.createElement('div');
      item.className = 'guardian-item-card';
      item.innerHTML = `
        <div class="guardian-item-info">
          <div class="guardian-item-name">
            <strong>${g.name}</strong>
            <span class="guardian-rel-badge">${g.relation || 'Contact'}</span>
          </div>
          <div class="guardian-item-phone">+91 ${g.phone}</div>
        </div>
        <div class="guardian-item-actions">
          <button type="button" class="guardian-direct-sos-btn" data-phone="${g.phone}" title="Send SOS immediately">SOS</button>
          <a href="tel:${g.phone}" class="guardian-call-link" title="Call"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
          <button type="button" class="guardian-del-btn" data-id="${g.id}" title="Remove">✕</button>
        </div>
      `;

      // 1-Click SOS directly to this contact
      const sosBtn = item.querySelector('.guardian-direct-sos-btn');
      if (sosBtn) {
        sosBtn.addEventListener('click', () => {
          if ('vibrate' in navigator) {
            try { navigator.vibrate([150, 75, 150]); } catch(e) {}
          }
          this.guardianService.dispatchSMSToGuardians(this.locationService.currentLocation, "Me", g.phone);
          this.showSilentEmergencyToast();
        });
      }

      // Delete contact
      const deleteBtn = item.querySelector('.guardian-del-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          this.guardianService.removeGuardian(g.id);
          this.updateGuardianUI();
        });
      }

      this.guardiansList.appendChild(item);
    });
  }

  handleAlertGuardians() {
    let directPhone = '';
    if (this.directSosPhoneInput && this.directSosPhoneInput.value.trim().length >= 10) {
      directPhone = this.directSosPhoneInput.value.trim();
      // Auto-save this number if not already saved
      const relation = this.directSosRelationSelect ? this.directSosRelationSelect.value : 'Family';
      try {
        this.guardianService.addGuardian(relation, directPhone, relation);
        this.updateGuardianUI();
      } catch(e) {}
    }

    if (!directPhone) {
      const guardians = this.guardianService.getGuardians();
      if (guardians.length === 0) {
        if (this.directSosPhoneInput) {
          this.directSosPhoneInput.focus();
        }
        alert(this.currentLang === 'hi'
          ? 'कृपया पहले 10-अंकों का मोबाइल नंबर दर्ज करें या संपर्क जोड़ें!'
          : 'Please enter a 10-digit mobile number or add an emergency contact first!');
        return;
      }
    }

    if ('vibrate' in navigator) {
      try { navigator.vibrate([150, 75, 150]); } catch(e) {}
    }

    // Trigger 1-Click multi-recipient native SMS
    const sent = this.guardianService.dispatchSMSToGuardians(this.locationService.currentLocation, "Me", directPhone || null);
    if (sent) {
      this.showSilentEmergencyToast();
    }
  }

  handleQuickSaveGuardian() {
    if (!this.directSosPhoneInput) return;
    const phone = this.directSosPhoneInput.value.trim();
    const clean = phone.replace(/[^0-9]/g, '');

    if (clean.length < 10) {
      alert(this.currentLang === 'hi' 
        ? 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें' 
        : 'Please enter a valid 10-digit mobile number');
      this.directSosPhoneInput.focus();
      return;
    }

    const relation = this.directSosRelationSelect ? this.directSosRelationSelect.value : 'Family';
    try {
      const contact = this.guardianService.addGuardian(relation, clean, relation);
      this.directSosPhoneInput.value = '';
      this.updateGuardianUI();
      alert(this.currentLang === 'hi'
        ? `✅ ${contact.name} (+91 ${contact.phone}) संपर्क सहेज लिया गया!`
        : `✅ ${contact.name} (+91 ${contact.phone}) saved! You can now send 1-click SOS anytime.`);
    } catch (err) {
      alert(err.message || 'Error saving contact');
    }
  }

  handleAddGuardian(e) {
    e.preventDefault();
    const name = this.guardianNameInput ? this.guardianNameInput.value.trim() : '';
    const phone = this.guardianPhoneInput ? this.guardianPhoneInput.value.trim() : '';
    const relation = this.guardianRelationSelect ? this.guardianRelationSelect.value : 'Family';

    try {
      const contact = this.guardianService.addGuardian(name, phone, relation);
      if (this.addGuardianForm) this.addGuardianForm.reset();
      this.updateGuardianUI();
      alert(this.currentLang === 'hi'
        ? `✅ ${contact.name} को आपातकालीन संपर्क में सहेज लिया गया (बिना OTP)!`
        : `✅ ${contact.name} saved as emergency contact (No OTP needed)!`);
    } catch (err) {
      alert(err.message || "Invalid contact details");
    }
  }

  openGuardiansModal() {
    this.updateGuardianUI();
    if (this.guardiansModal) this.guardiansModal.style.display = 'flex';
  }

  closeGuardiansModalBox() {
    if (this.guardiansModal) this.guardiansModal.style.display = 'none';
  }

  toggleGuardianQr() {
    if (!this.qrContainer) return;
    const isHidden = this.qrContainer.style.display === 'none' || !this.qrContainer.style.display;
    if (isHidden) {
      this.qrContainer.style.display = 'block';
      this.renderGuardianQR();
    } else {
      this.qrContainer.style.display = 'none';
    }
  }

  renderGuardianQR() {
    if (!this.qrCodeTarget) return;
    const guardians = this.guardianService.getGuardians();
    const primary = guardians.length > 0 ? guardians[0] : { name: "Me", phone: "112" };
    const mecard = this.guardianService.generateContactQRData(primary);
    
    // Generate QR using lightweight API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(mecard)}`;
    this.qrCodeTarget.innerHTML = `
      <img src="${qrUrl}" alt="Emergency Contact QR Code" style="width: 170px; height: 170px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 0 auto; display: block;" loading="lazy" />
      <p style="margin-top: 8px; font-weight: 700; color: #1e293b; font-size: 0.8rem; text-align: center;">${primary.name}: +91 ${primary.phone}</p>
    `;
  }

  checkIncomingSosUrl() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('sos') === '1') {
        const lat = urlParams.get('lat');
        const lng = urlParams.get('lng');
        const name = urlParams.get('name') || 'Family / Friend';

        if (this.incomingSosBanner) {
          this.incomingSosBanner.style.display = 'flex';
        }
        if (this.sosSenderName) {
          this.sosSenderName.textContent = name;
        }
        if (this.sosLocationDesc) {
          this.sosLocationDesc.textContent = lat && lng 
            ? `📍 Coordinates: ${lat}, ${lng} (Emergency Distress Signal)` 
            : '📍 Emergency location alert received';
        }
        if (this.sosGoogleMapsBtn && lat && lng) {
          this.sosGoogleMapsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
          this.sosGoogleMapsBtn.target = '_blank';
        }
        if (this.dismissIncomingSos) {
          this.dismissIncomingSos.addEventListener('click', () => {
            if (this.incomingSosBanner) this.incomingSosBanner.style.display = 'none';
          });
        }
      }
    } catch (e) {
      console.warn("Could not parse incoming SOS url:", e);
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new HelplinesApp();
});
