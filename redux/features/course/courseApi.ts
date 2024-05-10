import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const courseApi=createApi({
  reducerPath:"course",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/course"
  }),
  endpoints:(builder)=>({
    filteredCourseBySubject:builder.query<any[],string>({
      query:(filter)=>`/filterBySubject?filter=${filter}`
    })
  })
});
export const {useFilteredCourseBySubjectQuery}=courseApi;