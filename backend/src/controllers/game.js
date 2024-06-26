const Game = require("../models/game");

// Create Game
const createGame = async (req, res) => {
  const { playerOne, playerTwo } = req.body;

  try {
    const game = await Game.create({
      playerOne,
      playerTwo,
    });

    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Games
const getRecentGames = async (req, res) => {
  try {
    const games = await Game.find().sort({createdAt: -1}).limit(5);

    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllGames = async (req, res) => {
  const page = req.query.p || 0;
  const gamesPerPage = 5;

  try {
    const games = await Game.find().sort({createdAt: -1});

    const totalPages = Math.ceil(games.length / gamesPerPage);
    const startIndex = (page - 1) * gamesPerPage;
    const endIndex = page * gamesPerPage;
    const paginatedData = games.slice(startIndex, endIndex);

    res.status(200).json({ totalPages, paginatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Specific Game
const getGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.find({ _id: id });
    if (!game) return res.status(404).json({ error: "No game found." });

    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Game
const deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findByIdAndDelete({ _id: id });

    if (!game) return res.status(404).json({ error: "No game found." });

    res.status(200).json({
      message: "The game has been successfully removed.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createGame,
  getRecentGames,
  getAllGames,
  getGame,
  deleteGame,
};
