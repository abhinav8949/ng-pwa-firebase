importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

// Initialize Firebase inside the service worker
firebase.initializeApp({
    apiKey: "AIzaSyDOHQArG9XYuuJtlqIZlCt3HoF6jFpJsIw",
    authDomain: "expense-tracker-1ff01.firebaseapp.com",
    projectId: "expense-tracker-1ff01",
    storageBucket: "expense-tracker-1ff01.firebasestorage.app",
    messagingSenderId: "524581951426",
    appId: "1:524581951426:web:72e561200704ea442b285b",
});

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
