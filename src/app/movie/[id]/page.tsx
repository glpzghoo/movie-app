import { Loaded, Loading } from "@/app/_components/movieDetails";
import { options } from "@/app/page";
import { movieDetail } from "@/app/types/types";

export default async function MovieDetails(props: any) {
  const params = props.params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${props.params.id}?language=en-US`,
    options
  );
  const movie: movieDetail = await res.json();

  // api.themoviedb.org/3/movie/{movie_id}
  // https: console.log(props.params);
  console.log(movie);
  console.log("checking", typeof params.id);
  return <div>{movie ? <Loaded movie={movie} /> : <Loading />}</div>;
}
