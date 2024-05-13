"use client"
import React from 'react'

import OrderByRateCourseList from './orderByRateCourseList';
import NewCoursesList from './newCoursesList';

const CourseListLayout= () => {
  return ( <section id='courseslist' className=' py-10 md:py-32  flex flex-col gap-y-20'>

<OrderByRateCourseList/>
<NewCoursesList/>





  </section>


  )
}

export default CourseListLayout;