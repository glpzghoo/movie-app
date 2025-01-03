import Link from "next/link";

export const SkeletonOne = () => {
  return (
    <div className="featured-movie">
      <div className="">
        <div
          className={`min-h-[600px] bg-muted bg-cover relative animate-pulse`}></div>
      </div>
    </div>
  );
};

export const SkeletonCategory = () => {
  return (
    <div className="upcoming-header flex h-10 justify-between p-50 animate-pulse">
      <h1 className="text-2xl rounded-xl font-extrabold w-60 bg-muted"></h1>
      <Link
        className="w-40 rounded-xl bg-muted"
        href="/upcoming?language=en-US&page=1">
        <div></div>
      </Link>
    </div>
  );
};
