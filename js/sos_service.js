// SOS Emergency Service: Web Audio Alarm Siren, 1-Tap SOS Dispatch & Coordinates Sharing

export class SOSService {
  constructor() {
    this.audioCtx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.sirenInterval = null;
    this.isSirenPlaying = false;
  }

  /**
   * Generates a high-pitch emergency siren using Web Audio API synthesis
   * Works completely offline without needing any audio assets
   */
  toggleSiren() {
    if (this.isSirenPlaying) {
      this.stopSiren();
      return false;
    } else {
      this.startSiren();
      return true;
    }
  }

  startSiren() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;

      this.audioCtx = new AudioContext();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = 'sawtooth';
      this.gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      let high = false;
      this.oscillator.frequency.setValueAtTime(700, this.audioCtx.currentTime);

      this.sirenInterval = setInterval(() => {
        if (!this.oscillator || !this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const targetFreq = high ? 700 : 960;
        this.oscillator.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.25);
        high = !high;
      }, 300);

      this.oscillator.start();
      this.isSirenPlaying = true;
      return true;
    } catch (e) {
      console.error("AudioContext error:", e);
      return false;
    }
  }

  stopSiren() {
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (e) {}
      this.oscillator = null;
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {}
      this.audioCtx = null;
    }
    this.isSirenPlaying = false;
  }

  /**
   * Generates emergency SOS dispatch text containing real-time location & maps link
   */
  generateEmergencyMessage(location) {
    const mapsLink = `https://maps.google.com/?q=${location.latitude.toFixed(6)},${location.longitude.toFixed(6)}`;
    const address = location.formattedAddress || `${location.district}, ${location.state}`;
    const time = new Date().toLocaleTimeString();

    return `🚨 EMERGENCY SOS! 🚨\nI need immediate emergency help!\nMy current location: ${address}\nLive GPS Map: ${mapsLink}\nTimestamp: ${time}\nPlease send police / ambulance immediately!`;
  }

  /**
   * Launches WhatsApp with pre-filled SOS message
   */
  sendWhatsAppSOS(location) {
    const text = encodeURIComponent(this.generateEmergencyMessage(location));
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  /**
   * Launches native SMS app with pre-filled SOS message
   */
  sendSmsSOS(location) {
    const text = encodeURIComponent(this.generateEmergencyMessage(location));
    // Works across iOS and Android
    window.location.href = `sms:?body=${text}`;
  }

  /**
   * Initiates direct phone call
   */
  dial(number) {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    window.location.href = `tel:${cleanNumber}`;
  }
}
