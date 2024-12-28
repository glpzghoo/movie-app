import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-indigo-700 w-[100%]   text-white p-10">
      <div className="w-[100%] flex-col gap-3 p-5">
        <div className="flex gap-3">
          <Image width="30" height="30" alt="logo" src="/img/movie-icon.png" />
          <h3 className="italic">Movie</h3>
        </div>
        <div className="text-sm">© 2024 Movie Z. All Rights Reserved.</div>
      </div>
      <div className="flex p-5">
        <div className="w-[100%]">
          <div className="my-6">Contact information</div>
          <div className="my-6">Email: support@movieZ.com</div>
          <div className="my-6">+976 (11) 123-4567</div>
        </div>

        <div className="w-[100%] p-5">
          <div>Follow us</div>
          <div className="flex gap-3 flex-col-reverse">
            <Link href={`facebook.com`}>Facebook</Link>
            <Link href={`facebook.com`}>Instagram</Link>
            <Link href={`facebook.com`}>Twitter</Link>
            <Link href={`facebook.com`}>Youtube</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
