import React from "react";
import { GoPersonFill } from "react-icons/go";
import { BiSolidBot } from "react-icons/bi";
import { FaPlayCircle } from "react-icons/fa";

const Hero = () => {
  const vsFriend = () => {
    window.location.reload();
    const hero = document.querySelector(".hero");
    const game = document.querySelector(".game");
    hero.classList.add("hidden");
    game.classList.remove("hidden");
  };
  const vsBot = () => {
    const hero = document.querySelector(".hero");
    const game = document.querySelector(".game");
    hero.classList.add("hidden");
    game.classList.remove("hidden");
  };
  const how = () => {
    console.log("how");
  };
  return (
    <div className="hero w-11/12 h-5/6 bg-dicebg border-2  rounded-lg sm:w-80">
      <div className="heroTop rounded-t-lg w-full h-1/4"></div>
      <div className="select relative rounded-3xl -top-6 m-auto w-11/12 h-96 pb-10 bg-white border-2 p-4 font-extrabold text-gray-900 text-base">
        <p className="px-4 pb-5 text-gray-700">
          Take turns rolling the dice and try to score as many points as
          possible based on the combination on the sheet.
        </p>
        <div
          onClick={how}
          className="how flex flex-row justify-end align-middle mb-3 cursor-pointer text-green-700 hover:text-green-600"
        >
          How to play&nbsp;
          <FaPlayCircle size={"25px"} />
        </div>
        <div
          onClick={vsFriend}
          className="b1 pl-2 flex justify-start items-center flex-row w-full h-1/4 border-2 text-white bg-sky-700 rounded-xl mb-2 cursor-pointer  font-bold text-3xl hover:bg-sky-600"
        >
          <GoPersonFill size={"60px"} />
          <div className="flex flex-col pl-5 tracking-wide">
            <div className="text-sm leading-3 text-blue-400">PLAY VS.</div>{" "}
            FRIEND
          </div>
        </div>
        <div
          onClick={vsBot}
          className="b2 pl-2 flex justify-start items-center flex-row w-full h-1/4 border-2 text-white bg-sky-700 rounded-xl cursor-pointer font-bold text-3xl hover:bg-sky-600"
        >
          <BiSolidBot size={"60px"} />
          <div className="flex flex-col pl-5 tracking-wide">
            <div className="text-sm leading-3 text-blue-400">PLAY VS.</div> BOT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
