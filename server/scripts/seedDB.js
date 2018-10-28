const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gametracker");

const gameSeed = [
  {
    name: "Mario Party",
    system: "GameCube",
    description:
      "Fun multiplayer boardgame like game.",
    releaseDate: new Date(Date.now())
  },
  {
    title: "Sonic the Hedgehog",
    system: "Playstation",
    description:
      "Collect coins defeat villians.",
    releaseDate: new Date(Date.now())
  },
  {
    name: "Animal Crossing",
    system: "Nintendo 3DS",
    description:
      "Create your own town of animal villagers.",
    releaseDate: new Date(Date.now())
  }
];

db.Game
  .remove({})
  .then(() => db.Game.collection.insertMany(gameSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
