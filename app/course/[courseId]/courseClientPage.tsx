"use client"
import React, { useState } from "react";

import Link from "next/link";
import Header from "@/components/Header";
import MainLayout from "@/components/layouts/mainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/container/container";

import CourseSceleton from "./[chapterId]/courseSceleton";
import CourseDescribeList from "./coursedescribeList";
import Heading from "@/components/Heading/Heading";
import OnExpand from "@/components/button/onExpand";
import Reviews from "./reviews";
import CourseContent from "./courseContent";
import RatingPage from "./rating";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCourseDetailQuery } from "@/redux/features/course/courseApi";
import SubscriberAccount from "@/components/subscriberAccount";
import AddReviews from "./addReview";

interface ICourseId {
  courseId: string;
}

const CourseClientPage: React.FC<ICourseId> = ({ courseId }) => {
  const [isExpand, setExpand] = useState(false);
  const onExpanded = () => {
    setExpand((prev) => !prev);
  };

  const { data:course, isSuccess, isLoading,isError } = useCourseDetailQuery(courseId)

  if (isLoading) {
    return (
      <div className="flex w-full min-h-screen justify-center py-10">
        <div className="w-full md:w-10/12  lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex flex-col gap-10 pt-10">
          <CourseSceleton />
        </div>
      </div>
    );
  }

  if(isError){
    return <div className="flex justify-center items-center h-screen">
    <h1> Oops! Something went wrong</h1>
  </div>
  }


  return (<>
      <Header
        title={`EthioAcademy|| ${course && course?.course}`}
        description={`${course && course?.descriptions}`}
        keywords="Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning"
      />
      {course && isSuccess ? (
        <MainLayout className="w-full lg:px-4 xl:w-11/12 2xl:w-10/12 xl:px-10 2xl:px-20 md:gap-10 md:grid md:grid-cols-12">
          <ScrollArea className="h-max-screen md:col-span-8 mt-10 w-full">
            <Container className="w-full">
              <h1 className="text-xl mb-10 font-semibold">{course?.course}</h1>
              {course?.videoThumbnail && course?.videoUrl ? (
                <div>
                  <video
                    className="w-full rounded-lg shadow-lg"
                    controls
                    poster={course?.videoThumbnail?.public_url}
                  >
                    <source src={course?.videoUrl?.public_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                ""
              )}
              <div className="flex gap-4 my-10 flex-wrap text-balance tracking-tight">
                <p>
                  Course Created By{" "}
                  <Link
                    href={`/instructor/${course?.instructor.id}`}
                    className="no-underline hover:dark:text-green-400 hover:text-blue-500 transition duration-300 hover:underline font-medium text-black dark:text-white"
                  >
                    {course?.instructor?.accountName || course?.instructor?.user?.name}
                  </Link>
                </p>
                <SubscriberAccount is_subscriber={course?.isSubscribe||false} user={course?.isUser} accountId={course?.instructorId}/>
              </div>
              <Tabs defaultValue="about">
                <TabsList className="w-full gap-3 overflow-x-auto overflow-y-hidden items-start text-left justify-evenly">
                  <TabsTrigger
                    value="about"
                    className="border-b-[1.5px] tracking-tight font-normal border-slate-400 bg-transparent shadow-none hover:dark:text-white hover:text-gray-900 hover:font-medium hover:dark:border-gray-100 transition duration-300 hover:border-gray-800 data-[state=active]:border-blue-500 data-[state=active]:dark:border-green-400 data-[state=active]:border-b-2 data-[state=active]:font-medium data-[state=active]:text-blue-500 data-[state=active]:dark:text-green-400 md:text-lg"
                  >
                    About Course
                  </TabsTrigger>
                  <TabsTrigger
                    value="content"
                    className="tracking-tight border-b-[1.5px] font-normal border-slate-400 bg-transparent shadow-none hover:dark:text-white hover:text-gray-900 hover:font-medium hover:dark:border-gray-100 transition md:text-lg duration-300 hover:border-gray-800 data-[state=active]:border-blue-500 data-[state=active]:dark:border-green-400 data-[state=active]:border-b-2 data-[state=active]:font-medium data-[state=active]:text-blue-500 data-[state=active]:dark:text-green-400"
                  >
                    Contents
                  </TabsTrigger>
                  <TabsTrigger
                    value="rate"
                    className="tracking-tight border-b-[1.5px] font-normal border-slate-400 bg-transparent shadow-none hover:dark:text-white hover:text-gray-900 hover:font-medium hover:dark:border-gray-100 transition duration-300 hover:border-gray-800 data-[state=active]:border-blue-500 data-[state=active]:dark:border-green-400 data-[state=active]:border-b-2 data-[state=active]:font-medium data-[state=active]:text-blue-500 data-[state=active]:dark:text-green-400 md:text-lg"
                  >
                    Rating & Reviews
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-10">
                  <div className={`${isExpand ? "" : "h-72 overflow-hidden"} p-4 relative`}>
                    <Heading title="About Course" />
                    <div className="pb-10" dangerouslySetInnerHTML={{ __html: course?.descriptions }}></div>
                    <div className={`absolute ${isExpand ? "bottom-2 left-[50%]" : "top-[70%] left-[50%]"} shadow-sm z-20`}>
                      <OnExpand isExpand={isExpand} onExpand={onExpanded} />
                    </div>
                  </div>
                  <div className="p-4">
                    <Heading title="Requirements" />
                    <div className="p-0" dangerouslySetInnerHTML={{ __html: course?.requirements }}></div>
                  </div>
                  <div className="p-4">
                    <Heading title="Who Should Use Course?" />
                    <div className="p-0" dangerouslySetInnerHTML={{ __html: course?.whoShouldTake }}></div>
                  </div>
                </TabsContent>
                <TabsContent value="content" className="mt-10">
                  {course?.chapters?.length ? (
                    <div className="p-4">
                      <CourseContent course={course} />
                    </div>
                  ) : (
                    ""
                  )}
                </TabsContent>
                <TabsContent value="rate" className="mt-10 space-y-6">
                  <RatingPage course={course} />
                  <AddReviews course={course}/>

                  {course?.reviews && course?.reviews?.length ? <Reviews reviews={course?.reviews} /> : ""}
                </TabsContent>
              </Tabs>
              <div className="md:hidden">
                <CourseDescribeList course={course} />
              </div>
            </Container>
          </ScrollArea>
          <div className="hidden mt-10 md:block h-full md:col-span-4 w-full">
            <CourseDescribeList course={course} />
          </div>
        </MainLayout>
      ) : (
        <div className=""></div>
      )}
    </>
  );
};

export default CourseClientPage;
