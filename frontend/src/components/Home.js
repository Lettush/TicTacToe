import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("https://tic-tac-toe-backend-server.vercel.app/api/games")
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div>
      <Link to="/game">Start New Game</Link>
      {games &&
        games.map((game) => (
          <>
            <div>
              <ul>
                <li>{game.playerOne.name}</li>
                <li>Wins: {game.playerOne.wins}</li>
                <li>Losses: {game.playerOne.losses}</li>
                <li>Draws: {game.playerOne.draws}</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>{game.playerTwo.name}</li>
                <li>Wins: {game.playerTwo.wins}</li>
                <li>Losses: {game.playerTwo.losses}</li>
                <li>Draws: {game.playerTwo.draws}</li>
              </ul>
            </div>
          </>
        ))}
    </div>
  );
};

export default Home;
