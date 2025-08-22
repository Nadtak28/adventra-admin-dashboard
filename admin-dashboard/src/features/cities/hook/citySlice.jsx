import {createSlice} from "@reduxjs/toolkit";
import {CityService} from "../api/CityService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
const initialState = {
    form:{
        id:'',
        nameAr: '',
        nameEn: '',
        country: {},
        descriptionAr: '',
        descriptionEn: '',
        language:{},
        status:"",
    },
    isLoading:false,
    errors:{
        nameAr: false,
        nameEn: false,
        country: false,
        descriptionAr: false,
        descriptionEn: false,
        language:false,
        media:false
    }
}
const CitySlice =createSlice({
    name: "CityApi",
    initialState,
    reducers: {
        updateFields(state, action) {
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
                if(field==="country"){
                    if(!state.form[field])
                        state.errors[field]=true
                    continue
                }else if(field==='language'){
                    if(!state.form[field].id)
                        state.errors[field]=true
                    continue
                }else if(field==='status'){
                    continue
                }
                state.errors[field]=!state.form[field].trim()
            }
        },
        reset(state) {
            state.form={
                nameAr: '',
                nameEn: '',
                country: '',
                descriptionAr: '',
                descriptionEn: '',
                language:'',
            }
            state.isLoading = false;
            state.errors={
                nameAr: false,
                nameEn: false,
                country: false,
                descriptionAr: false,
                descriptionEn: false,
                language:false,
                media:false
            }
        }
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
                state.descriptionEn=action.payload.description;
                state.descriptionAr=action.payload.description_ar;
                state.
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

    }
})
export const {updateFields,add_emptyMedia,Submit} = CitySlice.actions;
export default CitySlice.reducer;