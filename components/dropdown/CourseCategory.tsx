import Link from "next/link";
import CDropDown from "./CustomeDropdown/CDropDown";

interface ExamsCDrobDownProps{
  exams:any[]|null;
}
const ExamsCDrobDown:React.FC<ExamsCDrobDownProps> = ({exams}) => {

 
  return ( 
    <CDropDown chevron title={
      <p>Exams</p>
    } body={<div>
        {exams?.map((c,index)=>{
            return <Link key={index} href={`/exams/${c.url}`} 
            className="px-2 divide-y-2 divide-blue-500 border-y dark:border-gray-500 py-2 text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            {c.examType}
           </Link>
          })}
    </div>}/>
   );
}
 
export default ExamsCDrobDown;