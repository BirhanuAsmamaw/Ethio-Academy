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

  return (
  
     <Pagination className="list-none">
      <PaginationContent>
       
          <PaginationPrevious href="#" />

          {renderPaginationItems()}

          <PaginationEllipsis />
       
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  
  );
};

export default PaginationComponent;
