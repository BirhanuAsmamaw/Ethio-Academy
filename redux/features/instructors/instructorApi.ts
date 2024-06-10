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

    // instructor status
    instructorStatus:builder.mutation<any,{instructorId:string,status:boolean,reason:string}>({
      query:({instructorId,status,reason})=>({
        url:`/${instructorId}/approve`,
        method:"PUT",
        body:{status:status,reason:reason}
      })
    }),


    instructorlists:builder.query<any[],boolean | void>({
      query: (status) => status ? `/lists?status=${status}` : `/lists`
    }),


    // get Instructor by Id
    getInstructor:builder.query<any,string>({
      query:(teacherId)=>`/getById?teacherId=${teacherId}`
    }),
  })
});
export const {
  useInstructorStatusMutation,
  useGetInstructorQuery,
  useInstructorlistsQuery,
  useCreateInstructorMutation}=instructorApi;