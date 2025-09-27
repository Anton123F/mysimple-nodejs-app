const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World! My Node.js app is up and running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});