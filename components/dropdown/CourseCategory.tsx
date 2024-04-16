import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { ChevronDown} from "lucide-react";
import { Button } from "../ui/button";
import CLink from "../link";


interface ExamsCDrobDownProps{
  exams:any[]|null;
}
const ExamsCDrobDown:React.FC<ExamsCDrobDownProps> = ({exams}) => {

 
  return ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex gap-2 mt-3">
        <span>Exam</span>
       
        <ChevronDown className="h-4 w-4 "/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuGroup>
      {exams?.map((c,index)=>{
            return <><CLink key={index} url={`/exams/${c.url}`} >
                <DropdownMenuItem className="w-full">
                {c.examType}
      </DropdownMenuItem>
            
           </CLink>
                   <DropdownMenuSeparator />
            </>
          })}
      </DropdownMenuGroup>
     
    
    
      
     
      
    </DropdownMenuContent>
  </DropdownMenu>
   );
}
 
export default ExamsCDrobDown;




