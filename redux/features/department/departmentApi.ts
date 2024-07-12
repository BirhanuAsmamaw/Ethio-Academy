import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentApi=createApi({
  reducerPath:"departmentApi",
  baseQuery:fetchBaseQuery({baseUrl:"/api/department/"}),
  endpoints:(builder)=>({

    departmentList:builder.query<any[],void>({
      query:()=>'list'
    })

  })
});

export const {useDepartmentListQuery}=departmentApi;