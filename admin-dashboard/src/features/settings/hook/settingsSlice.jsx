import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {addLanguageService} from "../api/addLanguageService.jsx";
import {addCategoryService} from "../api/addCategoryService.jsx";
import {updateCategoryService} from "../api/updateCategoryService.jsx";
import {updateLanguageService} from "../api/updateLanguageService.jsx";


const initialState = {

}
const settingsSlice =createSlice({
    name: "settingsApi",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder.addCase(addLanguageService.pending, (state,action) => {

        })
            .addCase(addLanguageService.fulfilled, (state, action) => {
                console.log('addLanguageService.fulfilled',action.payload)
            })
            .addCase(addLanguageService.rejected, (state, action) => {
                console.log("addLanguageService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            }).addCase(addCategoryService.fulfilled, (state, action) => {
                console.log('addCategoryService.fulfilled',action.payload)
            })
            .addCase(addCategoryService.rejected, (state, action) => {
                console.log("addLanguageService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            }).addCase(updateLanguageService.fulfilled, (state, action) => {
                console.log('updateLanguageService.fulfilled',action.payload)
            })
            .addCase(updateLanguageService.rejected, (state, action) => {
                console.log("updateLanguageService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            }).addCase(updateCategoryService.fulfilled, (state, action) => {
                console.log('updateCategoryService.fulfilled',action.payload)
            })
            .addCase(updateCategoryService.rejected, (state, action) => {
                console.log("updateCategoryService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })
    }
})
export default settingsSlice.reducer;

