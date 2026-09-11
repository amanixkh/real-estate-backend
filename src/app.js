const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());

const favoriteRoutes = require("./routes/favoriteRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

app.use("/api", favoriteRoutes);
app.use("/api", inquiryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/categories", categoryRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/agent/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Real Estate Backend API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;