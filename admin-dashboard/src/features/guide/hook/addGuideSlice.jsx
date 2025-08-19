import {createSlice} from "@reduxjs/toolkit";
import {addGuideService} from "../api/addGuideService.jsx"
import {tokenStore} from "../../../utils/dataStore.js";

const initialState = {
    form:{
        name: '',
        email: '',
        phone: '',
        salary: '',
        city: '',
        languages: [],
        categories: []
    },
    isLoading:false,
    errors:{
        name: false,
        email: false,
        phone: false,
        salary: false,
        city: false,
        languages:false,
        categories:false,
    }
}
const AddGuideSlice =createSlice({
    name: "addGuideApi",
    initialState,
    reducers: {
        updateFields(state, action) {
            if(action.payload.field==='salary'&&Number(action.payload.value)<Number(0)){
                return
            }
            else if(action.payload.field==='languages'||action.payload.field==='categories'){
                const Exist=state.form[action.payload.field].find(e => e === action.payload.value)
                if(!Exist){
                    state.form[action.payload.field] = [
                        ...state.form[action.payload.field],
                        action.payload.value
                    ];
                    state.errors[action.payload.field] = false;
                }
                else{
                    state.form[action.payload.field]=state.form[action.payload.field].filter(e=>e !== Exist)
                }
                return
            }
            state.form[action.payload.field] = action.payload.value;
            state.errors[action.payload.field] = false;
        },
        Submit(state) {
            for (const field in state.form) {
                if(field==='city'){
                    if(!state.form[field])
                        state.errors[field]=true
                    continue
                }
                else if(field==='languages'||field==='categories'){
                    state.errors[field]=state.form[field].length===0
                    continue
                }

                state.errors[field]=!state.form[field].trim()
            }
        }
    },
    extraReducers:(builder) => {
        builder.addCase(addGuideService.pending, (state) => {
            state.isLoading = true;

        })
            .addCase(addGuideService.fulfilled, (state, action) => {
                console.log("addGuideService.fulfilled", action.payload)
                state.form={
                    name: '',
                    email: '',
                    phone: '',
                    salary: '',
                    city: '',
                    languages: [],
                    categories: []
                }
                state.isLoading = false;
                Object.keys(state.errors).forEach(key => {
                    state.errors[key] = false;
                });
            })
            .addCase(addGuideService.rejected, (state, action) => {
                console.log("addGuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }else if(action.payload.errors.phone){
                    state.errors.phone = true;
                }
                if(action.payload.errors.email){
                    state.errors.email = true;
                }
                state.isLoading = false;
            })

    }
})
export const {updateFields,Submit} = AddGuideSlice.actions;
export default AddGuideSlice.reducer;

