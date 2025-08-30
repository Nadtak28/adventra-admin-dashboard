import {createSlice} from "@reduxjs/toolkit";
import {EventService} from "../api/getEventService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
import {updateEventService} from "../api/updateEventService.jsx";
const initialState = {
    form:{
        id:'',
        nameAr: '',
        nameEn: '',
        descriptionAr: '',
        descriptionEn: '',
        category:{},
        city:{},
        images:[],
        videos:[],
        status:"",
        rate:0,
        price:0,
        main_price:null,
        has_offer:false,
        feedbacks:[],
        is_limited:false,
        basic_cost:0,
        offers:[]
    },
    isLoading:false,
    error:''
}
const EventSlice =createSlice({
    name: "EventSlice",
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder.addCase(EventService.pending, (state) => {
            state.form.main_price=null
        })
            .addCase(EventService.fulfilled, (state, action) => {
                console.log("EventService.fulfilled", action.payload)
                state.form.id=action.payload.id;
                state.form.status=action.payload.status;
                state.form.nameEn=action.payload.name;
                state.form.nameAr=action.payload.name_ar;
                state.form.category=action.payload.category;
                state.form.city=action.payload.city;
                state.form.rate=action.payload.rate;
                state.form.basic_cost=action.payload.basic_cost;
                state.form.price=action.payload.price;
                state.form.has_offer=action.payload.has_offer;
                state.form.offers=action.payload.offers;
                state.form.feedbacks=action.payload.feedbacks;
                state.form.is_limited=action.payload.is_limited;
                state.form.descriptionEn=action.payload.description;
                state.form.descriptionAr=action.payload.description_ar;
                state.form.images=action.payload.images;
                state.form.videos=action.payload.videos;
                if(action.payload.has_offer){
                    state.form.main_price = action.payload.main_price;
                }
                state.isLoading = false;
            })
            .addCase(EventService.rejected, (state, action) => {
                console.log("EventService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
            })
            .addCase(updateEventService.fulfilled, (state, action) => {
            console.log("updateEventService.fulfilled", action.payload)
            })
            .addCase(updateEventService.rejected, (state, action) => {
                console.log("updateEventService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })

    }
})
export const {updateFields,add_emptyMedia,Submit} = EventSlice.actions;
export default EventSlice.reducer;