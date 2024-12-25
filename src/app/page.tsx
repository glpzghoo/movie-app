import { Button } from "@/components/ui/button";
import { Cards } from "./_components/cards";
import { Link } from "lucide-react";

export type Movie = {
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
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmQyMzA5YWM1NTFjOTMxN2MzZmQ5ZGY3OWIzZWEyOSIsIm5iZiI6MTczNTAyNTM4OC42MDQsInN1YiI6IjY3NmE2MmVjYjBjMzc2ZDQyMWE5ZWQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NP1yqe7VPWE7aXz-y9KfvdAA6EK8r8UDrjhU8EjFev4",
  },
};
export default async function Home() {
  const response = await fetch("https://api.themoviedb.org/3/movie/", options);
  const res_topRated = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const res_popular = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  const res_upcoming = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  );

  const popular = await res_popular.json();
  const top_rated = await res_topRated.json();
  const upcoming = await res_upcoming.json();

  const res_movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie",
    options
  );
  const moviesData = await res_movies.json();
  // const moviesData= await res_movies.json();
  // console.log("top_rated 1", top_rated1.results[0]);
  const topRatedMovies: string[] = top_rated.results;
  const topRatedMovieTitle: string = top_rated.results[0].title;
  const topRatedMovieOverview: string = top_rated.results[0].overview;
  const topRatedMoviePicture: string = top_rated.results[0].poster_path;
  const topRatedMovieRating: number = top_rated.results[0].vote_average;

  const popularMovies: string[] = popular.results;
  const popularMovieTitle: string = popular.results[0].title;
  const popularMovieOverview: string = popular.results[0].overview;
  const popularMoviePicture: string = popular.results[0].poster_path;
  const popularMovieRating: number = popular.results[0].vote_average;
  const popularMovieId: number = popular.results[0].id;
  const res_movie_trailer = await fetch(
    `https://api.themoviedb.org/3/movie/${popularMovieId}/videos`,
    options
  );
  const trailer_info_data = await res_movie_trailer.json();
  const get_thelink_pls =
    trailer_info_data.results[trailer_info_data.results.length - 1].key;

  const yt_trailer: string = `https://www.youtube.com/watch?v=${get_thelink_pls}`;

  const upcomingMovies: string[] = upcoming.results;
  const upcomingMovieTitle: string = upcoming.results[0].title;
  const upcomingMovieOverview: string = upcoming.results[0].overview;
  const upcomingMoviePicture: string = upcoming.results[0].poster_path;
  const upcomingMovieRating: number = upcoming.results[0].vote_average;
  // fetch featured picture
  // console.log("picture", topRatedMoviePicture);
  // console.log("top-rated movies", topRatedMovies);
  // console.log("top-rated movies", topRatedMovies);
  console.log("trailer info", get_thelink_pls);
  console.log("movies", moviesData);
  console.log("top_rated result", top_rated);
  console.log("popular", popular);
  console.log("upcoming", upcoming);

  return (
    <div className="">
      <div className="navigation">
        <div>
          <div className="flex justify-around p-4">
            <div className="flex gap-2 items-center">
              <img className="w-9 h-9" src="/img/film.svg" />
              <h3 className="">Movie</h3>
            </div>
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
      <div className="featured-movie">
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/w185${popularMoviePicture}`}
        />
        <div className="p-7">
          <div className="flex justify-between py-4">
            <div>
              <div>Now in theaters:</div>
              <h1 className="text-lg font-bold">{popularMovieTitle}</h1>
            </div>
            <div className="">
              <img src="/img/rating.svg" />
              <div>{Math.floor(popularMovieRating * 10) / 10}/10</div>
            </div>
          </div>
          <div className="text-sm py-4">
            {/* Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads. */}
            {popularMovieOverview}
          </div>
          <div className="py-4">
            <a href={yt_trailer}>
              <Button className="px-4 py-2">Watch Trailer</Button>
            </a>
          </div>
        </div>
      </div>
      <div className="suggestion p-5">
        <div className="upcoming my-6">
          <div className="upcoming-header flex justify-between">
            <h1 className="text-xl font-extrabold ">Upcoming</h1>
            <div>See More</div>
          </div>
          {/*  cards here */}
          <div className="flex flex-wrap gap-5">
            {upcoming.results.map((movie: Movie) => (
              <Cards prop={movie} />
            ))}
          </div>

          <div className="popular my-6">
            <div className="popular-header popular flex justify-between">
              <h1 className="text-xl font-extrabold ">Popular</h1>
              <div>See More</div>
            </div>
            {/*  cards here */}
            <div className="flex flex-wrap gap-5 my-3">
              {popular.results.map((movie: Movie) => (
                <Cards prop={movie} />
              ))}
            </div>
          </div>
        </div>
        <div className="toprated my-6">
          <div className="toprated-header flex justify-between">
            <h1 className="text-xl font-extrabold ">Top-rated</h1>
            <div>See More</div>
          </div>
          {/*  cards here */}
          <div className="flex flex-wrap gap-5">
            {top_rated.results.map((movie: Movie) => (
              <Cards prop={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
