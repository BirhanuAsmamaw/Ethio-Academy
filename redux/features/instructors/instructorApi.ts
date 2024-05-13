import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const instructorApi=createApi({
  reducerPath:"instructor",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/teacher"
  }),
  endpoints:(builder)=>({
    instructorlists:builder.query<any[],void>({
      query:()=>`/lists`
    })
  })
});
export const {useInstructorlistsQuery}=instructorApi;