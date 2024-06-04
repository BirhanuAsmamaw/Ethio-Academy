"use client"

import Heading from "@/components/Heading/Heading";
import Container from "@/components/container/container";
import React, { useState } from "react";
import RatingPage from "./rating";
import AddReviews from "./addReview";
import Reviews from "./reviews";
import CourseContent from "./courseContent";
import CourseSceleton from "./[chapterId]/courseSceleton";

import CourseDescribeList from "./coursedescribeList";
import MainLayout from "@/components/layouts/mainLayout";
import OnExpand from "@/components/button/onExpand";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
// import SubscriberAccount from "@/components/subscriberAccount";
import { ScrollArea } from "@/components/ui/scroll-area";


interface ICourseId{
  course:any;
  customer:any;
 
}

const CourseClientPage:React.FC<ICourseId> = ({course,customer}) => {
const [isExpand,setExpand]=useState(false);
  const onExpanded=()=>{
    setExpand((prev)=>!prev);
  }


 
  if(!course){
    return ( <div className="flex w-full h-screen justify-center py-10 ">
      <div className="w-full md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex flex-col gap-10  pt-10">
        <CourseSceleton/>
        </div> 

    </div>)
  }


  
  return ( <>
 
<MainLayout className="w-full lg:px-4 xl:w-11/12 2xl:w-10/12  xl:px-10 2xl:px-20 md:gap-10 md:grid md:grid-cols-12">

  <ScrollArea className="h-max-screen md:col-span-8 mt-10 w-full">
<Container className=" w-full">
 

  <h1 className="text-xl mb-10  font-semibold">{course?.course}</h1>
  {(course?.videoThumbnail&&course?.videoUrl)?<div>
    <video
        className="w-full rounded-lg shadow-lg"
        controls
        poster={course?.videoThumbnail?.public_url}
      >
        <source src={course?.videoUrl?.public_url} type="video/mp4"  />
        Your browser does not support the video tag.
      </video></div>:""}

      <div className="flex gap-4 my-10 flex-wrap text-balance tracking-tight">
        <p>Course Created By <Link href={`/instructor/${course?.instructor.id}`} className=" 
        no-underline
        hover:dark:text-green-400
         hover:text-blue-500 transition duration-300 hover:underline font-medium text-black dark:text-white">{course?.instructor?.accountName||course?.instructor?.user?.name}</Link></p>
       {/* <SubscriberAccount is_subscriber={course?.isSubscribe||false} userId={customer?.id} accountId={course?.instructorId}/> */}
      </div>

      {/*  */}

      <div className=" md:hidden">
<CourseDescribeList course={course} user={customer}/>
</div>


</Container>
</ScrollArea>



{/* course contents lits for above md */}
<div className="hidden mt-10 md:block h-full md:col-span-4 w-full ">
  <CourseDescribeList course={course} user={customer}/>

</div>





</MainLayout>
  </>);
}
 
export default CourseClientPage;


















