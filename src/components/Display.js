import Hero from "./Hero";
import Game from "./Game";
import { useState } from "react";

const Display = () => {
  const [winner, setWinner] = useState("none");
  return (
    <div className="display flex justify-center items-center left-1/5 w-3/5 h-full">
      <Hero />
      <Game setWinner={setWinner} />
      <div className="winScreen hidden justify-center items-center capitalize absolute w-2/3 h-1/3 text-white text-6xl">
        {winner}
      </div>
    </div>
  );
};

export default Display;
