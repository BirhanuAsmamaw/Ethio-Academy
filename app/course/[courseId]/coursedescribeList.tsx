"use client"
import { BsBarChart } from "react-icons/bs";
import { SiLibreoffice } from "react-icons/si";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { useCart } from "@/hooks/use.cart";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { CiCircleQuestion } from "react-icons/ci";
import ShareSocialMedia from "@/components/ShareSocial";
import { useEffect, useState } from "react";
import Container from "@/components/container/container";
import { FaCertificate } from "react-icons/fa";
import { useGetCourseCertificateQuery } from "@/redux/features/course/courseApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPaymentCourseQuery } from "@/redux/features/payments/paymentApi";

interface ContentListProps{
  icon:IconType;
  title:string;
  content?:string;
  } 
  

  interface CourseDescriptionListprops{
    course:any;
    
  }

const ContentList:React.FC<ContentListProps>=({icon:Icon,title,content})=>{
 
  return(
    <div className="flex gap-4 justify-between  text-sm mx-2  py-2">
      <div className="flex text-sm text-gray-500 dark:text-gray-400 gap-2"><Icon size={22}/>
      <p>{title}</p></div>
      <p className="font-medium text-base text-blue-600 dark:text-green-400 ">{content}</p>

    </div>
  )
}












const CourseDescribeList:React.FC<CourseDescriptionListprops> = ({course}) => {

  const {data,isSuccess,isLoading}=useGetCourseCertificateQuery(course?.id)
  const [lessonNo,setLessonNo]=useState(0)
  

const {data:payedCourse,isSuccess:payedSuccess,isError:paymentError,isLoading:paymentLoading}=useGetPaymentCourseQuery(course?.id);

 
  useEffect(() => {
    let lessonCount = 0; // Initialize a counter outside the loops
    course?.chapters.forEach((chapter:any) => {
        chapter?.lessons.forEach((lesson:any) => {
            lessonCount++; // Increment the counter for each lesson
        });
    });
    setLessonNo(lessonCount); // Set the state after counting all the lessons
}, [course]); // Make sure to include course in the dependency array if it's a dependency

 
  const router=useRouter()
const {addToCart}=useCart();


const onAddToCart=()=>{
  addToCart({id:course?.id,course:course?.course,price:course?.price})
  router.push('/cart')
}

const onPayment=()=>{
  addToCart(course)
  router.push('/payment')
}
  return ( <Container className="
  shadow-sm
 
  flex
   flex-col overflow-y-auto 
  overflow-x-hidden  
   ">
<div className="flex justify-end items-center pb-4">


<ShareSocialMedia url={`https://ethio-exams-academy.vercel.app/course/${course.id}`}/>

</div>


    <>{((payedSuccess&&(!payedCourse?.isCoursePayed))||paymentError)?
      // COURSE BUYING 
    <div className="p-2 flex  justify-end gap-6">
      <button 
      onClick={onAddToCart}
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 md:px-2 md:text-xs  lg:text-sm lg:px-5 py-2.5 md:py-1 lg:py-2.5 text-center me-2 mb-2"
       >Add to cart</button>
      <button

      onClick={onPayment}
      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-5 md:px-2 lg:px-5 md:text-xs  lg:text-sm  py-2.5 md:py-1 lg:py-2.5 text-center me-2 mb-2"
      >Buy Now!!</button>
    </div>:null}

  
{
  //  COURSE PROGRESSES 
  payedCourse&&isSuccess&&data&&payedSuccess&&payedCourse?.isCoursePayed?<div className="w-full px-2 py-10 rounded-lg bg-gray-50 dark:bg-gray-700 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="flex items-center justify-center w-full gap-x-2">
          <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
              style={{ width: `${data?.coursePercent}%` }}
            ></div>
          </div>
          <p className="font-bold text-blue-600 dark:text-blue-400">{data?.coursePercent}%</p>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {data?.coursePercent>= 100 ? "Congratulations! " : "Keep Going! "}
          </span>
          {data?.coursePercent>= 100 ? "You've completed all lessons." : `${data?.lessonCertificates?.length||0} out of ${lessonNo} lessons completed`}
        </p>

        {data?.coursePercent>= 100 && (
          <button className="mt-4 flex items-center px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded-full shadow-lg hover:bg-green-600 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
          <FaCertificate className="mr-2" />
          See Certificate
        </button>
        )}
      </div>
    </div>:""}</>
   
    {paymentLoading?<Skeleton className="bg-gray-200  dark:bg-gray-600 h-3 w-full" />:""}
  <h5 className="px-2 text-base mt-6 text-gray-900 font-medium dark:text-gray-50">Course Content</h5>
 <div className="flex flex-col  ">

  <ContentList
  title="Exam Questions"
  icon={CiCircleQuestion}
  content="3000"
  />

{false?<ContentList
  title="Resourses"
  icon={SiLibreoffice}
  content="2"
  />:""}

<ContentList
  title="Lessons"
  icon={BsBarChart}
  content={`${lessonNo}`}
  />


<ContentList
  title="Accessed by Laptop,desktop,Mobile,Tablet and etc..."
  icon={IoIosPhonePortrait}
  />
<ContentList
  title="Communicate and Asking Questions and get Answers from Your Friends"
  icon={FaArrowsDownToPeople}
  />
 </div> 
  

 
  </Container> );
}
 
export default CourseDescribeList;