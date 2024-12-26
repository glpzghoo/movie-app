import { Cards } from "../_components/movies";
import { Movie, options } from "../page";
import { Loading } from "../_components/movieDetails";
import { SearchBar } from "../_components/searchBar";

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
export default async function Genre(props: Props) {
  console.log("params check", props.params.genre);
  const genre = props.params.genre;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${genre}`,
    options
  );
  const data = await res.json();
  console.log("data response", data);

  console.log("checking movies", data.results);
  const movies = data.results;
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
            {movies && genre?.toUpperCase().replaceAll("_", " ")}
          </h1>
          {/* <a href="/upcoming">
          <div>See More</div>
        </a> */}
        </div>
        <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {movies ? (
            movies.map((movie: Movie) => <Cards prop={movie} />)
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

// ("use client");
// import { useEffect, useState } from "react";
