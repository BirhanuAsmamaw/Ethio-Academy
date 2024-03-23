"use client"
import Heading from "@/components/Heading/Heading";
import Button from "@/components/button/button";
import TextEditor from "@/components/editor/editor";
import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler,  useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface IParams{
  chapterId: string;
}
const Lesson = ({params}:{params:IParams}) => {
  const [isNext,setNext]=useState(false);
  const [isDisabled,setDisabled]=useState(true);
  const [description, setDescription]=useState("")
  const [isLoading,setLoading]=useState(false);
  


const router=useRouter();
  const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      title:"",
      chapterId:params.chapterId
    }
  })

  useEffect(() =>{
    setValue('content',description)
  },[description,setValue]);






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
      router.push(`dashboard/list-courses`)
      router.refresh();
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setLoading(false)
    });

  }



const onNext=()=>{
  setNext(true)

}

const onBack=()=>{
  setNext(false)

}




  return ( <><div className={`min-h-screen flex flex-col items-center gap-6 w-full ${isNext? 'opacity-0 -translate-x-[100%] hidden':'translate-x-0 opacity-100' } transition duration-300`}>
         <div className="w-full p-4">
          <Input 
          
          type={"text"} label={"title"} 
          register={register}
           errors={errors}
            id={"title"}/>
         </div>

         
        


         <div className="flex flex-col px-4 w-full  gap-1  pt-2 my-4">
            <Heading small title="Write Lesson Content"/>
          <TextEditor value={description} setValue={setDescription}/>
          </div>


          <div className="w-full py-10 px-4 flex justify-end">

<button onClick={onNext} type="button" className="text-white bg-blue-700 hover:bg-blue-800 
focus:ring-4 focus:outline-none focus:ring-blue-300 
disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed
 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
disabled={isDisabled}
>Next</button>

</div>

          

  </div>:
<div className={`bg-white dark:bg-gray-800 pb-10 min-h-screen flex flex-col items-center gap-6 w-full ${isNext? 'translate-x-0 opacity-100':'opacity-0 hidden translate-x-[100%]' }`}>
  <div className="p-4">
    <h1 className="font-bold text-lg">{dataValue.title}</h1>
  </div>
  




  <div className="p-4" dangerouslySetInnerHTML={{__html:dataValue.content}}>
  </div>

<div className="w-full py-10 px-4 gap-4 flex justify-end">

<button onClick={onBack} type="button" className="text-white bg-blue-700 hover:bg-blue-800 
focus:ring-4 focus:outline-none focus:ring-blue-300 

disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed
 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
disabled={isDisabled}
>Back</button>
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