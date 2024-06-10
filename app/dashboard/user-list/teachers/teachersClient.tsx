"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"


import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { FaRegUserCircle } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TableSkeleton from "@/components/tableSkeleton"
import Container from "@/components/container/container"
import { formatDate } from "@/lib/formatDate"



interface TeacherListProps{
  teachers:any[] | null;
}









export const TeacherListClient:React.FC<TeacherListProps>=({teachers})=> {
 
  return <Container>

    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead className="bg-gray-50 py-2 dark:bg-gray-700">
          <tr >
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academy</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {teachers?.length?teachers?.map((teacher)=>{
            return <tr key={teacher?.id}>
            <td scope="col" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{teacher?.name}</td>
            <td scope="col" className="px-6 py-4 whitespace-nowrap text-sm  text-gray-700 dark:text-gray-200">{teacher?.email}</td>
            <td scope="col" className="px-6 py-4 whitespace-nowrap text-sm  text-gray-700 dark:text-gray-200">{teacher?.accountName}</td>
            <td scope="col" className="px-6 py-4 whitespace-nowrap text-sm  text-gray-700 dark:text-gray-200">{formatDate(teacher?.createdAt)}</td>
         
            <td scope="col" className="px-6 py-4 whitespace-nowrap text-sm  text-gray-700 dark:text-gray-200">{teacher?.status?  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-400 dark:border-green-700">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16.707 4.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L7 12.586l8.293-8.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            Approved
          </span>:
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-400 dark:border-yellow-700">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2H8zM8 0h4a4 4 0 014 4v12a4 4 0 01-4 4H8a4 4 0 01-4-4V4a4 4 0 014-4z" clipRule="evenodd"></path>
            </svg>
            Pending
          </span>
        }</td>



        {/* DROP DOWN */}
        <td scope="col" className="px-6 py-4 whitespace-nowrap text-sm  text-gray-700 dark:text-gray-200"><DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 ">
          
            <DropdownMenuItem>
             <Link 
             className="no-underline text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200" 
             href={`/dashboard/user-list/teachers/${teacher?.id}`}>Approve Status</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem> 
              <Link 
               className="no-underline text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              href={`/dashboard/user-list/teachers/${teacher?.id}/delete`}>Delete Instructor</Link>
              </DropdownMenuItem>
          </DropdownMenuContent>


        </DropdownMenu></td>
            
          </tr>
          }):<p>No Instructors Found!!</p>}
          
          </tbody>
      </table>
    </div>
  </Container>
}
