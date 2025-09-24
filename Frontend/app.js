const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Serve dist as static with correct JS MIME type
app.use(express.static(path.join(__dirname, "dist"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
    if (filePath.endsWith(".wasm")) {
      res.setHeader("Content-Type", "application/wasm");
    }
  }
}));

// Handle SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
