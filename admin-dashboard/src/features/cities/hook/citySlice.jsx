import {createSlice} from "@reduxjs/toolkit";
import {CityService} from "../api/CityService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
import {cityEvents_GuidesService} from "../api/cityEvents_GuidesService.jsx";
import {updateCityService} from "../api/updateCityService.jsx";
const initialState = {
    form:{
        id:'',
        nameAr: '',
        nameEn: '',
        country: {},
        descriptionAr: '',
        descriptionEn: '',
        language:{},
        images:[],
        videos:[],
        status:"",
        guides:[],
        events:[]
    },
    isLoading:false,
    error:''
}
const CitySlice =createSlice({
    name: "CitygetApi",
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder.addCase(CityService.pending, (state) => {
            state.isLoading = true;
            state.validData=false;
        })
            .addCase(CityService.fulfilled, (state, action) => {
                console.log("CityService.fulfilled", action.payload)
                state.form.id=action.payload.id;
                state.form.nameEn=action.payload.name;
                state.form.nameAr=action.payload.name_ar;
                state.form.country=action.payload.country;
                state.form.descriptionEn=action.payload.description;
                state.form.descriptionAr=action.payload.description_ar;
                state.form.language=action.payload.language;
                state.form.images=action.payload.images;
                state.form.videos=action.payload.videos;
                state.isLoading = false;

            })
            .addCase(CityService.rejected, (state, action) => {
                console.log("CityService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false;
            })
            .addCase(cityEvents_GuidesService.fulfilled, (state, action) => {
                state.form.events=action.payload.events;
                state.form.guides=action.payload.guides;


            })
            .addCase(cityEvents_GuidesService.rejected, (state, action) => {
                console.log("CityService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            }).addCase(updateCityService.fulfilled, (state, action) => {
                console.log("UpdateCityService.fulfilled", action.payload)


            })
            .addCase(updateCityService.rejected, (state, action) => {
                console.log("UpdateCityService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })

    }
})
export const {updateFields,add_emptyMedia,Submit} = CitySlice.actions;
export default CitySlice.reducer;