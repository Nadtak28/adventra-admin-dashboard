import API from "../../../api/apiRoutes.jsx"
import al39for from "../../../api/al39for.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const AddCityService=createAsyncThunk(
    "AddCityService",
    async (Files, {rejectWithValue,getState}) => {
        const state=getState().AddCity;
        let errorDetected = false;
        for (const field in state) {
            errorDetected=!state.form[field].trim()?true:errorDetected;
        }
        if(Files.images.length === 0){
            errorDetected=false;
        }
        if(errorDetected) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return rejectWithValue('invalid Data');
            }, 100);}

        const form={...state.form,media:[Files.images,Files.videos]}
        try{
            console.log(form)
            const response=await al39for.post(API.addCity,form)
            return response.data;
        }
        catch (error) {
            const response = error.response;
            return rejectWithValue(
                response?.data?.message || "Something went wrong"
            );
        }
    })