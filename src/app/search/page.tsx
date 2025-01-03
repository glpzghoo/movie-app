"use client";

import { useEffect, useState } from "react";
import { options } from "../page";
import { data, movieDetail } from "../types/types";
import { useParams, useSearchParams } from "next/navigation";
import { Loading } from "../_components/movieDetails";
import { Page } from "../_components/pagination";
import { Cards } from "../_components/movies";

export default function searchResult() {
  const [data, setData] = useState<movieDetail[]>([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options
      );
      const movies = await res.json();
      setData(movies.results);

      // console.log("searching data", data);
      console.log("checking search params", query);
      console.log("checking the damn data", data);
    };

    fetchData();
  }, [query, page]);
  return (
    <div>
      <div className="m-4">
        <div className="upcoming-header flex justify-between">
          <h1 className="text-xl font-extrabold ">
            {query && query?.replaceAll("_", " ").toUpperCase()}
          </h1>
          {/* <a href="/upcoming">
            <div>See More</div>
          </a> */}
        </div>
        <Page />
        <div
          key={69}
          className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {data ? (
            data.map((movie: movieDetail, index: number) => (
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
