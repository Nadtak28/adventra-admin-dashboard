import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {filterService} from "../../all/api/filterService.jsx"
import {GuidesService} from "../../guide/api/getGuidesPage.jsx"

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
            }).addCase(GuidesService.pending, (state,action) => {
                state.topRatedGuides = []
                state.badGuides = []
        })
            .addCase(GuidesService.fulfilled, (state, action) => {
                console.log("GuidesService.fulfilled", action.payload)
                state.topRatedGuides = action.payload.topRatedGuides;
                state.badGuides = action.payload.badGuides;
            })
            .addCase(GuidesService.rejected, (state, action) => {
                console.log("GuidesService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })

    }
})
export default GuideSlice.reducer;

