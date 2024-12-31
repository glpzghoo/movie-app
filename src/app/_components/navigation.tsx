"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./searchBar";
import { ToggleMode } from "./switchmode";
import { useState } from "react";
type Props = {
  handleMode: Function;
  mode: boolean;
};

export const Navigation = (props: Props) => {
  //   const handleMode = props.handleMode();

  return (
    <div className="navigation justify-items-center">
      <div className="w-full xl:w-4/5">
        <div className="flex justify-around p-4  sm:justify-between">
          <Link href="/">
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

          <SearchBar mode={props.mode} />
          {/* reminder */}
          <div className="flex gap-4">
            {/* here */}

            <button
              onClick={() => {
                props.handleMode();
              }}
            >
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
