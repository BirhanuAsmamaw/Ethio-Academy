"use client"

import { configureStore } from "@reduxjs/toolkit"
import { searchSlice } from "./features/search/searchSlice"

export const store=configureStore({
    reducer:{
        search:searchSlice.reducer
    }}
)

export type RooState = ReturnType<typeof store.getState>;
export  type AppDispatch = typeof store.dispatch;