import React from "react";
import Box from "./Box";
import Dice from "./Dice";
import { useNavigate } from "react-router-dom";
import { GiNorthStarShuriken } from "react-icons/gi";
import {
  TbPentagonNumber1,
  TbPentagonNumber2,
  TbPentagonNumber3,
} from "react-icons/tb";
import {
  LuDice1,
  LuDice2,
  LuDice3,
  LuDice4,
  LuDice5,
  LuDice6,
} from "react-icons/lu";
import { FaSquare, FaCircle, FaDiamond, FaStar } from "react-icons/fa6";
import { TbTriangleFilled } from "react-icons/tb";
import { useState } from "react";

const Game = ({ setWinner }) => {
  const [counting, setCounting] = useState(0);
  const [turn, setTurn] = useState(0);
  const [dieNum, setDie] = useState([0, 0, 0, 0, 0]);
  const [pressable, setPressable] = useState(true);
  const [rollable, setRollable] = useState([1, 1, 1, 1, 1]);
  const [score, setScore] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [p1Score, setP1Score] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);
  const [p2Score, setP2Score] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);
  const navigate = useNavigate();

  const roll = (e) => {
    if (counting === 3) {
      setPressable(false);
      setRollable([0, 0, 0, 0, 0]);
      // setDie();
      return;
    }
    if (!pressable) {
      return;
    }
    count(e.target);
    randomDice();
    setTimeout(() => {
      check();
      show();
    }, 1550);
  };
  // count no. of rolls
  const count = () => {
    const cnt = document.querySelectorAll(".p");
    for (let i = 0; i <= counting; i++) {
      cnt[i].setAttribute("fill", "#999");
      cnt[i].setAttribute("stroke", "#555");
    }
    setCounting(counting + 1);
  };

  // dice rolling
  const randomDice = () => {
    const dieList = dieNum;
    for (let i = 0; i < 5; i++) {
      if (rollable[i] === 0) continue;
      const random = Math.floor(Math.random() * 7);
      dieList[i] = random;
      if (random >= 1 && random <= 10) {
        rollDice(i, random);
      } else {
        randomDice();
      }
    }
    setDie(dieList);
  };

  const rollDice = (Dno, random) => {
    const dice = document.querySelectorAll(".dice")[Dno];
    dice.style.animation = "rolling 1.5s";
    setTimeout(() => {
      switch (random) {
        case 1:
          dice.style.transform = " rotateX(0deg) rotateY(0deg)";
          break;

        case 6:
          dice.style.transform = "rotateX(180deg) rotateY(0deg)";
          break;

        case 2:
          dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
          break;

        case 5:
          dice.style.transform = "rotateX(90deg) rotateY(0deg)";
          break;

        case 3:
          dice.style.transform = "rotateX(0deg) rotateY(90deg)";
          break;

        case 4:
          dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
          break;

        default:
          break;
      }

      dice.style.animation = "none";
      setPressable(true);
    }, 1550);
    setPressable(false);
  };
  //show button
  const showButton = () => {
    const rollBtn = document.querySelector(".rollButton");
    pressable
      ? rollBtn.classList.remove("turnOver")
      : rollBtn.classList.add("turnOver");
  };
  // show results
  const show = () => {
    const cols2 = document.querySelectorAll(".col2");
    const cols3 = document.querySelectorAll(".col3");
    let cols = [];
    let pxScore = [];
    turn ? (cols = cols3) : (cols = cols2);
    turn ? (pxScore = p2Score) : (pxScore = p1Score);
    cols.forEach((e) => {
      e.style.cursor = "pointer";
      let x = e.getAttribute("data-index");
      e.innerHTML = score[x];
    });
    showButton();
    cols.forEach((e) => {
      let x = e.getAttribute("data-index");
      if (pxScore[x] !== -1) {
        e.innerHTML = pxScore[x];
      }
      e.addEventListener("click", function eventL() {
        const rollBtn = document.querySelector(".rollButton");
        const diceBox = document.querySelectorAll(".diceBox");
        diceBox.forEach((e) => {
          e.classList.remove("fixed");
        });
        setPressable(false);
        const pScore = pxScore;
        pScore[x] = pxScore[x];
        pxScore[x] = score[x];
        turn ? setP2Score(pxScore) : setP1Score(pxScore);
        turn ? setTurn(0) : setTurn(1);
        !turn
          ? (rollBtn.style.background = "#3b82f6")
          : (rollBtn.style.background = "#f43f5e");

        cols.forEach((e) => {
          e.style.cursor = "auto";
          let x = e.getAttribute("data-index");
          if (turn === 0 && p1Score[x] !== -1) {
            e.innerHTML = p1Score[x];
          } else if (turn === 1 && p2Score[x] !== -1) {
            e.innerHTML = p2Score[x];
          } else {
            e.innerHTML = 0;
          }
          setRollable([1, 1, 1, 1, 1]);

          for (let i = 0; i < 11; i++) {
            if (turn === 0) {
              cols3.forEach((e) => {
                if (p2Score[x] === -1 && e.getAttribute("data-index") === x) {
                  e.style.background = "#3b82f6";
                }
              });
              if (p1Score[x] === -1) {
                e.style.background = "#a53a49";
              } else {
                e.style.background = "#fb7185";
              }
            } else if (turn === 1) {
              cols2.forEach((e) => {
                if (p1Score[x] === -1 && e.getAttribute("data-index") === x) {
                  e.style.background = "#f43f5e";
                }
              });
              if (p2Score[x] === -1) {
                e.style.background = "#315a9e";
              } else {
                e.style.background = "#60a5fa";
              }
            }
          }
        });
        changeTurn();
        const cnt = document.querySelectorAll(".p");
        for (let i = 0; i <= 2; i++) {
          cnt[i].setAttribute("fill", "white");
          cnt[i].setAttribute("stroke", "#222");
        }
        showButton();
        setCounting(0);
      });
    });
  };

  // back button
  const goBack = () => {
    navigate("/");
  };
  // fixing dices
  const fix = (e) => {
    if (e.target.parentNode.parentNode.classList.contains("diceBox")) {
      e.target.parentNode.parentNode.classList.toggle("fixed");
      const y = rollable;
      const x = e.target.parentNode.parentNode.getAttribute("data-index");
      if (rollable[x] === 1) {
        y[x] = 0;
      } else {
        y[x] = 1;
      }
      setRollable(y);
    }
  };
  // conditional checking
  const check = () => {
    const hashDie = [0, 0, 0, 0, 0, 0];
    for (let k = 0; k < 5; k++) {
      let p = dieNum[k];
      hashDie[p - 1] = hashDie[p - 1] + 1;
    }
    const scoreMap = score;
    scoreMap[9] = 40;
    scoreMap[10] = 0;
    scoreMap[8] = 0;
    scoreMap[6] = 0;
    scoreMap[7] = 0;
    let sum = 0;
    for (let j = 0; j < 6; j++) {
      scoreMap[j] = hashDie[j] * [j + 1];
      sum += hashDie[j] * [j + 1];
      if (hashDie[j] > 1 || hashDie[0] === hashDie[5]) {
        scoreMap[9] = 0;
      }
    }
    if (hashDie.includes(5)) {
      scoreMap[10] = 50;
      scoreMap[7] = sum;
      scoreMap[6] = sum;
    }
    if (hashDie.includes(4)) {
      scoreMap[7] = sum;
      scoreMap[6] = sum;
    }
    if (hashDie.includes(3)) {
      scoreMap[6] = sum;
    }
    if (hashDie.includes(3) && hashDie.includes(2)) {
      scoreMap[8] = 25;
    }
    setScore(scoreMap);
    show();
  };
  //  Change turn
  const changeTurn = () => {
    console.log("changing");
    setPressable(true);
    showButton();
    count();
    setCounting(0);
    checkWin();
  };
  // checking win
  const checkWin = () => {
    let p1 = 0,
      p2 = 0;
    const screen = document.querySelector(".winScreen");
    if (!p1Score.includes(-1) && !p2Score.includes(-1)) {
      for (let i = 0; i < 11; i++) {
        p1 += p1Score[i];
        p2 += p2Score[i];
      }
      if (p1 > p2) {
        setWinner("Red Won !!!");
        screen.classList.add("show");
      } else {
        setWinner("Blue Won !!!");
        screen.classList.add("show2");
      }
      setTimeout(() => {
        screen.classList.remove("show");
        screen.classList.remove("show2");
        window.location.reload();
      }, 2000);
    }
  };
  return (
    <div className="game w-11/12 h-5/6 bg-white border-2 border-neutral-500 shadow-xls shadow-gray-500 rounded-lg px-4 py-1 sm:w-80">
      <div
        className="backB absolute bottom-0 translate-x-20 w-28 cursor-pointer h-14 bg-orange-400 rounded-t-full text-white font-extrabold text-2xl text-center pt-4"
        onClick={goBack}
      >
        Back
      </div>
      <div className="screen bg-orange-200 p-1 rounded-lg">
        <Box
          i={0}
          index={"one"}
          value={<LuDice1 fill="white" size={"30px"} />}
        />
        <Box
          i={1}
          index={"two"}
          value={<LuDice2 fill="white" size={"30px"} />}
        />
        <Box
          i={2}
          index={"three"}
          value={<LuDice3 fill="white" size={"30px"} />}
        />
        <Box
          i={3}
          index={"four"}
          value={<LuDice4 fill="white" size={"30px"} />}
        />
        <Box
          i={4}
          index={"five"}
          value={<LuDice5 fill="white" size={"30px"} />}
        />
        <Box
          i={5}
          index={"six"}
          value={<LuDice6 fill="white" size={"30px"} />}
        />
        <Box
          i={6}
          index={"seven"}
          value={<FaSquare size={"12px"} fill={"#222"} />}
          value1={<FaSquare size={"12px"} fill={"#222"} />}
          value2={<FaSquare size={"12px"} fill={"#222"} />}
        />
        <Box
          i={7}
          index={"eight"}
          value={<FaCircle size={"12px"} fill={"#222"} />}
          value1={<FaCircle size={"12px"} fill={"#222"} />}
          value2={<FaCircle size={"12px"} fill={"#222"} />}
          value3={<FaCircle size={"12px"} fill={"#222"} />}
        />
        <Box
          i={8}
          index={"nine"}
          value={<FaDiamond size={"12px"} fill={"#222"} />}
          value1={<FaDiamond size={"12px"} fill={"#222"} />}
          value2={<FaDiamond size={"12px"} fill={"#222"} />}
          value3={<FaCircle size={"12px"} fill={"#222"} />}
          value4={<FaCircle size={"12px"} fill={"#222"} />}
        />
        <Box
          i={9}
          index={"ten"}
          value={<FaSquare size={"12px"} fill={"#222"} />}
          value1={<FaDiamond size={"12px"} fill={"#222"} />}
          value2={<FaCircle size={"12px"} fill={"#222"} />}
          value3={<TbTriangleFilled size={"12px"} color={"#222"} />}
          value4={<FaStar size={"15px"} fill={"#222"} />}
        />
        <Box
          i={10}
          index={"eleven"}
          value={<FaStar size={"15px"} fill={"#222"} />}
          value1={<FaStar size={"15px"} fill={"#222"} />}
          value2={<FaStar size={"15px"} fill={"#222"} />}
          value3={<FaStar size={"15px"} fill={"#222"} />}
          value4={<FaStar size={"15px"} fill={"#222"} />}
        />
      </div>
      <div className="dices flex flex-row justify-between items-center w-full h-14 rounded-lg px-1">
        <div className="diceblock flex justify-center items-center aspect-square h-5/6 text-white rounded-md ">
          <GiNorthStarShuriken size={"25px"} className="rotate" />
          <Dice fix={fix} index={0} />
        </div>
        <div className="diceblock flex justify-center items-center aspect-square h-5/6 text-white rounded-md ">
          <GiNorthStarShuriken size={"25px"} className="rotate" />
          <Dice fix={fix} index={1} />
        </div>
        <div className="diceblock flex justify-center items-center aspect-square h-5/6 text-white rounded-md ">
          <GiNorthStarShuriken size={"25px"} className="rotate" />
          <Dice fix={fix} index={2} />
        </div>
        <div className="diceblock flex justify-center items-center aspect-square h-5/6 text-white rounded-md ">
          <GiNorthStarShuriken size={"25px"} className="rotate" />
          <Dice fix={fix} index={3} />
        </div>
        <div className="diceblock flex justify-center items-center aspect-square h-5/6 text-white rounded-md ">
          <GiNorthStarShuriken size={"25px"} className="rotate" />
          <Dice fix={fix} index={4} />
        </div>
      </div>
      <div
        className="rollButton flex flex-row justify-center items-center text-4xl font-bold w-full h-14 mt-1 bg-rose-500 text-white rounded-lg cursor-pointer"
        onClick={roll}
      >
        ROLL <i className="p-4"></i>
        <TbPentagonNumber1
          strokeWidth={"2px"}
          color="#222"
          fill="white"
          className="p"
        />
        &nbsp;
        <TbPentagonNumber2
          strokeWidth={"2px"}
          color="#222"
          fill="white"
          className="p"
        />
        &nbsp;
        <TbPentagonNumber3
          strokeWidth={"2px"}
          color="#222"
          fill="white"
          className="p"
        />
      </div>
    </div>
  );
};

export default Game;
