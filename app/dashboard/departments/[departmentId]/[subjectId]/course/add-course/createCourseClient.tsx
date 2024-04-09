"use client"
import Heading from "@/components/Heading/Heading";
import Button from "@/components/button/button";
import Container from "@/components/container/container";
import TextEditor from "@/components/editor/editor";
import Input from "@/components/input/input";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm ,SubmitHandler} from "react-hook-form";
import toast from "react-hot-toast";





interface CreateCourseClientProps{
  subject:any| null;
}

const CreateCourseClient:React.FC<CreateCourseClientProps> = ({subject}) => {
const [requirement, setRequirement]=useState("")
const [description, setDescription]=useState("")
const [courseUsers, setCourseUsers]=useState("")
const [isnext, setIsNext]=useState(false)
const [isLoading, setIsLoading]=useState(false)



const router=useRouter()
  const {register,setValue,handleSubmit,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      price:0,
     subjectId:subject.id,
     course:''}})



 const courseData=getValues();


  useEffect(() =>{
    setValue('descriptions',description)
    setValue('requirements',requirement)
    setValue('whoShouldTake',courseUsers)
  },[description,requirement,courseUsers,setValue]);





  const onNextButton=()=>{setIsNext((prev)=>!prev)}





  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    
  const course={...data,subjectId:subject.id}
    axios.post('/api/course',course).then(()=>{
      router.push(`/dashboard/departments/${subject?.department?.id}/${subject?.id}`)
      toast.success("Course created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }





  
  return ( <div className="flex flex-col w-full  ">
   
    <div className="flex flex-col gap-10 w-full pb-6 mb-10">

      {!isnext&&<Container
      childern={
        <div className="flex flex-col gap-10 w-full  lg:mt-20   justify-center items-center p-2">
       <div className="py-5">
       <Heading title={`Add ${subject?.subjectName} Course  in ${subject?.department?.departmentName}`}/>
       </div>

          
       <div className="w-full  lg:w-8/12 flex flex-col md:flex-row px-4  gap-10 justify-between">

       <div className="w-full  ">
            <Input id="course" register={register} errors={errors}  label="Write Course Name" type="text" required/>
            </div>


        


        
        <div className="w-full ">
          <Input register={register} errors={errors} label="Price" type="number" id="price" required/>
          </div>
       </div>
          
         

       
        
          
          <div className="flex flex-col px-4 w-full gap-1 my-4 lg:w-8/12">
            <Heading small title="Add Course Description"/>
          <TextEditor value={description} setValue={setDescription}/>
          </div>

          <div className="flex flex-col px-4 w-full gap-1 my-4 lg:w-8/12">
            <Heading small title="Add Course Requiremnts"/>
          <TextEditor value={requirement} setValue={setRequirement}/>
          </div>
        

          <div className="flex flex-col px-4 w-full  gap-1  pt-2 my-4 lg:w-8/12">
            <Heading small title="Add who use This Course"/>
          <TextEditor value={courseUsers} setValue={setCourseUsers}/>
          </div>

          <div className="p2 flex justify-end  mx-20 lg:p-20">
            <Button className="bg-teal-400 text-sm  hover:bg-teal-500"  onClick={onNextButton} title="Next"/>
          </div>
        </div>
      }
    />}

    {
      isnext&&<Container
      childern={
        <div className="flex flex-col gap-10 p-2">
 <Heading title={courseData?.course}/>

 <div className="flex flex-col gap-2 p-2">
 <Heading title="About Course"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.descriptions }}></div>

 </div>

 
 <div className="flex flex-col gap-2 p-2">
 <Heading title="Course Requirement"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.requirements }}></div>

 </div>


 <div className="flex flex-col gap-2 p-2">
 <Heading title="Who Use This Course?"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.whoShouldTake}}></div>

 </div>
 

 <div className="p-4 flex justify-end  mx-20 lg:p-20">
<div className="flex gap-2">

<Button className="bg-teal-400 text-sm  hover:bg-teal-500"  onClick={onNextButton} title="Back"/>
<Button className="bg-teal-400 text-sm  hover:bg-teal-500"  onClick={handleSubmit(onSubmit)} title={isLoading? "Loading...":"Submit"}/>
</div> </div>





        </div>
      }
      />
    }



    </div>
  </div> );
}
 
export default CreateCourseClient;