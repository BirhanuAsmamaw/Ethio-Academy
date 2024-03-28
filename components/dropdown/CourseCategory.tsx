import Link from "next/link";
import CDropDown from "./CustomeDropdown/CDropDown";
import { getAllExamsCategory } from "@/actions/examsCategory/getAllExamsCategry";

const CategorCDrobDown = async() => {
  const exams=await getAllExamsCategory();
 
  return ( 
    <CDropDown chevron title={
      <p>Exams</p>
    } body={<div>
        {exams?.map((c,index)=>{
            return <Link key={index} href={`/exams/${c.url}`} className="px-2 py-1 text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            {c.examType}
           </Link>
          })}
    </div>}/>
   );
}
 
export default CategorCDrobDown;