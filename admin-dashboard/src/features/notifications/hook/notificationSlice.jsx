import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {getNotificationService} from "../api/getNotification.jsx";

const initialState = {
    notifications: [],
}
const NotificationsSlice =createSlice({
    name: "NotificationsApi",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder
            .addCase(getNotificationService.fulfilled, (state, action) => {
                state.notifications = action.payload.data;
            })
            .addCase(getNotificationService.rejected, (state, action) => {
                console.log("GuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false
            })

    }
})
export default NotificationsSlice.reducer;

