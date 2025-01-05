"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cards } from "@/app/_components/movies";
import { Page } from "@/app/_components/pagination";
import { Loading } from "@/app/_components/movieDetails";
import { options } from "@/app/page";
import { data, movieDetail } from "@/app/types/types";

type Params = {
  id: string;
  name: string;
};

export default function Genre() {
  const [data, setData] = useState<data>();
  const searchParams = useSearchParams();
  const params: Params = useParams();
  const genre: any = params.name;
  const page = searchParams.get("page");
  console.log("params  ???", typeof params.id);

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
    <Suspense>
      <div>
        <div className="m-4">
          <div className="upcoming-header flex justify-between">
            <h1 className="text-xl font-extrabold ">
              {params.name.replaceAll("%20", " ")}
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
    </Suspense>
  );
}

// ("use client");
// import { useEffect, useState } from "react";
