import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const publicNotifyService=createAsyncThunk(
    "publicNotifyService",
    async ({data}, {rejectWithValue,getState}) => {

        try{
            const response=await albolbol.post(API.publicNotify,data)
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