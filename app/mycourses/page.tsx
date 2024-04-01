import Navbar from "@/components/navbar/Navbar";


import { getCurrentUser } from "@/actions/users/currentUser";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDepartmentById } from "@/actions/departments/getDepartmentById";


const MyCourses = async() => {


const user=await getCurrentUser();
const getDepartment=async(id:string)=>{

    return await getDepartmentById(id)

}
 
  return ( <>
  <Navbar/>
  <div className="flex justify-center min-h-screen p-4 w-full">
 <div className="flex flex-col md:flex-row  items-center text-center justify-center gap-20">

<div className="
w-64 h-72 border 
rounded-[10px] flex flex-col
 p-2 justify-center
  items-center
   bg-white 
   shadow 
   dark:bg-gray-800
   border-gray-200
   dark:border-gray-700
   text-center
   space-y-2
   ">
   <Avatar>
      <AvatarImage src={user?.image || ""} alt={user?.name || ''} />
      <AvatarFallback>{user?.name|| 'profile'}</AvatarFallback>
    </Avatar>
    <h5 className="font-semibold text-lg ">{user?.name}</h5>
    <p className="
    text-gray-500 
    dark:text-gray-400
    text-sm
    ">{user?.email}</p>
   </div>


  <div className="flex flex-col gap-10">


  {user?.payedCourses[0]?.courses.length?<div className="overflow-x-auto p-2 ">
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Course name
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Learn</span>
                    </th>
                </tr>
            </thead>
            <tbody>
               

{user?.payedCourses.map((course)=>{
    return (<>{ course.courses.map((c)=>{
        return<tr key={c.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           {c.subject}
        </th>
        
        <td className="px-6 py-4 text-right">
            <Link href={`/course/${c.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Start</Link>
        </td>
    </tr>
      })
    }
    </>)

})}
                
            </tbody>
        </table>
    </div>
  </div>:""}













  {user?.payedCourses[0].department?<div className="overflow-x-auto p-2 ">
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Exam
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Start</span>
                    </th>
                </tr>
            </thead>
            <tbody>
               

{user?.payedCourses.map(async (exam)=>{

    const depmnt=await getDepartment(exam.id);

    return (<tr key={exam.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       {depmnt?.exam?.examType}
    </th>
    
    <td className="px-6 py-4 text-right">
       {exam.status? <Link href={`/exams/${depmnt?.exam?.url}/${exam.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Start</Link>:<p>Pending...</p>}
    </td>
</tr>)

})}
                
            </tbody>
        </table>
    </div>
  </div>:""}


  </div>
  </div>
  </div> 
  </> );
}
 
export default MyCourses;