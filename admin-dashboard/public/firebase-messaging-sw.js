/* public/firebase-messaging-sw.js */
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// انسخ الـ firebaseConfig هنا مباشرة ولا تستورده
firebase.initializeApp({
  apiKey: "AIzaSyBvEeuuEy5sEoeAKNNWNOB02WF1dsBHX_g",
  authDomain: "adventra-ea7a8.firebaseapp.com",
  projectId: "adventra-ea7a8",
  storageBucket: "adventra-ea7a8.firebasestorage.app",
  messagingSenderId: "393308968503",
  appId: "1:393308968503:web:e59c24dcaa5d1df28311b2",
  measurementId: "G-T6F9NS2B98",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);

  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/logo192.png",
    data: payload.data,
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
      clients.openWindow(event.notification.data?.url || "/")
  );
});
