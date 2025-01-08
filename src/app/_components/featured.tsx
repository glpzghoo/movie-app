import Image from "next/image";
import { data, FeaturedData } from "../types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { options } from "../page";
import { Suspense } from "react";

type Props = {
  nowPlaying: FeaturedData;
};
type PropsForFeaturedMovies = {
  now_playingMoviePicture: string;
  now_playingMovieOverview: string;
  now_playingMovieTitle: string;
  now_playingMovieRating: number;
  now_playingMovieId: number;
};
export const FeaturedMovies = async (props: Props) => {
  const FeaturedMovie = async (props: PropsForFeaturedMovies) => {
    console.log(props.now_playingMovieId);
    const now_playingMovieTitle: string = props.now_playingMovieTitle;
    const now_playingMovieOverview: string = props.now_playingMovieOverview;
    const now_playingMoviePicture: string = props.now_playingMoviePicture;
    const now_playingMovieRating: number = props.now_playingMovieRating;
    const now_playingMovieId: number = props.now_playingMovieId;
    const res_movie_trailer = await fetch(
      `https://api.themoviedb.org/3/movie/${now_playingMovieId}/videos`,
      options
    );
    const trailer_info_data = await res_movie_trailer.json();
    const get_thelink_pls =
      trailer_info_data.results[trailer_info_data.results.length - 1]?.key;
    const yt_trailer: string = `https://www.youtube.com/watch?v=${get_thelink_pls}`;
    return (
      <CarouselItem>
        <div className="justify-items-center">
          <Suspense>
            <div
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${now_playingMoviePicture}")`,
              }}
              className={`min-h-[600px] w-full bg-cover relative`}>
              <div className="p-7 absolute w-[404px] h-[264px] bottom-[158px] left-[140px]">
                <div className="flex justify-between py-4">
                  <div className="text-white">
                    <div>Now in theaters:</div>
                    <Suspense>
                      <h1 className="text-lg font-bold">
                        {now_playingMovieTitle}
                      </h1>
                    </Suspense>
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
                    <Suspense>
                      {Math.floor(now_playingMovieRating * 10) / 10}/10
                    </Suspense>
                  </div>
                </div>
                <Suspense>
                  <div className="text-sm my-4 text-white h-20 truncate text-wrap">
                    {now_playingMovieOverview}
                  </div>
                </Suspense>

                <div className="py-4 ">
                  <Suspense>
                    <Link href={yt_trailer}>
                      <Button className="px-4 py-2 bg-background text-secondary-foreground">
                        Watch Trailer
                      </Button>
                    </Link>
                  </Suspense>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </CarouselItem>
    );
  };

  return (
    <div className="featured-movie">
      <Suspense>
        <Carousel>
          <CarouselContent>
            {props.nowPlaying.results.slice(0, 10).map((movie) => (
              <FeaturedMovie
                key={movie.id}
                now_playingMovieTitle={movie.title}
                now_playingMovieOverview={movie.overview}
                now_playingMoviePicture={movie.backdrop_path}
                now_playingMovieRating={movie.vote_average}
                now_playingMovieId={movie.id}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Suspense>
    </div>
  );
};
