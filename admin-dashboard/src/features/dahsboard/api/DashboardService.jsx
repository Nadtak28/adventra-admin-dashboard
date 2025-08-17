import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from '@reduxjs/toolkit';

export const DashboardService=createAsyncThunk(
    "Dashboard",
    async ( thunkAPI) => {
        try{
            const response=await albolbol.get(API.DashBoard)
            return response.data;
        }
        catch (error) {
            const response = error.response;
            if (response?.status === 401) {
                return thunkAPI.rejectWithValue(
                    {unauthorized: true});
            }
            return thunkAPI.rejectWithValue(
                response?.data?.message || "Loading failed"
            );
        }
    })