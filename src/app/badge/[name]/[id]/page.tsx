"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cards } from "@/app/_components/movies";
import { Page } from "@/app/_components/pagination";
import { Loading } from "@/app/_components/movieDetails";
import { Movie, options } from "@/app/page";
import { data, movieDetail } from "@/app/types/types";

type Props = {
  params: Params;
};
type Params = {
  genre: string;
};
type oneMovieGenre = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type movies = {
  results: movieDetail[];
};
export const api_key = `7bd2309ac551c9317c3fd9df79b3ea29`;
export default function Genre(props: Props) {
  const [data, setData] = useState<data>();
  const searchParams = useSearchParams();

  const params = useParams();
  const genre: any = params.genre;
  const page = searchParams.get("page");
  // console.log("params  ???", params);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${params.id}?language=en-US&page=${page}`,
        options
      );
      const data: data = await res.json();
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
          <h1 className="text-xl font-extrabold ">{params.name}</h1>
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
        <Page data={data} />
      </div>
    </div>
  );
}

// ("use client");
// import { useEffect, useState } from "react";
