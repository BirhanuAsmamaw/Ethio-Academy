import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi=createApi({
  reducerPath:"notificationApi",
  baseQuery:fetchBaseQuery({baseUrl:"/api/notification"}),
  endpoints:(builder)=>({

    notificationList:builder.query<any[],void>({
      query:()=>'/lists'
    })

  })
})



export const {useNotificationListQuery}=notificationApi