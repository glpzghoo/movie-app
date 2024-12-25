import Genre from "../[genre]/page";
import { options } from "../page";
import { CreditCrew, Genres, movieDetail, Props } from "../types/types";
import { Badge } from "./badge";
// type movieDetailGenres = {};
export const Loaded = async (props: Props) => {
  const movie: movieDetail = props.movie;
  const movieGenres: Genres[] = movie.genres;

  console.log("checking movie", movie);

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
    options
  );
  const credits = await response.json();
  console.log("credits crew", credits.crew);
  const directors: CreditCrew[] = credits.crew.filter((crew: CreditCrew) => {
    if (crew.job == "Director" || crew.known_for_department == "Directing") {
      return <div>{crew.name}</div>;
    }
  });
  const Writers: CreditCrew[] = credits.crew.filter((crew: CreditCrew) => {
    if (crew.job == "Story" || crew.known_for_department == "Writing") {
      return <div>{crew.name}</div>;
    }
  });
  const Stars: CreditCrew[] = credits.crew.filter((crew: CreditCrew) => {
    if (crew.job == "Director" || crew.known_for_department == "Directing") {
      return <div>{crew.name}</div>;
    }
  });
  console.log("directors", directors);
  console.log("writes", Writers);
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
      <div className="p-5">
        <div className="movie-title-section">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">{movie.title}</h1>
              <div className="flex gap-2">
                <div>{movie.release_date.replaceAll("-", ".")}</div>·
                {/* <div className="flex gap-2">
                    {movie.genres.map((genre: Genres) => {
                      return <div>{genre.name}</div>;
                    })}
                  </div>
                  · */}
                <div>
                  {Math.floor(movie.runtime / 60)}h : {movie.runtime % 60}m
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <img className="w-9" src="/img/rating.svg" />
                <div>
                  <div className="flex justify-center">
                    {movie.vote_average.toFixed(1)}/{" "}
                    <span className="text-gray-400">10</span>
                  </div>
                  <div className="justify-self-end">({movie.vote_count})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        />
      </div>
      <div className="flex justify-between p-5">
        <div className="zuragnii-div ">
          <img
            className="min-w-[100px]"
            src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
          />
        </div>
        <div className="tailbariin-div w-[201px] ">
          <div className="badges-here flex gap-3 flex-wrap my-3">
            {movieGenres.map((genre: Genres) => (
              <Badge genre={genre} />
            ))}
          </div>
          <div className="overview my-3">{movie.overview}</div>
        </div>
      </div>
      <div className="nairuulagchtai-heseg">
        <div className="w-[90%] justify-self-center flex border-b-2 border-gray-300">
          <h1 className="font-bold">Directer</h1>
          <h3>
            {/* reminder */}
            {directors.map((director) => director.name)}
          </h3>
        </div>
        <div className="w-[90%] justify-self-center">
          <h1 className="font-bold">Writer</h1>
        </div>
        <div className="w-[90%] justify-self-center">
          <h1 className="font-bold">Stars</h1>
        </div>
      </div>
    </div>
  );
};
export const Loading = () => {
  return <div>Loading...</div>;
};
