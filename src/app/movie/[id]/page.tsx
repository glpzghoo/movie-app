import { Loaded, Loading } from "@/app/_components/movieDetails";
import { options } from "@/app/page";
import { movieDetail } from "@/app/types/types";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
  };
};
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
  return (
    <div>
      <Suspense fallback={<Loading />}>
        {movie && <Loaded movie={movie} />}
      </Suspense>
    </div>
  );
}
