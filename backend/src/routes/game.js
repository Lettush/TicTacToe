const express = require("express");
const router = express.Router();
const {
  createGame,
  getAllGames,
  getGame,
  deleteGame,
} = require("../controllers/game");

router.post("/", createGame);
router.get("/", getAllGames);
router.get("/:id", getGame);
router.delete("/:id", deleteGame);

module.exports = router;
