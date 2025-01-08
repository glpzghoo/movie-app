"use client";

import { Suspense, useEffect, useState } from "react";
import { options } from "../page";
import { data, movieDetail } from "../types/types";
import { useParams, useSearchParams } from "next/navigation";
import { Loading } from "../_components/movieDetails";
import { Page } from "../_components/pagination";
import { Cards } from "../_components/movies";
import { SkeletonOne } from "../_components/skeletons";

export default function searchResult() {
  const [data, setData] = useState<any>({});
  const [movies, setMovies] = useState<movieDetail[]>();
  const [totalMovies, setTotalMovies] = useState<number>(0);
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

      setData(movies);

      setMovies(movies.results);

      // console.log("searching data", data);
      console.log("checking search params", query);
      console.log("checking the damn data", data);
    };
    console.log("checking data", data);
    setTotalMovies(data.total_pages);
    fetchData();
  }, [query, page]);
  // const handleClick = () => {
  //   console.log("total movies", totalMovies);
  //   console.log("data", data.total_pages);
  // };
  return (
    <div>
      <div className="m-4">
        <div className="upcoming-header flex justify-between">
          <h1 className="text-xl font-extrabold ">
            <Suspense>
              {movies &&
                movies.length * data.total_pages +
                  ` results for "` +
                  query?.replaceAll("_", " ") +
                  `"`}
            </Suspense>
          </h1>

          {/* <button onClick={handleClick}>handleClick</button> */}
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
