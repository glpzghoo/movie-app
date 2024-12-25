import { Footer } from "@/app/_components/footer";
import { options } from "@/app/page";
type Genres = {
  id: number;
  name: string;
};
type Props = {
  params: Params;
};
type Params = {
  id: number;
};
export default async function movieDetails(props: Props) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${props.params.id}?language=en-US'`,
    options
  );
  const movie = await res.json();

  // api.themoviedb.org/3/movie/{movie_id}
  // https: console.log(props.params);
  console.log(movie);
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
          className="justify-self-center m-4"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        />
      </div>
      <div></div>
      {/* <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} /> */}
    </div>
  );
}
