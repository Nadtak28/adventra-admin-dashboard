import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getNotificationService=createAsyncThunk(
    "getNotificationService",
    async (_, {rejectWithValue,getState}) => {

        try{
            const response=await albolbol.post(API.notification,{type:'admin'})
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