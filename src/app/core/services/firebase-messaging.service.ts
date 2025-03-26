import { Injectable } from '@angular/core';
import { getMessaging, getToken, MessagePayload, Messaging, onMessage } from '@angular/fire/messaging';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  constructor(private messaging: Messaging, private toastr: ToastrService) { }

  requestPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        this.getFCMToken();
      } else {
        console.warn('Notification permission denied.');
      }
    }).catch(error => {
      console.error('Error requesting notification permission:', error);
    });
  }

  getFCMToken() {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js') // Register the service worker
      .then(registration => {
        return getToken(this.messaging, {
          vapidKey: environment.firebaseConfig.vapidKey, // Ensure VAPID key is set
          serviceWorkerRegistration: registration
        });
      })
      .then(token => {
        if (token) {
          // Token retrieved successfully (send it to backend if needed)
        } else {
          console.warn('No FCM token available.');
        }
      })
      .catch(error => {
        console.error('Error retrieving FCM token:', error);
      });
  }

  listenForMessages() {
    onMessage(this.messaging, payload => {
      try {
        new Notification(payload.notification?.title || 'New Notification', {
          body: payload.notification?.body,
        });
      } catch (error) {
        console.error('Error displaying notification:', error);
      }
    });
  }

  sendFCMNotification(title: string, body: string, fcmUniqueKey: string) {
    if ('serviceWorker' in navigator) {
      const storedNotifications = JSON.parse(localStorage.getItem('budgetNotifications') || '{}');
      const now = Date.now();
      const cooldownTime = 30 * 60 * 1000; // 30 minutes

      // If this budget notification exists and cooldown time hasn't passed, skip it
      if (storedNotifications[fcmUniqueKey] && now - storedNotifications[fcmUniqueKey] < cooldownTime) {
        console.warn(`Skipping duplicate notification for ${fcmUniqueKey}`);
        return;
      }

      navigator.serviceWorker.ready
        .then(registration => {
          registration.showNotification(title, { body });

          // Store notification timestamp
          storedNotifications[fcmUniqueKey] = now;
          localStorage.setItem('budgetNotifications', JSON.stringify(storedNotifications));
        })
        .catch(error => {
          console.error('Error showing notification:', error);
        });
    } else {
      console.warn('Service worker is not available.');
      this.requestPermission(); // Request permission if not granted
    }
  }

}
