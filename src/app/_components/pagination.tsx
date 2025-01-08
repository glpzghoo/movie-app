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
import { Suspense, useEffect, useState } from "react";
import { data } from "../types/types";
import { Loading } from "./movieDetails";
type Props = {
  data?: data;
};

export const Page = (props: Props) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage: any = searchParams.get("page");
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<any>(0);
  console.log("check pages from pagination", props?.data?.total_pages);

  // console.log("params form pagination", params);
  // console.log("searchParams", searchParams);
  const changePage = (page: number) => {
    const getURL = new URLSearchParams(searchParams.toString());
    getURL.set("page", page?.toString());
    const newURL = pathname + "?" + getURL.toString();
    router.push(newURL);
    // console.log("getURL", getURL);
    // console.log("newURL", newURL);
    setCurrent(currentPage);
  };
  useEffect(() => {
    setData(props.data?.total_pages);
    console.log("checking data", data);
  }, [data]);

  return (
    <Suspense fallback={<Loading />}>
      <Pagination>
        <PaginationContent>
          {parseInt(currentPage) > 1 && (
            <>
              {parseInt(currentPage) > 2 && (
                <>
                  <PaginationItem>
                    <PaginationPrevious
                      className="cursor-pointer"
                      onClick={() => {
                        changePage(parseInt(currentPage) - 1);
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      className="cursor-pointer"
                      onClick={() => {
                        changePage(parseInt(currentPage) - 2);
                      }}>
                      {parseInt(currentPage) - 2}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
            </>
          )}
          {parseInt(currentPage) > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
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
              className="cursor-pointer"
              onClick={() => {
                changePage(parseInt(currentPage));
              }}
              isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => {
                changePage(parseInt(currentPage) + 1);
              }}>
              {parseInt(currentPage) + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => {
                changePage(parseInt(currentPage) + 2);
              }}>
              {parseInt(currentPage) + 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis>....</PaginationEllipsis>
          </PaginationItem>

          {/* reminder */}
          {props?.data?.total_pages && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => {
                  changePage(data?.total_pages);
                }}>
                {data?.total_pages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => {
                changePage(parseInt(currentPage) + 1);
              }}
            />
          </PaginationItem>
          {/* reminder */}
        </PaginationContent>
      </Pagination>
    </Suspense>
  );
};
