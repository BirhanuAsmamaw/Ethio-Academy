import { CourseType } from '@/types';
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
    }),

    // filter By Instructor
    newCourseFilterByInstructor: builder.query<any, { page: string, pageSize: string,instructorId:string }>({
      query: ({ page, pageSize ,instructorId}) => `/getCourseByInstructor?page=${page}&pageSize=${pageSize}&instructorId=${instructorId}`
    }),

    orderCourseByRateFilterByInstructor: builder.query<any, { page: string, pageSize: string,instructorId:string }>({
      query: ({ page, pageSize ,instructorId}) => `/getCourseByInstructor/orderByRate?page=${page}&pageSize=${pageSize}&instructorId=${instructorId}`
    }),


    // filter By Department
    newCourseFilterByDepartment: builder.query<any, { page: string, pageSize: string,departmentId:string }>({
      query: ({ page, pageSize ,departmentId}) => `/filterByDepartment/newCourse?page=${page}&pageSize=${pageSize}&departmentId=${departmentId}`
    }),
    orderCourseByRateFilterDepartment: builder.query<any, { page: string, pageSize: string,departmentId:string }>({
      query: ({ page, pageSize ,departmentId}) => `/filterByDepartment/orderByRate?page=${page}&pageSize=${pageSize}&departmentId=${departmentId}`
    }),


    // filter By Subject Id
    newCourseFilterBySubjectId: builder.query<any, { page: string, pageSize: string,subjectId:string }>({
      query: ({ page, pageSize ,subjectId}) => `/filterBySubjectId/newCourse?page=${page}&pageSize=${pageSize}&subjectId=${subjectId}`
    }),
    orderCourseByRateFilterBySubjectId: builder.query<any, { page: string, pageSize: string,subjectId:string }>({
      query: ({ page, pageSize ,subjectId}) => `/filterBySubjectId/orderByRate?page=${page}&pageSize=${pageSize}&subjectId=${subjectId}`
    }),

    // GET COURSE BY ID
    courseDetail:builder.query<any,string>({
      query:(courseId)=>`${courseId}/byId`
    }),

    // ENROLLED COURSES
  
    enrolledCourses:builder.query<any[],void>({
      query:()=>({
        url:`/enrolledCourses`,
        method:"GET"
      })
    }),


// Course Streak
    courseStreak: builder.mutation<any, string >({
      query: (courseId) => ({
        url:`/courseStreak`,
        method:"POST",
        body:{courseId:courseId}
      })
    }),


    // COURSE CERTIFICATES
    courseCertificate: builder.mutation<any, string >({
      query: (lessonId) => ({
        url:`/certificates`,
        method:"POST",
        body:{lessonId:lessonId}
      })
    }),

    getCourseCertificate: builder.query<any, string >({
      query: (courseId) => `/certificates/findById?courseId=${courseId}`
    }),



  })
});

export const {
  // COURSE CERTIFICATES
  useCourseCertificateMutation,
  useGetCourseCertificateQuery,
  // filter By Department
  useNewCourseFilterByDepartmentQuery,
  useOrderCourseByRateFilterDepartmentQuery,


   // filter By SubjectId
   useNewCourseFilterBySubjectIdQuery,
   useOrderCourseByRateFilterBySubjectIdQuery,


// filter By Instructor
  useNewCourseFilterByInstructorQuery,
  useOrderCourseByRateFilterByInstructorQuery,
useCourseStreakMutation,
  useFilteredCourseBySubjectQuery,
  useOrderCourseByRateQuery,
  useNewCourseQuery,
//get course by id
useCourseDetailQuery,

// enrolled courses
useEnrolledCoursesQuery



}=courseApi;