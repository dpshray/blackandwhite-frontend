"use client";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, goToPage }: PaginationProps) {
  return (
    <div className="flex justify-center mt-8 gap-2 flex-wrap">
      <Button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        <BsChevronDoubleLeft />
      </Button>

      <Button onClick={() => goToPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
        Prev
      </Button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1) {
          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        } else if (Math.abs(pageNum - currentPage) === 2) {
          return <span key={`ellipsis-${pageNum}`} className="px-2">...</span>;
        }
        return null;
      })}

      <Button onClick={() => goToPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
        Next
      </Button>

      <Button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
        <BsChevronDoubleRight />
      </Button>
    </div>
  );
}
