import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBvEeuuEy5sEoeAKNNWNOB02WF1dsBHX_g",
  authDomain: "adventra-ea7a8.firebaseapp.com",
  projectId: "adventra-ea7a8",
  storageBucket: "adventra-ea7a8.firebasestorage.app",
  messagingSenderId: "393308968503",
  appId: "1:393308968503:web:e59c24dcaa5d1df28311b2",
  measurementId: "G-T6F9NS2B98",
};

const app = initializeApp(firebaseConfig);

export const messaging = (async () => {
  try {
    const supported = await isSupported();
    return supported ? getMessaging(app) : null;
  } catch {
    return null;
  }
})();
