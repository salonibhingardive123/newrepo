const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
