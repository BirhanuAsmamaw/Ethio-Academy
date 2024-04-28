"use client"
import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

import { filterCourseData } from '@/lib/filterCourseData'
import { useSelector } from 'react-redux'
import { RooState } from '@/redux/store'
import FilterCourseCard from '../card/filterCourseCard'

interface FilteredCourseProps{
  courses:any[];
  pagination:any;
  onPageChange: (page: number) => void;
}
const FilteredCourse:React.FC<FilteredCourseProps> = ({courses,pagination,onPageChange}) => {
  const searchData=useSelector((state:RooState)=>state.search.search);
  return (
    <div className=' z-20 grid grid-cols-12 w-full'>

         <div className="col-span-3  w-full flex flex-col pl-20  items-end">


         



         <Accordion type="single" collapsible  className="w-10/12">
         {filterCourseData.map((data,index) =>{
  return  <AccordionItem key={index} value={`${index}`}>
  <AccordionTrigger>
 <h6 className='text-lg   font-semibold leading-10'>{data.name}</h6>
  </AccordionTrigger>
  
  <AccordionContent>
    <RadioGroup>
  {data.subCategory.map((cat,ind)=>{
    return <div key={ind} className="flex items-center space-x-2">
    <RadioGroupItem value={`${cat.value}`} id={`${index+ind} `} className='h-4 w-4' />
    <Label htmlFor={`${index+ind}`} className=''>{cat.name}</Label>
    </div>
  })}
  </RadioGroup>
  </AccordionContent>
</AccordionItem>
         })}
         </Accordion>
         </div>

         <div className=" col-span-6 space-y-6">
         {courses?.map((course:any)=>{
      
        return course.cover&&<FilterCourseCard
        key={course.id}
            id={course.id}
            no_reviews={course.reviews.length}
            url={course.subject.department.url}
            category={course.subject.department.departmentName}
            price={course.price}
            subject={course.course}
            rating={course?.rating??0}
            cover={course.cover.public_url} 
            subjectCat={course?.subject.subjectName}
            instructorName={course?.instructor?.accountName?course?.instructor?.accountName:course?.instructor?.user.name || ""}
            instructorTitle={course?.instructor?.title||""}
            logo={course?.instructor?.logo? course?.instructor?.logo:course.instructor?.user.image||null}
            instructorId={course?.instructorId}
             />
    
      })}

         </div>
    </div>
  )
}

export default FilteredCourse