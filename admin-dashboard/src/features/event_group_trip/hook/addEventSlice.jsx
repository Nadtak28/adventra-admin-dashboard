import {createSlice} from "@reduxjs/toolkit";
import {AddEventService} from "../api/addEventService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
const today=() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // الشهر يبدأ من 0
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
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
                if(field==='eventType'||field==='city'){
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
            })

    }
})
export const {updateFields,add_emptyMedia,Submit} = AddEventSlice.actions;
export default AddEventSlice.reducer;