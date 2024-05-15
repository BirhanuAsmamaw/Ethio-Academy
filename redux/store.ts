"use client"

import { configureStore } from "@reduxjs/toolkit"
import { searchSlice } from "./features/search/searchSlice"
import {courseApi} from "./features/course/courseApi"
import {instructorApi} from "./features/instructors/instructorApi"
import {subscriberApi} from "./features/subscribers/subscriberApi"

export const store=configureStore({
    reducer:{
        [courseApi.reducerPath]:courseApi.reducer,
        [instructorApi.reducerPath]:instructorApi.reducer,
        [subscriberApi.reducerPath]:subscriberApi.reducer,

        search:searchSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(courseApi.middleware,instructorApi.middleware,subscriberApi.middleware)
}
)

export type RooState = ReturnType<typeof store.getState>;
export  type AppDispatch = typeof store.dispatch;