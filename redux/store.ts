"use client"

import { configureStore } from "@reduxjs/toolkit"
import { searchSlice } from "./features/search/searchSlice"
import {courseApi} from "./features/course/courseApi"
import {instructorApi} from "./features/instructors/instructorApi"
import {subscriberApi} from "./features/subscribers/subscriberApi"
import {navigationSlice} from "./features/navigation/navigationSlice"
import { userApi } from "./features/user/userApi"
import { paymentApi } from "./features/payments/paymentApi"
import { LessonApi } from "./features/lesson/lessonApi"
import { notificationApi } from "./features/notifications/notification"

export const store=configureStore({
    reducer:{
        [courseApi.reducerPath]:courseApi.reducer,
        [instructorApi.reducerPath]:instructorApi.reducer,
        [subscriberApi.reducerPath]:subscriberApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [paymentApi.reducerPath]:paymentApi.reducer,
        [LessonApi.reducerPath]:LessonApi.reducer,
        [notificationApi.reducerPath]:notificationApi.reducer,

        search:searchSlice.reducer,
        navigation:navigationSlice.reducer,

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(courseApi.middleware,instructorApi.middleware,subscriberApi.middleware,userApi.middleware,paymentApi.middleware,LessonApi.middleware,notificationApi.middleware)
}
)

export type RooState = ReturnType<typeof store.getState>;
export  type AppDispatch = typeof store.dispatch;