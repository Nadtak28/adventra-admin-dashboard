import API from "../../../../api/apiRoutes.jsx"
import al39for from "../../../../api/al39for.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const LoginService=createAsyncThunk(
    "Login",
    async (form, thunkAPI) => {
        try{
            const response=await al39for.post(API.login,form)
            return response.data;

        }
        catch (error) {
            const response = error.response;
            if (response?.status === 422) {

                return thunkAPI.rejectWithValue(response.data.errors);
            }
            return thunkAPI.rejectWithValue(
                response?.data?.message || "Login failed"
            );
        }
    })