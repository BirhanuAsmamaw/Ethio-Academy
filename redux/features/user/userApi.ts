import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi=createApi({
  reducerPath:"user",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/user"
  }),
  
  endpoints:(builder)=>({
    userProfile:builder.query<any,string>({
      query:(username)=>`/profile?username=${username}`
    }),

    updateProfile:builder.mutation<any,any>({
      query:(data)=>({
        url:`/profile/update`,
        method:"PUT",
        body:data
      })
    }),

    updateAccountType:builder.mutation<any,string>({
      query:(account)=>({
        url:`/accountType`,
        method:"PUT",
        body:{account:account}
      })
    }),

    updateUsername:builder.mutation<any,any>({
      query:(data)=>({
        url:`/updateUsername`,
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

export const {useUpdateUsernameMutation,useUpdateAccountTypeMutation,useUserStreakMutation,useUserProfileQuery,useUpdateProfileMutation}=userApi;