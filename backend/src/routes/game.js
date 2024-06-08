const express = require("express");
const router = express.Router();
const {
  createGame,
  getRecentGames,
  getAllGames,
  getGame,
  deleteGame,
} = require("../controllers/game");

router.post("/", createGame);
router.get("/", getRecentGames);
router.get("/all", getAllGames);
router.get("/:id", getGame);
router.delete("/:id", deleteGame);

module.exports = router;
