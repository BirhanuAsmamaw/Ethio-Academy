"use client"

import React from 'react'

import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command ,CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
const AssignPermission = () => {
 
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
 
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
          ? frameworks.find((framework) => framework.value === value)?.label
          : "Permissions"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    {value?<Button>Assign</Button>:""}
    </div>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Assign Permission..." />
       <CommandList> <CommandEmpty>No Permissions found.</CommandEmpty>
        <CommandGroup>
          {frameworks.map((framework) => (
            <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
              {framework.label}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>
)
}

export default AssignPermission