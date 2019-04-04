import axios from "axios";

export default {
  saveGame: function(gameData) {
    return axios.post("/api/games", gameData);
  },
  getGames: function() {
    return axios.get("/api/games");
  },
  getGame: function(id) {
    return axios.get("/api/games/" + id);
  },
  deleteGame: function(id) {
    return axios.delete("/api/games/" + id);
  }
};
