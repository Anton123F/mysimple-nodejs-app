// server.js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! My Node.js app is up and running!");
});

app.post("/mcp", (req, res) => {
    // Log the request from CodeMie
    console.log("MCP Request:", req.body);

    // Respond back
    res.json({ message: "Hello from your local MCP server!" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`MCP server is running on http://localhost:${port}`);
});