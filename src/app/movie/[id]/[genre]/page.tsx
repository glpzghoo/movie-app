"use client";
import { Loading } from "@/app/_components/movieDetails";
import { Cards } from "@/app/_components/movies";
import { Page } from "@/app/_components/pagination";
import { SearchBar } from "@/app/_components/searchBar";
import { options } from "@/app/page";
import { movieDetail } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type props = {
  id: number;
  genre: string;
};
export default function similar() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [movies, setData] = useState<movieDetail[]>();
  // console.log("params id", params.id);
  // console.log("search params", searchParams);
  const genre: any = params.genre;
  const currentPage: any = searchParams.get("page");
  useEffect(() => {
    const fetchData = async () => {
      const res_recom = await fetch(
        `https://api.themoviedb.org/3/movie/${
          params.id
        }/similar?language=en-US&page=${parseInt(currentPage)}`,
        options
      );
      const recommendations = await res_recom.json();
      setData(recommendations.results);
    };
    fetchData();
  }, [currentPage]);
  return (
    <div>
      <div className="m-4">
        <div className="upcoming-header flex justify-between">
          <Suspense>
            <h1 className="text-xl font-extrabold ">
              {genre && genre?.replaceAll("_", " ").toUpperCase()}
            </h1>
          </Suspense>
        </div>
        <Page />
        <div
          key={69}
          className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          <Suspense fallback={<Loading />}>
            {movies &&
              movies.map((movie: movieDetail, index: number) => (
                <Cards prop={movie} key={movie.id} index={index} />
              ))}
          </Suspense>
        </div>
        <Page />
      </div>
    </div>
  );
}
