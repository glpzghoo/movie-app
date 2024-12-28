"use client";
import { Loading } from "@/app/_components/movieDetails";
import { Cards } from "@/app/_components/movies";
import { Page } from "@/app/_components/pagination";
import { SearchBar } from "@/app/_components/searchBar";
import { Movie, options } from "@/app/page";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type props = {
  id: number;
  genre: string;
};
export default function similar() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [movies, setData] = useState<Movie[]>();
  console.log("params id", params.id);
  console.log("search params", searchParams);
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
      console.log("recommendations", recommendations);
      setData(recommendations.results);
    };
    fetchData();
  }, [currentPage]);
  console.log("movies[movie/[id]/[genre]]", movies);
  // const movies = data;
  return (
    <div>
      <div className="navigation">
        <div>
          <div className="flex justify-around py-2">
            <a href="/">
              <div className="flex gap-2 items-center">
                <img className="w-9 h-9" src="/img/film.svg" />
                <h3 className="">Movie</h3>
              </div>
            </a>
            <div className="flex"></div>
            <div className="flex gap-4">
              <SearchBar />
              <button>
                <img className="w-9" src="/img/switch-button.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4">
        <div className="upcoming-header flex justify-between">
          <h1 className="text-xl font-extrabold ">
            {genre && genre?.replaceAll("_", " ").toUpperCase()}
          </h1>
          {/* <a href="/upcoming">
            <div>See More</div>
          </a> */}
        </div>
        <Page />
        <div
          key={69}
          className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
        >
          {movies ? (
            movies.map((movie: Movie, index: number) => (
              <Cards prop={movie} key={movie.id} index={index} />
            ))
          ) : (
            <Loading />
          )}
        </div>
        <Page />
      </div>
    </div>
  );
}
