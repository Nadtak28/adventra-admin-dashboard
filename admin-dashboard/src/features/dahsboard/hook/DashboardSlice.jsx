import {createSlice} from "@reduxjs/toolkit";
import {DashBoardService} from "../api/DashboardService.jsx";
import {tokenStore} from "../../../utils/dataStore.js"
const initialState = {
    businessInfo:[],
    topRatedEvents:[],
    topRatedGroupTrips:[],
    mostEventsBooker:[],
    mostGroupTripsBooker:[],
    month:{},
    isLoading:false,
}
const DashBoardSlice =createSlice({
    name: "DashBoardSlice",
    initialState,
    reducers: {
        changeMonth(state, action) {

        }
    },
    extraReducers:(builder) => {
        builder.addCase(DashBoardService.pending, (state, action) => {
            state.isLoading=true
        })
            .addCase(DashBoardService.fulfilled, (state, action) => {
            state.businessInfo=action.payload.businessInfo;
            state.topRatedEvents=action.payload.topRatedEvents;
            state.topRatedGroupTrips=action.payload.topRatedGroupTrips;
            state.mostEventsBooker=action.payload.mostEventsBooker;
            state.mostGroupTripsBooker=action.payload.mostGroupTripsBooker;

            const date=new Date();
            const month=date.toLocaleString('default', { month: 'short' })
            const year=date.getFullYear();
            date.setMonth(0-1)
            const prevMonth = date.toLocaleString('default', { month: 'short' });
            const months=action.payload.businessInfo
            if(prevMonth==='Dec'){
                state.month= {...months[`${year}/${month}`],prev:months[`${year}/${prevMonth}`]}
            }
            date.setFullYear(date.getFullYear()-1)
            const pervYear=date.getFullYear()
            state.isLoading=false
            })
            .addCase(DashBoardService.rejected, (state, action) => {
                console.log("addGuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                     tokenStore.clearToken()
                     window.location.href = '/login'
                }
                state.isLoading=false
            })

    }
 })
export const {updateFields} = DashBoardSlice.actions;
export default DashBoardSlice.reducer;