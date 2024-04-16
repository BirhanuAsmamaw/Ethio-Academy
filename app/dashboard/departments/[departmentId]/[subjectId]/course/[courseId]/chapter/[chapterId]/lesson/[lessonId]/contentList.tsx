"use client"
import { Button } from '@/components/ui/button'
import React from 'react'


interface ContentListProps{
  lesson:any
}
const ContentList:React.FC<ContentListProps> = ({lesson}) => {
  if (!lesson?.contents?.length){
    return <div className="">No lesson Contents Found!</div>
  }
  return (<div className='flex flex-col gap-4'>
   {lesson?.contents?.map((content:any) =>{
    return  <div key={content?.id}  className="p-4 relative w-full bg-white dark:bg-gray-800 hover:border-2 hover:border-sky-400 hover:border-dashed  transition duration-300 group">
      <div className="hidden  group-hover:block  absolute left-[40%] top-[50%]  w-full">
 <div className="flex justify-center gap-10">
<Button>Edit</Button>
<Button>Delete</Button>
 </div>
      </div>
      <div  className="" dangerouslySetInnerHTML={{__html:content.content}}></div>
    </div>
   })}
  </div>
 
  )
}

export default ContentList