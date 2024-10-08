"use client";
import { CiSearch } from "react-icons/ci";
import * as React from "react";
import { Check} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface ExamsSearchProps{
  departments:any[];
  examType:string;
}

 const ExamsSearch:React.FC<ExamsSearchProps>=({examType,departments}) =>{
  const [isClickedSearch,setClickedSearch]=useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [departmentId, setDepartmentId] = useState("");
const router=useRouter();
  return (<Popover open={open} onOpenChange={setOpen}>
    <div className="flex w-full   md:min-w-[500px] max-w-[800px] shadow-md dark:shadow-black bg-white dark:bg-gray-800 text-black dark:text-white rounded-[5px] overflow-hidden">
      <PopoverTrigger asChild className="p-3" >
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          
          className=" w-full   md:min-w-[500px] max-w-[800px] justify-between"
        >
          {value
            ? value
            : "Select your department..."}
 
        </Button>
      </PopoverTrigger>
      <button disabled={isClickedSearch} className="p-4 bg-green-500 hover:bg-green-600" onClick={()=>{
        setClickedSearch(true)
        router.push(`/dashboard/exam-questions/${examType}/${departmentId}`)}
        
        }>
          {isClickedSearch? <BeatLoader color="#36d7b7" size={18} />:<CiSearch className="text-white font-bold" size={24}/>}
          </button>
      </div>
      <PopoverContent className="w-full md:min-w-[500px] max-w-[800px] p-0">
        <Command >
          <CommandInput  placeholder="Search your department..." />
          <CommandList>
            <CommandEmpty>No Departments found.</CommandEmpty>
            <CommandGroup>
              {departments.map((department) => (
                <CommandItem
                  key={department.id}
                  value={department.departmentName.toLowerCase()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setDepartmentId(department.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === department.departmentName.toLowerCase()? "opacity-100" : "opacity-0"
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
  );
}

export default ExamsSearch;