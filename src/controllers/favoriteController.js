const favoriteModel = require("../models/favoriteModel");

// Add a property to favorites
async function addFavorite(req, res) {
  try {
    const userId = req.user.id;
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ message: "propertyId is required" });
    }

    const favorite = await favoriteModel.addFavorite(userId, propertyId);
    return res.status(201).json({ message: "Favorite added", favorite });
  } catch (error) {
    console.error("❌ Error adding favorite:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Remove a property from favorites
async function removeFavorite(req, res) {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({ message: "propertyId is required" });
    }

    const favorite = await favoriteModel.removeFavorite(userId, propertyId);

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    return res.status(200).json({ message: "Favorite removed", favorite });
  } catch (error) {
    console.error("❌ Error removing favorite:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Get all favorites for a user
async function getFavorites(req, res) {
  try {
    const userId = req.user.id;

    const favorites = await favoriteModel.getFavorites(userId);
    return res.status(200).json({ favorites });
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
