"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CourseType } from "@/types";

const ChapterList = ({course}:{course:CourseType}) => {
  
  if (!course){
    return <div>No Chapter!</div>
  }

  return (<div className="flex gap-20 ">
     <h1 className="text-lg font-semibold">Course Lists</h1>
      <Accordion type="single" collapsible className="w-full">
 {course.chapters.map((chapter:any)=>{
  return  <AccordionItem key={chapter.id} value="item-1">
  <AccordionTrigger>{chapter.title}</AccordionTrigger>
  <AccordionContent>
    <p>list of lessons</p>
  </AccordionContent>
</AccordionItem>
 })}

</Accordion></div> );
}
 
export default ChapterList;