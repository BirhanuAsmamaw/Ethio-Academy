"use client"

import React from 'react'
import UpdateContent from './updateContent'
import DeleteContent from './deleteContent'
import UpdateContentImage from './updateContentImage'
import Image from 'next/image'


interface ContentListProps{
  lesson:any
  
}
const ContentList:React.FC<ContentListProps> = ({lesson}) => {
  if (!lesson?.contents?.length){
    return <div className="">No lesson Contents Found!</div>
  }
  return (<div className='flex flex-col gap-4 w-full'>
   {lesson?.contents?.map((content:any) =>{
    return  <div key={content?.id}  className="p-4 relative w-full bg-white dark:bg-gray-800 hover:border-2 rounded-[10px] hover:border-sky-400 hover:border-dashed  transition duration-300 group">
      <div className="hidden  group-hover:block  absolute left-[10%] top-[25%]  w-full">
 <div className="flex justify-center gap-10 w-full">
 
 {!content?.image?<UpdateContentImage 
 content={content} 
 departmentId={lesson?.chapter.course.subject.departmentId} 
 subjectId={lesson?.chapter.course.subjectId } 
 courseId={lesson?.chapter.courseId} 
 chapterId={lesson?.chapterId}/>:""}

{content.content?<UpdateContent content={content}/>:""}
{content.content?<DeleteContent content={content}/>:""}
 </div>
      </div>
      {content?.content?<div  
      className="" 
      dangerouslySetInnerHTML={{__html:content.content}}></div>:""}
      {content?.image?<div className="relative">
        <div className="absolute top-2 left-2 flex gap-2">
        {content?.image?<UpdateContentImage 
 content={content} 
 departmentId={lesson?.chapter.course.subject.departmentId} 
 subjectId={lesson?.chapter.course.subjectId } 
 courseId={lesson?.chapter.courseId} 
 chapterId={lesson?.chapterId}/>:""}
 {!content.content?<UpdateContent content={content}/>:""}
{!content.content?<DeleteContent content={content}/>:""}
        </div>
        <Image height={400} width={500} src={ content?.image?.public_url} alt='content Image'/>
      </div>:""}
    </div>
   })}
  </div>
 
  )
}

export default ContentList