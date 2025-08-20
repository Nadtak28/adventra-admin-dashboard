import API from "../../../api/apiRoutes.jsx"
import albolbolFiles from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addGuideService=createAsyncThunk(
    "AddGuideService",
    async (_,{rejectWithValue,getState}) => {
        const state=getState().addGuide;
        let errorDetected = false;
        for (const field in state.form) {
            errorDetected=state.errors[field]?true:errorDetected;
        }
        if(errorDetected)
        {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return rejectWithValue('invalid Data');
        }
        const categoriesIds =state.form.categories.map(category => category.id) ;
        const languagesIds = state.form.languages.map(language => language.id);
        let form={
            name:state.form.name,
            email:state.form.email,
            phone:state.form.phone,
            const_salary:state.form.salary,
            city_id:state.form.city,
            categories:categoriesIds,
            languages:languagesIds,
        }
        try{
            const response=await albolbolFiles.post(API.addGuide,form)
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