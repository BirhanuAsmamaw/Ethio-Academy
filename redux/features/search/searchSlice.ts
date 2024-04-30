import { createSlice } from "@reduxjs/toolkit";

export const searchSlice=createSlice({
    name:"search",
    initialState:{
        search:"",
        rating:0,
        price:0
    },
    reducers:{
        setSearch:(state,action)=>{
            state.search=action.payload.search;
        },
        setRating(state,action){
            state.rating=action.payload.rating
        },
        setPrice(state,action){
            state.price=action.payload.price
        }
    }
});

export const {setSearch,setRating,setPrice}=searchSlice.actions;

export default searchSlice.reducer;