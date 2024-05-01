"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { usePathname, useRouter } from "next/navigation"

interface courseContentProps{
  course: any|null;
}
const  CourseContent:React.FC<courseContentProps>=({course})=> {
const router=useRouter();
const pathName=usePathname()

  const onLessonRouter=(courseId:string,chapterId:string,lessonId:string)=>{
router.push(`/course/${courseId}/${chapterId}/${lessonId}`)
router.refresh()
  }

 const chapterId=pathName?.split("/")[3]||'0'


  if(!course){
    return null
  }

 
    
 
  return (<Accordion type="multiple" defaultValue={[chapterId]}  className="w-full p-1" >

      {course.chapters.map((chapter:any,index:number) =>{
        return <AccordionItem key={index} value={chapter.id}className="border bg-background   w-full  border-slate-200 dark:border-gray-600 px-2 md:px-6 m-2 rounded-[6px] ">
        <AccordionTrigger className="hover:no-underline w-full" ><div className="flex gap-2  w-full text-capitalize  ">
         <p className="h-5 w-5 rounded-full bg-green-400  items-center text-center text-sm text-black">{index+1}</p>
        
         <p className="text-base">{chapter.title}</p>
          </div></AccordionTrigger>
        <AccordionContent className="bg-background w-full">
          <ul className="">
            {chapter.lessons.map((lesson:any,ind:number)=>{
return <li onClick={()=>onLessonRouter(course.id,`${chapter.id}`,`${lesson.id}`)} className={`flex text-sm gap-2  hover:underline  hover:text-teal-500  transition duration-300
${pathName===`/course/${course.id}/${chapter.id}/${lesson.id}`&&'text-blue-500 dark:text-green-400 font-semibold'}
`} key={ind}>
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