import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {filterService} from "../../all/api/filterService.jsx"
import {getEv_GTService} from "../api/getEv_GTService.jsx";


const initialState = {
    data:[],
    events: [],
    recentGroupTrips: [],
    upcomingGroupTrips: [],
    topRatedGroupTrips: [],
    eventsCount: 0,
    groupsCount: 0,
    totalRevenue: 0,
    monthlyRate: 0,
    isLoading:false,
    isLoadingPage:false,
    search:{
        searchType:'event', // 'events' or 'group_tours'
        searchTerm:'',
        selectedCities:[],
        selectedCategories:[],
        selectedLanguages:[],
        selectedStatus:'active',
        hasOffer:"0",
        sortBy:'name',
        order_type:'DESC'

    }
}
const Event_GTSlice =createSlice({
    name: "Event_GTApi",
    initialState,
    reducers: {
        updatedFields(state, action) {
            state.search[action.payload.field] = action.payload.value;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(filterService.pending, (state,action) => {
            state.data = [];
            state.isLoading = true;
        })
            .addCase(filterService.fulfilled, (state, action) => {
                if(action.payload.type==='event') {
                    state.data = action.payload.event;
                }else if(action.payload.type==='group_trip') {
                    state.data = action.payload.groupTrip;
                }
                state.isLoading = false;
            })
            .addCase(filterService.rejected, (state, action) => {
                console.log("Event_GTService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
            })

            .addCase(getEv_GTService.pending, (state,action) => {
                state.eventsCount= 0
                state.groupsCount= 0
                state.totalRevenue= 0
                state.monthlyRate= 0
                state.isLoadingPage=true

            })
            .addCase(getEv_GTService.fulfilled, (state, action) => {
                state.events= action.payload.events;
                state.recentGroupTrips= action.payload.recentGroupTrips;
                state.upcomingGroupTrips= action.payload.upcomingGroupTrips;
                state.topRatedGroupTrips= action.payload.topRatedGroupTrips;
                state.eventsCount= action.payload.eventsCount;
                state.groupsCount= action.payload.groupsCount;
                state.totalRevenue= action.payload.totalRevenue;
                state.monthlyRate= action.payload.monthlyRate;
                state.isLoadingPage=false
            })
            .addCase(getEv_GTService.rejected, (state, action) => {
                console.log("Event_GTService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoadingPage=false
            })

    }
})
export default Event_GTSlice.reducer;

