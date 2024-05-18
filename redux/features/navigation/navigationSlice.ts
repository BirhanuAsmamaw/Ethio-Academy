import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice=createSlice({
    name:"navigation",
    initialState:{
        isScroll:true
    },
    reducers:{
        setnavigationScroll:(state,action)=>{
            state.isScroll=action.payload.isScroll;
        },
        
    }
});

export const {setnavigationScroll}=navigationSlice.actions;

export default navigationSlice.reducer;