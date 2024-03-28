"use client";
import { CiSearch } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
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

interface CategorySearchProps{
  departments:any[] | null;
 
}

 const CategorySearch:React.FC<CategorySearchProps>=({departments}) =>{
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [departmentId, setDepartmentId] = useState("");
const router=useRouter();
  return (<Popover open={open} onOpenChange={setOpen} >
    <div className={`flex w-full overflow-x-auto  rounded-[5px]  ${value&&'border bg-slate-100 dark:bg-gray-800 border-slate-300 dark:border-gray-600'} `}>
      <PopoverTrigger asChild >
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          
          className=" w-full  flex  items-center justify-between"
        >
          <p>{value
          
            ? value
            : "Category"}</p>
            {!value&&<IoChevronDown size={24}/>}
 
        </Button>
      </PopoverTrigger>
      {value?<button disabled={value? false:true} className="p-2 bg-blue-500 hover:bg-blue-600 dark:bg-green-500 hover:dark:bg-green-400 rounded-r-[5px]" onClick={()=>{router.push(`/category/${departmentId}`)}}>
        <CiSearch className="font-semibold  text-black dark:text-white" size={24}/>
        </button>:""}
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
                    setValue(currentValue === value ? "" : currentValue);
                    setDepartmentId(department.url);
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

export default CategorySearch;