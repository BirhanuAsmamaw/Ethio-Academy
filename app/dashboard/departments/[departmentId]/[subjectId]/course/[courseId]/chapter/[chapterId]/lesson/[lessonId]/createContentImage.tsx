"use client"
import FileUploader from '@/components/input/fileUploader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import axios from 'axios'

import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'
import {  IoMdAdd } from 'react-icons/io'

interface  CreateContentImageProps{
  lesson:any
}
const CreateContentImage:React.FC<CreateContentImageProps> = ({lesson}) => {
  const router=useRouter();
 
  
 
  const oncontentimageComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    const imageData={
      public_key:key,
      public_url:url
    }

   axios.post(`/api/content`,{image:imageData, lessonId:lesson.id}).then(()=>{
    router.push(`/dashboard/departments/${lesson?.chapter?.course.subject.departmentId}/${lesson?.chapter?.course.subjectId}/course/${lesson?.chapter.courseId}/chapter/${lesson?.chapter.id}/lesson/${lesson?.id}/update-content`)
    router.refresh();
    toast.success("Lesson content image uploaded successfully")
    }).catch((error)=>{
  
      toast.error(error.message);
    });
   
  }




  return ( <Dialog>
      <DialogTrigger asChild>
      <Button
      variant="ghost"
    className="py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center"><IoMdAdd size={24}/> <p>Lesson</p></Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FileUploader
          onClientUploadComplete={oncontentimageComplete}
          label="Upload content image"
            endpoint="imageUploader"
            mediaType="image"
          />
      <DialogFooter>
        <DialogClose>
          <Button variant="destructive">Close</Button>
        </DialogClose>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  
  

  )
}

export default CreateContentImage