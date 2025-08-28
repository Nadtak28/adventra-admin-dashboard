import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addLanguageService=createAsyncThunk(
    "addLanguageService",
    async ({name},{rejectWithValue,getState}) => {
        try{
            const response=await albolbol.post(API.addLanguage, {name: name,name_ar:name});
            return response.data;
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