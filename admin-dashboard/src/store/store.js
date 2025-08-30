import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/auth/login/hook/loginSlice.js";
import DashBoardSlice from "../features/dahsboard/hook/DashboardSlice.jsx";
import getIdsSlice from "../features/all/hook/getIdsSlice.js";
import AddCitySlice from "../features/cities/hook/addCitySlice.jsx";
import CitySlice from "../features/cities/hook/citySlice.jsx";
import EventSlice from "../features/event_group_trip/hook/eventSlice.jsx";
import GroupTripSlice from "../features/event_group_trip/hook/groupTripSlice.jsx";
import AddEventSlice from "../features/event_group_trip/hook/addEventSlice.jsx";
import AddGTSlice from "../features/event_group_trip/hook/addGTSlice.jsx";
import addGuideSlice from "../features/guide/hook/addGuideSlice.jsx";
import CitiesSlice from "../features/cities/hook/citiesSlice.jsx";
import GuideSlice from "../features/guide/hook/guidesSlice.jsx";
import OneGuideSlice from "../features/guide/hook/guideSlice.jsx";
import Event_GTSlice from "../features/event_group_trip/hook/Event_GTSlice.jsx";
import UsersSlice from "../features/users/hook/usersSlice.jsx";
import NotificationsSlice from "../features/notifications/hook/notificationSlice.jsx";
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
    Guide:OneGuideSlice,
    Events_GTS:Event_GTSlice,
    Users:UsersSlice,
    City:CitySlice,
    Event:EventSlice,
    GT:GroupTripSlice,
    Notifications:NotificationsSlice,
  },
});
