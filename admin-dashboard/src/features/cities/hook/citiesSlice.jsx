import {createSlice} from "@reduxjs/toolkit";
import {CitiesService} from "../api/citiesService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
const initialState = {
        cities: [],
        totalCities: 0,
        currentPage: 1,
        lastPage: 1,
        search:'',
        sortBy:'name',
        isLoading:false,
        avg_rate:0
}
const CitiesSlice =createSlice({
    name: "cityApi",
    initialState,
    reducers: {
        updateFields(state,action) {
            state[action.payload.field] = action.payload.value;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(CitiesService.pending, (state) => {
            state.isLoading = true;

        })
            .addCase(CitiesService.fulfilled, (state, action) => {
                state.cities=action.payload.data;
                state.lastPage = action.payload.last_page;
                state.totalCities = action.payload.total;
                state.currentPage = action.payload.current_page;
                state.avg_rate = action.payload.avg_rate;
                state.isLoading = false;

            })
            .addCase(CitiesService.rejected, (state, action) => {
                console.log("AddCityService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
            })

    }
})
export const {updateFields} = CitiesSlice.actions;
export default CitiesSlice.reducer;