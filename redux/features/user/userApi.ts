import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi=createApi({
  reducerPath:"user",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/user"
  }),
  
  endpoints:(builder)=>({


    // USER LISTS
    userLists:builder.query<any,{ page: string, pageSize: string}>({
      query:({ page, pageSize})=>`/list?page=${page}&pageSize=${pageSize}`
    }),
    

    userProfile:builder.query<any,string>({
      query:(username)=>`/profile?username=${username}`
    }),


    // MY PROFILE
    myProfile:builder.query<any,void>({
      query:()=>'/myprofile'
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

export const {

  useMyProfileQuery,
  useUserListsQuery,
  useUpdateUsernameMutation,
  useUpdateAccountTypeMutation,
  useUserStreakMutation,
  useUserProfileQuery,
  useUpdateProfileMutation}=userApi;