import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {data} from "react-router-dom";

export const getGEByIDService=createAsyncThunk(
    "getGuides&EventsByIDService",
    async (id, {rejectWithValue,getState}) => {

        try{
            const response1 = await albolbol.get(`${API.City}${id}/events`);
            const response2 = await albolbol.get(`${API.City}${id}/guides`);
            const events  = response1.data.data;
            const guides  = response2.data.data;
            return {events:events,guides:guides};
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
