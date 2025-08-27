import API from "../../../api/apiRoutes.jsx"
import albolbolFiles from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const updateCityService=createAsyncThunk(
    "updateCityService",
    async ({data,id}, {rejectWithValue,getState}) => {

        try{
            const response=await albolbolFiles.post(`${API.UpdateCity}${id}`,data)
            return response.data;
        }
        catch (error) {
            console.log(error);
            if (error.status === 401) {
                return rejectWithValue({unauthorized: true});
            }
            return rejectWithValue(
                error.response.data.message || "Something went wrong"
            );
        }
    })