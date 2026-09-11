const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/favorites", authenticate, favoriteController.addFavorite);
router.delete("/favorites/:propertyId", authenticate, favoriteController.removeFavorite);
router.get("/favorites", authenticate, favoriteController.getFavorites);

module.exports = router;
