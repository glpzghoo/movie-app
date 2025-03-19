import { Button } from "@/components/ui/button";
import { Cards } from "./_components/movies";
import { SearchBar } from "./_components/searchBar";
import Image from "next/image";
import Link from "next/link";
import { movieDetail } from "./types/types";
import { SkeletonOne, SkeletonCategory } from "./_components/skeletons";
import { FeaturedMovies } from "./_components/featured";
import { Suspense } from "react";
import { ThemeProvider } from "./ThemeProviler";
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
  // const get_thelink_pls =
  //   trailer_info_data.results[trailer_info_data.results.length - 1].key;

  // const yt_trailer: string = `https://www.youtube.com/watch?v=${get_thelink_pls}`;
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
                <Suspense>
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
                </Suspense>
              </div>

              <div className="p-7 w-3/4 lg:content-center">
                <div className="flex justify-between py-4">
                  <div>
                    <div>Now in theaters:</div>
                    <Suspense>
                      <h1 className="text-lg font-bold">
                        {now_playingMovieTitle}
                      </h1>
                    </Suspense>
                  </div>
                  <div className="">
                    <Image
                      width="30"
                      height="30"
                      className="w-auto h-auto"
                      alt="star rating"
                      src="/img/rating.svg"
                    />
                    <Suspense>
                      <div>
                        {Math.floor(now_playingMovieRating * 10) / 10}/10
                      </div>
                    </Suspense>
                  </div>
                </div>
                <Suspense>
                  <div className="text-sm py-4">{now_playingMovieOverview}</div>
                </Suspense>

                <div className="py-4">
                  <Suspense>
                    {/* <Link href={yt_trailer}>
                      <Button className="px-4 py-2">Watch Trailer</Button>
                    </Link> */}
                  </Suspense>
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
                <Suspense>
                  {upcoming.results
                    .map((movie: movieDetail, index: number) => (
                      <Cards prop={movie} key={movie.id} index={index} />
                    ))
                    .slice(0, 12)}
                </Suspense>
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
                  <Suspense>
                    {popular.results
                      .map((movie: movieDetail, index: number) => (
                        <Cards prop={movie} key={movie.id} index={index} />
                      ))
                      .slice(0, 12)}
                  </Suspense>
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
                <Suspense>
                  {top_rated.results
                    .map((movie: movieDetail, index: number) => (
                      <Cards prop={movie} key={movie.id} index={index} />
                    ))
                    .slice(0, 12)}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden xl:block justify-items-center">
        {/* reminder */}
        <div className="">
          <Suspense fallback={<SkeletonOne />}>
            {now_playingMovies && <FeaturedMovies nowPlaying={now_playing} />}
          </Suspense>

          <div className="suggestion p-5 justify-items-center ">
            <div className="upcoming my-6 w-4/5">
              <Suspense fallback={<SkeletonCategory />}>
                {upcomingMovies && (
                  <div className="upcoming-header flex justify-between p-3">
                    <h1 className="text-2xl font-extrabold ">Upcoming</h1>
                    <Link href="/upcoming?language=en-US&page=1">
                      <div>See More</div>
                    </Link>
                  </div>
                )}
              </Suspense>

              {/*  cards here */}
              <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <Suspense>
                  {upcoming.results
                    .map((movie: movieDetail, index: number) => (
                      <div key={movie.id}>
                        <Cards prop={movie} key={movie.id} index={index} />
                      </div>
                    ))
                    .slice(0, 10)}
                </Suspense>
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
                  <Suspense>
                    {popular.results
                      .map((movie: movieDetail, index: number) => (
                        <div key={movie.id}>
                          <Cards prop={movie} key={movie.id} index={index} />
                        </div>
                      ))
                      .slice(0, 10)}
                  </Suspense>
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
                  <Suspense>
                    {top_rated.results
                      .map((movie: movieDetail, index: number) => (
                        <div key={movie.id}>
                          <Cards prop={movie} key={movie.id} index={index} />
                        </div>
                      ))
                      .slice(0, 10)}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
