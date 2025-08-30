import {createSlice} from "@reduxjs/toolkit";
import {AddEventService} from "../api/addEventService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
import {EventService} from "../api/getEventService.jsx";
const today = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    now.setDate(now.getDate() + 1);
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // ترجع سترنغ مرتب: YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const initialState = {
    form:{
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        ticketPrice: '',
        userPrice: '',
        eventType: '',
        city: '',
        maxTickets: '',
        ticketCount: '',
        isTimeBased:false,
        startDate:today(),
        endDate:''
    },
    isLoading:false,
    errors:{
        nameEn: false,
        nameAr: false,
        descriptionEn: false,
        descriptionAr: false,
        ticketPrice: false,
        userPrice: false,
        eventType: false,
        city: false,
        maxTickets:false,
        ticketCount:false,
        startDate:false,
        endDate:false,
        media:false
    }
}
const AddEventSlice =createSlice({
    name: "addEventApi",
    initialState,
    reducers: {
        updateFields(state, action) {
            if(action.payload.field==='ticketPrice'&&Number(state.form.userPrice)<Number(action.payload.value)){
                state.form.userPrice=Number(action.payload.value)+1
                state.errors.userPrice = false;
            }
            else if(action.payload.field==='ticketCount'&&Number(state.form.maxTickets)<Number(action.payload.value)){
                return
            }
            state.form[action.payload.field] = action.payload.value;
            state.errors[action.payload.field] = false;
        },
        add_emptyMedia(state,action){
            switch(action.payload.type){
                case "add":
                    state.errors.media = false;
                    break;
                case "empty":
                    state.errors.media = true;
            }
        },
        Submit(state) {
            for (const field in state.form) {
                if(field==='isTimeBased'){
                    continue;
                }
                if(field==='eventType'||field==='city'||field==='userPrice'){
                    if(!state.form[field])
                        state.errors[field]=true
                    continue
                }
                state.errors[field]=!state.form[field].trim()
            }
        }
    },
    extraReducers:(builder) => {
        builder.addCase(AddEventService.pending, (state) => {
            state.isLoading = true;
            state.validData=false;

        })
            .addCase(AddEventService.fulfilled, (state, action) => {
                console.log("AddEventService.fulfilled", action.payload)
                state.form={
                        nameEn: '',
                        nameAr: '',
                        descriptionEn: '',
                        descriptionAr: '',
                        ticketPrice: '',
                        userPrice: '',
                        eventType: '',
                        city: '',
                        maxTickets: '',
                        ticketCount: '',
                        isTimeBased:false,
                        startDate:today(),
                        endDate:''
                }
                state.isLoading = false;
                Object.keys(state.errors).forEach(key => {
                    state.errors[key] = false;
                });
            })
            .addCase(AddEventService.rejected, (state, action) => {
                console.log("AddEventService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
            }).addCase(EventService.fulfilled, (state, action) => {
                if(action.payload?.type==='add'){
                console.log("EventService.fulfilled", action.payload)
                state.form = {
                    nameEn:action.payload.data.name,
                    nameAr: action.payload.data?.name_ar,
                    descriptionEn: action.payload.data.description,
                    descriptionAr: action.payload.data.description_ar,
                    ticketPrice: '',
                    userPrice: '',
                    eventType: action.payload.data.category.id,
                    city: action.payload.data.city.id,
                    maxTickets: '',
                    ticketCount: '',
                    isTimeBased: false,
                    startDate: today(),
                    endDate: ''
                }
                state.isLoading = false;
                Object.keys(state.errors).forEach(key => {
                    state.errors[key] = false;
                });
            }
            })
            .addCase(EventService.rejected, (state, action) => {
                console.log("EventService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
            })

    }
})
export const {updateFields,add_emptyMedia,Submit} = AddEventSlice.actions;
export default AddEventSlice.reducer;