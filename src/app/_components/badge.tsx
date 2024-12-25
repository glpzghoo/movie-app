import { Genres } from "../types/types";

type Props = {
  genre: Genres;
};

export const Badge = (props: Props) => {
  const genre: Genres = props.genre;
  console.log("props on badge", props);
  return (
    <div
      key={genre.id}
      className="border bg-none border-gray-200 p-1 rounded-sm font-semibold text-foreground text-xs content-center justify-center"
    >
      {genre.name}
    </div>
  );
};
