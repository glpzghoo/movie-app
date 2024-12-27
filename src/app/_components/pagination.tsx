"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useEffect, useState } from "react";
export const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage: any = searchParams.get("page");

  console.log("params", params);
  console.log("searchParams", searchParams);
  const changePage = (page: number) => {
    const getURL = new URLSearchParams(searchParams.toString());
    getURL.set("page", page.toString());
    const newURL = pathname + "?" + getURL.toString();
    router.push(newURL);
    console.log("newURL", newURL);
  };

  return (
    <Pagination>
      <PaginationContent>
        {parseInt(currentPage) > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  changePage(parseInt(currentPage) - 1);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  changePage(parseInt(currentPage) - 1);
                }}>
                {parseInt(currentPage) - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink
            onClick={() => {
              changePage(parseInt(currentPage));
            }}
            isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              changePage(parseInt(currentPage) + 1);
            }}>
            {parseInt(currentPage) + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              changePage(parseInt(currentPage) + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
