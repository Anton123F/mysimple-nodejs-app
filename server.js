const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const filePath = path.join(__dirname, 'index.html');
let htmlContent = null;

try {
  htmlContent = fs.readFileSync(filePath, 'utf-8');
} catch (err) {
  console.error('Error reading the HTML file:', err);
  process.exit(1);
}

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});




app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
//   res.setHeader('Cache-Control', 'public, max-age=3600');
//   res.setHeader('Expires', new Date(Date.now() + 3600 * 1000).toUTCString());
  
  res.send(htmlContent);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});