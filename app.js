const express = require("express");
const sql = require("mssql"); // Add this
const app = express();

const PORT = process.env.PORT || 3000;
// This matches the name we used in the Terraform 'connection_string' block
const connectionString = process.env.SQLAZURECONNSTR_DatabaseConnectionString;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// New route to test the actual DB connection
app.get("/db-test", async (req, res) => {
  try {
    await sql.connect(connectionString);
    const result = await sql.query`SELECT @@VERSION as version`;
    res.json({ message: "Database Connected! ✅", version: result.recordset[0].version });
  } catch (err) {
    res.status(500).json({ message: "Database Connection Failed! ❌", error: err.message });
  }
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
