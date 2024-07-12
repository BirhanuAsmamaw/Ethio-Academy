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
import { permissionApi } from "./features/permission/permissionApi"
import { departmentApi } from "./features/department/departmentApi"

export const store=configureStore({
    reducer:{
        [courseApi.reducerPath]:courseApi.reducer,
        [instructorApi.reducerPath]:instructorApi.reducer,
        [subscriberApi.reducerPath]:subscriberApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [paymentApi.reducerPath]:paymentApi.reducer,
        [LessonApi.reducerPath]:LessonApi.reducer,
        [notificationApi.reducerPath]:notificationApi.reducer,
        [permissionApi.reducerPath]:permissionApi.reducer,
        [departmentApi.reducerPath]:departmentApi?.reducer,

        search:searchSlice.reducer,
        navigation:navigationSlice.reducer,

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(
        departmentApi?.middleware,
        courseApi.middleware,
        instructorApi.middleware,
        subscriberApi.middleware,
        userApi.middleware,
        paymentApi.middleware,
        LessonApi.middleware,
        notificationApi.middleware,
        permissionApi.middleware
    )
}
)

export type RooState = ReturnType<typeof store.getState>;
export  type AppDispatch = typeof store.dispatch;