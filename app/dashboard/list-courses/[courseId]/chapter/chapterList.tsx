"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CourseType } from "@/types";
import Link from "next/link";

const ChapterList = ({course}:{course:CourseType}) => {
  
  if (!course){
    return <div className="p-4 font-bold text-xl">No Chapter!</div>
  }

  return (<div className="flex flex-col p-2 gap-10 ">
     <h1 className="text-lg font-semibold">Course Lists</h1>
      <Accordion type="single" collapsible className="w-full">
 {course.chapters.map((chapter:any)=>{
  return  <AccordionItem className="border-none" key={chapter.id} value={`${chapter.id}`}>
  <AccordionTrigger className="hover:no-underline"><h5 className="text-[14px] text-gray-700 dark:text-gray-400 font-normal">{chapter.title}</h5></AccordionTrigger>
  <AccordionContent>
    <div className="flex justify-end gap-2">
    <Link className="no-underline 
    text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
    border
    text-sm
     rounded-[10px] 
     px-3 py-1 
     border-gray-200
     dark:border-gray-700
     
     "
      href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/edit`}>Edit</Link>

<Link className="no-underline 
text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
    border
    text-sm
     rounded-[10px] 
     px-3 py-1 
     border-gray-200
     dark:border-gray-700
   
     "
      href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/delete`}>Delete</Link>

    </div>


  {chapter.lessons.length?<div>
    <div className="py-4">
<Link  href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/lesson`}
 className="no-underline relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-[10px] group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Add Lesson
</span>
</Link>


</div>
    
        {chapter.lessons.map((lesson:any)=>{
          return <div key={lesson.id} className="flex flex-col gap-1">
          <Link 
                className="px-2 no-underline text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/lesson/${lesson.id}/add-questions`}>Questions list</Link>
          <Link
          className="px-2 no-underline text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
           href={`course/${course.id}/${lesson.id}`}  >{lesson.title}</Link></div>
        })}
      </div>:<div className="py-4">
<Link  href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/lesson`}
 className=" no-underline relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-[10px] group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Add Lesson
</span>
</Link>


</div>
 }
      
  
  </AccordionContent>
</AccordionItem>
 })}

</Accordion></div> );
}
 
export default ChapterList;