// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

const PORT = process.env.PORT || 8000;  // Changed from 5000 to 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));