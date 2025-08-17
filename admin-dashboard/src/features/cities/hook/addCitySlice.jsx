import {createSlice} from "@reduxjs/toolkit";
import {AddCityService} from "../api/addCityService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";
const initialState = {
    form:{
    nameAr: '',
    nameEn: '',
    country: '',
    descriptionAr: '',
    descriptionEn: '',
    language:'',
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
const AddCitySlice =createSlice({
    name: "addCityApi",
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
                if(field==='language'||field==="country"){
                    if(!state.form[field])
                    state.errors[field]=true
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
        builder.addCase(AddCityService.pending, (state) => {
            state.isLoading = true;
            state.validData=false;

        })
            .addCase(AddCityService.fulfilled, (state, action) => {
                console.log("AddCityService.fulfilled", action.payload)
                state.form={
                        nameAr: '',
                        nameEn: '',
                        country: '',
                        descriptionAr: '',
                        descriptionEn: '',
                        language:'',
                    }
                state.isLoading = false;
                Object.keys(state.errors).forEach(key => {
                    state.errors[key] = false;
                });
            })
            .addCase(AddCityService.rejected, (state, action) => {
               console.log("AddCityService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                     tokenStore.clearToken()
                     window.location.href = '/login'
                }
                state.isLoading = false;
            })

    }
})
export const {updateFields,add_emptyMedia,Submit} = AddCitySlice.actions;
export default AddCitySlice.reducer;