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
  return  <AccordionItem key={chapter.id} value="item-1">
  <AccordionTrigger><h5 className="text-[14px] text-gray-700 dark:text-gray-400">{chapter.title}</h5></AccordionTrigger>
  <AccordionContent>
    <div className="flex justify-end gap-2">
    <Link className="no-underline 
    border
    text-sm
     rounded-[10px] 
     px-3 py-1 
     border-gray-200
     dark:border-gray-700
     hover:bg-gray-200
     hover:dark:bg-gray-600
     "
      href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/edit`}>Edit</Link>

<Link className="no-underline 
    border
    text-sm
     rounded-[10px] 
     px-3 py-1 
     border-gray-200
     dark:border-gray-700
     hover:bg-gray-200
     hover:dark:bg-gray-600
     "
      href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/delete`}>Delete</Link>
    </div>


   <div className="">
    { <Link className="no-underline 
    border
    text-sm
     rounded-[10px] 
     px-3 py-1 
     border-gray-200
     dark:border-gray-700
     hover:bg-gray-200
     hover:dark:bg-gray-600
     "
      href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/lesson`}>Add Lesson</Link>}
   </div>
  </AccordionContent>
</AccordionItem>
 })}

</Accordion></div> );
}
 
export default ChapterList;