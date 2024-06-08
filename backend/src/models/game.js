const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    playerOne: {
      name: { type: String, required: true },
      wins: { type: Number, required: true },
      losses: { type: Number, required: true },
      draws: { type: Number, required: true },
    },
    playerTwo: {
      name: { type: String, required: true },
      wins: { type: Number, required: true },
      losses: { type: Number, required: true },
      draws: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
