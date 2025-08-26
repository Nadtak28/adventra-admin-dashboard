import API from "../../../api/apiRoutes.jsx"
import albolbolFiles from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addGTService=createAsyncThunk(
    "addGTService",
    async (Files, {rejectWithValue,getState}) => {
        const state=getState().AddGT;
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
        const events=state.form.selectedEvents.map(event => {
            return event.id;
        })
        let form={
            name:state.form.nameEn,
            name_ar:state.form.nameAr,
            description:state.form.descriptionEn,
            description_ar:state.form.descriptionAr,
            basic_cost:state.form.ticketPrice,
            price:state.form.userPrice,
            guide_id:state.form.selectedGuide.id,
            tickets_count:state.form.maxTickets,
            tickets_limit:state.form.minTickets,
            starting_date:state.form.startDate,
            ending_date:state.form.endDate,
            events:events,
            media:media}

        try{
            const response=await albolbolFiles.post(API.addGT,form)
            if(response.data[0]=="the guide is busy in this date"){
               return rejectWithValue({busy:true})
            }
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
