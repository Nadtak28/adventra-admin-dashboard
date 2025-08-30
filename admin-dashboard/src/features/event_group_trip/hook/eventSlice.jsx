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
                if(action.payload.type!=='add'){
                    console.log("EventService.fulfilled", action.payload)
                    state.form.id = action.payload.data.id;
                    state.form.status = action.payload.data.status;
                    state.form.nameEn = action.payload.data.name;
                    state.form.nameAr = action.payload.data.name_ar;
                    state.form.category = action.payload.data.category;
                    state.form.city = action.payload.data.city;
                    state.form.rate = action.payload.data.rate;
                    state.form.basic_cost = action.payload.data.basic_cost;
                    state.form.price = action.payload.data.price;
                    state.form.has_offer = action.payload.data.has_offer;
                    state.form.offers = action.payload.data.offers;
                    state.form.feedbacks = action.payload.data.feedbacks;
                    state.form.is_limited = action.payload.data.is_limited;
                    state.form.descriptionEn = action.payload.data.description;
                    state.form.descriptionAr = action.payload.data.description_ar;
                    state.form.images = action.payload.data.images;
                    state.form.videos = action.payload.data.videos;
                    if (state.form.is_limited) {
                        state.form.starting_date = action.payload.data.starting_date;
                        state.form.ending_date = action.payload.data.ending_date;
                        state.form.tickets_count = action.payload.data.tickets_count;
                        state.form.remaining_tickets = action.payload.data.remaining_tickets;
                    }
                    if (action.payload.has_offer) {
                        state.form.main_price = action.payload.data.main_price;
                    }
                    state.isLoading = false;
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