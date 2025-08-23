import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {filterService} from "../../all/api/filterService.jsx"

const initialState = {
    data:[],
    topRatedGuides: [],
    badGuides: [],
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

    }
})
export default Event_GTSlice.reducer;

