import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { ChevronDown,ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import CLink from "../link";


interface ExamsCDrobDownProps{
  exams:any[]|null;
}
const ExamsCDrobDown:React.FC<ExamsCDrobDownProps> = ({exams}) => {

 
  return ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="">
        <span>Exam</span>
        <ChevronUp className="h-4 w-4 ml-2 data-[state=close]:hidden"/>
        <ChevronDown className="h-4 w-4 ml-2 data-[state=open]:hidden"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuGroup>
      {exams?.map((c,index)=>{
            return <CLink key={index} url={`/exams/${c.url}`} >
                <DropdownMenuItem className="w-full">
                {c.examType}
      </DropdownMenuItem>
            
           </CLink>
          })}
      </DropdownMenuGroup>
     
    
    
      
     
      
    </DropdownMenuContent>
  </DropdownMenu>
   );
}
 
export default ExamsCDrobDown;




