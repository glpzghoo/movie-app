"use client";
import { useEffect, useState } from "react";
import { Movie, options } from "../page";
import { Link } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
type target = {
  value: string;
};
type Event = {
  target: target;
};
type Props = {
  results: theMovie[];
};

// type results = {
//   results: data[];
// };
type data = theMovie[];
type theMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<data>();
  const input = (e: Event) => {
    const value: string = e.target.value;
    console.log("input", e);
    // if()
    setSearch(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await res.json();
      setData(data.results);
      console.log("searching data", data);
    };
    fetchData();
  }, [search]);
  //   const results = data.results;
  console.log("checking the damn data", data);

  const ResultDiv = (props: Props) => {
    const theMovies = props.results;
    return (
      <div className="border-border overflow-hidden rounded-xl p-3 shadow-2xl flex flex-col bg-white absolute right-4 gap-1">
        {data &&
          theMovies
            .map((theMovie) => (
              <a
                className=" w-[335px] p-2 relative flex border-b-2 border-gray-200"
                href={`/movie/${theMovie.id}`}
              >
                <div>
                  <img
                    className="w-16 h-25"
                    src={`https://image.tmdb.org/t/p/original${theMovie.poster_path}`}
                  />
                </div>
                <div className="flex flex-col justify-evenly ">
                  <h1 className="">{theMovie.title}</h1>
                  <div className="flex">
                    <img className="w-5" src="/img/rating.svg" />
                    <div>{Math.floor(theMovie.vote_average * 10) / 10}/10</div>
                  </div>
                  <div>{theMovie.release_date}</div>
                  <div className="absolute bottom-0 flex items-center gap-2  right-0">
                    See more <FaArrowRight />
                  </div>
                </div>
              </a>
            ))
            .slice(1, 5)}
        {search && <div>See all results for "{search}"</div>}
      </div>
    );
  };
  return (
    <>
      {data && (
        <div>
          <div className="relative hidden w-full sm:block">
            <input onChange={input} placeholder="Search" className="" />
            <ResultDiv results={data} />
          </div>

          <button className="block sm:hidden">
            <img className="w-9" src="/img/search.png" />
          </button>
        </div>
      )}
    </>
  );
};
