// Main Application Controller with High-Speed Emergency Facility
import { NATIONAL_HELPLINES, INDIA_STATES_DATA } from './data.js';
import { SmartNLPService } from './nlp_matcher.js';
import { LocationService } from './location_service.js';
import { SOSService } from './sos_service.js';

class HelplinesApp {
  constructor() {
    this.locationService = new LocationService();
    this.sosService = new SOSService();
    this.activeCategory = 'all';

    this.initDOMElements();
    this.bindEvents();
    this.renderDirectory();
    this.renderStateModalList();
    this.updateLocationUI(this.locationService.currentLocation);

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

    // Panic Banner
    this.panicBanner = document.getElementById('panicBanner');

    this.initPanicTrigger();
  }

  /**
   * ⚡ Panic Mode: Detects 3 rapid taps on side/power button, screen, or keyboard
   * When triggered, automatically dials 112 directly!
   */
  initPanicTrigger() {
    let tapTimestamps = [];
    const recordPanicTap = (source = "Tap") => {
      const now = Date.now();
      tapTimestamps.push(now);
      // Keep only taps within last 1800ms
      tapTimestamps = tapTimestamps.filter(t => now - t <= 1800);

      if (tapTimestamps.length >= 3) {
        tapTimestamps = [];
        this.triggerPanicSOS(`3x Side/Power or Screen Tap (${source})`);
      }
    };

    // 1. Screen triple tap (even in panic/pocket touch)
    document.addEventListener('click', (e) => {
      if (e.target.closest('#dismissSosBtn')) return;
      recordPanicTap("Screen Tap");
    }, { passive: true });

    // 2. Mobile Side/Power Button & Hardware Key Detection (Visibility / Focus / Blur cycles)
    // When a user taps the power/side button quickly 3 times while phone is internally on,
    // the screen locks/unlocks or changes visibility rapidly.
    let visibilityChanges = [];
    document.addEventListener('visibilitychange', () => {
      const now = Date.now();
      visibilityChanges.push(now);
      visibilityChanges = visibilityChanges.filter(t => now - t <= 2500);
      if (visibilityChanges.length >= 3) {
        visibilityChanges = [];
        this.triggerPanicSOS("3x Side Button Power Toggle");
      }
    });

    window.addEventListener('blur', () => {
      recordPanicTap("Power Button Screen Off/On");
    });

    // 3. Hardware keys (Volume, Power, Space, Escape, Enter)
    document.addEventListener('keydown', (e) => {
      recordPanicTap(`Key: ${e.key || e.code}`);
    });

    if (this.panicBanner) {
      this.panicBanner.addEventListener('click', () => {
        this.triggerPanicSOS("Panic Banner Click");
      });
    }
  }

  /**
   * Directly triggers emergency response and automatically dials 112
   */
  triggerPanicSOS(triggerSource = "Emergency Trigger") {
    // Vibrate device with SOS pattern (... --- ...)
    if ('vibrate' in navigator) {
      try { navigator.vibrate([200, 100, 200, 100, 200, 300, 400, 100, 400, 100, 400, 300, 200, 100, 200, 100, 200]); } catch(e) {}
    }

    // Show SOS Emergency Overlay
    if (this.sosOverlay) {
      this.sosOverlay.classList.add('active');
    }

    console.warn(`🚨 EMERGENCY SOS TRIGGERED via: ${triggerSource}. Initiating automatic emergency dial to 112...`);

    // Automatically trigger phone dialer to 112
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

    // PWA App Installation Handler
    this.initPWAInstallation();
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
    if (stateName === "Uttar Pradesh") {
      this.fastWomenName.textContent = "UP WOMEN 1090";
      this.fastWomenSub.textContent = "Power Line & Anti-Harassment";
      this.fastWomenNum.textContent = "1090";
      this.fastWomenBtn.href = "tel:1090";
    } else if (stateName === "Delhi") {
      this.fastWomenName.textContent = "DELHI DCW 181";
      this.fastWomenSub.textContent = "Women Rescue & Dispatch";
      this.fastWomenNum.textContent = "181";
      this.fastWomenBtn.href = "tel:181";
    } else if (stateName === "Gujarat") {
      this.fastWomenName.textContent = "GUJARAT 181";
      this.fastWomenSub.textContent = "Abhayam Rescue Van";
      this.fastWomenNum.textContent = "181";
      this.fastWomenBtn.href = "tel:181";
    } else if (stateName === "Maharashtra") {
      this.fastWomenName.textContent = "MUMBAI WOMEN 103";
      this.fastWomenSub.textContent = "Police Women Helpline";
      this.fastWomenNum.textContent = "103";
      this.fastWomenBtn.href = "tel:103";
    } else {
      this.fastWomenName.textContent = "WOMEN SAFETY";
      this.fastWomenSub.textContent = "National Distress (1091)";
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
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new HelplinesApp();
});
