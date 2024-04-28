import { createSlice } from "@reduxjs/toolkit";

export const courseSlice=createSlice({
    name:"course",
    initialState:{
        id:"",
        course:"",
        price:"",
        description:"",
        requirements:"",
        subject:"",
        department:"",
    },
    reducers:{

    }
})