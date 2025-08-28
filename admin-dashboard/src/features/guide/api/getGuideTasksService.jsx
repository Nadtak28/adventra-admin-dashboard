import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getGuideTasksService=createAsyncThunk(
    "getGuideTasksService",
    async ({id},{rejectWithValue,getState}) => {
        try{
            const response=await albolbol.get(`${API.Guides}/${id}/tasks`)
            return response.data
        }
        catch (error) {
            console.log(error);
            if (error.status === 401) {
                return rejectWithValue({unauthorized: true});
            }
            return rejectWithValue(
                error.response.data || "Something went wrong"
            );
        }
    })