import React from "react";

const Dice = ({ fix, index }) => {
  return (
    <div
      data-index={index}
      className="diceBox rounded-lg hover:shadow-sm hover:shadow-pink-800"
    >
      <div className="dice cursor-pointer" onClick={fix}>
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face right"></div>
        <div className="face left"></div>
      </div>
    </div>
  );
};

export default Dice;
