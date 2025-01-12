"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./searchBar";
import { ToggleMode } from "./switchmode";
import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeProviler";

export const Navigation = () => {
  //   const handleMode = props.handleMode();
  const [searchButton, setSearchButton] = useState<boolean>(true);
  // const [isDark, setDarkMode] = useState(false);
  const { isDark, toggle } = useContext(ThemeContext);
  const handleMode = () => {
    toggle();
    if (isDark) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    console.log("dark mode:", isDark);
  };
  return (
    <div className="navigation justify-between xl:justify-items-center">
      <div className="w-full xl:w-4/5">
        <div className="flex justify-around p-4 ">
          <Link className="hidden md:block" href="/">
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

          {/* here */}

          {/* reminder */}
          <div className="flex gap-4">
            <SearchBar
              setSearchButton={setSearchButton}
              searchButton={searchButton}
            />

            {/* here */}
            <div className="flex gap-4">
              <button className={`block xl:hidden `}>
                <Image
                  width="500"
                  height="700"
                  alt="search"
                  className="w-14"
                  src="/img/search.png"
                />
              </button>
              <button
                onClick={() => {
                  handleMode();
                }}
              >
                <Image
                  width="500"
                  height="700"
                  alt="switch mode to light/dark"
                  className="w-14"
                  src="/img/switch-button.png"
                />
              </button>
            </div>
          </div>
          {/* reminder */}
        </div>
      </div>
    </div>
  );
};
