"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./searchBar";
import { ToggleMode } from "./switchmode";
import { useState } from "react";

export const Navigation = () => {
  //   const handleMode = props.handleMode();
  const [searchButton, setSearchButton] = useState<boolean>(false);
  const [isDark, setDarkMode] = useState(false);

  const handleMode = () => {
    setDarkMode(!isDark);
    console.log("dark mode:", isDark);
  };
  return (
    <div className="navigation justify-between xl:justify-items-center">
      <div className="w-full xl:w-4/5">
        <div className="flex justify-around p-4 ">
          {!searchButton && (
            <Link className="" href="/">
              <div className="flex gap-2 items-center">
                <Image
                  width="500"
                  height="700"
                  alt="logo"
                  className="w-9 h-9"
                  src="/img/film.svg"
                />
                <h3 className="">Movie</h3>
              </div>
            </Link>
          )}

          {/* here */}

          {/* reminder */}
          <div className="flex gap-4">
            <SearchBar
              setSearchButton={setSearchButton}
              searchButton={searchButton}
            />

            {/* here */}

            <button
              onClick={() => {
                handleMode();
              }}>
              <Image
                width="500"
                height="700"
                alt="switch mode to light/dark"
                className="w-9"
                src="/img/switch-button.png"
              />
            </button>
          </div>
          {/* reminder */}
        </div>
      </div>
    </div>
  );
};
