import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const updateLanguageService=createAsyncThunk(
    "updateLanguageService",
    async ({name,id},{rejectWithValue,getState}) => {
        try{
            const response=await albolbol.post(`${API.addLanguage}/${id}`, {name: name,name_ar:name});
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