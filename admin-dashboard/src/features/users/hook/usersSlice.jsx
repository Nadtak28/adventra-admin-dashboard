import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {filterService} from "../../all/api/filterService.jsx"

const initialState = {
    activeUsers: [
        { id: 1, name: "John Doe", email: "john@example.com", active: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
        { id: 3, name: "Michael Johnson", email: "michael@example.com", active: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
        { id: 5, name: "Robert Brown", email: "robert@example.com", active: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
        { id: 7, name: "David Wilson", email: "david@example.com", active: true, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },],
    inActiveUsers: [
        { id: 2, name: "Sarah Wilson", email: "sarah@example.com", active: false, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face" },
        { id: 4, name: "Emily Davis", email: "emily@example.com", active: false, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
        { id: 6, name: "Jessica Miller", email: "jessica@example.com", active: false, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
        { id: 8, name: "Lisa Anderson", email: "lisa@example.com", active: false, avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face" }],
    isLoading:false
}
const UsersSlice =createSlice({
    name: "UsersApi",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder.addCase(filterService.pending, (state,action) => {
            state.isLoading = true
        })
            .addCase(filterService.fulfilled, (state, action) => {
                if(action.payload.type==='user') {
                    state.activeUsers = action.payload.activeUsers.user;
                    state.inActiveUsers = action.payload.inActiveUsers.user;
                }
                state.isLoading = false
            })
            .addCase(filterService.rejected, (state, action) => {
                console.log("UsersService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false
            })

    }
})
export default UsersSlice.reducer;

