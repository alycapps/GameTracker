const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: String, required: true },
  system: { type: String },
  description: String,
  releaseDate: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;