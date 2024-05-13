import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const courseApi=createApi({
  reducerPath:"course",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/course"
  }),
  endpoints:(builder)=>({
    filteredCourseBySubject:builder.query<any[],string>({
      query:(filter)=>`/filterBySubject?filter=${filter}`
    }),
    orderCourseByRate: builder.query<any, { page: string, pageSize: string }>({
      query: ({ page, pageSize }) => `/lists/orderByRating?page=${page}&pageSize=${pageSize}`
    }),
    newCourse: builder.query<any, { page: string, pageSize: string }>({
      query: ({ page, pageSize }) => `/lists?page=${page}&pageSize=${pageSize}`
    })
  })
});
export const {useFilteredCourseBySubjectQuery,useOrderCourseByRateQuery,useNewCourseQuery}=courseApi;