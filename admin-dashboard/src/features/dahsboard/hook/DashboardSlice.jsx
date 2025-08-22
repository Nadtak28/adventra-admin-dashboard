import {createSlice} from "@reduxjs/toolkit";
import {DashBoardService} from "../api/DashboardService.jsx";
import {sendGiftService} from "../api/sendGistService.jsx";
import {tokenStore} from "../../../utils/dataStore.js"
const initialState = {
    businessInfo:[],
    topRatedEvents:[],
    topRatedGroupTrips:[],
    mostEventsBooker:[],
    mostGroupTripsBooker:[],
    currentMonth:0,
    rewardBooker:{},
    rewardPoints:10,
    isLoading:false,
    giftSent:false
}
const DashBoardSlice =createSlice({
    name: "DashBoardSlice",
    initialState,
    reducers: {
        updateFields(state, action) {
            state[action.payload.field]=action.payload.value
        }
    },
    extraReducers:(builder) => {
        builder.addCase(DashBoardService.pending, (state, action) => {
            state.isLoading=true
            state.giftSent=false
        })
            .addCase(DashBoardService.fulfilled, (state, action) => {
            state.businessInfo=action.payload.businessInfo;
            state.topRatedEvents=action.payload.topRatedEvents;
            state.topRatedGroupTrips=action.payload.topRatedGroupTrips;
            state.mostEventsBooker=action.payload.mostEventsBooker;
            state.mostGroupTripsBooker=action.payload.mostGroupTripsBooker;
            state.rewardBooker={}
            state.rewardPoints=0
            state.isLoading=false
            })
            .addCase(DashBoardService.rejected, (state, action) => {
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading=false
            })
            .addCase(sendGiftService.pending, (state, action) => {
            })
            .addCase(sendGiftService.fulfilled, (state, action) => {
                state.rewardPoints=0
                state.rewardBooker={}
                state.isLoading=false
                state.giftSent=true
                console.log("GiftService.fullfield", action.payload)
            })

            .addCase(sendGiftService.rejected, (state, action) => {
                console.log("addGuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading=false
                state.isLoadingGift=false
            })

    }
 })
export const {updateFields} = DashBoardSlice.actions;
export default DashBoardSlice.reducer;