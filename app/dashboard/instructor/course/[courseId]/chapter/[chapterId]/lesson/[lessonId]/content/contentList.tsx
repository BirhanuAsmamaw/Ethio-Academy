"use client"

import React, { useState } from 'react'
import UpdateContent from './update/updateContent'
import DeleteContent from './delete/deleteContent'
import UpdateContentImage from './update/updateContentImage'
import Image from 'next/image'
import ClearContent from './delete/clearContent'
import ClearContentImage from './delete/clearContentImage'
import CodeHighlighterComponent from '@/components/codeHighlighter'
import CreateContent from './add/createContent'
import AddButton from '@/components/button/addButton'

interface ContentListProps{
  lesson:any
  
}
const ContentList:React.FC<ContentListProps> = ({lesson}) => {
  const [contentId,setContentId]=useState("")
  

  const onAdd=(data:string)=>{
    if(!contentId){
      setContentId(data)
    }
    else{
      setContentId("")
    }
  }
  if (!lesson?.contents?.length){
    return <div className="">No lesson Contents Found!</div>
  }


  return (<div className='flex flex-col gap-4 w-full'>
   {lesson?.contents?.filter((c:any)=>!c.parentId).map((content:any) =>{
    return  <div key={content?.id}  className="p-4 relative w-full bg-white pl-6 pb-20 dark:bg-gray-800 hover:border-2 rounded-[10px] hover:border-sky-400 hover:border-dashed  transition duration-300 group">


      <div className="hidden  z-30 group-hover:block  absolute  left-2 bottom-2  w-full">
 <div className="flex justify-start md:justify-center gap-2 md:gap-10 w-full">
 
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

      {content?<div className=" z-30 absolute bottom-2 right-2 flex justify-end gap-4 p-2">
        <AddButton isAdd={contentId===content?.id} label='' onAddButton={()=>onAdd(content?.id)}/>
     <DeleteContent content={content}/>
     
      </div>:""}
      
      {content?.content?<div  
      className="" 
      dangerouslySetInnerHTML={{__html:content.content}}></div>:""}

{content?.codeExample?<div className="flex w-full justify-start mt-10">
  <CodeHighlighterComponent codeString={content?.codeExample.code} language={content?.codeExample.language}/>
  </div>:""}



      {content?.image?<div className="relative ">
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

    











{/* SUBCONTENTS LIST */}

{content?.subContents&&content?.subContents.length? content?.subContents?.map((content:any) =>{
    return  <div key={content?.id}  className="pt-10 pb-16 my-4 relative w-full bg-white   dark:bg-gray-800 hover:border-2 rounded-[10px] hover:border-sky-400 hover:border-dashed  transition duration-300 group">


      <div className="hidden  z-30 group-hover:block  absolute  left-2 bottom-2  w-full">
 <div className="flex justify-start md:justify-center gap-2 md:gap-10 w-full">
 
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

      {content?<div className=" z-30 absolute bottom-2 right-2 flex justify-end gap-4 p-2">
       
     <DeleteContent content={content}/>
     
      </div>:""}
      
      {content?.content?<div  
      className="" 
      dangerouslySetInnerHTML={{__html:content.content}}></div>:""}

{content?.codeExample?<div className="flex w-full justify-start mt-10">
  <CodeHighlighterComponent codeString={content?.codeExample.code} language={content?.codeExample.language}/>
  </div>:""}



      {content?.image?<div className="relative ">
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



   }):""}




{contentId===content?.id?<div className="border-y-2 p-1 md:p-6 flex justify-center w-full my-10 border-double bg-slate-50 dark:bg-gray-700 dark:border-gray-500">
      <CreateContent lesson={lesson} contentId={content?.id}/>
      </div>:""}




    </div>



   })}
  </div>
 
  )
}

export default ContentList