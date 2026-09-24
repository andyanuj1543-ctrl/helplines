package com.emergency.helplines_app

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.KeyEvent
import android.view.accessibility.AccessibilityEvent
import android.util.Log

class VolumeEmergencyAccessibilityService : AccessibilityService() {

    private var isVolumeUpPressed = false
    private var isVolumeDownPressed = false
    private var lastVolumeUpTime: Long = 0
    private var lastVolumeDownTime: Long = 0
    private var lastTriggerTime: Long = 0

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // Not needed for key filtering, but required by AccessibilityService
    }

    override fun onInterrupt() {
        Log.i("VolumeEmergencyService", "Service interrupted")
    }

    override fun onKeyEvent(event: KeyEvent): Boolean {
        val action = event.action
        val keyCode = event.keyCode

        if (keyCode == KeyEvent.KEYCODE_VOLUME_UP || keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            val now = System.currentTimeMillis()

            if (action == KeyEvent.ACTION_DOWN) {
                if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
                    isVolumeUpPressed = true
                    lastVolumeUpTime = now
                } else if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
                    isVolumeDownPressed = true
                    lastVolumeDownTime = now
                }

                // Check if both volume keys were pressed simultaneously or within 500ms
                val isSimultaneous = (isVolumeUpPressed && isVolumeDownPressed) ||
                        (Math.abs(lastVolumeUpTime - lastVolumeDownTime) < 550 && lastVolumeUpTime > 0 && lastVolumeDownTime > 0)

                if (isSimultaneous && (now - lastTriggerTime > 6000)) {
                    lastTriggerTime = now
                    isVolumeUpPressed = false
                    isVolumeDownPressed = false
                    lastVolumeUpTime = 0
                    lastVolumeDownTime = 0

                    triggerSilentEmergencyCall()
                    return true // Consume event to prevent loud volume beeps
                }
            } else if (action == KeyEvent.ACTION_UP) {
                if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
                    isVolumeUpPressed = false
                } else if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
                    isVolumeDownPressed = false
                }
            }
        }

        return super.onKeyEvent(event)
    }

    private fun triggerSilentEmergencyCall() {
        Log.w("VolumeEmergencyService", "⚡ Simultaneous Volume Up + Down pressed! Triggering silent emergency call to 112...")

        // Subtle haptic vibration (2 short pulses)
        try {
            val vibrator = getSystemService(VIBRATOR_SERVICE) as? Vibrator
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator?.vibrate(VibrationEffect.createWaveform(longArrayOf(0, 150, 100, 150), -1))
            } else {
                @Suppress("DEPRECATION")
                vibrator?.vibrate(longArrayOf(0, 150, 100, 150), -1)
            }
        } catch (e: Exception) {
            Log.e("VolumeEmergencyService", "Haptic vibration failed", e)
        }

        // Silent direct call to 112 (works even from lock screen)
        try {
            val callIntent = Intent(Intent.ACTION_CALL).apply {
                data = Uri.parse("tel:112")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            startActivity(callIntent)
        } catch (e: Exception) {
            Log.w("VolumeEmergencyService", "Direct call failed, falling back to dialer", e)
            val dialIntent = Intent(Intent.ACTION_DIAL).apply {
                data = Uri.parse("tel:112")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            startActivity(dialIntent)
        }
    }
}
