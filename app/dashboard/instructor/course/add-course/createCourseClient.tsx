"use client"
import Heading from "@/components/Heading/Heading";
import Button from "@/components/button/button";
import Card from "@/components/card/card";
import Container from "@/components/container/container";
import TextEditor from "@/components/editor/editor";
import Input from "@/components/input/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import axios from "axios";
import { ChevronsUpDown, Check } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm ,SubmitHandler} from "react-hook-form";
import toast from "react-hot-toast";





interface CreateCourseClientProps{
  departments:any[]| null;
  user:any
}

const CreateCourseClient:React.FC<CreateCourseClientProps> = ({departments,user}) => {
const [requirement, setRequirement]=useState("")
const [description, setDescription]=useState("")
const [courseUsers, setCourseUsers]=useState("")
const [isLoading, setIsLoading]=useState(false)
const [page,setPage]=useState<number>(1)

const [subjectId,setSubjectId]=useState<string|null>(null)
const [subjects,setSubjects]=useState<any[]|null>(null)
const [dOpen, setDOpen] =useState(false)
  const [dValue, setDValue] = useState("")

  const [sOpen, setSOpen] =useState(false)
  const [sValue, setSValue] = useState("")


const router=useRouter()
  const {register,setValue,handleSubmit,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      price:0,
     subjectId:subjectId,
     course:''}})



 const courseData=getValues();


  useEffect(() =>{
    setValue('descriptions',description)
    setValue('requirements',requirement)
    setValue('whoShouldTake',courseUsers)
  },[description,requirement,courseUsers,setValue]);





  const onNextButton=()=>{
    if(page<2){
      setPage((prev)=>prev+=1)
    }
    setPage(2)
  }

  const onBackButton=()=>{
    if(page>1){
      setPage((prev)=>prev-=1)
    }
    setPage(1)
  }





  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    
  const course={...data,subjectId:subjectId}
    axios.post('/api/course',course).then(()=>{
      router.push(`/dashboard/instructor/course`)
      
      toast.success("Course created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }





  
  return ( <div className="flex pt-20 px-2 md:py-10 lg:pt-0 flex-col w-full  ">
   
    <div className="flex flex-col gap-10 w-full pb-6 mb-10">

      {page==1&&<Container
      children={
        <div className="flex flex-col gap-10 w-full sm:px-4 lg:mt-20   justify-center items-center px-2">
       <div className="flex  dark:border-gray-500 pt-5 justify-between w-full border-b-[1.5px]">
       <Heading title={`Add Course`}/>
       <span className=" text-lg text-gray-600 dark:text-gray-400  diagonal-fractions">{page}/2</span>
       </div>


       <div className="w-full  lg:w-8/12 justify-center  items-center flex flex-col md:flex-row gap-10">

<Popover open={dOpen} onOpenChange={setDOpen}>

<PopoverTrigger asChild>
<button

aria-expanded={dOpen}
className="w-full flex gap-2 p-2 rounded-[5px] justify-between text-[14px] border bg-gray-200 dark:bg-gray-700 dark:border-gray-600 font-medium leading-4"
>
<p>{dValue
  ? dValue
  : "Select Department"}</p>
<ChevronsUpDown className="sm:ml-2 h-4 w-4 shrink-0 opacity-50" />
</button>
</PopoverTrigger>



<PopoverContent className="w-full p-0">
<Command>
<CommandInput placeholder="Select Department..." />
<CommandList> <CommandEmpty>No Department found.</CommandEmpty>
<CommandGroup>
  {departments?.map((department) => (
    <CommandItem
    className="w-full  tracking-tight flex "
      key={department?.departmentName}
      value={department?.departmentName}
      onSelect={(currentValue) => {
        setDValue(currentValue === dValue ? "" : currentValue)
      setSubjects(department?.subject)
        setDOpen(false)
      }}
    >
      <Check
        className={cn(
          "mr-1 h-3 w-3",
          dValue === department?.departmentName ? "opacity-100" : "opacity-0"
        )}
      />
    <span className="text-sm">{department?.departmentName}</span>
    </CommandItem>
  ))}
</CommandGroup></CommandList>
</Command>
</PopoverContent>
</Popover>







{subjects?<Popover open={sOpen} onOpenChange={setSOpen}>

<PopoverTrigger asChild>
<button

aria-expanded={sOpen}
className="w-full flex gap-2 justify-between text-[14px] p-2 rounded-[5px]   border bg-gray-200 dark:bg-gray-700 dark:border-gray-600 font-medium leading-4"
>
<p>{sValue
 ? sValue: "Select Subject"}</p>
<ChevronsUpDown className="sm:ml-2 h-4 w-4 shrink-0 opacity-50" />
</button>
</PopoverTrigger>

<PopoverContent className="w-full p-0">
<Command>
<CommandInput placeholder="Select Subject..." />
<CommandList> <CommandEmpty>No Subject found.</CommandEmpty>
<CommandGroup>
  {subjects?.map((subject) => (
    <CommandItem
    className="w-full  tracking-tight flex "
      key={subject?.subjectName}
      value={subject?.subjectName}
      onSelect={(currentValue) => {
        setSValue(currentValue === sValue ? "" : currentValue)
       setSubjectId(subject.id)
        setSOpen(false)
      }}
    >
      <Check
        className={cn(
          "mr-1 h-3 w-3",
          sValue === subject?.subjectName ? "opacity-100" : "opacity-0"
        )}
      />
     <span className="text-sm"> {subject?.subjectName}</span>
    </CommandItem>
  ))}
</CommandGroup></CommandList>
</Command>
</PopoverContent>
</Popover>:""}
</div>




          
       <div className="w-full  lg:w-8/12 flex flex-col md:flex-row px-4  gap-10 items-center justify-between">
       <div className="w-full  ">
            <Input id="course" register={register} errors={errors}  label="Title" type="text" required/>
            </div>


        


        
        <div className="w-full ">
          <Input register={register} errors={errors} label="Price" type="number" id="price" required/>
          </div>
       </div>
          
         

       
        
          
          <div className="flex flex-col px-2 sm:px-4 w-full gap-1 my-4 lg:w-8/12">
            <Heading small title="Description"/>
          <TextEditor value={description} setValue={setDescription}/>
          </div>

          <div className="flex flex-col px-2 sm:px-4 w-full gap-1 my-4 lg:w-8/12">
            <Heading small title="Requirements"/>
          <TextEditor value={requirement} setValue={setRequirement}/>
          </div>
        

          <div className="flex flex-col px-2 sm:px-4 w-full  gap-1  pt-2 my-4 lg:w-8/12">
            <Heading small title="Target Odense"/>
          <TextEditor value={courseUsers} setValue={setCourseUsers}/>
          </div>

          <div className="p-2 flex justify-end w-full pb-10">
            <Button className="text-sm rounded-full  "  onClick={onNextButton} title="Next"/>
          </div>
        </div>
      }
    />}

    {page==2&&<Container
      children={
        <div className="flex flex-col gap-10 p-2">
 <div className="flex  dark:border-gray-500 pt-5 justify-between w-full border-b-[1.5px]">
       <Heading title={`Pre-review Course`}/>
       <span className=" text-lg text-gray-600 dark:text-gray-400  diagonal-fractions">{page}/2</span>
       </div>
          <div className="flex flex-col-reverse lg:flex-row items-start justify-between  gap-10 md:p-10">

<div className="space-y-6">
<div className="flex flex-col gap-2 p-2">
 <Heading title="Requirement"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.requirements }}></div>

 </div>


 <div className="flex flex-col gap-2 p-2">
 <Heading title="Target Odense"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.whoShouldTake}}></div>

 </div>
</div>


            {/* Course Card */}
           <div className="w-full ">
           <Card 
           className=" shadow-lg shadow-gray-400  dark:shadow-gray-900 rounded-lg"
            id={""}
            subjectCat={sValue} 
            category={dValue}
            subject={courseData.course} 
            price={courseData.price}
            instructorName={user?.teacher?.accountName||user?.name}
            logo={user?.teacher?.logo?.public_url||user?.image}
             instructorTitle={user?.teacher?.title||""}
            />
           </div>
          </div>


 <div className="flex  md:px-10 flex-col gap-2 p-2">
 <Heading title="Course Description"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.descriptions }}></div>

 </div>

 
 

 <div className="p-4 flex justify-end   lg:p-20">
<div className="flex gap-2">

<Button className=" text-sm  rounded-full"  onClick={onBackButton} title="Back"/>
<Button className="text-sm rounded-full"  onClick={handleSubmit(onSubmit)} title={isLoading? "Loading...":"Submit"}/>
</div> </div>





        </div>
      }
      />
    }



    </div>
  </div> );
}
 
export default CreateCourseClient;