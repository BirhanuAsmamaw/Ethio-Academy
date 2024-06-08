import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const instructorApi=createApi({
  reducerPath:"instructor",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/teacher"
  }),
  endpoints:(builder)=>({
    createInstructor:builder.mutation<any,any>({
      query:(data)=>({
        url:"",
        method: "POST",
        body: data
      })
    }),
    instructorlists:builder.query<any[],void>({
      query:()=>`/lists`
    }),


    // get Instructor by Id
    getInstructor:builder.query<any,string>({
      query:(teacherId)=>`/getById?teacherId=${teacherId}`
    }),
  })
});
export const {
  useGetInstructorQuery,
  useInstructorlistsQuery,
  useCreateInstructorMutation}=instructorApi;