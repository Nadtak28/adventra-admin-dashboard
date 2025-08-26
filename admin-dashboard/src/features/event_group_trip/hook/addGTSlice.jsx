import {createSlice} from "@reduxjs/toolkit";
import {addGTService} from "../api/addGTService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
import {getGEByIDService} from "../api/getGuides&EventsByIDService.jsx";
const today = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
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
        startDate: today(),
        endDate: '',
        ticketPrice: '',
        userPrice: '',
        minTickets: '',
        maxTickets:'',
        selectedGuide:{
            id: '',
            name: '',
            images: [],
            languages: [],
            rate: '',
            price: '',
            categories: []
        },
       selectedEvents: [],
       city_id:'',
        Events : [],
        Guides : []
    },
    isLoading:false,
    errors:{
        nameEn:false,
        nameAr:false,
        descriptionEn:false,
        descriptionAr:false,
        startDate:false,
        endDate:false,
        ticketPrice:false,
        userPrice:false,
        minTickets:false,
        maxTickets:false,
        selectedGuide:false,
        selectedEvents:false,
    }
}
const AddGTSlice =createSlice({
    name: "AddGTSlice",
    initialState,
    reducers: {
        updateFields(state, action) {
            if(action.payload.field==='ticketPrice'&&Number(state.form.userPrice)<Number(action.payload.value)){
                state.form.userPrice=Number(action.payload.value)+1
                state.errors.userPrice = false;
            }
            else if(action.payload.field==='minTickets'&&Number(state.form.maxTickets)<Number(action.payload.value)){
                state.form.maxTickets=Number(action.payload.value)+1
                state.errors.maxTickets = false;
            }
            else if(action.payload.field==='selectedEvents'){
                const eventExist=state.form.selectedEvents.find(e => e.id === action.payload.value.id)
                if(!eventExist){
                    state.form.selectedEvents = [
                        ...state.form.selectedEvents,
                        action.payload.value
                    ];
                    state.errors[action.payload.field] = false;
                    
                }else{
                    state.form.selectedEvents=state.form.selectedEvents.filter(e=>e.id !== eventExist.id)
                }
                return
            }
            else if(action.payload.field==='selectedGuide'){

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
                if(field==='selectedGuide'){
                    state.errors[field]=!state.form.selectedGuide.id
                    continue
                }
                else if(field==='selectedEvents'){
                    state.errors[field]=state.form.selectedEvents.length===0
                    continue
                }else if(field==='userPrice'||field==='maxTickets'||field==='minTickets'||field==='ticketPrice'){
                    state.errors[field] = (state.form[field] <= 0 || !state.form[field]);
                    continue

                }else if(field==='city_id'||field==='Events'||field==='Guides'){
                    continue
                }

                state.errors[field]=!state.form[field].trim()
            }

        }
    },
    extraReducers:(builder) => {
        builder.addCase(addGTService.pending, (state) => {
            state.isLoading = true;
            state.validData=false;

        })
            .addCase(addGTService.fulfilled, (state, action) => {
                console.log("addGTService.fulfilled", action.payload)
                state.form={
                    nameEn: '',
                    nameAr: '',
                    descriptionEn: '',
                    descriptionAr: '',
                    startDate: today(),
                    endDate: '',
                    ticketPrice: '',
                    userPrice: '',
                    minTickets: '',
                    maxTickets:'',
                    selectedGuide:{
                        id: '',
                        name: '',
                        nameEn: '',
                        image: '',
                        languages: [],
                        rating: '',
                        experience: '',
                        specialties: []
                    },
                    selectedEvents: [],
                    Events:[],
                    Guides:[],
                    city_id:''
                }
                state.isLoading = false;
                Object.keys(state.errors).forEach(key => {
                    state.errors[key] = false;
                });
            })
            .addCase(addGTService.rejected, (state, action) => {
                console.log("addGTService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }

                else if(action.payload.busy){
                    state.errors.selectedGuide=true
                }
                state.isLoading = false;
            })
            .addCase(getGEByIDService.pending, (state) => {
            })
            .addCase(getGEByIDService.fulfilled, (state, action) => {
                state.form={
                    nameEn: state.form.nameEn,
                    nameAr: state.form.nameAr,
                    descriptionEn: state.form.descriptionEn,
                    descriptionAr: state.form.descriptionAr,
                    startDate: state.form.startDate,
                    endDate: state.form.endDate,
                    ticketPrice: state.form.ticketPrice,
                    userPrice: state.form.userPrice,
                    minTickets: state.form.minTickets,
                    maxTickets:state.form.maxTickets,
                    selectedGuide:state.form.selectedGuide,
                    selectedEvents:state.form.selectedEvents,
                     Events: action.payload.events,
                     Guides: action.payload.guides,
                    city_id:state.form.city_id,

                }


            })
            .addCase(getGEByIDService.rejected, (state, action) => {
                console.log("getGEByIDService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
            })

    }
})
export const {updateFields,add_emptyMedia,Submit} = AddGTSlice.actions;
export default AddGTSlice.reducer;