import { getToken } from "firebase/messaging";
import { messaging } from "../../../../utils/firebase.js";

export const requestFCMToken = async () => {
    try {
        // طلب إذن المستخدم
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("⚠️ إذن الإشعارات مرفوض");
            return null;
        }

        // تأكد من أن الـ Service Worker نشط قبل طلب التوكن
        const registration = await navigator.serviceWorker.ready;

        console.log("✅ Service Worker جاهز:", registration);

        // جلب messaging
        const msg = await messaging;
        if (!msg) {
            console.error("❌ هذا المتصفح لا يدعم Firebase Messaging");
            return null;
        }

        // الحصول على التوكن
        const token = await getToken(msg, {
            vapidKey:
                "BB01AJyEv184wwGyYQREYJDzhYPwQRTmSBW7FD64_SeYKtDUKyOGpLsgsQan4eVw7mA8Opxox8jcok7iZdugnT0",
            serviceWorkerRegistration: registration,
        });

        if (token) {
            console.log("🎯 FCM Token:", token);
            return token;
        } else {
            console.warn("⚠️ لم يتم الحصول على التوكن");
            return null;
        }
    } catch (err) {
        console.error("🔥 خطأ في جلب FCM Token:", err);
        return null;
    }
};
