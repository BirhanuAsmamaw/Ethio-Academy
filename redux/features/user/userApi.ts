import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi=createApi({
  reducerPath:"user",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/user"
  }),
  
  endpoints:(builder)=>({
    userProfile:builder.query<any,string>({
      query:(profileId)=>`/profile?profileId=${profileId}`
    }),
   
  })
});

export const {useUserProfileQuery}=userApi;