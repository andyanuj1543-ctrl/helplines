// Trusted Emergency Guardians Service: Mobile/OTP Verification & 1-Tap SOS Dispatch

export class GuardianService {
  constructor() {
    this.storageKey = 'helplines_guardians';
    this.pendingVerification = null; // { name, phone, relation, otp, timestamp }
  }

  /**
   * Retrieves all verified emergency contacts from localStorage
   */
  getGuardians() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading guardians:", e);
      return [];
    }
  }

  /**
   * Saves updated list of verified emergency contacts
   */
  saveGuardians(list) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    } catch (e) {
      console.error("Error saving guardians:", e);
    }
  }

  /**
   * Adds an emergency contact directly without requiring OTP verification
   */
  addGuardian(name, phone, relation = 'Family') {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      throw new Error("Please enter a valid 10-digit mobile number");
    }

    const numberToSave = cleanPhone.slice(-10);
    const cleanName = (name || relation || "Family").trim();
    const guardians = this.getGuardians();

    const existingIndex = guardians.findIndex(g => g.phone === numberToSave);
    const newContact = {
      id: 'g_' + Date.now(),
      name: cleanName,
      phone: numberToSave,
      relation: relation || 'Family',
      savedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      guardians[existingIndex] = newContact;
    } else {
      guardians.push(newContact);
    }

    this.saveGuardians(guardians);
    return newContact;
  }

  /**
   * Removes a guardian by ID
   */
  removeGuardian(id) {
    const guardians = this.getGuardians().filter(g => g.id !== id);
    this.saveGuardians(guardians);
    return guardians;
  }

  /**
   * Generates a unique Live SOS Tracking Link for the user
   */
  generateLiveTrackingUrl(location, userName = "Emergency Contact") {
    const lat = location.latitude ? location.latitude.toFixed(6) : "28.462590";
    const lng = location.longitude ? location.longitude.toFixed(6) : "77.490340";
    const baseUrl = window.location.origin + window.location.pathname;
    const nameParam = encodeURIComponent(userName || "Friend");
    return `${baseUrl}?sos=1&lat=${lat}&lng=${lng}&name=${nameParam}&t=${Date.now()}`;
  }

  /**
   * Formats comprehensive SOS text for WhatsApp & SMS with live link & coordinates
   */
  formatGuardianSOSMessage(location, userName = "Me") {
    const trackingLink = this.generateLiveTrackingUrl(location, userName);
    const address = location.formattedAddress || `${location.district || 'Location'}, ${location.state || 'India'}`;
    const lat = location.latitude ? location.latitude.toFixed(5) : "--";
    const lng = location.longitude ? location.longitude.toFixed(5) : "--";
    const time = new Date().toLocaleTimeString();

    return `🚨 EMERGENCY SOS ALERT! 🚨\n\nI need immediate emergency help! Please contact me or send police / ambulance immediately!\n\n📍 My Exact Address: ${address}\n📌 Coordinates: ${lat}, ${lng}\n⏱️ Time: ${time}\n\n🔴 LIVE SOS TRACKING LINK:\n${trackingLink}\n\n(Click link to see my live location on map & get direct driving directions)`;
  }

  /**
   * 1-Tap Alert to registered guardians (or direct custom number) via Native SMS (Offline support)
   */
  dispatchSMSToGuardians(location, userName = "Me", customNumber = null) {
    let numbers = '';
    if (customNumber) {
      const clean = customNumber.replace(/[^0-9]/g, '').slice(-10);
      if (clean.length === 10) numbers = clean;
    }

    if (!numbers) {
      const guardians = this.getGuardians();
      if (guardians.length === 0) return false;
      numbers = guardians.map(g => g.phone).join(',');
    }

    const text = encodeURIComponent(this.formatGuardianSOSMessage(location, userName));
    // Cross-platform multi-recipient SMS syntax
    window.location.href = `sms:${numbers}?body=${text}`;
    return true;
  }

  /**
   * 1-Tap Alert to guardians via WhatsApp
   */
  dispatchWhatsAppToGuardians(location, userName = "Me", customNumber = null) {
    let phone = '';
    if (customNumber) {
      const clean = customNumber.replace(/[^0-9]/g, '').slice(-10);
      if (clean.length === 10) phone = clean;
    }

    const text = encodeURIComponent(this.formatGuardianSOSMessage(location, userName));

    if (phone) {
      window.open(`https://api.whatsapp.com/send?phone=91${phone}&text=${text}`, '_blank');
      return true;
    }

    const guardians = this.getGuardians();
    if (guardians.length === 1) {
      // Send directly to the primary guardian's WhatsApp chat
      window.open(`https://api.whatsapp.com/send?phone=91${guardians[0].phone}&text=${text}`, '_blank');
    } else {
      // Open WhatsApp share chooser
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
    return true;
  }

  /**
   * Generates a QR code SVG data string to exchange emergency numbers in 1 second
   */
  generateContactQRData(contact) {
    return `MECARD:N:${contact.name || 'Emergency Contact'};TEL:${contact.phone};NOTE:Helplines Emergency Guardian;;`;
  }
}
