import {createSlice} from "@reduxjs/toolkit";
import {tokenStore} from "../../../utils/dataStore.js";
import {getGuideService} from "../api/getGuideService.jsx"
import {updateGuideService} from "../api/updateGuideService.jsx";
import {deleteFeedBackService} from "../../auth/login/api/deleteFeedBackService.jsx";
import {getGuideTasksService} from "../api/getGuideTasksService.jsx";

const initialState = {
    guide:{
        id:'',
        name:'',
        description:'',
        images:[],
        categories:[],
        languages:[],
        feedbacks:[],
        city:{},
        rate:0,
        price:0,
        const_salary:0,
        extra_salary:0,
        reviewer_count:0,
        tasks:{}
    },
    isLoading:false,
}
const OneGuideSlice =createSlice({
    name: "GuideApi",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder.addCase(getGuideService.pending, (state,action) => {
            state.guide ={
                id:'',
                name:'',
                description:'',
                images:[],
                categories:[],
                languages:[],
                feedbacks:[],
                city:{},
                rate:0,
                price:0,
                const_salary:0,
                extra_salary:0,
                reviewer_count:0
            } ;
            state.isLoading = true
        })
            .addCase(getGuideService.fulfilled, (state, action) => {
                state.guide = action.payload.data;
                state.isLoading = false
            })
            .addCase(getGuideService.rejected, (state, action) => {
                console.log("GuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false
            })
            .addCase(getGuideTasksService.fulfilled, (state, action) => {
                let tasks=[]
                if( action.payload.userTask.length>0) {
                    for (let task of action.payload.userTask) {
                        tasks.push(task)
                    }
                }
                if(action.payload.groupTask.length>0)
                {
                    for (let task of action.payload.groupTask) {
                        tasks.push(task)
                    }
                }
                if(action.payload.daysOff.length>0) {
                    for (let task of action.payload.daysOff) {
                        tasks.push(task)
                    }
                }
                state.guide.tasks = tasks;
                state.isLoading = false
            })
            .addCase(getGuideTasksService.rejected, (state, action) => {
                console.log("getGuideTasksService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
                state.isLoading = false
            })
            .addCase(updateGuideService.fulfilled, (state, action) => {
                console.log("updateGuideService.fulfilled", action.payload)
            })
            .addCase(updateGuideService.rejected, (state, action) => {
                console.log("updateGuideService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            }).addCase(deleteFeedBackService.fulfilled, (state, action) => {
                console.log("deleteFeedBackService.fulfilled", action.payload)
            })
            .addCase(deleteFeedBackService.rejected, (state, action) => {
                console.log("deleteFeedBackService.rejected", action.payload)
                if((!!action.payload?.unauthorized)){
                    tokenStore.clearToken()
                    window.location.href = '/login'
                }
            })

    }
})
export default OneGuideSlice.reducer;

