import Login from "./pages/login";
import DashboardLayout from "./features/routes/dashboardLayout.jsx";
import Dashboard from './pages/dashboard.jsx'
import EventGroupTrip from "./pages/events_group_trip/event_groupTrip.jsx";
import Cities from "./pages/Cities/cities.jsx"
import AddCity from "./pages/Cities/add_city.jsx"
import City from "./pages/Cities/city.jsx"
import Guides from "./pages/Guides/guides.jsx"
import Users from "./pages/users.jsx"
import AddGuides from "./pages/Guides/add_guide.jsx"
import ProtectedRoute from "./features/routes/protectedRoute.jsx"
import {tokenStore} from "./utils/dataStore.js";
import {Navigate, Routes,Route} from "react-router-dom";
import AddEvent from "./pages/events_group_trip/add_event.jsx";
import AddGroupTrip from "./pages/events_group_trip/add_group_trip.jsx";
function App() {
     // tokenStore.clearToken()

  return (

    <Routes>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={tokenStore.getToken()?<Navigate to="/dashboard" replace />:<Login/>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
               <Route index element={<Dashboard/>}/>
               <Route path="event_grouptrip" element={<EventGroupTrip/>}/>
               <Route path="cities" element={<Cities/>}/>
               <Route path="cities/:id" element={<City />} />
               <Route path="guides" element={<Guides/>}/>
               <Route path="users" element={<Users/>}/>
               <Route path="guides/add" element={<AddGuides/>}/>
               <Route path="cities/add" element={<AddCity />} />
               <Route path="event_grouptrip/add_event" element={<AddEvent />} />
               <Route path="event_grouptrip/add_group_trip" element={<AddGroupTrip />} />
        </Route>
    </Routes>

  )
}

export default App
