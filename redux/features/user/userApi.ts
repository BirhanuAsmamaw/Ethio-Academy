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

    updateProfile:builder.mutation<any,any>({
      query:(data)=>({
        url:`/profile/update`,
        method:"PUT",
        body:data
      })
    }),


    userStreak:builder.mutation<any,void>({
      query:()=>({
        url:`/streak`,
        method:"PUT"
      })
    }),
   
  })
});

export const {useUserStreakMutation,useUserProfileQuery,useUpdateProfileMutation}=userApi;