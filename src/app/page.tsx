import { Button } from "@/components/ui/button";
import { Cards } from "./_components/cards";

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
  const moviesData = await response.json();
  const popular = await res_popular.json();
  const top_rated = await res_topRated.json();
  console.log("movies", moviesData);
  console.log("top_rated result", top_rated);
  console.log("popular", popular);
  // const res1 = await fetch(
  //   "https://api.themoviedb.org/3/discover/movie",
  //   options
  // );
  // const top_rated1 = await res1.json();
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
  // fetch featured picture
  // console.log("picture", topRatedMoviePicture);
  // console.log("top-rated movies", topRatedMovies);
  // console.log("top-rated movies", topRatedMovies);

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
            <Button className="px-4 py-2 ">Watch Trailer</Button>
          </div>
        </div>
      </div>
      <div className="suggestion p-5">
        <div className="upcoming">
          <div className="upcoming-header flex justify-between">
            <h1 className="text-xl font-bold">Upcoming</h1>
            <div>See More</div>
          </div>
          {/*  cards here */}

          <div className="popular">
            <div className="popular-header popular flex justify-between">
              <h1 className="text-xl font-bold">Popular</h1>
              <div>See More</div>
            </div>
            {/*  cards here */}
            <div className="flex flex-wrap gap-5">
              {popular.results.map((movie: Movie) => (
                <Cards prop={movie} />
              ))}
            </div>
          </div>
        </div>
        <div className="toprated ">
          <div className="toprated-header flex justify-between">
            <h1 className="text-xl font-bold">Top-rated</h1>
            <div>See More</div>
          </div>
          {/*  cards here */}
        </div>
      </div>
    </div>
  );
}
