import { Cards } from "../_components/movies";
import { Movie, options } from "../page";
type Props = {
  params: Params;
};
type Params = {
  genre: string;
};
export default async function Genre(props: Props) {
  console.log(props.params);
  const res_topRated = await fetch(
    `https://api.themoviedb.org/3/movie/${props.params.genre}?language=en-US`,
    options
  );
  const moviesData = await res_topRated.json();
  const movies = moviesData.results;
  console.log(movies);
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
      <div className="m-4">
        <div className="upcoming-header flex justify-between">
          <h1 className="text-xl font-extrabold ">
            {props.params.genre.toUpperCase().replaceAll("_", " ")}
          </h1>
          {/* <a href="/upcoming">
          <div>See More</div>
        </a> */}
        </div>
        <div className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {movies.map((movie: Movie) => (
            <Cards prop={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
