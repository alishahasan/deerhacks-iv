// backend/server.js
const express = require("express");
const cors = require("cors");
const dbOperations = require('./db/dbOperations');

const app = express();
app.use(cors());
app.use(express.json());

// Create new user and start quiz
app.post("/start-quiz", async (req, res) => {
  try {
    const { role } = req.body;
    const user = await dbOperations.createUser(role);
    res.json({ userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit quiz responses
app.post("/submit-responses", async (req, res) => {
  try {
    const { userId, role, responses } = req.body;
    
    if (role === 'student') {
      await dbOperations.saveStudentResponses(userId, responses);
      const matches = await dbOperations.findMatches(userId);
      res.json({ success: true, matches });
    } else {
      await dbOperations.saveTAResponses(userId, responses);
      res.json({ success: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get matches for a student
app.get("/matches/:studentId", async (req, res) => {
  try {
    const matches = await dbOperations.findMatches(req.params.studentId);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is running!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});