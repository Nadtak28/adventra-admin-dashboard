import API from "../../../../api/apiRoutes.jsx"
import albolbol from "../../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const deleteFeedBackService=createAsyncThunk(
    "deleteFeedBackService",
    async ({id}, {rejectWithValue,getState}) => {

        try{
            console.log(id)
            const response=await albolbol.get(`${API.feedBack}${id}`)
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