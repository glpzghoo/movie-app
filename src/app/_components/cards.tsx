import { Movie } from "../page";

type Props = {
  prop: Movie;
};

export const Cards = (props: Props) => {
  console.log(props);
  return (
    <div className="w-[157px] h-[309px] rounded-lg">
      <img src={`https://image.tmdb.org/t/p/w185${props.prop.poster_path}`} />
    </div>
  );
};
