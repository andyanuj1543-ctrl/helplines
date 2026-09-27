
const fs = require("fs");
let code = fs.readFileSync("js/app.js", "utf8");

// 1. Add DOM variables
const targetDom = "    this.fast112Btn = document.getElementById('fast112Btn');";
const newDom = "    this.topSosTriggerBtn = document.getElementById('topSosTriggerBtn');\n" +
  "    this.searchMatchModal = document.getElementById('searchMatchModal');\n" +
  "    this.closeSearchMatchModal = document.getElementById('closeSearchMatchModal');\n" +
  "    this.reflexUrgencyBadge = document.getElementById('reflexUrgencyBadge');\n" +
  "    this.reflexCategoryBadge = document.getElementById('reflexCategoryBadge');\n" +
  "    this.reflexName = document.getElementById('reflexName');\n" +
  "    this.reflexDesc = document.getElementById('reflexDesc');\n" +
  "    this.reflexNumber = document.getElementById('reflexNumber');\n" +
  "    this.reflexCallBtn = document.getElementById('reflexCallBtn');\n" +
  "    this.reflexCallBtnText = document.getElementById('reflexCallBtnText');\n" +
  "    this.reflexAltNumbersWrap = document.getElementById('reflexAltNumbersWrap');\n" +
  "    this.reflexAltNumbersGrid = document.getElementById('reflexAltNumbersGrid');\n" +
  "    this.reflexActionTipsBox = document.getElementById('reflexActionTipsBox');\n" +
  "    this.reflexActionTipsList = document.getElementById('reflexActionTipsList');\n" +
  "    this.reflexShareWhatsapp = document.getElementById('reflexShareWhatsapp');\n" +
  "    this.reflexShareSms = document.getElementById('reflexShareSms');\n" +
  targetDom;

code = code.replace(targetDom, newDom);

// 2. Add event bindings
const targetBind = "    this.quickWhatsappShare.addEventListener('click', () => {";
const newBind = "    if (this.topSosTriggerBtn) {\n" +
  "      this.topSosTriggerBtn.addEventListener('click', () => {\n" +
  "        if ('vibrate' in navigator) { try { navigator.vibrate([100, 50, 100]); } catch(e) {} }\n" +
  "        if (this.sosOverlay) { this.sosOverlay.classList.add('active'); }\n" +
  "      });\n" +
  "    }\n\n" +
  "    if (this.closeSearchMatchModal) {\n" +
  "      this.closeSearchMatchModal.addEventListener('click', () => {\n" +
  "        if (this.searchMatchModal) this.searchMatchModal.style.display = 'none';\n" +
  "      });\n" +
  "    }\n\n" +
  "    if (this.searchMatchModal) {\n" +
  "      this.searchMatchModal.addEventListener('click', (e) => {\n" +
  "        if (e.target === this.searchMatchModal) { this.searchMatchModal.style.display = 'none'; }\n" +
  "      });\n" +
  "    }\n\n" +
  "    if (this.reflexShareWhatsapp) {\n" +
  "      this.reflexShareWhatsapp.addEventListener('click', () => {\n" +
  "        this.sosService.sendWhatsAppSOS(this.locationService.currentLocation);\n" +
  "      });\n" +
  "    }\n\n" +
  "    if (this.reflexShareSms) {\n" +
  "      this.reflexShareSms.addEventListener('click', () => {\n" +
  "        this.sosService.sendSmsSOS(this.locationService.currentLocation);\n" +
  "      });\n" +
  "    }\n\n" +
  targetBind;

code = code.replace(targetBind, newBind);

// 3. Add modal trigger into handleSearch()
const targetSearch = "    this.primaryCallBtn.href = `tel:${p.number}`;";
const newSearch = targetSearch + "\n\n" +
  "    // Trigger Instant Emergency Search Reflex Pop-up Modal\n" +
  "    if (this.searchMatchModal) {\n" +
  "      this.reflexUrgencyBadge.textContent = `${match.urgency} ACTION`;\n" +
  "      this.reflexUrgencyBadge.style.background = match.urgency === 'CRITICAL' ? '#dc2626' : (match.urgency === 'HIGH' ? '#ea580c' : '#2563eb');\n" +
  "      this.reflexCategoryBadge.textContent = match.categoryLabel;\n" +
  "      this.reflexName.textContent = p.name;\n" +
  "      this.reflexDesc.textContent = p.description || match.querySummary;\n" +
  "      this.reflexNumber.textContent = p.number;\n" +
  "      this.reflexCallBtn.href = `tel:${p.number}`;\n" +
  "      if (this.reflexCallBtnText) { this.reflexCallBtnText.textContent = `CALL ${p.number} NOW`; }\n\n" +
  "      if (this.reflexAltNumbersGrid && this.reflexAltNumbersWrap) {\n" +
  "        this.reflexAltNumbersGrid.innerHTML = '';\n" +
  "        if (match.alternativeHelplines && match.alternativeHelplines.length > 0) {\n" +
  "          this.reflexAltNumbersWrap.style.display = 'block';\n" +
  "          match.alternativeHelplines.forEach(alt => {\n" +
  "            const div = document.createElement('div');\n" +
  "            div.className = 'alt-card';\n" +
  "            div.innerHTML = `<div><div class="alt-name">${alt.name}</div><div class="alt-num">${alt.number}</div></div><a href="tel:${alt.number}" class="alt-call-btn">CALL</a>`;\n" +
  "            this.reflexAltNumbersGrid.appendChild(div);\n" +
  "          });\n" +
  "        } else {\n" +
  "          this.reflexAltNumbersWrap.style.display = 'none';\n" +
  "        }\n" +
  "      }\n\n" +
  "      if (this.reflexActionTipsList && this.reflexActionTipsBox) {\n" +
  "        this.reflexActionTipsList.innerHTML = '';\n" +
  "        if (match.actionTips && match.actionTips.length > 0) {\n" +
  "          match.actionTips.forEach(tip => {\n" +
  "            const li = document.createElement('li');\n" +
  "            li.textContent = tip;\n" +
  "            this.reflexActionTipsList.appendChild(li);\n" +
  "          });\n" +
  "          this.reflexActionTipsBox.style.display = 'block';\n" +
  "        } else {\n" +
  "          this.reflexActionTipsBox.style.display = 'none';\n" +
  "        }\n" +
  "      }\n\n" +
  "      this.searchMatchModal.style.display = 'flex';\n" +
  "      if ('vibrate' in navigator) { try { navigator.vibrate(80); } catch(e) {} }\n" +
  "    }";

code = code.replace(targetSearch, newSearch);

fs.writeFileSync("js/app.js", code, "utf8");
console.log("Updated js/app.js with topSosTriggerBtn & search reflex modal successfully!");
