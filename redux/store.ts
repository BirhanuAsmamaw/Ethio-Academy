"use client"

import { configureStore } from "@reduxjs/toolkit"
import { searchSlice } from "./features/search/searchSlice"
import {courseApi} from "./features/course/courseApi"


export const store=configureStore({
    reducer:{
        [courseApi.reducerPath]:courseApi.reducer,

        search:searchSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(courseApi.middleware)
}
)

export type RooState = ReturnType<typeof store.getState>;
export  type AppDispatch = typeof store.dispatch;