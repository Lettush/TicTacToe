import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://tic-tac-toe-backend-server.vercel.app/api/games")
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        setGames(data);
        setIsLoading(!isLoading);
      });
  }, []);

  return (
    <div className="home">
      <Link to="/game">Start New Game</Link>
      {isLoading ? (
        <div className="games">Loading...</div>
      ) : (
        <div className="games">
          <h2>Recent Games</h2>
          {games &&
            games.map((game) => (
              <div className="game-card">
                <ul>
                  <h3>{game.playerOne.name}</h3>
                  <div>
                    <li>W: {game.playerOne.wins}</li>
                    <li>L: {game.playerOne.losses}</li>
                    <li>D: {game.playerOne.draws}</li>
                  </div>
                </ul>

                <ul>
                  <h3>{game.playerTwo.name}</h3>
                  <div>
                    <li>W: {game.playerTwo.wins}</li>
                    <li>L: {game.playerTwo.losses}</li>
                    <li>D: {game.playerTwo.draws}</li>
                  </div>
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
