"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command ,CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AssignRolesProps{
  roles:any[]|null;
  userId:string;
}
const AssignRoles:React.FC<AssignRolesProps> = ({roles,userId}) => {
 
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [roleId,setRoleId]=useState<string|null>(null)
  const [isLoading,setIsLoading] = useState(false)
const router=useRouter();


  const onAssign=()=>{
    setIsLoading(true)
    axios.post('/api/authorization/userRole',{userId:userId,
      roleId:roleId}).then(()=>{
        toast.success("Role assigned successfully")
        router.push(`/dashboard/user-list/${userId}/update/role`)
        router.refresh()

      }).catch((error)=>{
        toast.error("Error  in  assign role")
      }).finally(()=>{setIsLoading(false);});
  }
 
 
  return (<Popover open={open} onOpenChange={setOpen}>
    <div className="flex gap-2">
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[200px] justify-between text-[14px] font-semibold leading-4"
      >
        {value
          ? value
          : "Roles"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    {value?<Button
    onClick={onAssign}
    disabled={isLoading}
    >{isLoading?"Loading...":"Assign"}</Button>:""}
    </div>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Assign Roles..." />
       <CommandList> <CommandEmpty>No Roles found.</CommandEmpty>
        <CommandGroup>
          {roles?.map((role) => (
            <CommandItem
              key={role.name}
              value={role.name}
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue)
                setRoleId(role.id)
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === role.name ? "opacity-100" : "opacity-0"
                )}
              />
              {role.name}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>
)
}

export default AssignRoles