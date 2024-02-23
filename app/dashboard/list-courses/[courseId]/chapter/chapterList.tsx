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
    return <div>No Chapter!</div>
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


  {chapter.lessons?<div>
        {chapter.lessons.map((lesson:any)=>{
          return <Link
          className="px-2 no-underline text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
           href={`course/${course.id}/${lesson.id}`} key={lesson.id} >{lesson.title}</Link>
        })}
      </div>:<Link className="no-underline 
    border
    text-sm
     rounded-[10px] 
     px-3 py-1 
     border-gray-200
     dark:border-gray-700
    
     text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
     "
      href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/lesson`}>Add Lesson</Link>
 }
      
  
  </AccordionContent>
</AccordionItem>
 })}

</Accordion></div> );
}
 
export default ChapterList;