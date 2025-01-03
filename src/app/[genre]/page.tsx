"use client";

import { Cards } from "../_components/movies";
import { options } from "../page";
import { Loading } from "../_components/movieDetails";
import { SearchBar } from "../_components/searchBar";
import { Page } from "../_components/pagination";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { movieDetail } from "../types/types";

type Params = {
  genre: string;
};

// type results = movieDetail[];
type movies = {
  results: movieDetail[];
};
export default function Genre() {
  const [data, setData] = useState<movies>();
  const searchParams = useSearchParams();

  const params: Params = useParams();
  const genre: string = params.genre;
  const page = searchParams.get("page");
  console.log("params  ???", params);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${genre}?language=en-US&page=${page}`,
        options
      );
      const data: movies = await res.json();
      setData(data);

      // console.log("data response", data);

      // console.log("checking movies", data.results);
    };
    fetchData();
  }, [page]);

  const movies = data?.results;
  // console.log("movies [genre]", movies);
  return (
    <div>
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
          className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {movies ? (
            movies.map((movie: movieDetail, index: number) => (
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

// ("use client");
// import { useEffect, useState } from "react";
