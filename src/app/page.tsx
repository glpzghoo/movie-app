import { Button } from "@/components/ui/button";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmQyMzA5YWM1NTFjOTMxN2MzZmQ5ZGY3OWIzZWEyOSIsIm5iZiI6MTczNTAyNTM4OC42MDQsInN1YiI6IjY3NmE2MmVjYjBjMzc2ZDQyMWE5ZWQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NP1yqe7VPWE7aXz-y9KfvdAA6EK8r8UDrjhU8EjFev4",
  },
};
export default async function Home() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await res.json();
  console.log("data result", data.results[0]);
  // const res1 = await fetch(
  //   "https://api.themoviedb.org/3/discover/movie",
  //   options
  // );
  // const data1 = await res1.json();
  // console.log("data 1", data1.results[0]);
  const featuredMovieTitle = data.results[0].title;
  const featuredMovieOverview = data.results[0].overview;
  const featuredMoviePicture = data.results[0].poster_path;
  const featuredMovieRating = data.results[0].vote_average;
  // fetch featured picture
  console.log("picture", featuredMoviePicture);
  console.log("data", data);
  return (
    <div className="">
      <div className="navigation">
        <div>
          <div className="flex justify-around p-4">
            <div className="flex gap-2 items-center">
              <img className="w-9 h-9" src="/img/film.svg" />
              <h3 className="">Movie</h3>
            </div>
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
      <div className="featured-movie">
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/w185${featuredMoviePicture}`}
        />
        <div className="p-7">
          <div className="flex justify-between py-4">
            <div>
              <div>Now on theater:</div>
              <h1 className="text-lg font-extrabold">{featuredMovieTitle}</h1>
            </div>
            <div className="">
              <img src="/img/rating.svg" />
              <div>{featuredMovieRating}/10</div>
            </div>
          </div>
          <div className="text-sm py-4">
            {/* Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads. */}
            {featuredMovieOverview}
          </div>
          <div className="py-4">
            <Button className="px-4 py-2 ">Watch Trailer</Button>
          </div>
        </div>
      </div>
      <div className="suggestion p-6">
        <div className="upcoming flex justify-between">
          <h1 className="text-xl font-bold">Upcoming</h1>
          <div>See More</div>
        </div>
        <div className="upcoming flex justify-between">
          <h1 className="text-xl font-bold">Popular</h1>
          <div>See More</div>
        </div>
        <div className="upcoming flex justify-between">
          <h1 className="text-xl font-bold">Top-rated</h1>
          <div>See More</div>
        </div>
      </div>
    </div>
  );
}
