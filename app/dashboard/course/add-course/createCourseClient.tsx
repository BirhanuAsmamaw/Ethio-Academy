"use client"
import Heading from "@/components/Heading/Heading";
import Button from "@/components/button/button";
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
}

const CreateCourseClient:React.FC<CreateCourseClientProps> = ({departments}) => {
const [requirement, setRequirement]=useState("")
const [description, setDescription]=useState("")
const [courseUsers, setCourseUsers]=useState("")
const [isnext, setIsNext]=useState(false)
const [isLoading, setIsLoading]=useState(false)

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





  const onNextButton=()=>{setIsNext((prev)=>!prev)}





  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    
  const course={...data,subjectId:subjectId}
    axios.post('/api/course',course).then(()=>{
      router.push(`/dashboard/course`)
      
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
       <Heading title={`Add Course`}/>
       </div>

          
       <div className="w-full  lg:w-8/12 flex flex-col md:flex-row px-4  gap-10 justify-between">
        <div className="w-full flex gap-10">

        <Popover open={dOpen} onOpenChange={setDOpen}>
   
    <PopoverTrigger asChild>
      <button
       
        aria-expanded={dOpen}
        className="w-[200px] justify-between text-[14px] font-semibold leading-4"
      >
        {dValue
          ? departments?.find((department) => department?.departmentName === dValue)?.departmentName
          : "Select Department"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    </PopoverTrigger>
    


    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Assign Permission..." />
       <CommandList> <CommandEmpty>No Department found.</CommandEmpty>
        <CommandGroup>
          {departments?.map((department) => (
            <CommandItem
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
                  "mr-2 h-4 w-4",
                  dValue === department?.departmentName ? "opacity-100" : "opacity-0"
                )}
              />
              {department?.departmentName}
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
       className="w-[200px] justify-between text-[14px] font-semibold leading-4"
     >
       {dValue
         ? subjects?.find((subject) => subject?.subjectName === sValue)?.subjectName
         : "Select Subject"}
       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
     </button>
    </PopoverTrigger>
   
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Assign Permission..." />
       <CommandList> <CommandEmpty>No Subject found.</CommandEmpty>
        <CommandGroup>
          {subjects?.map((subject) => (
            <CommandItem
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
                  "mr-2 h-4 w-4",
                  sValue === subject?.subjectName ? "opacity-100" : "opacity-0"
                )}
              />
              {subject?.subjectName}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>:""}
        </div>

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