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
    return  <div key={content?.id} className="p-4 hover:border" dangerouslySetInnerHTML={{__html:content?.content}}></div>
   })}
  </div>
 
  )
}

export default ContentList