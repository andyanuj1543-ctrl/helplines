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
    this.scenarioBtns = document.querySelectorAll('.scenario-btn');

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
    this.langBtnText = document.getElementById('langBtnText');
    this.installBtnText = document.getElementById('installBtnText');
    this.fastTitleText = document.getElementById('fastTitleText');
    this.fastBadgeText = document.getElementById('fastBadgeText');
    this.policeName = document.getElementById('policeName');
    this.policeSub = document.getElementById('policeSub');
    this.ambulanceName = document.getElementById('ambulanceName');
    this.ambulanceSub = document.getElementById('ambulanceSub');
    this.fireName = document.getElementById('fireName');
    this.fireSub = document.getElementById('fireSub');
    this.searchTitleText = document.getElementById('searchTitleText');
    this.searchSubText = document.getElementById('searchSubText');
    this.locLabelText = document.getElementById('locLabelText');
    this.whatsappBtnText = document.getElementById('whatsappBtnText');
    this.smsBtnText = document.getElementById('smsBtnText');
    this.scenarioTitleText = document.getElementById('scenarioTitleText');
    this.scStalkerText = document.getElementById('scStalkerText');
    this.scHeartText = document.getElementById('scHeartText');
    this.scAccidentText = document.getElementById('scAccidentText');
    this.scFireText = document.getElementById('scFireText');
    this.scFraudText = document.getElementById('scFraudText');
    this.scSuicideText = document.getElementById('scSuicideText');
    this.scHighwayText = document.getElementById('scHighwayText');
    this.scChildText = document.getElementById('scChildText');
    this.dockSosText = document.getElementById('dockSosText');
    this.dockGpsText = document.getElementById('dockGpsText');
    this.dockStatesText = document.getElementById('dockStatesText');

    // Emergency Shortcuts & Overlays
    this.volumeShortcutText = document.getElementById('volumeShortcutText');
    this.silentEmergencyToast = document.getElementById('silentEmergencyToast');
    this.silentToastTitle = document.getElementById('silentToastTitle');
    this.silentToastSub = document.getElementById('silentToastSub');
    this.holdProgressOverlay = document.getElementById('holdProgressOverlay');
    this.holdProgressText = document.getElementById('holdProgressText');

    // Guardians, OTP Modal & Incoming SOS Banner
    this.guardianBarLabel = document.getElementById('guardianBarLabel');
    this.guardianCountBadge = document.getElementById('guardianCountBadge');
    this.guardianBarSub = document.getElementById('guardianBarSub');
    this.alertGuardiansBtn = document.getElementById('alertGuardiansBtn');
    this.manageGuardiansBtn = document.getElementById('manageGuardiansBtn');
    this.alertGuardiansText = document.getElementById('alertGuardiansText');
    this.manageGuardiansText = document.getElementById('manageGuardiansText');

    this.guardiansModal = document.getElementById('guardiansModal');
    this.closeGuardiansModal = document.getElementById('closeGuardiansModal');
    this.guardianModalTitle = document.getElementById('guardianModalTitle');
    this.guardianModalHint = document.getElementById('guardianModalHint');
    this.savedGuardiansLabel = document.getElementById('savedGuardiansLabel');
    this.addNewGuardianLabel = document.getElementById('addNewGuardianLabel');
    this.sendOtpBtnText = document.getElementById('sendOtpBtnText');
    this.showQrBtnText = document.getElementById('showQrBtnText');

    this.guardianMainView = document.getElementById('guardianMainView');
    this.guardianOtpView = document.getElementById('guardianOtpView');
    this.guardiansList = document.getElementById('guardiansList');
    this.guardianListCount = document.getElementById('guardianListCount');
    this.addGuardianForm = document.getElementById('addGuardianForm');
    this.guardianNameInput = document.getElementById('guardianNameInput');
    this.guardianPhoneInput = document.getElementById('guardianPhoneInput');
    this.guardianRelationSelect = document.getElementById('guardianRelationSelect');
    this.sendOtpBtn = document.getElementById('sendOtpBtn');

    this.otpTargetPhone = document.getElementById('otpTargetPhone');
    this.simulatedOtpCode = document.getElementById('simulatedOtpCode');
    this.autoFillOtpBtn = document.getElementById('autoFillOtpBtn');
    this.otpInput = document.getElementById('otpInput');
    this.confirmOtpBtn = document.getElementById('confirmOtpBtn');
    this.cancelOtpBtn = document.getElementById('cancelOtpBtn');

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
   * Initializes all redundant emergency shortcuts:
   * 1. Hold Screen anywhere for 1.8s (Foolproof in dark/panic)
   * 2. Shake Phone vigorously 3 times (Accelerometer)
   * 3. Volume Up + Down combo (Hardware buttons)
   */
  initEmergencyShortcuts() {
    this.initHoldScreenTrigger();
    this.initShakeTrigger();
    this.initVolumeEmergencyTrigger();
  }

  /**
   * 1. ⚡ Hold Screen for 1.8s: Press & hold finger anywhere on screen
   * Circular countdown visual & haptic pulse; at 1.8s, automatically dials 112 silently!
   * Releasing finger before 1.8s immediately cancels with zero false alarms.
   */
  initHoldScreenTrigger() {
    let holdTimer = null;
    let startX = 0, startY = 0;

    const startHold = (e) => {
      // Don't trigger if user is interacting with buttons, inputs, links or modals
      if (e.target.closest('button, a, input, select, textarea, .modal-content, #dismissSosBtn')) {
        return;
      }

      startX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      startY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      if (this.holdProgressOverlay) {
        this.holdProgressOverlay.classList.add('active');
      }

      if ('vibrate' in navigator) {
        try { navigator.vibrate(40); } catch(err) {}
      }

      holdTimer = setTimeout(() => {
        cancelHold();
        this.triggerSilentEmergencyCall("Hold Screen for 2s");
      }, 1800);
    };

    const cancelHold = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      if (this.holdProgressOverlay) {
        this.holdProgressOverlay.classList.remove('active');
      }
    };

    const checkMove = (e) => {
      if (!holdTimer) return;
      const curX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const curY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (Math.abs(curX - startX) > 16 || Math.abs(curY - startY) > 16) {
        cancelHold();
      }
    };

    // Mobile touch listeners
    document.addEventListener('touchstart', startHold, { passive: true });
    document.addEventListener('touchmove', checkMove, { passive: true });
    document.addEventListener('touchend', cancelHold, { passive: true });
    document.addEventListener('touchcancel', cancelHold, { passive: true });

    // Desktop mouse/pointer fallback
    document.addEventListener('mousedown', startHold);
    document.addEventListener('mousemove', checkMove);
    document.addEventListener('mouseup', cancelHold);
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
   */
  applyLanguage(lang = 'en') {
    const s = I18N_STRINGS[lang] || I18N_STRINGS.en;

    if (this.langBtnText) this.langBtnText.textContent = s.langBtn;
    if (this.installBtnText) this.installBtnText.textContent = s.installBtn;
    if (this.fastTitleText) this.fastTitleText.textContent = s.fastTitle;
    if (this.fastBadgeText) this.fastBadgeText.textContent = s.fastBadge;
    if (this.policeName) this.policeName.textContent = s.policeTitle;
    if (this.policeSub) this.policeSub.textContent = s.policeSub;
    if (this.ambulanceName) this.ambulanceName.textContent = s.ambulanceTitle;
    if (this.ambulanceSub) this.ambulanceSub.textContent = s.ambulanceSub;
    if (this.fireName) this.fireName.textContent = s.fireTitle;
    if (this.fireSub) this.fireSub.textContent = s.fireSub;

    if (this.volumeShortcutText && s.volumeShortcutText) {
      this.volumeShortcutText.innerHTML = s.volumeShortcutText;
    }
    if (this.silentToastTitle && s.silentToastTitle) {
      this.silentToastTitle.textContent = s.silentToastTitle;
    }
    if (this.silentToastSub && s.silentToastSub) {
      this.silentToastSub.textContent = s.silentToastSub;
    }
    if (this.holdProgressText && s.holdProgressText) {
      this.holdProgressText.textContent = s.holdProgressText;
    }

    if (this.searchTitleText) this.searchTitleText.textContent = s.searchTitle;
    if (this.searchSubText) this.searchSubText.textContent = s.searchSub;
    if (this.needInput) this.needInput.placeholder = s.searchPlaceholder;

    if (this.locLabelText) this.locLabelText.textContent = s.locLabel;
    if (this.whatsappBtnText) this.whatsappBtnText.textContent = s.whatsappBtn;
    if (this.smsBtnText) this.smsBtnText.textContent = s.smsBtn;

    if (this.scenarioTitleText) this.scenarioTitleText.textContent = s.scenarioTitle;
    if (this.scStalkerText) this.scStalkerText.textContent = s.scStalker;
    if (this.scHeartText) this.scHeartText.textContent = s.scHeart;
    if (this.scAccidentText) this.scAccidentText.textContent = s.scAccident;
    if (this.scFireText) this.scFireText.textContent = s.scFire;
    if (this.scFraudText) this.scFraudText.textContent = s.scFraud;
    if (this.scSuicideText) this.scSuicideText.textContent = s.scSuicide;
    if (this.scHighwayText) this.scHighwayText.textContent = s.scHighway;
    if (this.scChildText) this.scChildText.textContent = s.scChild;

    if (this.dockSosText) this.dockSosText.textContent = s.dockSos;
    if (this.dockGpsText) this.dockGpsText.textContent = s.dockGps;
    if (this.dockStatesText) this.dockStatesText.textContent = s.dockStates;

    // Update state-specific women line with proper language
    this.updateFastDialWomenButton(this.locationService.currentLocation.state);

    // Guardian Action Bar & Modal strings
    if (this.guardianBarLabel && s.guardianBarLabel) this.guardianBarLabel.textContent = s.guardianBarLabel;
    if (this.guardianBarSub && s.guardianBarSub) this.guardianBarSub.textContent = s.guardianBarSub;
    if (this.alertGuardiansText && s.alertGuardiansText) this.alertGuardiansText.textContent = s.alertGuardiansText;
    if (this.manageGuardiansText && s.manageGuardiansText) this.manageGuardiansText.textContent = s.manageGuardiansText;
    if (this.guardianModalTitle && s.guardianModalTitle) this.guardianModalTitle.textContent = s.guardianModalTitle;
    if (this.guardianModalHint && s.guardianModalHint) this.guardianModalHint.innerHTML = s.guardianModalHint;
    if (this.savedGuardiansLabel && s.savedGuardiansLabel) this.savedGuardiansLabel.textContent = s.savedGuardiansLabel;
    if (this.addNewGuardianLabel && s.addNewGuardianLabel) this.addNewGuardianLabel.innerHTML = s.addNewGuardianLabel;
    if (this.sendOtpBtnText && s.sendOtpBtnText) this.sendOtpBtnText.textContent = s.sendOtpBtnText;
    if (this.showQrBtnText && s.showQrBtnText) this.showQrBtnText.textContent = s.showQrBtnText;
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
    this.locationText.textContent = `📍 ${loc.district ? loc.district + ', ' : ''}${loc.state}`;
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
            ${item.isStateSpecial ? `<span class="card-special-tag">📍 ${item.tag || currentState}</span>` : '<span style="font-size: 0.68rem; color: #10b981; font-weight: 700;">● 24x7 Active</span>'}
          </div>
          <h4 class="card-name">${item.name}</h4>
          <p class="card-desc">${item.description || ''}</p>
        </div>
        <div class="card-bottom">
          <span class="card-number">${item.number}</span>
          <a href="tel:${item.number}" class="card-call-btn">
            <span>📞</span>
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

  // --- Trusted Emergency Guardians & Live SOS Methods ---

  initGuardianFeatures() {
    this.updateGuardianUI();

    // Alert Guardians Button (1-Tap)
    if (this.alertGuardiansBtn) {
      this.alertGuardiansBtn.addEventListener('click', () => {
        this.handleAlertGuardians();
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

    // Form submit -> Initiate registration & OTP
    if (this.addGuardianForm) {
      this.addGuardianForm.addEventListener('submit', (e) => {
        this.handleInitiateRegistration(e);
      });
    }

    // OTP Verify button
    if (this.confirmOtpBtn) {
      this.confirmOtpBtn.addEventListener('click', () => {
        this.handleVerifyOtp();
      });
    }

    // OTP Auto-fill button
    if (this.autoFillOtpBtn) {
      this.autoFillOtpBtn.addEventListener('click', () => {
        if (this.guardianService.pendingVerification && this.otpInput) {
          this.otpInput.value = this.guardianService.pendingVerification.otp;
        }
      });
    }

    // OTP Cancel button
    if (this.cancelOtpBtn) {
      this.cancelOtpBtn.addEventListener('click', () => {
        this.cancelOtpVerification();
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
            <span class="guardian-relation-tag">${g.relation || 'Contact'}</span>
          </div>
          <div class="guardian-item-phone">
            📞 +91 ${g.phone} <span class="verified-tag">✓ OTP Verified</span>
          </div>
        </div>
        <div class="guardian-item-actions">
          <a href="tel:${g.phone}" class="guardian-call-btn" title="Call">📞</a>
          <button type="button" class="guardian-delete-btn" data-id="${g.id}" title="Remove">✕</button>
        </div>
      `;

      const deleteBtn = item.querySelector('.guardian-delete-btn');
      deleteBtn.addEventListener('click', () => {
        this.guardianService.removeGuardian(g.id);
        this.updateGuardianUI();
      });

      this.guardiansList.appendChild(item);
    });
  }

  handleAlertGuardians() {
    const guardians = this.guardianService.getGuardians();
    if (guardians.length === 0) {
      alert(this.currentLang === 'hi'
        ? 'कृपया पहले कम से कम 1 आपातकालीन संपर्क (Guardian) जोड़ें!'
        : 'Please register at least 1 emergency contact (Guardian) first!');
      this.openGuardiansModal();
      return;
    }

    if ('vibrate' in navigator) {
      try { navigator.vibrate([150, 75, 150]); } catch(e) {}
    }

    // Trigger multi-recipient native SMS
    const sent = this.guardianService.dispatchSMSToGuardians(this.locationService.currentLocation);
    if (sent) {
      this.showSilentEmergencyToast();
    }
  }

  handleInitiateRegistration(e) {
    e.preventDefault();
    const name = this.guardianNameInput ? this.guardianNameInput.value.trim() : '';
    const phone = this.guardianPhoneInput ? this.guardianPhoneInput.value.trim() : '';
    const relation = this.guardianRelationSelect ? this.guardianRelationSelect.value : 'Family';

    try {
      const pending = this.guardianService.initiateRegistration(name, phone, relation);
      
      // Update OTP view
      if (this.otpTargetPhone) {
        this.otpTargetPhone.textContent = `+91 ${pending.phone}`;
      }
      if (this.simulatedOtpCode) {
        this.simulatedOtpCode.textContent = pending.otp;
      }
      if (this.otpInput) {
        this.otpInput.value = '';
      }

      // Switch views
      if (this.guardianMainView) this.guardianMainView.style.display = 'none';
      if (this.guardianOtpView) this.guardianOtpView.style.display = 'block';
      if (this.otpInput) this.otpInput.focus();
    } catch (err) {
      alert(err.message || "Invalid contact details");
    }
  }

  handleVerifyOtp() {
    if (!this.otpInput) return;
    const code = this.otpInput.value.trim();
    const result = this.guardianService.verifyOTP(code);

    if (result.success) {
      alert(this.currentLang === 'hi'
        ? `✅ ${result.contact.name} को आपातकालीन संपर्क में सफलतापूर्वक जोड़ा गया!`
        : `✅ ${result.contact.name} successfully registered as Emergency Guardian!`);
      
      // Reset form
      if (this.addGuardianForm) this.addGuardianForm.reset();
      
      // Switch back to main view
      if (this.guardianOtpView) this.guardianOtpView.style.display = 'none';
      if (this.guardianMainView) this.guardianMainView.style.display = 'block';
      
      this.updateGuardianUI();
    } else {
      alert(result.message || "Verification failed");
    }
  }

  cancelOtpVerification() {
    this.guardianService.pendingVerification = null;
    if (this.guardianOtpView) this.guardianOtpView.style.display = 'none';
    if (this.guardianMainView) this.guardianMainView.style.display = 'block';
  }

  openGuardiansModal() {
    if (this.guardianOtpView) this.guardianOtpView.style.display = 'none';
    if (this.guardianMainView) this.guardianMainView.style.display = 'block';
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
