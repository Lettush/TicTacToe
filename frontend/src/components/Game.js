import { Board } from "./gameParts/Board";
import { useState, useRef } from "react";
import ScoreBoard from "./gameParts/ScoreBoard";
import { useNavigate } from "react-router-dom";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  const [open, setOpen] = useState(false);

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
    let draw = false;
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
        draw = true;
      }
    }

    // Edge case for winner at last box
    if (draw) {
      setGameOver(true);
      return draw;
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
              wins: scores.oScore,
              losses: scores.xScore,
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setNames = () => {
    setPlayers({
      playerOneName: playerOneElement.current.value
        ? playerOneElement.current.value
        : "X",
      playerTwoName: playerTwoElement.current.value
        ? playerOneElement.current.value
        : "O",
    });
    setRegistered(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f0ebd8",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const modalButtonStyle = {
    border: "1px solid black",
    margin: "10px",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "white",
    },
    color: "#f0ebd8",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color="black"
            >
              Would you like to save and quit?
            </Typography>
            <Box style={{ marginTop: "20px" }}>
              <Button
                style={modalButtonStyle}
                onClick={() => {
                  endGame();
                }}
              >
                Save
              </Button>
              <Button style={modalButtonStyle} onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {registered ? (
        <>
          <ScoreBoard scores={scores} xTurn={xTurn} players={players} />
          <Board
            board={board}
            squareEvent={!gameOver && handleBoxClick}
            disabled={gameOver}
          />
          {gameOver && (
            <div className="buttons">
              <button type="button" onClick={resetBoard}>
                Continue
              </button>
              <button type="button" onClick={handleOpen}>
                Stop
              </button>
            </div>
          )}
        </>
      ) : (
        <form>
          <label htmlFor="playerOne">Player 1</label>
          <input
            type="text"
            ref={playerOneElement}
            id="playerOne"
            placeholder="X"
            required
          />
          <label htmlFor="playerTwo">Player 2</label>
          <input
            type="text"
            ref={playerTwoElement}
            id="playerTwo"
            placeholder="O"
            required
          />
          <button type="button" onClick={setNames}>
            Start
          </button>
        </form>
      )}
    </>
  );
};

export default Game;
