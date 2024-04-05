

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



interface  EditCourseClientProps{
  course:any;
}

const EditCourseClient:React.FC<EditCourseClientProps>= ({course}) => {
const [requirement, setRequirement]=useState<string|null>(null)
const [description, setDescription]=useState<string|null>(null)
const [courseUsers, setCourseUsers]=useState<string|null>(null)
const [isnext, setIsNext]=useState(false)
const [isLoading, setIsLoading]=useState(false)
const router=useRouter();



  const {register,setValue,handleSubmit,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
     
      subject:course.subject,
      price:course.price,
      }})

    
      

 const courseData=getValues();


  useEffect(() =>{
    setValue('descriptions',description)
    setValue('requirements',requirement)
    setValue('whoShouldTake',courseUsers)
   
  },[description, requirement, courseUsers]);





  const onNextButton=()=>{setIsNext((prev)=>!prev)}

  





  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
   
   
console.log("data",data);
  
    axios.put(`/api/course/${course.id}/update/content`,data).then(()=>{
      router.push("/dashboard/list-courses")
      toast.success("Course updated successfully")
    })
    .catch((error)=>{
      console.log(error)
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }




  return ( <div className="flex flex-col w-full  ">
   
    <div className="flex flex-col gap-10 w-full pb-6 mb-10">
    <div className="space-y-2 w-full flex flex-col items-center">

    <h1 className="text-xl font-semibold">{course.subject} Contents</h1>
    </div>
      
      {!isnext&&<Container
      childern={
        <div className="flex flex-col gap-10 w-full  lg:mt-20   justify-center items-center p-2">
       <div className="py-5">
       <Heading title="Update Course"/>
       </div>
          <div className="w-full  lg:w-8/12">
            {/* <Select
          defaultValue={ courseData.category? courseData.category:course.category}
          id="category"
          register={register}
          errors={errors}

          /> */}
          
          
          </div>
          <div className="w-full  lg:w-8/12">
            <Input id="subject"  defaultValue={courseData.subject? courseData.subject:course.subject} register={register} errors={errors}  label="Subject" type="text" required/></div>





        
        <div className="lg:w-8/12">
          <Input 
          defaultValue={`${courseData.price? courseData.price:course.price}`}
          register={register} errors={errors} label="Price" type="number" id="price" required/>
          </div>
          
         

       
        
          
          <div className="flex flex-col px-4 w-full gap-1 my-4">
            <Heading small title="Update Course Description"/>
       
          <TextEditor  value={description? description:course.descriptions} setValue={setDescription}/>
          </div>

          <div className="flex flex-col px-4 w-full gap-1 my-4">
            <Heading small title="Update Course Requiremnts"/>
          <TextEditor value={requirement? requirement:course.requirements} setValue={setRequirement}/>
          </div>
        

          <div className="flex flex-col px-4 w-full  gap-1  pt-2 my-4">
            <Heading small title="Update who use This Course"/>
          <TextEditor value={courseUsers? courseUsers:course.whoShouldTake} setValue={setCourseUsers}/>
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
 <Heading title={courseData?.subject}/>

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
 
export default EditCourseClient;