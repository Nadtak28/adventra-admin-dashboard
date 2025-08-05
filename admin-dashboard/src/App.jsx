import Login from "./pages/login";
import DashboardLayout from "./features/routes/dashboardLayout.jsx";
import Dashboard from './pages/dashboard.jsx'
import EventGroupTrip from "./pages/event_groupTrip.jsx";
import Cities from "./pages/Cities/cities.jsx"
import AddCity from "./pages/Cities/add_city.jsx"
import Guides from "./pages/guides.jsx"
import ProtectedRoute from "./features/routes/protectedRoute.jsx"
import {tokenStore} from "./utils/dataStore.js";
import {Navigate, Routes,Route} from "react-router-dom";
function App() {
    //tokenStore.clearToken()

  return (
   <Routes>
     <Route path="*" element={<Navigate to="/dashboard" replace />} />
     <Route path="/login" element={tokenStore.getToken()?<Navigate to="/dashboard" replace />:<Login/>} />
     <Route path="/dashboard" element={
         <ProtectedRoute>
             <DashboardLayout/>
         </ProtectedRoute>}>
       <Route index element={<Dashboard/>}/>
       <Route path="event_grouptrip" element={<EventGroupTrip/>}/>
       <Route path="cities" element={<Cities/>}/>
       <Route path="guides" element={<Guides/>}/>
        <Route path="cities/add" element={<AddCity />} />
     </Route>
   </Routes>
  )
}

export default App
