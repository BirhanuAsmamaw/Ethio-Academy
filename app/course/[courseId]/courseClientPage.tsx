"use client"

import Heading from "@/components/Heading/Heading";
import Container from "@/components/container/container";

import React from "react";
import RatingPage from "./rating";
import AddReviews from "./addReview";
import Reviews from "./reviews";
import CourseContent from "./courseContent";
import CourseSceleton from "./[chapterId]/courseSceleton";

import CourseDescribeList from "../coursedescribeList";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";

interface ICourseId{
  course:any;
  customer:any;
}

const CourseClientPage:React.FC<ICourseId> = ({course,customer}) => {

  
  if(!course){
    return ( <div className="flex h-screen justify-center py-10 px-2">
      <div className="w-full md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex flex-col gap-10  pt-10">
        <CourseSceleton/>
        </div> 

    </div>)
  }


  
  return ( <>
 
<MainLayout>

  <SubLayout>

  <h1 className="text-xl  font-semibold">{course.subject}</h1>
  {course.videoThumbnail?<div>
    <video
        className="w-full rounded-lg shadow-lg"
        controls
        poster={course?.videoThumbnail.public_url}
      >
        <source src={course?.videoUrl.public_url} type="video/mp4"  />
        Your browser does not support the video tag.
      </video></div>:""}
  <Container
  childern={
    <div className="space-y-4 p-4">
      <Heading title="About Course"/>
      <div className="" dangerouslySetInnerHTML={{ __html: course.descriptions}}></div>
      </div>
  }
  />



{/* course contents or modules */}
{course.chapters.length?<Container
  childern={
    <div className="p-4">
      <CourseContent course={course}/>
      </div>
  }
  />:""}



<div className=" lg:hidden">
<CourseDescribeList course={course}/>
</div>


<Container
  childern={
    <div className="space-y-4 p-4">
      <Heading title="Requiremets"/>
      <div className="" dangerouslySetInnerHTML={{ __html: course.requirements}}></div>
      </div>
  }
  />

<Container
  childern={
    <div className="space-y-4 p-4">
      <Heading title="Who Shuld Use Course?"/>
      <div className="" dangerouslySetInnerHTML={{ __html: course.whoShouldTake}}></div>
      </div>
  }
  />



<RatingPage course={course}/>
<AddReviews course={course} customer={customer}/>
{course.reviews.length?<Reviews reviews={course.reviews}/>:""}


</SubLayout>




{/* course contents lits for above md */}
<div className="hidden lg:block fixed right-10 top-28 w-[300px] ">
  <CourseDescribeList course={course}/>

</div>





</MainLayout>
  </>);
}
 
export default CourseClientPage;


















