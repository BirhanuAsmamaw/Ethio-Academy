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

 
    
 
  return (<Accordion type="multiple" defaultValue={[chapterId]}  className="w-full " >

      {course.chapters.map((chapter:any,index:number) =>{
        return <AccordionItem key={index} value={chapter.id}className="border my-2   bg-white dark:bg-transparent  w-full  border-slate-200 dark:border-gray-600 px-2 md:px-6  rounded-[6px] ">
        <AccordionTrigger className="hover:no-underline w-full" ><div className="flex gap-1 text-start w-full text-capitalize  ">
         <span className="h-5 w-5 rounded-full bg-green-400 mt-2  items-center text-center text-sm text-black">{index+1}</span>
        
         <span className="text-[14px]">{chapter.title}</span>
          </div></AccordionTrigger>
        <AccordionContent className=" w-full p-0">
          <ul className="list-none p-0">
            {chapter.lessons.map((lesson:any,ind:number)=>{
return <li onClick={()=>onLessonRouter(course.id,`${chapter.id}`,`${lesson.id}`)} className={`text-sm  hover:underline  hover:text-teal-500  space-x-2 transition duration-300 text-[12px]
${pathName===`/course/${course.id}/${chapter.id}/${lesson.id}`&&'text-blue-500 dark:text-green-400 font-semibold'} text-start p-0
`} key={ind}>
  <span className="leading-6 font-medium">Lesson:{ind+1}</span>
  <span>{lesson.title}</span>
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