import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from '@reduxjs/toolkit';

export const CitiesService=createAsyncThunk(
    "Dashboard",
    async (_, {rejectWithValue,getState}) => {
        try{
            const state=getState().Cities;
            const form={
                q:state.search,
                orderBy:state.sortBy,
                page:state.currentPage,
            }
            const response=await albolbol.post(API.cities,form)
            return response.data;
        }
        catch (error) {
            if (error.status === 401) {
                console.log(error)
                return rejectWithValue({unauthorized: true});
            }
            return rejectWithValue(
                error.response.data || "Something went wrong"
            );
        }
    })