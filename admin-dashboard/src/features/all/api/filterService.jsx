import API from "../../../api/apiRoutes.jsx"
import albolbol from "../../../api/albolbol.jsx"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const filterService=createAsyncThunk(
    "filterService",
    async (data, {rejectWithValue}) => {
        console.log("souiiiiiii",data)
        let form={}
        try{
            Object.entries(data).forEach(([key, value])=>{
                if(value)
                {
                    if(key==='categories'||key==='languages'||key==='cities'){
                        form[key]=value.map(item=>item.id)
                    }
                    else {
                        form[key] = value
                    }
                }
            })
            let response
            switch (data.type){
                case "guide":
                    if(data.status==='all')
                    {
                        const response1=await albolbol.post(API.search,{...form,status:'active',types:[data.type]})
                        const response2=await albolbol.post(API.search,{...form,status:'inactive',types:[data.type]})
                        console.log(response1.data,response2.data)
                        response = {
                            guide: [
                                ...(response1.data.guide || []),
                                ...(response2.data.guide || [])
                            ]
                        };
                    }else{
                        const response1=await albolbol.post(API.search,{...form,status:data.status,types:[data.type]})
                        response=response1.data
                    }
                    return {...response,type:"guide"}
                case "event":
                    if(data.status==='all')
                    {
                        const response1=await albolbol.post(API.search,{...form,status:'active',types:[data.type]})
                        const response2=await albolbol.post(API.search,{...form,status:'inactive',types:[data.type]})
                        response={...response1.data,...response2.data}
                        response = {
                            event: [
                                ...(response1.data.event || []),
                                ...(response2.data.event || [])
                            ]
                        };
                    }else{
                        const response1=await albolbol.post(API.search,{...form,status:data.status,types:[data.type]})
                        response=response1.data
                    }
                    return {...response,type:"event"}
                case 'group_trip':
                    if(data.status==='all')
                    {
                        const response1=await albolbol.post(API.search,{...form,status:'pending',types:[data.type]})
                        const response2=await albolbol.post(API.search,{...form,status:'in_progress',types:[data.type]})
                        const response3=await albolbol.post(API.search,{...form,status:'finished',types:[data.type]})
                        const response4=await albolbol.post(API.search,{...form,status:'completed',types:[data.type]})
                        const response5=await albolbol.post(API.search,{...form,status:'canceled',types:[data.type]})
                        response = {
                            groupTrip: [
                                ...(response1.data.groupTrip || []),
                                ...(response2.data.groupTrip || []),
                                ...(response3.data.groupTrip || []),
                                ...(response4.data.groupTrip || []),
                                ...(response5.data.groupTrip || [])
                            ]
                        };                     }else{
                        const response1=await albolbol.post(API.search,{...form,status:data.status,types:[data.type]})
                        response=response1.data
                    }
                    return {...response,type:"group_trip"}
            }
        }
        catch (error) {
            if (error.status === 401) {
                return rejectWithValue({unauthorized: true});
            }
            return rejectWithValue(
                error.response.data.message || "Something went wrong"
            );
        }
    })