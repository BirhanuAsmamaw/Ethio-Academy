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
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import AddButton from "@/components/button/addButton";
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
      <AddButton label="Add Lesson"/>
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