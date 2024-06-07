import { Board } from "./gameParts/Board";
import { useState, useEffect, useRef } from "react";
import ScoreBoard from "./gameParts/ScoreBoard";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0, draw: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [players, setPlayers] = useState({
    playerOneName: "",
    playerTwoName: "",
  });

  const playerOneElement = useRef(null);
  const playerTwoElement = useRef(null);

  const handleBoxClick = (boxIndex) => {
    const updatedBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return xTurn === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = calculateWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else if (winner === "X") {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      } else {
        let { draw } = scores;
        draw += 1;
        setScores({ ...scores, draw });
      }
    }
    setBoard(updatedBoard);
    setXTurn(!xTurn);
  };

  const calculateWinner = (squares) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setGameOver(true);
        return squares[a];
      } else if (!squares.includes(null)) {
        setGameOver(true);
        return "draw";
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  const endGame = async () => {
    try {
      const response = await fetch(
        "https://tic-tac-toe-backend-server.vercel.app/api/games/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
          },
          body: JSON.stringify({
            playerOne: {
              name: players.playerOneName,
              wins: scores.xScore,
              losses: scores.oScore,
              draws: scores.draw,
            },
            playerTwo: {
              name: players.playerTwoName,
              wins: scores.xScore,
              losses: scores.oScore,
              draws: scores.draw,
            },
          }),
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setNames = () => {
    setPlayers({
      playerOneName: playerOneElement.current.value,
      playerTwoName: playerTwoElement.current.value,
    });
    setRegistered(true);
  };

  return (
    <>
      {registered ? (
        <>
          <ScoreBoard scores={scores} xTurn={xTurn} players={players} />
          <Board
            board={board}
            squareEvent={!gameOver && handleBoxClick}
            disabled={gameOver}
          />
          {gameOver && (
            <div>
              <button onClick={resetBoard}>Continue</button>
              <button onClick={endGame}>Stop</button>
            </div>
          )}{" "}
        </>
      ) : (
        <form>
          <input type="text" ref={playerOneElement} />
          <input type="text" ref={playerTwoElement} />
          <button onClick={setNames}>Start</button>
        </form>
      )}
    </>
  );
};

export default Game;
