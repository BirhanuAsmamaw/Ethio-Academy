"use client"
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";




interface BankProps{

  banks:any[]|null

}

const Bank:React.FC<BankProps>  = ({banks}) => {

const router=useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [newbank, setNewbank] = useState<any|null>(null);

  if(!banks){
router.back()
return null;
  }
  return ( <div className="space-y-10">


<Popover open={open} onOpenChange={setOpen} >
 
      <PopoverTrigger asChild >
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          
          className=" w-full  flex  items-center justify-between"
        >
          <p>{value
          
            ? value
            : "Selected the Bank you Need to pay"}</p>
            
 
        </Button>
      </PopoverTrigger>
      
    
      <PopoverContent className="w-full p-0">
        <Command className="bg-white dark:bg-gray-800 shadow-md dark:shadow-black border dark:border-gray-600">
          <CommandInput  placeholder="Search your department..." />
          <CommandList>
            <CommandEmpty>No Bank  found.</CommandEmpty>
            <CommandGroup>
              {banks?.map((bank) => (
                <CommandItem
                  key={bank.id}
                  value={bank.bankName.toLowerCase()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setNewbank({bank_name: bank?.bankName,name: bank?.name,account:bank?.account,image: bank?.logo.public_url})
                    
                    setOpen(false);
                  }}


                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === bank.bankName.toLowerCase()? "opacity-100" : "opacity-0"
                    )}
                  />
                  {bank.bankName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>






{newbank?<div className="border-y-2 bg-white dark:bg-gray-800 rounded-[10px] p-1 border-gray-200 dark:border-gray-700">
    <h5 className="text-sm text-gray-500 dark:text-gray-400">{newbank?.bank_name}</h5>
    <div className="flex gap-2">
      <div className=" overflow-hidden ">
      
        <Image  width={60} height={60} src={newbank?.image} alt={newbank?.bank_name} className="object-contain "/>
      </div>

      <div className="flex flex-col text-gray-500 dark:text-gray-400">
        <p>{newbank?.name}</p>
        <p className="lining-nums">{newbank?.account}</p>
      </div>

    </div>

  </div>:""}
  </div> );
}
 
export default Bank ;