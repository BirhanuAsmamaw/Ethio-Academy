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
    <div className="flex w-full  p-2  rounded-[5px] overflow-hidden">
      <PopoverTrigger asChild className="border dark:border-gray-600 bg-white dark:bg-gray-800">
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          
          className=" w-full    justify-between"
        >
          {value
            ? value
            : "Select your department..."}
 
        </Button>
      </PopoverTrigger>
      <button className="p-2 " onClick={()=>{router.push(`/category/${departmentId}`)}}>
        {value?<CiSearch  size={24}/>:<IoChevronDown size={24}/>}
        </button>
      </div>
      <PopoverContent className="w-full p-0">
        <Command className="bg-white dark:bg-gray-800 shadow-md dark:shadow-black border dark:border-gray-600">
          <CommandInput  placeholder="Search your department..." />
          <CommandList>
            <CommandEmpty>No Departments found.</CommandEmpty>
            <CommandGroup>
              {departments?.map((department) => (
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

export default CategorySearch;