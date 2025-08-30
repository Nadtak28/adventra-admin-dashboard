import API from "../../../api/apiRoutes.jsx"
import albolbolFiles from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetGTService=createAsyncThunk(
    "GetGTService",
    async ({id,type}, {rejectWithValue,getState}) => {
        try{
            const response=await albolbolFiles.get(`${API.GroupTrip}${id}`)
            return {data:response.data.data,type:type};
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