import React from 'react'
import UpdateSubjectContent from './content';
import UpdateSubjectFile from './file';



interface EditsubjectProps{
  subject:any;
}
const EditSubjectComponent:React.FC<EditsubjectProps> = async({subject}) => {
  
  return (<div className="min-h-screen w-full flex justify-center items-center">

     <div className="w-full lg:w-11/12 xl:px-20 xl:8/12 flex flex-col gap-6 items-center">
      <UpdateSubjectContent subject={subject}/>
      <UpdateSubjectFile subject={subject}/>
     </div>
  </div>
  )
}

export default EditSubjectComponent