import API from "../../../api/apiRoutes.jsx"
import al39for from "../../../api/al39for.jsx"
import {createAsyncThunk} from '@reduxjs/toolkit';

export const DashboardService=createAsyncThunk(
    "Dashboard",
    async ( thunkAPI) => {
        try{
            const response=await al39for.get(API.DashBoard)
            return response.data;
        }
        catch (error) {
            const response = error.response;
            if (response?.status === 401) {
                return {unauthorized: false};
            }
            return thunkAPI.rejectWithValue(
                response?.data?.message || "Loading failed"
            );
        }
    })