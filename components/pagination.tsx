import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponent = () => {
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= (40/4); i++) {
      items.push(
        <PaginationItem key={i} className="list-none">
          <PaginationLink className="no-underline" href={`/#courseslist?page=${i}`}>
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
