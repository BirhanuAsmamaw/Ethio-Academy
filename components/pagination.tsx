"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


interface PaginationInterfaceProps{
  paginationLength: number;
  page: string;
}
const PaginationComponent:React.FC<PaginationInterfaceProps> = ({paginationLength,page}) => {
 
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= (Math.ceil(paginationLength/4)); i++) {
      items.push(
        <PaginationItem key={i} className="list-none" >
          <PaginationLink isActive={`${i}`===page} className="no-underline" href={`/?page=${i}#courseslist`}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (<div className=" z-20">
    <Pagination className="list-none">
      <PaginationContent>
       
          <PaginationPrevious className=" no-underline" href={`/?page=${(Number(page)<1)?-1:Number(page)-1}#courseslist`}/>

          {renderPaginationItems()}

          <PaginationEllipsis />
       
        <PaginationItem  className=" list-none">
          <PaginationNext  className=" no-underline"href={`/?page=${(Number(page)>paginationLength)? 1:Number(page)+1}#courseslist`}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
  
     
  
  );
};

export default PaginationComponent;
