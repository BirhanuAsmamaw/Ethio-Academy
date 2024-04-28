import { createSlice } from "@reduxjs/toolkit";

export const searchSlice=createSlice({
    name:"search",
    initialState:{
        search:"",
    },
    reducers:{
        setSearch:(state,action)=>{
            state.search=action.payload.search;
        }
    }
});

export const {setSearch}=searchSlice.actions;

export default searchSlice.reducer;