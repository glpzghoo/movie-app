"use client";

import Image from "next/image";
import { useState } from "react";

export const ToggleMode = () => {
  const [isDark, setDarkMode] = useState(false);

  const handleMode = () => {
    setDarkMode(!isDark);
    console.log(isDark);
  };

  return (
    <div className="flex gap-4">
      {/* here */}

      <button onClick={handleMode}>
        <Image
          width="500"
          height="700"
          alt="switch mode to light/dark"
          className="w-9"
          src="/img/switch-button.png"
        />
      </button>
    </div>
  );
};
