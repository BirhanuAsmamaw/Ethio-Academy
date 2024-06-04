import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paymentApi=createApi({
  reducerPath:"payment",
  baseQuery:fetchBaseQuery({
    baseUrl:"/api/payment"
  }),
  
  endpoints:(builder)=>({
    paymentList:builder.query<any[],void>({
      query:()=>`/lists`
    }),
    getPayment:builder.query<any,string>({
      query:(paymentId)=>`${paymentId}/getPayment`
    }),

    getPaymentCourse:builder.query<any,string>({
      query:(courseId)=>`/paymentCourse?courseId=${courseId}`
    }),
   approveStatus:builder.mutation<any,string>({
      query:(paymentId)=>({
        url:`/${paymentId}/approve-status`,
        method:"PUT"
      })
    })
    
  })
});

export const {useGetPaymentCourseQuery,usePaymentListQuery,useApproveStatusMutation,useGetPaymentQuery}=paymentApi;