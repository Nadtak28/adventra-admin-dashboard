import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/auth/login/hook/loginSlice.js";
import DashBoardSlice from "../features/dahsboard/hook/DashboardSlice.jsx";
import AddCitySlice from "../features/cities/hook/addCitySlice.jsx";
import AddEventSlice from "../features/event_group_trip/hook/addEventSlice.jsx";
import AddGTSlice from "../features/event_group_trip/hook/addGTSlice.jsx";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    DashBoard:DashBoardSlice,
    AddCity: AddCitySlice,
    AddEvent: AddEventSlice,
    AddGT:AddGTSlice
  },
});
