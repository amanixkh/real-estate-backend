const express = require("express");
const cors = require("cors");
const path = require("path");

const categoryRoutes = require("./routes/categoryRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/categories", categoryRoutes);
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Real Estate API is running"
    });
});

const PORT = process.gitenv.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;