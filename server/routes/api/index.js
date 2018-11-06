const router = require("express").Router();
const bookRoutes = require("./books");
const gameRoutes = require("./game");

// Book routes
router.use("/books", bookRoutes);
router.use("/games", gameRoutes);

module.exports = router;
