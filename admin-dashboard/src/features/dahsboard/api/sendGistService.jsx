import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from '@reduxjs/toolkit';
import {tokenStore} from "../../../utils/dataStore.js";

export const sendGiftService=createAsyncThunk(
    "sendGift",
    async ({id,points}, {rejectWithValue}) => {
        try{
            const form={
                user_id:id,
                points:points,
            }
            albolbol.defaults.headers['Authorization'] = `Bearer ${tokenStore.getToken()}`;
            const response=await albolbol.post(API.sendGift,form)
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