const express = require("express");
const { generateStory } = require("./controllers/openaiController");

// app setup
const app = express();

const port = process.env.PORT || 443;

app.listen(port, () => console.log(`listening for requests on port ${port}`));

// middleware

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",

    "https://storytime.theothernicola.life"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(express.json());
app.use(express.static("public"));

// route
app.post("/story", generateStory);
