import Image from "next/image";
import { Movie, options } from "../page";
import { CreditCrew, Genres, movieDetail, Props } from "../types/types";
import { Badge } from "./badge";
import { Cards } from "./movies";
import { SearchBar } from "./searchBar";
import Link from "next/link";
// type movieDetailGenres = {};
// type creditsData ={
//   cast:
// }
type cast = {
  adult: boolean;
  gender: boolean;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
type crew = {
  adult: boolean;
  gender: boolean;
  id: boolean;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: boolean;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};
type creditsDetails = {
  cast: cast[];
  crew: crew[];
  id: number;
};

export const Loaded = async (props: Props) => {
  const movie: movieDetail = props.movie;
  const movieGenres: Genres[] = movie.genres;

  console.log("checking movie", movie);
  console.log(`checking props(movieDetails)`, props);

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
    options
  );
  const credits = await response.json();
  const res_recom = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/similar?language=en-US&page=1`,
    options
  );
  const recommendations = await res_recom.json();

  console.log("credits crew", credits.crew);

  console.log("recommendations", recommendations);

  const directors: CreditCrew[] = credits?.crew?.filter((crew: CreditCrew) => {
    if (crew.known_for_department == "Directing" || crew.job === "Director") {
      return <div>{crew.name}</div>;
    }
  });
  const Writers: CreditCrew[] = credits?.crew?.filter((crew: CreditCrew) => {
    if (crew.known_for_department == "Writing" || crew.job === "Writing") {
      return <div>{crew.name}</div>;
    }
  });
  // const Stars: CreditCrew[] = credits.crew.filter((crew: CreditCrew) => {
  //   if (crew.job == "Director" || crew.known_for_department == "Directing") {
  //     return <div>{crew.name}</div>;
  //   }
  // });
  console.log("credits", credits);
  console.log("directors", directors);
  console.log("writes", Writers);
  return (
    <div>
      <div className="navigation">
        <div>
          <div className="flex justify-around py-2">
            <Link href="/">
              <div className="flex gap-2 items-center">
                <Image
                  width="50"
                  height="50"
                  className="w-9 h-9"
                  alt="the logo"
                  src="/img/film.svg"
                />
                <h3 className="">Movie</h3>
              </div>
            </Link>
            <div className="flex"></div>
            <div className="flex gap-4">
              <SearchBar />
              <button>
                <Image
                  width="50"
                  height="50"
                  alt="mode switch to dark/light"
                  className="w-9"
                  src="/img/switch-button.png"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="movie-title-section">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">{movie.title}</h1>
              <div className="flex gap-2">
                <div>{movie && movie?.release_date?.replaceAll("-", ".")}</div>·
                {/* <div className="flex gap-2">
                    {movie.genres.map((genre: Genres) => {
                      return <div>{genre.name}</div>;
                    })}
                  </div>
                  · */}
                <div>
                  {movie && Math.floor(movie.runtime / 60)}h :{" "}
                  {movie.runtime % 60}m
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <Image
                  width="50"
                  height="50"
                  alt="the rating"
                  className="w-9"
                  src="/img/rating.svg"
                />
                <div>
                  <div className="flex justify-center">
                    {movie && movie?.vote_average?.toFixed(1)}/{" "}
                    <span className="text-gray-400">10</span>
                  </div>
                  <div className="justify-self-end">({movie.vote_count})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* div start */}
      <div className="block">
        <div className="flex justify-center">
          <Image
            width="500"
            height="700"
            alt="featured movie backdrop"
            className="w-auto h-auto sm:h-[405px] sm:w-[720px]"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : `https://placehold.co/640x360?text=no+pic+lol`
            }
          />
        </div>
        <div className="flex justify-center">
          <div className="flex justify-between items-start h-72 overflow-hidden my-4 gap-10 sm:w-[auto] p-5 sm:h-[420px] sm:justify-around">
            <div className="zuragnii-div w-[50%] content-center overflow-hidden">
              <Image
                width="500"
                height="700"
                alt="featured movie poster"
                className="sm:w-auto sm:h-[420px]"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
            </div>
            <div className="tailbariin-div w-[50%] sm:flex sm:flex-col sm:justify-center sm:w-[80%]">
              <div className="badges-here flex gap-3 flex-wrap my-3 ">
                {movieGenres &&
                  movieGenres.map((genre: Genres, index: number) => (
                    <Badge genre={genre} id={movie.id} />
                  ))}
              </div>
              <div className="overview my-3 w-[100%] ">{movie.overview}</div>
            </div>
          </div>
        </div>
      </div>
      {/* div ends */}
      <div className="nairuulagchtai-heseg">
        <div className="w-[90%]  min-h-20 justify-self-center flex gap-2 border-b-2 border-gray-300">
          <h1 className="font-bold">Directer</h1>
          <h3 className="flex flex-wrap gap-2">
            {/* reminder */}
            {directors &&
              directors
                .map((director, index) => (
                  <div key={index}>{director.name}</div>
                ))
                .slice(0, 5)}
          </h3>
        </div>
        <div className="w-[90%] min-h-20 justify-self-center flex gap-2 border-b-2 border-gray-300">
          <h1 className="font-bold">Writer</h1>
          <h3 className="flex flex-wrap gap-2">
            {/* reminder */}
            {Writers &&
              Writers.map((writer, index) => (
                <div key={index}>{writer.name}</div>
              )).slice(0, 5)}
          </h3>
        </div>
        <div className="w-[90%] min-h-20 justify-self-center flex gap-2 border-b-2 border-gray-300">
          <h1 className="font-bold">Stars</h1>
          <h3 className="flex flex-wrap gap-2">
            {/* reminder */}
            {credits &&
              credits?.cast
                ?.map((cast: cast, index: number) => (
                  <div key={index}>{cast.name}</div>
                ))
                .slice(0, 5)}
          </h3>
        </div>
        <div className="m-6">
          <div className=" popular flex justify-between">
            <h1 className="text-xl font-extrabold ">More like this</h1>
            <Link
              href={`./${
                movie.id
              }/${movieGenres[0].name.toLowerCase()}?language=en-US&page=1`}
            >
              <div>See More</div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {recommendations &&
              recommendations?.results
                ?.map((movie: Movie, index: number) => (
                  <Cards prop={movie} key={movie.id} index={index} />
                ))
                .slice(0, 4)}
          </div>
        </div>
      </div>
    </div>
  );
};
export const Loading = () => {
  return (
    <div className="font-extrabold relative flex items-center gap-2 text-center w-full">
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 animate-ping"></span>
      <p>Loading...</p>
    </div>
  );
};
