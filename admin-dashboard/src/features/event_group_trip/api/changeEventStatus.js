import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const ChangeEventStatueService=createAsyncThunk(
    "ChangeEventStatueService",
    async ({status,id},{rejectWithValue,getState}) => {
        try{
            const response=await albolbol.post(`${API.eventStatus}${id}/change_status`, {action:status})
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