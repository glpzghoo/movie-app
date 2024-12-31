import { Button } from "@/components/ui/button";
import { Cards } from "./_components/movies";
import { SearchBar } from "./_components/searchBar";
import Image from "next/image";
import Link from "next/link";
import { movieDetail } from "./types/types";
import { SkeletonOne, SkeletonCategory } from "./_components/skeletons";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmQyMzA5YWM1NTFjOTMxN2MzZmQ5ZGY3OWIzZWEyOSIsIm5iZiI6MTczNTAyNTM4OC42MDQsInN1YiI6IjY3NmE2MmVjYjBjMzc2ZDQyMWE5ZWQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NP1yqe7VPWE7aXz-y9KfvdAA6EK8r8UDrjhU8EjFev4",
  },
};

export default async function Home() {
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
  const topRatedMovies: string[] = top_rated?.results;
  const topRatedMovieTitle: string = top_rated?.results[0]?.title;
  const topRatedMovieOverview: string = top_rated?.results[0]?.overview;
  const topRatedMoviePicture: string = top_rated?.results[0]?.poster_path;
  const topRatedMovieRating: number = top_rated?.results[0]?.vote_average;
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

  // console.log("trailer info", get_thelink_pls);
  // console.log("movies", moviesData);
  // console.log("top_rated result", top_rated);
  // console.log("popular", popular);
  // console.log("upcoming", upcoming);
  // console.log("now playing", now_playing);

  return (
    <>
      <div className="block xl:hidden justify-items-center">
        <div className="w-[90%]">
          <div className="featured-movie">
            <div className="sm:flex justify-items-center">
              <div className="overflow-auto md:h-full xl:bg-cover xl:bg-center justify-self-center  md:content-center">
                <Image
                  width="500"
                  height="700"
                  alt="featured movie poster"
                  className="hidden sm:block w-full h-full"
                  src={`https://image.tmdb.org/t/p/original${now_playingMoviePictureSM}`}
                />
                <Image
                  width="500"
                  height="700"
                  alt="featured movie backdrop"
                  className="overflow-auto w-full h-full justify-self-center block sm:hidden"
                  src={`https://image.tmdb.org/t/p/original${now_playingMoviePicture}`}
                />
              </div>

              <div className="p-7 w-3/4 lg:content-center">
                <div className="flex justify-between py-4">
                  <div>
                    <div>Now in theaters:</div>
                    <h1 className="text-lg font-bold">
                      {now_playingMovieTitle}
                    </h1>
                  </div>
                  <div className="">
                    <Image
                      width="30"
                      height="30"
                      className="w-auto h-auto"
                      alt="star rating"
                      src="/img/rating.svg"
                    />
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
                  <Link href={yt_trailer}>
                    <Button className="px-4 py-2">Watch Trailer</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="suggestion p-5">
            <div className="upcoming my-6">
              <div className="upcoming-header flex justify-between p-3">
                <h1 className="text-2xl font-extrabold ">Upcoming</h1>
                <Link href="/upcoming?language=en-US&page=1">
                  <div>See More</div>
                </Link>
              </div>
              {/*  cards here */}
              <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                {upcoming.results
                  .map((movie: movieDetail, index: number) => (
                    <Cards prop={movie} key={movie.id} index={index} />
                  ))
                  .slice(0, 12)}
              </div>

              <div className="popular my-6">
                <div className="popular-header popular flex justify-between p-3">
                  <h1 className="text-2xl font-extrabold ">Popular</h1>
                  <Link href="/popular?language=en-US&page=1">
                    <div>See More</div>
                  </Link>
                </div>
                {/*  cards here */}
                <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                  {popular.results
                    .map((movie: movieDetail, index: number) => (
                      <Cards prop={movie} key={movie.id} index={index} />
                    ))
                    .slice(0, 12)}
                </div>
              </div>
            </div>
            <div className="toprated my-6">
              <div className="toprated-header flex justify-between p-3">
                <h1 className="text-2xl font-extrabold ">Top rated</h1>
                <Link href="/top_rated?language=en-US&page=1">
                  <div>See More</div>
                </Link>
              </div>
              {/*  cards here */}
              <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                {top_rated.results
                  .map((movie: movieDetail, index: number) => (
                    <Cards prop={movie} key={movie.id} index={index} />
                  ))
                  .slice(0, 12)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden xl:block justify-items-center">
        {/* reminder */}
        <div className="w-4/5">
          {now_playingMovies ? (
            <div className="featured-movie">
              <div className="justify-items-center">
                <div
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${now_playingMoviePicture}")`,
                  }}
                  className={`min-h-[600px] w-full bg-cover bg-center relative`}
                >
                  <div className="p-7 absolute w-[404px] h-[264px] bottom-[158px] left-[140px]">
                    <div className="flex justify-between py-4">
                      <div className="text-white">
                        <div>Now in theaters:</div>
                        <h1 className="text-lg font-bold">
                          {now_playingMovieTitle}
                        </h1>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        width="30"
                        height="30"
                        className="w-auto h-auto"
                        alt="star rating"
                        src="/img/rating.svg"
                      />
                      <div className="text-white">
                        {Math.floor(now_playingMovieRating * 10) / 10}/10
                      </div>
                    </div>
                    <div className="text-sm my-4 text-white h-20 truncate text-wrap">
                      {/* Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads. */}
                      {now_playingMovieOverview}
                    </div>
                    <div className="py-4 ">
                      <Link href={yt_trailer}>
                        <Button className="px-4 py-2 bg-white text-black">
                          Watch Trailer
                        </Button>
                      </Link>
                    </div>
                  </div>
                  {/* <Image
                width="500"
                height="700"
                alt="featured movie backdrop"
                className="overflow-auto w-[50%] h-[50%] justify-self-center block xl:hidden"
                src={`https://image.tmdb.org/t/p/w500${now_playingMoviePictureSM}`}
              />
              <Image
                width="500"
                height="700"
                alt="featured movie backdrop"
                className="overflow-auto w-full h-full justify-self-center hidden xl:block"
                src={`https://image.tmdb.org/t/p/w500${now_playingMoviePicture}`}
              /> */}
                </div>
              </div>
            </div>
          ) : (
            <SkeletonOne />
          )}
          <div className="suggestion p-5 justify-items-center ">
            <div className="upcoming my-6 w-full">
              {upcomingMovies ? (
                <div className="upcoming-header flex justify-between p-3">
                  <h1 className="text-2xl font-extrabold ">Upcoming</h1>
                  <Link href="/upcoming?language=en-US&page=1">
                    <div>See More</div>
                  </Link>
                </div>
              ) : (
                <SkeletonCategory />
              )}

              {/*  cards here */}
              <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {upcoming.results
                  .map((movie: movieDetail, index: number) => (
                    <div key={movie.id}>
                      <Cards prop={movie} key={movie.id} index={index} />
                    </div>
                  ))
                  .slice(0, 10)}
              </div>

              <div className="popular my-6">
                {popularMovies ? (
                  <div className="popular-header popular flex justify-between p-3 ">
                    <h1 className="text-2xl font-extrabold ">Popular</h1>
                    <Link href="/popular?language=en-US&page=1">
                      <div>See More</div>
                    </Link>
                  </div>
                ) : (
                  <SkeletonCategory />
                )}

                {/*  cards here */}
                <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {popular.results
                    .map((movie: movieDetail, index: number) => (
                      <div key={movie.id}>
                        <Cards prop={movie} key={movie.id} index={index} />
                      </div>
                    ))
                    .slice(0, 10)}
                </div>
              </div>
              <div className="toprated my-6">
                {topRatedMovies ? (
                  <div className="toprated-header flex justify-between p-3">
                    <h1 className="text-2xl font-extrabold ">Top rated</h1>
                    <Link href="/top_rated?language=en-US&page=1">
                      <div>See More</div>
                    </Link>
                  </div>
                ) : (
                  <SkeletonCategory />
                )}

                {/*  cards here */}
                <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {top_rated.results
                    .map((movie: movieDetail, index: number) => (
                      <div key={movie.id}>
                        <Cards prop={movie} key={movie.id} index={index} />
                      </div>
                    ))
                    .slice(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
