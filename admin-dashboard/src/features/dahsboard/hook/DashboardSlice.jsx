import {createSlice} from "@reduxjs/toolkit";
import {DashboardService} from "../api/DashboardService.jsx";
import {tokenStore} from "../../../utils/dataStore.js"
import {useNavigate} from "react-router-dom";
const initialState = {
    months:[],
    topEvents:[],
    topGroupTrip:[]
}
const DashBoardSlice =createSlice({
    name: "DashBoardSlice",
    initialState,
    reducers: {
        updateFields(state, action) {
            state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(DashboardService.pending, (state, action) => {
            state.status='Loading'

        })
            .addCase(DashboardService.fulfilled, (state, action) => {
                state.status='Fulfilled'
                if(action.payload.unauthorized){
                    tokenStore.clearToken()
                }
                else{
                    state=action.payload;
                }

            })
            .addCase(DashboardService.rejected, (state, action) => {
                if(action.payload.unauthorized){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }

            })

    }
 })
export const {updateFields} = DashBoardSlice.actions;
export default DashBoardSlice.reducer;