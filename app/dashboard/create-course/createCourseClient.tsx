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
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm ,SubmitHandler} from "react-hook-form";
import toast from "react-hot-toast";
import { IoChevronDown } from "react-icons/io5";




interface CreateCourseClientProps{
  departments:any[]| null;
}

const CreateCourseClient:React.FC<CreateCourseClientProps> = ({departments}) => {
const [requirement, setRequirement]=useState("")
const [description, setDescription]=useState("")
const [courseUsers, setCourseUsers]=useState("")
const [isnext, setIsNext]=useState(false)
const [isLoading, setIsLoading]=useState(false)



const [open, setOpen] = useState(false);
  const [departmentValues, setDepartmentValues] = useState("");
  const [departmentData, setDepartment] = useState<any>(null);


  const {register,setValue,handleSubmit,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
     
      subject:null,
      price:0,
      category:null}})



 const courseData=getValues();


  useEffect(() =>{
    setValue('descriptions',description)
    setValue('requirements',requirement)
    setValue('whoShouldTake',courseUsers)
  },[description,requirement,courseUsers,setValue]);





  const onNextButton=()=>{setIsNext((prev)=>!prev)}





  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    
  const course={...data,department:departmentData}
    axios.post('/api/course',course).then(()=>{
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
       <Heading title="Create Courses"/>
       </div>



       <div className="w-full  lg:w-8/12">
            
            
            
       <Popover open={open} onOpenChange={setOpen} >

    <div className="flex w-full  md:w-[200px] p-2 m-2  rounded-[5px] overflow-hidden  border dark:border-gray-600 bg-slate-100 dark:bg-gray-700 ">
      <PopoverTrigger asChild >
        <button
         
          aria-expanded={open}
          
          className=" w-full  flex  items-center justify-between"
        >
          <p>{departmentValues
          
            ? departmentValues
            : "Category"}</p>
            {!departmentValues&&<IoChevronDown size={24}/>}
 
        </button>
      </PopoverTrigger>
      </div>


      <PopoverContent className="w-full p-0">
        <Command className="bg-white dark:bg-gray-800 shadow-md dark:shadow-black border dark:border-gray-600">
          <CommandInput  placeholder="Search your department..." />
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              {departments?.map((department) => (
                <CommandItem
                  key={department.id}
                  value={department.departmentName.toLowerCase()}
                  onSelect={(currentValue) => {
                    setDepartmentValues(currentValue === departmentValues ? "" : currentValue);
                    setDepartment({code:department.url,name:department.departmentName});
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      departmentValues === department.departmentName.toLowerCase()? "opacity-100" : "opacity-0"
                    )}
                  />
                  {department.departmentName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
               </div> 
          
       <div className="w-full flex flex-col md:flex-row px-4 lg:px-10  gap-10 justify-between">

       <div className="w-full  lg:w-8/12">
            <Input id="subject" register={register} errors={errors}  label="Subject" type="text" required/>
            </div>


        


        
        <div className="w-full lg:w-8/12">
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
 
export default CreateCourseClient;