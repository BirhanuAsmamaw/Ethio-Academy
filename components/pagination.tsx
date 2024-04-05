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
import { usePathname } from "next/navigation";

interface PaginationInterfaceProps{
  paginationLength: number;
}
const PaginationComponent:React.FC<PaginationInterfaceProps> = ({paginationLength}) => {
  const pathName=usePathname();
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= (Math.ceil(paginationLength/4)); i++) {
      items.push(
        <PaginationItem key={i} className="list-none">
          <PaginationLink className="no-underline" href={`/?page=${i}#courseslist`}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
   <div className="">
    <h1>{pathName}</h1>
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
   </div>
  );
};

export default PaginationComponent;
