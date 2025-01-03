import Image from "next/image";
import Link from "next/link";
import { movieDetail } from "../types/types";

type Props = {
  prop: movieDetail;
  key: number;
  index: number;
};

export const Cards = (props: Props) => {
  // console.log(props.prop.title, props);
  // console.log(props.prop.id, props);

  // console.log("key", props.prop.id + props.index);
  // console.log("check type props.index", typeof props.index);
  // console.log("check type props.key", typeof props.prop.id);
  // console.log("movie", props.prop);
  return (
    <div key={props?.prop?.id + props.index}>
      {props.prop ? (
        <Link href={`/movie/${props.prop.id}`}>
          <div
            key={props.prop.id}
            className={`rounded-lg bg-secondary overflow-hidden`}>
            <Image
              width="500"
              height="700"
              alt="movie poster"
              className="w-full h-auto"
              placeholder="empty"
              src={
                !props.prop.poster_path
                  ? "https://placehold.co/360x540?text=no+pic+lol"
                  : `https://image.tmdb.org/t/p/original${props.prop.poster_path}`
              }
            />
            <div className="p-[10px]">
              <div className="rating flex items-center text-xs">
                <Image
                  width="500"
                  height="700"
                  alt="rating star"
                  className="w-4 h-4"
                  src="/img/rating.svg"
                />
                <div>
                  {Math.floor(props.prop.vote_average * 10) / 10}/10 (
                  {props.prop.vote_count})
                </div>
              </div>
              <div className="name overflow-hidden">{props.prop.title}</div>
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={`rounded-lg bg-secondary h-[350px] overflow-hidden animate-pulse`}>
          <div className="p-[10px]">
            <div className="rating flex items-center text-xs">
              <div></div>
            </div>
            <div className="name overflow-hidden"></div>
          </div>
        </div>
      )}
    </div>
  );
};
