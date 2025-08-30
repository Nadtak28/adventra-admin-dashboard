import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {updateGroupTripService} from "../api/updateGroupTripService.jsx";
import {GetGTService} from "../api/getGTService.js";

const initialState = {
    form:{
        id:'',
        nameAr: '',
        nameEn: '',
        descriptionAr: '',
        descriptionEn: '',
        starting_date:'',
        ending_date:'',
        images:[],
        videos:[],
        status:"",
        remaining_tickets:'',
        tickets_count:'',
        guide:{},
        rate:0,
        price:0,
        main_price:null,
        has_offer:false,
        feedbacks:[],
        is_limited:false,
        basic_cost:0,
        extra_cost:0,
        offers:[],
    },
    isLoading:false,
    error:''
}

const GroupTripSlice = createSlice({
    name: "GroupTripSlice",
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder.addCase(GetGTService.pending, (state) => {
            state.isLoading = true;
            state.form.main_price = null;
        })
            .addCase(GetGTService.fulfilled, (state, action) => {
                if(action.payload.type !== 'add'){
                    console.log("GroupTripService.fulfilled", action.payload)
                    state.form.id = action.payload.data.id;
                    state.form.status = action.payload.data.status;
                    state.form.nameEn = action.payload.data.name;
                    state.form.nameAr = action.payload.data.name_ar;
                    state.form.guide = action.payload.data.guide;
                    state.form.rate = action.payload.data.rate;
                    state.form.tickets_count = action.payload.data.tickets_count;
                    state.form.remaining_tickets = action.payload.data.remaining_tickets;
                    state.form.tickets_limit = action.payload.data.tickets_limit;
                    state.form.price = action.payload.data.price;
                    state.form.basic_cost = action.payload.data.basic_cost;
                    state.form.has_offer = action.payload.data.has_offer;
                    state.form.offers = action.payload.data.offers;
                    state.form.feedbacks = action.payload.data.feedbacks;
                    state.form.is_limited = action.payload.data.is_limited;
                    state.form.descriptionEn = action.payload.data.description;
                    state.form.descriptionAr = action.payload.data.description_ar;
                    state.form.images = action.payload.data.images;
                    state.form.videos = action.payload.data.videos;
                    state.form.starting_date = action.payload.data.starting_date;
                    state.form.ending_date = action.payload.data.ending_date;
                    state.form.events = action.payload.data.events;

                    if (action.payload.data.has_offer) {
                        state.form.main_price = action.payload.data.main_price;
                    }
                    state.isLoading = false;
                }
            })
            .addCase(GetGTService.rejected, (state, action) => {
                console.log("GroupTripService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
                state.error = action.payload?.message || 'حدث خطأ';
            })
            .addCase(updateGroupTripService.fulfilled, (state, action) => {
                console.log("updateGroupTripService.fulfilled", action.payload)
                state.isLoading = false;
            })
            .addCase(updateGroupTripService.rejected, (state, action) => {
                console.log("updateGroupTripService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
                state.error = action.payload?.message || 'حدث خطأ في التحديث';
            })
    }
})

export const {updateFields, add_emptyMedia, Submit} = GroupTripSlice.actions;
export default GroupTripSlice.reducer;