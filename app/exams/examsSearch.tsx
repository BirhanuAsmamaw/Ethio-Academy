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

interface ExamsSearchProps{
  departments:any[];
}

 const ExamsSearch:React.FC<ExamsSearchProps>=({departments}) =>{
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
const router=useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild >
        <div className="flex w-full   md:min-w-[500px] max-w-[800px] shadow-md dark:shadow-black bg-white dark:bg-gray-800 text-black dark:text-white rounded-[5px] overflow-hidden">
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          
          className=" w-full   md:min-w-[500px] max-w-[800px] justify-between"
        >
          {value
            ? departments.find((department) => department.departmentName.toLowerCase()=== value)?.departmentName
            : "Select your department..."}
 
        </Button>
        <button className="p-2 bg-green-500 hover:bg-green-600" onClick={()=>{router.push(`/exams/Exit/${value}`)}}><CiSearch className="text-white font-bold" size={24}/></button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full md:min-w-[500px] max-w-[800px] p-0">
        <Command className="bg-white dark:bg-gray-800 shadow-md dark:shadow-black">
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