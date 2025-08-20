import {createSlice} from '@reduxjs/toolkit';
import {getIdsService} from '../../all/api/getIdsService.jsx'
import {tokenStore} from "../../../utils/dataStore.js";
const initialState = {
    cities:[],
    languages:[],
    categories:[]
}
const getIdsSlice=createSlice(
    {
        name: "getIds",
        initialState,
        reducers: {
        },
        extraReducers:(builder) => {
            builder.addCase(getIdsService.fulfilled, (state, action) => {
                console.log(action.payload)
                state.cities=action.payload.cities
                state.languages=action.payload.languages
                state.categories=action.payload.categories
            })
                .addCase(getIdsService.pending, (state, action) => {

                })
                .addCase(getIdsService.rejected, (state, action) => {
                    console.log(action.payload)
                    if((!!action.payload?.unauthorized)){
                        tokenStore.clearToken()
                        window.location.href = '/login'
                    }
                })
        }
    }
)
export default getIdsSlice.reducer;