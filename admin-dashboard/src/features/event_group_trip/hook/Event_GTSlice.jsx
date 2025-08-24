import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {filterService} from "../../all/api/filterService.jsx"
import {getEv_GTService} from "../api/getEv_GTService.jsx";

const initialState = {
    data:[],
    events: [],
    recentGroupTrips: [],
    upcomingGroupTrips: [],
    eventsCount: 0,
    groupsCount: 0,
    totalRevenue: 0,
    monthlyRate: 0,
}
const Event_GTSlice =createSlice({
    name: "Event_GTApi",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder.addCase(filterService.pending, (state,action) => {
            state.data = [];
        })
            .addCase(filterService.fulfilled, (state, action) => {
                if(action.payload.type==='event') {
                    state.data = action.payload.event;
                }else if(action.payload.type==='group_trip') {
                    state.data = action.payload.groupTrip;
                }
            })
            .addCase(filterService.rejected, (state, action) => {
                console.log("Event_GTService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })

            .addCase(getEv_GTService.pending, (state,action) => {
                state.events= []
                state.recentGroupTrips= []
                state.upcomingGroupTrips= []
                state.eventsCount= 0
                state.groupsCount= 0
                state.totalRevenue= 0
                state.monthlyRate= 0
        })
            .addCase(getEv_GTService.fulfilled, (state, action) => {
                state.events= action.payload.events;
                state.recentGroupTrips= action.payload.recentGroupTrips;
                state.upcomingGroupTrips= action.payload.upcomingGroupTrips;
                state.eventsCount= action.payload.eventsCount;
                state.groupsCount= action.payload.groupsCount;
                state.totalRevenue= action.payload.totalRevenue;
                state.monthlyRate= action.payload.monthlyRate;
            })
            .addCase(getEv_GTService.rejected, (state, action) => {
                console.log("Event_GTService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })

    }
})
export default Event_GTSlice.reducer;

