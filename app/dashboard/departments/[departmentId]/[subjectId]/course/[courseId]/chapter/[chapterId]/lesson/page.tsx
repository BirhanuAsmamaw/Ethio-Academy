"use client"
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler,  useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
interface IParams{
  chapterId: string;
}
const Lesson = ({params}:{params:IParams}) => {

  const [isDisabled,setDisabled]=useState(true);
  const [isLoading,setLoading]=useState(false);
  


const router=useRouter();
  const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      title:"",
      chapterId:params.chapterId
    }
  })

 





const dataValue=getValues();


  useEffect(() =>{
    if(!dataValue.title || !dataValue.content || !dataValue.chapterId ){
      setDisabled(true);
    }
    else{
      setDisabled(false);
    }
  },[dataValue.title,dataValue.content,dataValue.chapterId])








  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setLoading(true)
    

  const lessonData={...data}
 
    axios.post('/api/lesson',lessonData).then(()=>{
      toast.success("Course created successfully")
      router.push(`/dashboard/list-courses`)
      router.refresh();
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setLoading(false)
    });

  }








  return ( <><div className={`min-h-screen flex flex-col items-center gap-6 w-full transition duration-300`}>



         <div className="flex w-full justify-center gap-1">
      
      <div className="w-8/12">
      <Input
      
      id="title"
      label="Add Chapter Title"
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

         
        


         


          <div className="w-full py-10 px-4 flex justify-end">

          <Button 
            isDisabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            title={isLoading ? "Loading..." : "Submit"}
            />

</div>

          

  </div>



   </>);
}
 
export default Lesson;