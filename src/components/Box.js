import React from "react";

const Box = ({ i, index, value, value1, value2, value3, value4 }) => {
  const showInfo = (e) => {
    let item;
    if (!e.target.classList.contains("flex")) {
      if (e.target.parentNode.classList.contains("flex")) {
        item = e.target.parentNode;
      } else {
        item = e.target.parentNode.parentNode;
      }
    } else {
      item = e.target;
    }
    item.classList.toggle("new");
    item.classList.toggle(index);
  };

  return (
    <div>
      <div className="row flex flex-row w-full h-8 mb-1 pl-2 bg-orange-300 rounded-md">
        <div
          className="flex flex-row items-center w-1/3 h-auto gap-0.5 cursor-pointer"
          onClick={showInfo}
        >
          {value}
          {value1}
          {value2}
          {value3}
          {value4}
        </div>
        <div
          data-index={i}
          className="col2 w-1/3 bg-rose-500 mr-1 rounded-md flex justify-center items-center text-xl font-bold text-neutral-800"
        >
          0
        </div>
        <div
          data-index={i}
          className="col3 w-1/3 bg-blue-500 rounded-md flex justify-center items-center text-xl font-bold text-neutral-800 "
        >
          0
        </div>
      </div>
    </div>
  );
};

export default Box;
