"use client"

import React from 'react'
import UpdateContent from './updateContent'
import DeleteContent from './deleteContent'
import UpdateContentImage from './updateContentImage'
import Image from 'next/image'
import ClearContent from './clearContent'
import ClearContentImage from './clearContentImage'


interface ContentListProps{
  lesson:any
  
}
const ContentList:React.FC<ContentListProps> = ({lesson}) => {
  if (!lesson?.contents?.length){
    return <div className="">No lesson Contents Found!</div>
  }
  return (<div className='flex flex-col gap-4 w-full'>
   {lesson?.contents?.map((content:any) =>{
    return  <div key={content?.id}  className="p-4relative w-full bg-white dark:bg-gray-800 hover:border-2 rounded-[10px] hover:border-sky-400 hover:border-dashed  transition duration-300 group">
      <div className="hidden  z-30 group-hover:block  absolute  right-4  top-2  w-full">
 <div className="flex justify-center gap-10 w-full">
 
 {!content?.image?<UpdateContentImage 
 isAdd
 content={content} 
 departmentId={lesson?.chapter.course.subject.departmentId} 
 subjectId={lesson?.chapter.course.subjectId } 
 courseId={lesson?.chapter.courseId} 
 chapterId={lesson?.chapterId}/>:""}

{content.content?<UpdateContent content={content}/>:""}
{content.content?<ClearContent content={content}/>:""}
 </div>
      </div>

      {content?<div className=" z-30 absolute bottom-2 right-2 flex justify-center p-2">
     <DeleteContent content={content}/>
      </div>:""}
      
      {content?.content?<div  
      className="" 
      dangerouslySetInnerHTML={{__html:content.content}}></div>:""}
      {content?.image?<div className="relative w-full flex justify-center">
        <div className="absolute z-30 top-2 left-2 flex gap-2">
        {content?.image?<UpdateContentImage 
 content={content} 
 departmentId={lesson?.chapter.course.subject.departmentId} 
 subjectId={lesson?.chapter.course.subjectId } 
 courseId={lesson?.chapter.courseId} 
 chapterId={lesson?.chapterId}/>:""}
 {!content.content?<UpdateContent isAdd content={content}/>:""}
{content.image?<ClearContentImage 
content={content} 
departmentId={lesson?.chapter.course.subject.departmentId} 
 subjectId={lesson?.chapter.course.subjectId } 
 courseId={lesson?.chapter.courseId} 
 chapterId={lesson?.chapterId}/>:""}
        </div>
        <Image height={400} width={500} src={ content?.image?.public_url} alt='content Image'/>
      </div>:""}
    </div>
   })}
  </div>
 
  )
}

export default ContentList