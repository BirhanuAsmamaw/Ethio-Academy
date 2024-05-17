
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CLink from "../link";

interface SideBarItemsPops{
  sidebarData:any[];
  user?:any;
}
const SideBarItems:React.FC<SideBarItemsPops> = ({sidebarData,user}) => {
  

  const isBannerAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageBanner")
  const isBankAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageBank")
  const isUniversityAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageUniversity")
  const isUserAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageUser")
  const isExamsAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageExamType")
 

 
  return ( 
    <Accordion type="single" collapsible className="w-full " >
    {sidebarData.map((sidebar,index) =>{

      return <AccordionItem className="border-none" key={index} value={`${index}`}>
      <AccordionTrigger className={`hover:no-underline 
      ${(
       
        !isBannerAccessed&& sidebar.title==="Banner" ||
        !isBankAccessed&& sidebar.title==="Bank"||
        !isUniversityAccessed&& sidebar.title==="University" ||
        !isUserAccessed&& sidebar.title==="User"||
        !isExamsAccessed&& sidebar.title==="Exams"
      )
      &&'hidden'}`}>
        <div 
      className="  text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex gap-2">
        <p> {<sidebar.icon size={20}/>}</p> 
        <p>{sidebar.title}</p>
        </div>
        </AccordionTrigger>
      <AccordionContent className="mx-2">
        <div className="flex flex-col gap-2 border-l-[1.5px] border-gray-200 dark:border-gray-600 ">
        {sidebar.items.map((item:any,ind:number) =>{
          return <CLink key={ind} url={item.url}>{item.label}</CLink>
          
          
        })}
        </div>
      </AccordionContent>
    </AccordionItem>
    })}
  </Accordion>
  
  );
}
 
export default SideBarItems;




