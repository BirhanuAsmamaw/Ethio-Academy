"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { CourseType } from "@/types";
import { useRouter } from "next/navigation"
interface courseContentProps{
  course: any|null;
}
const  CourseContent:React.FC<courseContentProps>=({course})=> {
const router=useRouter();
  const onLessonRouter=(courseId:string,chapterId:string,lessonId:string)=>{
router.push(`/course/${courseId}/${chapterId}/${lessonId}`)
router.refresh()
  }

  if(!course){
    return null
  }
  return (
    <Accordion type="single" collapsible className="w-full p-1" >

      {course.chapters.map((chapter:any,index:number) =>{
        return <AccordionItem key={index} value={`${index}`}className="border   border-slate-200 dark:border-gray-600 px-2 md:px-6 m-2 rounded-[6px] ">
        <AccordionTrigger className="hover:no-underline" ><div className="flex gap-2  text-captalize  ">
         <p className="h-6 w-6 rounded-full bg-green-400  items-center text-center text-sm text-black">{index+1}</p>
         <p className="text-base">{chapter.title}</p>
          </div></AccordionTrigger>
        <AccordionContent className="bg-background">
          <ul className="">
            {chapter.lessons.map((lesson:any,ind:number)=>{
return <li onClick={()=>onLessonRouter(course.id,`${chapter.id}`,`${lesson.id}`)} className="flex text-sm gap-2  hover:underline  hover:text-teal-500  transition duration-300" key={ind}>
  <p>Lesson:{ind+1}</p>
  <p>{lesson.title}</p>
</li>
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
      })}


     
      
    </Accordion>
  )
}
export default CourseContent;