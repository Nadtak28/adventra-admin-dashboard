import {createSlice} from "@reduxjs/toolkit";
import {AddCityService} from "../api/addCityService.jsx"
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
            console.log(state);
            for (const field in state) {
                state.errors[field]=!state.form[field].trim()
            }
        }
    },
    extraReducers:(builder) => {
        builder.addCase(AddCityService.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(AddCityService.fulfilled, (state, action) => {
                console.log("AddCityService.fulfilled", action.payload)
                state.isLoading = false;

            })
            .addCase(AddCityService.rejected, (state, action) => {
               console.log("AddCityService.rejected", action.payload)
                state.isLoading = false;
            })

    }
})
export const {updateFields,add_emptyMedia,Submit} = AddCitySlice.actions;
export default AddCitySlice.reducer;