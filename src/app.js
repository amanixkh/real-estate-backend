const express = require("express");
const app = express();

require("./config/db");

app.use(express.json());

const favoriteRoutes = require("./routes/favoriteRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

app.use("/api", favoriteRoutes);
app.use("/api", inquiryRoutes);

app.get("/", (req, res) => {
  res.send("Real Estate Backend API");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});