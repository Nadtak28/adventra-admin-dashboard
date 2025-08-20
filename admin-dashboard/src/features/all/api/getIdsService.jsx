import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getIdsService=createAsyncThunk(
    "getIdsService",
    async (_, {rejectWithValue}) => {

        try{
            const response=await albolbol.get(API.getIds)
            return response.data;
        }
        catch (error) {
            if (error.status === 401) {
                return rejectWithValue({unauthorized: true});
            }
            return rejectWithValue(
                error.response.data.message || "Something went wrong"
            );
        }
    })