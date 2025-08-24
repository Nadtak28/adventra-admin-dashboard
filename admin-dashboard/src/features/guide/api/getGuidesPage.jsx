import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GuidesService=createAsyncThunk(
    "GuidesService",
    async (_,{rejectWithValue,getState}) => {
        try{
            const response1=await albolbol.post(API.Guides,{per_page:5,order_type:'DESC'})
            const response2=await albolbol.post(API.Guides,{per_page:5,order_type:'ASC'})
            return {
                topRatedGuides:response1.data.data,
                badGuides:response2.data.data,
            };
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