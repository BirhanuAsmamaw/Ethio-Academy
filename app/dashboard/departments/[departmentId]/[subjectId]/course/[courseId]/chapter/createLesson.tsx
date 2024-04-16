"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { FieldValues, SubmitHandler,  useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosSend, IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";

interface LessonProps{
  chapterId: string;
}
const CreateLesson:React.FC<LessonProps> = ({chapterId}) => {


  const [isLoading,setLoading]=useState(false);
  


const router=useRouter();
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      title:"",
      chapterId:chapterId
    }
  })

 












  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setLoading(true)
    

  const lessonData={...data}
 
    axios.post('/api/lesson',lessonData).then(()=>{
      toast.success("Lesson created successfully")
    
      router.refresh();
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setLoading(false)
    });

  }








  return ( <Dialog>
      <DialogTrigger asChild>
      <Button
    className="py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center"><IoMdAdd size={24}/> <p>Lesson</p></Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Chapter Lesson</DialogTitle>
       
        </DialogHeader>
        <div className="flex w-full justify-center gap-1">
      
      <div className="w-8/12">
      <Input
      
      id="title"
      label="Add Lesson Title"
      required
      register={register}
      errors={errors}
      disabled={isLoading}
      type="text"
      />
      </div>
       <div className="flex pt-4 justify-center  items-center">
      <button onClick={handleSubmit(onSubmit)} className="text-gray-500 dark:text-gray-400 font-bold hover:text-blue-500 hover:dark:text-blue-400 transition  duration-300"><IoIosSend size={40}/></button>
       </div>
      </div>
      <DialogFooter>
        <DialogClose>
          <Button variant="destructive">Close</Button>
        </DialogClose>
      </DialogFooter>
      </DialogContent>
    </Dialog>
         
);
}
 
export default CreateLesson;