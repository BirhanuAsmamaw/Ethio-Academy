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
    for (let i = 1; i <= 40; i++) {
      items.push(
        <PaginationItem key={i} className="list-none">
          <PaginationLink className="no-underline" href="#">
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
        <PaginationItem>
          <PaginationPrevious href="#" />
          {renderPaginationItems()}
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
