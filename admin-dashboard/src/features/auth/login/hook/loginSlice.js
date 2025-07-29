import {createSlice} from "@reduxjs/toolkit";
import {LoginService} from "../api/loginService.jsx"
import {tokenStore} from "../../../../utils/dataStore.js"
const initialState = {
    email: "",
    password: "",
    isLoading: false,
}
const LoginSlice =createSlice({
    name: "login",
    initialState,
    reducers: {
    updateFields(state, action) {
        state[action.payload.field] = action.payload.value;
    }
    },
    extraReducers:(builder) => {
        builder.addCase(LoginService.pending, (state, action) => {
            state.status='Loading'
            state.isLoading=true;
        })
        .addCase(LoginService.fulfilled, (state, action) => {
        state.status='Fulfilled'
            state.isLoading=false;
            tokenStore.saveToken(action.payload.token)
        })
        .addCase(LoginService.rejected, (state, action) => {
            state.status='Rejected'
            state.emailError=action.payload.email?action.payload.email[0]:""
            state.passwordError=action.payload.password?action.payload.password[0]:""
            state.isLoading=false;
        })

    }
})
export const {updateFields} = LoginSlice.actions;
export default LoginSlice.reducer;