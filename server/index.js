const data = require("./../data.json");
const express = require("express");
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Words endpoint
app.get("/words", (req, res) => res.json(data["wordList"]));

// rank endpoint
app.post("/rank", (req, res) => res.json(data["scoresList"]));

app.listen(PORT, () => {
  return console.log(`Server listening on ${PORT}`);
});
