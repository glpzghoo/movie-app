"use client";
import { useEffect, useState } from "react";
import { Movie, options } from "../page";
import { Link } from "lucide-react";
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
  const [search, setSearch] = useState("sonic");
  const [data, setData] = useState<data>();
  const input = (e: Event) => {
    const value: string = e.target.value;
    console.log("input", e.target.value);
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
  }, []);
  //   const results = data.results;
  console.log("checking the damn data", data);

  const ResultDiv = (props: Props) => {
    const theMovie = props.results[0];
    return (
      <>
        {data && (
          <a className="bg-green-400 w-[335px]" href={`./movie/`}>
            <div>
              <img
                className="w-16 h-25"
                src={`https://image.tmdb.org/t/p/original${theMovie.poster_path}`}
              />
            </div>
            <div>
              <h1 className="">{theMovie.title}</h1>
            </div>
          </a>
        )}
      </>
    );
  };
  return (
    <>
      {data && (
        <div>
          <input
            onChange={input}
            placeholder="Search"
            className="hidden w-1/2 sm:block"
          />
          <ResultDiv results={data} />
          <button className="block sm:hidden">
            <img className="w-9" src="/img/search.png" />
          </button>
        </div>
      )}
    </>
  );
};
