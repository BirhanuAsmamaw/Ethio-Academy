import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const permissionApi=createApi({
  reducerPath:"permissionApi",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/authorization/permission/"
  }),
  endpoints:(builder)=>({

    myPermission:builder.query<any[],void>({
      query:()=>({
        url:'myPermission',
        method:"GET"
      })
    })
  })
});

export const {useMyPermissionQuery}=permissionApi