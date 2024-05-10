"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { filterCourseData } from '@/lib/filterCourseData'
import { setPrice, setRating } from '@/redux/features/search/searchSlice'
import { RooState } from '@/redux/store'
import StarOutlined from '@mui/icons-material/StarOutlined'
import { Rating } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const FilteredBar = () => {

  const dispatch=useDispatch();
  const [rating,setRatingData]=useState<string>('')
  const [price,setPriceData]=useState<string>('')

  useEffect(()=>{
    dispatch(setRating({rating:rating}))
  },[rating])

  useEffect(()=>{
    dispatch(setPrice({price:price}))
  },[price])


  const onHandleRateChange=(value:string) => {

    setRatingData(value);
   
  }
  
  const onHandlePriceChange=(value:string) => {
   
    setPriceData(value);
    
  }
  return (  <div className="col-span-3 pt-20  w-full flex flex-col pl-20  items-end">
 <Accordion type="multiple" defaultValue={['0']} className="w-10/12">
    {filterCourseData.map((data,index) =>{
return  <AccordionItem key={index} value={`${index}`}>
<AccordionTrigger>
<h6 className='text-lg   font-semibold leading-10'>{data.name}</h6>
</AccordionTrigger>

<AccordionContent>
<RadioGroup onValueChange={data.name==="Rating"?onHandleRateChange:onHandlePriceChange}>
{data.subCategory.map((cat,ind)=>{
return <div key={ind} className="flex items-center space-x-2">
<RadioGroupItem value={`${cat.value}`} 



id={`${index+ind} `} className='h-4 w-4' />
{data.name==="Rating"?<Rating 
 precision={0.5} 
 readOnly value={cat.value} 
 size="small"
 emptyIcon={
   <StarOutlined fontSize="inherit" className="text-gray-300 dark:text-gray-600" />
 }
 />:""}
<Label htmlFor={`${index+ind}`} className=''>{cat.name}</Label>
</div>
})}
</RadioGroup>
</AccordionContent>
</AccordionItem>
    })}
    </Accordion> </div>
  )
}

export default FilteredBar