import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {filterService} from "../../all/api/filterService.jsx"

const initialState = {
    guides:[],
    topRatedGuides: [],
    badGuides: [],
}
const GuideSlice =createSlice({
    name: "GuidesApi",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder.addCase(filterService.pending, (state,action) => {
                state.guides = [];
        })
            .addCase(filterService.fulfilled, (state, action) => {
                if(action.payload.type==='guide') {
                    state.guides = action.payload.guide;
                }
            })
            .addCase(filterService.rejected, (state, action) => {
                console.log("GuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })

    }
})
export default GuideSlice.reducer;

