const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  playerOne: {
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    draws: { type: Number, required: true },
  },
  playerTwo: {
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    draws: { type: Number, required: true },
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;