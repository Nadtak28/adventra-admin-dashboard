import API from "../../../api/apiRoutes.jsx"
import albolbolFiles from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const cityEvents_GuidesService=createAsyncThunk(
    "cityEvents_GuidesService",
    async ({id}, {rejectWithValue,getState}) => {
        try{
            const response1=await albolbolFiles.get(`${API.City}${id}/events`)
            const response2=await albolbolFiles.get(`${API.City}${id}/guides`)
            return {events:response1.data.data,guides:response2.data.data};
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