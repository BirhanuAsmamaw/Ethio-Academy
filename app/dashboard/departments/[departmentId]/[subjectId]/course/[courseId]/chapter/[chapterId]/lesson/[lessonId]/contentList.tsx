"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import UpdateContent from './updateContent'
import DeleteContent from './deleteContent'


interface ContentListProps{
  lesson:any
}
const ContentList:React.FC<ContentListProps> = ({lesson}) => {
  if (!lesson?.contents?.length){
    return <div className="">No lesson Contents Found!</div>
  }
  return (<div className='flex flex-col gap-4'>
   {lesson?.contents?.map((content:any) =>{
    return  <div key={content?.id}  className="p-4 relative w-full bg-white dark:bg-gray-800 hover:border-2 rounded-[10px] hover:border-sky-400 hover:border-dashed  transition duration-300 group">
      <div className="hidden  group-hover:block  absolute left-[10%] top-[25%]  w-full">
 <div className="flex justify-center gap-10">
<UpdateContent content={content}/>
<DeleteContent content={content}/>
 </div>
      </div>
      <div  className="" dangerouslySetInnerHTML={{__html:content.content}}></div>
    </div>
   })}
  </div>
 
  )
}

export default ContentList