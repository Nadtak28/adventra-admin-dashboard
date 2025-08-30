import Login from "./pages/login";
import DashboardLayout from "./features/routes/dashboardLayout.jsx";
import Dashboard from './pages/dashboard.jsx'
import Settings from './pages/Settings.jsx'
import Notifications from './pages/notification.jsx'
import EventGroupTrip from "./pages/events_group_trip/event_groupTrip.jsx";
import Cities from "./pages/Cities/cities.jsx"
import AddCity from "./pages/Cities/add_city.jsx"
import City from "./pages/Cities/city.jsx"
import Guides from "./pages/Guides/guides.jsx"
import Guide from "./pages/Guides/guide.jsx"
import Event from "./pages/events_group_trip/event.jsx"
import Users from "./pages/users.jsx"
import AddGuides from "./pages/Guides/add_guide.jsx"
import ProtectedRoute from "./features/routes/protectedRoute.jsx"
import {tokenStore} from "./utils/dataStore.js";
import {Navigate, Routes,Route} from "react-router-dom";
import AddEvent from "./pages/events_group_trip/add_event.jsx";
import AddGroupTrip from "./pages/events_group_trip/add_group_trip.jsx";
import { onMessage } from "firebase/messaging";
import { messaging } from "./utils/firebase";
import {useEffect} from "react";
function App() {
     // tokenStore.clearToken()
    useEffect(() => {
        messaging.then((msg) => {
            if (!msg) return;

            onMessage(msg, (payload) => {
                console.log("📩 إشعار Foreground:", payload);

                // يمكنك عرض Toast أو أي واجهة UI هنا
                if (payload.notification) {
                    new Notification(payload.notification.title, {
                        body: payload.notification.body,
                        icon: "/logo192.png",
                    });
                }
            });
        });
    }, []);

    // تسجيل الـ Service Worker عند تحميل التطبيق
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then((registration) => {
                console.log("✅ Service Worker مسجل بنجاح:", registration);
            })
            .catch((error) => {
                console.error("❌ فشل تسجيل Service Worker:", error);
            });
    }

    return (

    <Routes>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={tokenStore.getToken()?<Navigate to="/dashboard" replace />:<Login/>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
               <Route index element={<Dashboard/>}/>
               <Route path="settings" element={<Settings/>}/>
               <Route path="notifications" element={<Notifications/>}/>
               <Route path="event_grouptrip" element={<EventGroupTrip/>}/>
               <Route path="cities" element={<Cities/>}/>
               <Route path="cities/:id" element={<City />} />
               <Route path="guides" element={<Guides/>}/>
               <Route path="guides/:id" element={<Guide/>}/>
               <Route path="events/:id" element={<Event/>}/>
               <Route path="users" element={<Users/>}/>
               <Route path="guides/add" element={<AddGuides/>}/>
               <Route path="cities/add" element={<AddCity />} />
               <Route path="event_grouptrip/add_event" element={<AddEvent />} />
               <Route path="event_grouptrip/add_group_trip" element={<AddGroupTrip />} />
               <Route path="event_grouptrip/add_group_trip/:id" element={<AddGroupTrip />} />
        </Route>
    </Routes>

  )
}

export default App
