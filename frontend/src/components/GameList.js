import { useState, useEffect } from "react";
// MUI
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pageNum = searchParams.get("p") || 0;
    fetch(
      `https://tic-tac-toe-backend-server.vercel.app/api/games/all?p=${pageNum}`
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          navigate("/");
        } else {
          setGames(data.paginatedData);
          setPages(data.totalPages);
          setIsLoading(!isLoading);
        }
      });
  }, []);

  const totalPages = [...Array(pages).keys()];

  return (
    <div className="games">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Recent Games
      </h2>
      {isLoading ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <CircularProgress size="5rem" />
            Loading...
          </Box>
        </>
      ) : (
        <>
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
            <div>
              {totalPages.map(page => (
                <Link to={`/history?p=${page + 1}`} key={page}>{page + 1}</Link>
              ))}
            </div>
        </>
      )}
    </div>
  );
};

export default GameList;
