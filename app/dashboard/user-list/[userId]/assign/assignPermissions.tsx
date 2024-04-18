"use client"

import React from 'react'

import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command ,CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


interface AssignPermissionProps{
  permissions:any[]|null;
  userId:string;
}
const AssignPermission:React.FC<AssignPermissionProps> = ({permissions,userId}) => {
 
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [permissionId,setPermissionId] = React.useState<string|null>(null)
const router=useRouter();
  const onAssign=()=>{
    setIsLoading(true)
    axios.post("/api/authorization/userPermission",{userId:userId,
      permissionId:permissionId}).then(()=>{
        toast.success("Permission assigned successfully")
        router.prefetch(`dashboard/user-list/${userId}/update/role`)

      }).catch((error)=>{
        toast.error("Error in assignment of permission")
      }).finally(()=>{ setIsLoading(false)})

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
          ? permissions?.find((permission) => permission.action === value)?.action
          : "Permissions"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    {value?<Button
    onClick={onAssign}
    disabled={isLoading}
    >
      {isLoading?"Loading...":"Assign"}
    </Button>:""}
    </div>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Assign Permission..." />
       <CommandList> <CommandEmpty>No Permissions found.</CommandEmpty>
        <CommandGroup>
          {permissions?.map((permission) => (
            <CommandItem
              key={permission?.action}
              value={permission?.action}
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue)
                setPermissionId(permission.id)
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === permission?.action ? "opacity-100" : "opacity-0"
                )}
              />
              {permission?.action}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>
)
}

export default AssignPermission