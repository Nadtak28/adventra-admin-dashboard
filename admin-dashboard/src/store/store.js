import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/auth/login/hook/loginSlice.js";
import DashBoardSlice from "../features/dahsboard/hook/DashboardSlice.jsx";
import getIdsSlice from "../features/all/hook/getIdsSlice.js";
import AddCitySlice from "../features/cities/hook/addCitySlice.jsx";
import AddEventSlice from "../features/event_group_trip/hook/addEventSlice.jsx";
import AddGTSlice from "../features/event_group_trip/hook/addGTSlice.jsx";
import addGuideSlice from "../features/guide/hook/addGuideSlice.jsx";
import CitiesSlice from "../features/cities/hook/citiesSlice.jsx";
import GuideSlice from "../features/guide/hook/guidesSlice.jsx";
import Event_GTSlice from "../features/event_group_trip/hook/Event_GTSlice.jsx";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    getIds:getIdsSlice,
    DashBoard:DashBoardSlice,
    AddCity: AddCitySlice,
    AddEvent: AddEventSlice,
    AddGT:AddGTSlice,
    addGuide: addGuideSlice,
    Cities:CitiesSlice,
    Guides:GuideSlice,
    Events_GTS:Event_GTSlice
  },
});
