import { Movie } from "../page";

type Props = {
  prop: Movie;
};

export const Cards = (props: Props) => {
  // console.log(props.prop.title, props);
  // console.log(props.prop.id, props);

  console.log(props.prop.id);
  return (
    <a href={`/movie/${props.prop.id}`}>
      <div
        key={props.prop.id}
        className={`rounded-lg bg-secondary overflow-hidden`}>
        <img
          className="w-full h-auto"
          src={`https://image.tmdb.org/t/p/w500${props.prop.poster_path}`}
        />
        <div className="p-[10px]">
          <div className="rating flex items-center text-xs">
            <img className="w-4 h-4" src="/img/rating.svg" />
            <div>
              {Math.floor(props.prop.vote_average * 10) / 10}/10 (
              {props.prop.vote_count})
            </div>
          </div>
          <div className="name overflow-hidden">{props.prop.title}</div>
        </div>
      </div>
    </a>
  );
};
