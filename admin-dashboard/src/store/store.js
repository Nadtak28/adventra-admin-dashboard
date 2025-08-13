import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/auth/login/hook/loginSlice.js";
import DashBoardSlice from "../features/dahsboard/hook/DashboardSlice.jsx";
import AddCitySlice from "../features/cities/hook/addCitySlice.jsx";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    DashBoard:DashBoardSlice,
    AddCity: AddCitySlice,

  },
});
