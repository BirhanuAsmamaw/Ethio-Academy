"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CourseType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const ChapterList = ({courseId}:{courseId:string}) => {
  const [course,setCourse]=useState<CourseType|any>()


  useEffect(()=>{
    async function fetchData() {
      try{
        const response=await axios.get(`/api/course/${courseId}`)
        setCourse(response.data);
      }

      catch(error){

      }
    }
    fetchData();
    
  },[courseId])

  if (!course.chapter){
    return <div>No Chapter!</div>
  }

  return ( <Accordion type="single" collapsible className="w-full">
 {course.chapters.map((chapter:any)=>{
  return  <AccordionItem key={chapter.id} value="item-1">
  <AccordionTrigger>{chapter.title}</AccordionTrigger>
  <AccordionContent>
    <p>list of lessons</p>
  </AccordionContent>
</AccordionItem>
 })}

</Accordion> );
}
 
export default ChapterList;