import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const LessonApi=createApi({
  reducerPath:"lessonApi",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/lesson/"
  }),

  endpoints:(builder)=>({
    getLesson:builder.query<any,string>({
      query:(lessonId)=>`${lessonId}/findById`
    }),
    
  })

});

export const {useGetLessonQuery}=LessonApi