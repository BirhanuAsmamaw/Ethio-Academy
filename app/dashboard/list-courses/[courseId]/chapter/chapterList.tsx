



"use client"

import * as React from "react"
import { GrFormView } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai"
import { Button } from "@/components/ui/button"
import { MdEditNote } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IoMdAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import Link from "next/link"
import { CourseType } from "@/types";
import ActionButton from "@/components/button/actionButton";
export function ChapterList({course}:{course:CourseType|any}) {
  if (!course){
    return <div className="p-4 font-bold text-xl">No Chapter!</div>
  }
  return (

    <Accordion type="single" collapsible className="w-fu">
      {course.chapters.map((chapter:any,index:number)=>{
        return <AccordionItem className="dark:border-b-gray-600" key={index} value={`${index}`}>
        <AccordionTrigger className="hover:no-underline">
        <h5 className="flex text-[14px] gap-2 font-medium px-2 md:px-6"><p>Chapter {index+1}: </p><p>{chapter.title}</p></h5>
        </AccordionTrigger>
        <AccordionContent>
        <div className="flex flex-col">

          <div className="p-4 flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col md:flex-row  md:gap-4">
            <ActionButton 
            label="Edit Chapter"
            url={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/edit`}
            icon={MdModeEdit}/>
            <ActionButton 
            label="Delete Chapter"
            url={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/delete`}
            icon={MdDelete}/>
            </div>
            <ActionButton 
            label="Add Lesson"
            url={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/lesson`}
            icon={IoMdAdd}/>
          </div>
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle relative">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 relative">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Lessons</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Titles</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
           {
            chapter.lessons.map((lesson:any,ind:number)=>{
              return  <tr key={ind} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Lesson: {ind+1}</td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{lesson.title}</td>
              <td className="py-2 whitespace-nowrap text-end text-sm font-medium relative">
             
             <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"><BsThreeDots size={20}/></Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 absolute right-0 top-2 bg-slate-100 dark:bg-slate-700 p-2">
        <DropdownMenuLabel>Lesson: {ind+1}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link 
           href={`/course/${course.id}/${lesson.id}`}
          className="flex no-underline gap-2 items-center text-sm"><GrFormView size={20}/> <p>View Detail</p></Link>
        </DropdownMenuItem>
        <DropdownMenuItem >
          <Link 
                href={`/dashboard/list-courses/${course.id}/chapter/${chapter.id}/lesson/${lesson.id}/add-questions`}
           className="flex no-underline gap-2 items-center text-sm"><GoQuestion size={20}/> <p>Lesson Questions</p></Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href={`/course`} className="flex no-underline gap-2 items-center text-sm"><MdEditNote size={20}/> <p>Edit Lesson</p></Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href={`/course`} className="flex no-underline gap-2 items-center text-sm"><MdEditDocument size={20}/> <p>Edit Lesson Files</p></Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
        <Link href={`/course`} className="flex no-underline gap-2 items-center text-sm"><AiOutlineDelete size={20}/> <p>Delete Lesson</p></Link>

        </DropdownMenuItem>
        
       
      </DropdownMenuContent>
    
    </DropdownMenu>
            
              </td>
            </tr>
            })
           }

           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </AccordionContent>
      </AccordionItem>
      
      })}
    </Accordion>
  )
}