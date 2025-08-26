import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {filterService} from "../../all/api/filterService.jsx"
import {GuidesService} from "../../guide/api/getGuidesPage.jsx"

const initialState = {
    guides:[],
    topRatedGuides: [],
    badGuides: [],
   isLoading: false
}
const GuideSlice =createSlice({
    name: "GuidesApi",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder.addCase(filterService.pending, (state,action) => {
                state.guides = [];
            state.isLoading = true
        })
            .addCase(filterService.fulfilled, (state, action) => {
                if(action.payload.type==='guide') {
                    state.guides = action.payload.guide;
                }
                state.isLoading = false
            })
            .addCase(filterService.rejected, (state, action) => {
                console.log("GuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false
            }).addCase(GuidesService.pending, (state,action) => {
                state.topRatedGuides = []
                state.badGuides = []
            state.isLoading = true
        })
            .addCase(GuidesService.fulfilled, (state, action) => {
                console.log("GuidesService.fulfilled", action.payload)
                state.topRatedGuides = action.payload.topRatedGuides.data;
                state.badGuides = action.payload.badGuides.data;


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

