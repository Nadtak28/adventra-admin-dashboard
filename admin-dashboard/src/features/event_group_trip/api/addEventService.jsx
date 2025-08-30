import API from "../../../api/apiRoutes.jsx"
import albolbolFiles from "../../../api/albolbolFiles.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const AddEventService=createAsyncThunk(
    "AddEventService",
    async (Files, {rejectWithValue,getState}) => {
        const state=getState().AddEvent;
        // Function to add seconds if they are missing from a datetime string
        const addSeconds = (datetimeString) => {
            if (!datetimeString.match(/:\d{2}:\d{2}$/)) {
                const separatorIndex = datetimeString.indexOf('T') !== -1 ? datetimeString.indexOf('T') : datetimeString.indexOf(' ');
                const lastColonIndex = datetimeString.lastIndexOf(':');
                if (datetimeString.length - lastColonIndex < 3 || datetimeString.indexOf('.') !== -1) {
                    datetimeString += ':00';
                }
            }
            return datetimeString;
        };


        let errorDetected = false;
        for (const field in state.form) {
            if(!state.form.isTimeBased){
                if(field==='isTimeBased'||field==='maxTickets'||field==='ticketCount'||field==='startDate'||field==='endDate'){
                    continue;
                }
            }

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
        let form={
            name:state.form.nameEn,
            name_ar:state.form.nameAr,
            description:state.form.descriptionEn,
            description_ar:state.form.descriptionAr,
            basic_cost:state.form.ticketPrice,
            price:state.form.userPrice,
            category_id:state.form.eventType,
            city_id:state.form.city,
            is_limited:Number(state.form.isTimeBased),
            media:media}
        if(state.form.isTimeBased)
        {
            form = {
                ...form,
                tickets_count: state.form.maxTickets,
                tickets_limit: state.form.ticketCount,
                start_date: addSeconds(state.form.startDate.replace('T', ' ')),
                end_date: addSeconds(state.form.endDate.replace('T', ' ')),
            };
        }

        try{
            const response=await albolbolFiles.post(API.addEvent,form)
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