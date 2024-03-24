"use client"
import { BsBarChart } from "react-icons/bs";
import { SiLibreoffice } from "react-icons/si";
import { IoPeopleOutline } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import { useCart } from "@/hooks/use.cart";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { CiCircleQuestion } from "react-icons/ci";
import ShareSocialMedia from "@/components/ShareSocial";
import { useEffect, useState } from "react";

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
    <div className="flex gap-4 justify-between  text-base text-gray-500 dark:text-gray-400  border-y border-gray-200 dark:border-gray-700  px-2 mx-2 py-2">
      <div className="flex gap-2"><Icon size={24}/>
      <p>{title}</p></div>
      <p className="font-medium text-rose-600 dark:text-green-400 ">{content}</p>

    </div>
  )
}












const CourseDescribeList:React.FC<CourseDescriptionListprops> = ({course}) => {


  const [lessonNo,setLessonNo]=useState(0)

 
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
  addToCart(course)
  router.push('/cart')
}

const onPayment=()=>{
  addToCart(course)
  router.push('/payment')
}
  return ( <div className="
  shadow-lg
  rounded-[5px]
  flex
   flex-col overflow-y-auto 
  overflow-x-hidden  
    bg-white dark:bg-gray-800">
<div className="flex justify-end items-center p-6">


<ShareSocialMedia url={`https://ethio-exams-academy.vercel.app/course/${course.id}`}/>

</div>
    <div className="p-2 flex justify-end gap-6">
      <button 
      onClick={onAddToCart}
      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
       >Add to cart</button>
      <button

      onClick={onPayment}
      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >Buy Now!!</button>
    </div>
  <h5 className="px-2 text-lg font-medium text-gray-500 dark:text-gray-400">Course Content</h5>
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
  icon={IoPeopleOutline}
  />
 </div> 
  

 
  </div> );
}
 
export default CourseDescribeList;