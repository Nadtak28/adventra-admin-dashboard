import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/auth/login/hook/loginSlice.js";
export const store = configureStore({
  reducer: {
    login: loginSlice
  },
});
