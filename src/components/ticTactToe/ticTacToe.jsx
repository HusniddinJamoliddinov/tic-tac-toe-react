import React, { useState } from "react";
import "./ticTacToe.scss";

const TicTacToe = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [XCount, setXCount] = useState(0);
  const [TieCount, setTieCount] = useState(0);
  const [OCount, setOCount] = useState(0);

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      dioganal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
          if(squares[pattern[0]]==="X"){
            setXCount(XCount + 1);
          }else if(squares[pattern[0]]==="O"){
            setOCount(TieCount + 1);
          }else{
            setTieCount(OCount + 1)
          }
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("Bu katak tanlangan, iltimos boshqa katak tanlang!");
      return;
    }

    let squares = [...cells];
    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }

    checkForWinner(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div className="container">
      {winner && (
        <>
          <button onClick={() => handleRestart()} className="restart">
            Restart
          </button>
          <p className="winner-text">{winner} is the winner</p>
        </>
      )}

      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>

      <div className="result-section">
        <div className="winners">
          <h3>Player-(X)</h3>
          <h3>Tie</h3>
          <h3>Player-(O)</h3>
        </div>
        <span className="underline"></span>
        <div className="result">
          <h3>{XCount}</h3>
          <h3>{TieCount}</h3>
          <h3>{OCount}</h3>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
