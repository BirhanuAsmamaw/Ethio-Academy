"use client"

import Heading from "@/components/Heading/Heading";
import Container from "@/components/container/container";
import React, { useState } from "react";
import RatingPage from "./rating";
import AddReviews from "./addReview";
import Reviews from "./reviews";
import CourseContent from "./courseContent";
import CourseSceleton from "./[chapterId]/courseSceleton";

import CourseDescribeList from "../coursedescribeList";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import OnExpand from "@/components/button/onExpand";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import SubscriberAccount from "@/app/instructor/[instructorId]/subscriberAccount";

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
 
<MainLayout>

  <SubLayout className="py-20">

  <h1 className="text-xl  font-semibold">{course?.course}</h1>
  {(course?.videoThumbnail&&course?.videoUrl)?<div>
    <video
        className="w-full rounded-lg shadow-lg"
        controls
        poster={course?.videoThumbnail?.public_url}
      >
        <source src={course?.videoUrl?.public_url} type="video/mp4"  />
        Your browser does not support the video tag.
      </video></div>:""}

      <div className="flex gap-4 flex-wrap text-balance tracking-tight">
        <p>Course Created By <Link href={`/instructor/${course?.instructor.id}`} className=" 
        no-underline
        hover:dark:text-green-400
         hover:text-blue-500 transition duration-300 hover:underline font-medium text-black dark:text-white">{course?.instructor?.accountName||course?.instructor?.user?.name}</Link></p>
       <SubscriberAccount is_subscriber={course?.isSubscribe||false} userId={customer?.id} accountId={course?.instructorId}/>
      </div>

      <Tabs defaultValue="about">
        <TabsList className="w-full gap-3  overflow-x-auto overflow-y-hidden items-start text-left justify-evenly">
        <TabsTrigger value="about" className=" 
           border-b-[1.5px]
            tracking-tight  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400  md:text-lg">About Course</TabsTrigger>



          <TabsTrigger value="content" className=" 
           tracking-tight  
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
            md:text-lg
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400">Contents</TabsTrigger>



          <TabsTrigger value="rate" className="
           tracking-tight  
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400
           md:text-lg
           ">Rating & Reviews</TabsTrigger>
        </TabsList>


        <TabsContent value="about" className="mt-10 space-y-10">
        <Container
  childern={
    <div className={`${isExpand? '':'h-72 overflow-hidden'} space-y-4 p-4 relative`}>
      <Heading title="About Course"/>
      <div className="pb-10 " dangerouslySetInnerHTML={{ __html: course?.descriptions}}></div>
      <div className={`absolute ${isExpand? 'bottom-2  left-[50%]':'top-[70%] left-[50%]'}  shadow-lg z-20`}>
       <OnExpand isExpand={isExpand} onExpand={onExpanded}/>
      </div>
      </div>
  }
  />
  <Container
  childern={
    <div className="space-y-4 p-4">
      <Heading title="Requirements"/>
      <div className="" dangerouslySetInnerHTML={{ __html: course?.requirements}}></div>
      </div>
  }
  />

<Container
  childern={
    <div className="space-y-4 p-4">
      <Heading title="Who Should Use Course?"/>
      <div className="" dangerouslySetInnerHTML={{ __html: course?.whoShouldTake}}></div>
      </div>
  }
  />
  
        </TabsContent>




        <TabsContent value="content" className="mt-10">
         {/* course contents or modules */}
{course?.chapters?.length?<Container
  childern={
    <div className="p-4">
      <CourseContent course={course}/>
      </div>
  }
  />:""}
        </TabsContent>




        <TabsContent value="rate" className="mt-10 space-y-10">
        <RatingPage course={course}/>
<AddReviews course={course} customer={customer}/>
{course?.reviews&&course?.reviews?.length?<Reviews reviews={course?.reviews}/>:""}

        </TabsContent>
      </Tabs>

      <div className=" lg:hidden">
<CourseDescribeList course={course}/>
</div>




</SubLayout>




{/* course contents lits for above md */}
<div className="hidden lg:block fixed right-10 top-28 w-[300px] ">
  <CourseDescribeList course={course}/>

</div>





</MainLayout>
  </>);
}
 
export default CourseClientPage;


















