import API from "../../../api/apiRoutes.jsx"
import albolbolFiles from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const AddCityService=createAsyncThunk(
    "AddCityService",
    async (Files, {rejectWithValue,getState}) => {
        const state=getState().AddCity;
        let errorDetected = false;
        for (const field in state.form) {
            errorDetected=state.errors[field]?true:errorDetected;
        }
        if(Files.images.length === 0){
            errorDetected=true;
        }
        if(errorDetected)
            {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                  return rejectWithValue('invalid Data');
            }
        let media=[]
        for(const file of Files.images) {
            media.push(file.File);
        }
        for(const file of Files.videos) {
            media.push(file.File);
        }
        const form={
            country_id:state.form.country,
            name:state.form.nameEn,
            name_ar:state.form.nameAr,
            description:state.form.descriptionEn,
            description_ar:state.form.descriptionAr,
            language_id:state.form.language.id,
            media:media}
        try{
            const response=await albolbolFiles.post(API.addCity,form)
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