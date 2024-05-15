import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const subscriberApi=createApi({
  reducerPath:"subscriber",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/subscriber"
  }),
  endpoints:(builder)=>({
    subscribeAccount:builder.mutation<any,any>({
      query:(data)=>({
        url:"",
        method: "POST",
        body: data
      })
    })
    
  })
});
export const {useSubscribeAccountMutation}=subscriberApi;