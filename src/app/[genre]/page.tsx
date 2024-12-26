"use client";
import { useParams } from "next/navigation";
import { Cards } from "../_components/movies";
import { Movie, options } from "../page";
import { useEffect, useState } from "react";
import { Genres } from "../types/types";
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
type results = oneMovieGenre[];
type movies = {
  results: results;
};
export default function Genre() {
  const [movies, setMovies] = useState<movies>();
  const params: Params = useParams();

  // console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.genre}?language=en-US`,
        options
      );
      const data = await res.json();
      console.log("data response", data);
      setMovies(data);
      console.log("checking movies", movies);
    };
    fetchData();
  }, []);

  console.log(movies);
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
              <button>
                <img className="w-9" src="/img/search.png" />
              </button>
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
            {movies && params?.genre?.toUpperCase().replaceAll("_", " ")}
          </h1>
          {/* <a href="/upcoming">
          <div>See More</div>
        </a> */}
        </div>
        <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {movies.map((movie: Movie) => (
            <Cards prop={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
