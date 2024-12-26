import { Button } from "@/components/ui/button";
import { Cards } from "./_components/movies";
import { Link } from "lucide-react";
import { SearchBar } from "./_components/searchBar";

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
export const options = {
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
  const res_now_playing = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );

  const popular = await res_popular.json();
  const top_rated = await res_topRated.json();
  const upcoming = await res_upcoming.json();
  const now_playing = await res_now_playing.json();

  const res_movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie",
    options
  );
  const moviesData = await res_movies.json();
  // const moviesData= await res_movies.json();
  // console.log("top_rated 1", top_rated1.results[0]);
  // top rated
  const topRatedMovies: string[] = top_rated.results;
  const topRatedMovieTitle: string = top_rated.results[0].title;
  const topRatedMovieOverview: string = top_rated.results[0].overview;
  const topRatedMoviePicture: string = top_rated.results[0].poster_path;
  const topRatedMovieRating: number = top_rated.results[0].vote_average;
  // popular
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
  // upcoming
  const upcomingMovies: string[] = upcoming.results;
  const upcomingMovieTitle: string = upcoming.results[0].title;
  const upcomingMovieOverview: string = upcoming.results[0].overview;
  const upcomingMoviePicture: string = upcoming.results[0].poster_path;
  const upcomingMovieRating: number = upcoming.results[0].vote_average;
  // fetch featured picture
  // console.log("picture", topRatedMoviePicture);
  // console.log("top-rated movies", topRatedMovies);
  // console.log("top-rated movies", topRatedMovies);

  //now playing

  const now_playingMovies: string[] = now_playing.results;
  const now_playingMovieTitle: string = now_playing.results[0].title;
  const now_playingMovieOverview: string = now_playing.results[0].overview;
  const now_playingMoviePicture: string = now_playing.results[0].backdrop_path;
  const now_playingMoviePictureSM: string = now_playing.results[0].poster_path;
  const now_playingMovieRating: number = now_playing.results[0].vote_average;

  console.log("trailer info", get_thelink_pls);
  console.log("movies", moviesData);
  console.log("top_rated result", top_rated);
  console.log("popular", popular);
  console.log("upcoming", upcoming);
  console.log("now playing", now_playing);

  return (
    <div className="">
      <div className="navigation">
        <div>
          <div className="flex justify-around p-4 sm:justify-between">
            <a href="/">
              <div className="flex gap-2 items-center">
                <img className="w-9 h-9" src="/img/film.svg" />
                <h3 className="">Movie</h3>
              </div>
            </a>
            <div className="flex"></div>
            {/* here */}

            <div className="flex gap-4">
              {/* here */}
              <SearchBar />
              <button>
                <img className="w-9" src="/img/switch-button.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="featured-movie">
        <div className="sm:flex">
          <img
            className="overflow-auto w-[50%] h-[50%] justify-self-center hidden sm:block"
            src={`https://image.tmdb.org/t/p/w500${now_playingMoviePictureSM}`}
          />
          <img
            className="overflow-auto w-full h-full justify-self-center block sm:hidden"
            src={`https://image.tmdb.org/t/p/w500${now_playingMoviePicture}`}
          />
          <div className="p-7">
            <div className="flex justify-between py-4">
              <div>
                <div>Now in theaters:</div>
                <h1 className="text-lg font-bold">{now_playingMovieTitle}</h1>
              </div>
              <div className="">
                <img src="/img/rating.svg" />
                <div>{Math.floor(now_playingMovieRating * 10) / 10}/10</div>
              </div>
            </div>
            <div className="text-sm py-4">
              {/* Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads. */}
              {now_playingMovieOverview}
            </div>
            <div className="py-4">
              <a href={yt_trailer}>
                <Button className="px-4 py-2">Watch Trailer</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="suggestion p-5">
        <div className="upcoming my-6">
          <div className="upcoming-header flex justify-between">
            <h1 className="text-xl font-extrabold ">Upcoming</h1>
            <a href="/upcoming">
              <div>See More</div>
            </a>
          </div>
          {/*  cards here */}
          <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {upcoming.results
              .map((movie: Movie) => <Cards prop={movie} />)
              .slice(0, 12)}
          </div>

          <div className="popular my-6">
            <div className="popular-header popular flex justify-between">
              <h1 className="text-xl font-extrabold ">Popular</h1>
              <a href="/popular">
                <div>See More</div>
              </a>
            </div>
            {/*  cards here */}
            <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
              {popular.results
                .map((movie: Movie) => <Cards prop={movie} />)
                .slice(0, 12)}
            </div>
          </div>
        </div>
        <div className="toprated my-6">
          <div className="toprated-header flex justify-between">
            <h1 className="text-xl font-extrabold ">Top-rated</h1>
            <a href="/top_rated">
              <div>See More</div>
            </a>
          </div>
          {/*  cards here */}
          <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {top_rated.results
              .map((movie: Movie) => <Cards prop={movie} />)
              .slice(0, 12)}
          </div>
        </div>
      </div>
    </div>
  );
}
