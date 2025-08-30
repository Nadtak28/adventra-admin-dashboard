import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const updateEventOfferService=createAsyncThunk(
    "updateEventOfferService",
    async ({data,id}, {rejectWithValue,getState}) => {
        console.log(data)
        try{
            const response=await albolbol.post(`${API.UpdateEvent}${id}/offer/update`,data)
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