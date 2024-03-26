"use client"

import Heading from "@/components/Heading/Heading";
import Container from "@/components/container/container";
import { IoChevronUp,IoChevronDown } from "react-icons/io5";
import React, { useState } from "react";
import RatingPage from "./rating";
import AddReviews from "./addReview";
import Reviews from "./reviews";
import CourseContent from "./courseContent";
import CourseSceleton from "./[chapterId]/courseSceleton";

import CourseDescribeList from "../coursedescribeList";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import { Button } from "@/components/ui/button";

interface ICourseId{
  course:any;
  customer:any;
}

const CourseClientPage:React.FC<ICourseId> = ({course,customer}) => {
const [isExpand,setExpand]=useState(false);
  const onExpand=()=>{
    setExpand((prev)=>!prev);
  }
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
  {(course.videoThumbnail&&course?.videoUrl)?<div>
    <video
        className="w-full rounded-lg shadow-lg"
        controls
        poster={course?.videoThumbnail.public_url}
      >
        <source src={course?.videoUrl.public_url} type="video/mp4"  />
        Your browser does not support the video tag.
      </video></div>:""}

      <div className=" lg:hidden">
<CourseDescribeList course={course}/>
</div>

  <Container
  childern={
    <div className={`${isExpand? '':'h-72 overflow-hidden'} space-y-4 p-4 relative`}>
      <Heading title="About Course"/>
      <div className="" dangerouslySetInnerHTML={{ __html: course.descriptions}}></div>
      <div className={`absolute ${isExpand? 'bottom-2  left-[50%]':'top-[50%] left-[50%]'}  z-30`}>
        <Button 
        className="bg-black  bg-opacity-20 p-2"
        variant="ghost" 
        onClick={onExpand}>{isExpand? <IoChevronUp size={30}/>:<IoChevronDown size={30}/>}</Button>
      </div>
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


















