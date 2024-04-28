"use client"
import React from 'react'
import { RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Accordion, AccordionItem } from '../ui/accordion'
import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion'
import { filterCourseData } from '@/lib/filterCourseData'
import { useSelector } from 'react-redux'
import { RooState } from '@/redux/store'

const FilteredCourse = () => {
  const searchData=useSelector((state:RooState)=>state.search.search);
  return (
    <div className=' grid grid-cols-12'>

         <div className="col-span-4 bg-green-400 px-20">
          <h1 className='text-lg font-semibold leading-6 p-4'>{searchData}</h1>
         <Accordion type="single" collapsible  className="w-full">
         {filterCourseData.map((data,index) =>{
  return  <AccordionItem key={index} value='1'>
  <AccordionTrigger>
 <h6 className='text-lg  font-semibold leading-6'>{data.name}</h6>
  </AccordionTrigger>
  <AccordionContent>
  {data.subCategory.map((cat,ind)=>{
    return <div key={ind} className="flex items-center space-x-2">
    <RadioGroupItem value={`${cat.value}`} id={`${index+ind}`} />
    <Label htmlFor={`${index+ind}`}>{cat.name}</Label>
    </div>
  })}
  </AccordionContent>
</AccordionItem>
         })}
         </Accordion>
         </div>

         <div className=" col-span-6 space-y-6">
          <div className="bg-white border rounded-[10px] h-[200px] w-full">Course Title</div>
          <div className="bg-white border rounded-[10px] h-[200px] w-full">Course Title</div>
          <div className="bg-white border rounded-[10px] h-[200px] w-full">Course Title</div>
          <div className="bg-white border rounded-[10px] h-[200px] w-full">Course Title</div>
          <div className="bg-white border rounded-[10px] h-[200px] w-full">Course Title</div>
          <div className="bg-white border rounded-[10px] h-[200px] w-full">Course Title</div>

         </div>
    </div>
  )
}

export default FilteredCourse