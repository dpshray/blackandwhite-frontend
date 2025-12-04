"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Pagination from "../Pagination";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { CircleX, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  loading?: boolean;
  className?: string;
  tableClassName?: string;
  defaultSort?: SortingState;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  enableSearch?: boolean;
  onSearchAction?: (value: string) => void;
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  enableSearch = false,
  defaultSort = [],
  onSearchAction,
  searchPlaceholder = "Search...",
}: DataTableProps<TData, TValue>) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 500)
  const [sorting, setSorting] = useState<SortingState>(defaultSort ?? []);

  useEffect(() => {
        if (onSearchAction && debouncedSearch !== undefined) {
            onSearchAction(debouncedSearch)
        }
    }, [debouncedSearch, onSearchAction])

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value)
      onPageChange?.(1)   
    },
    [onPageChange]
  )


  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const clearSearch = useCallback(() => {
    setSearch("")
    onPageChange?.(1)   
    inputRef.current?.focus()
  }, [onPageChange])


  const skeletonRows = 5;
  const hasSearch = Boolean(search)

  return (
    <div className="w-full overflow-auto custom-scrollbar">
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
            {enableSearch && (
                <div className="relative w-full sm:w-auto sm:min-w-[280px] lg:min-w-[360px]">
                    <Input
                        id={`${id}-search`}
                        ref={inputRef}
                        className={cn(
                            "w-full pl-10 pr-4 h-10 text-sm transition-all duration-200",
                            "border-gray-200 focus:border-[#4a358e] focus:ring-2 focus:ring-[#4a358e]/20",
                            "placeholder:text-gray-400",
                            hasSearch && "pr-10"
                        )}
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        type="search"
                        aria-label="Search table"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3.5 text-gray-400">
                        <Search size={16} aria-hidden="true" strokeWidth={2}/>
                    </div>
                    {hasSearch && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute inset-y-0 right-0 h-full w-10 rounded-l-none px-0 hover:bg-transparent transition-colors"
                          onClick={clearSearch}
                          aria-label="Clear search"
                        >
                            <CircleX size={16} className="text-gray-400 hover:text-gray-700 transition-colors"/>
                        </Button>
                    )}
                </div>
            )}
            
        </div>
      </div>
      <div className="rounded-md bg-white max-w-screen overflow-x-auto custom-scrollbar">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: skeletonRows }).map((_, idx) => (
                  <TableRow key={idx}>
                    {columns.map((_, cIdx) => (
                      <TableCell key={cIdx}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={onPageChange}
        />
      )}

    </div>
  );
}
